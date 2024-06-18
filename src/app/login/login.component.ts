import { Component, AfterViewInit } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Import Bootstrap Modal
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  user = '';
  password = '';
  registerUser = '';
  registerPassword = '';
  registerUsername = '';

  Usuarios = collection(this.firestore, 'Usuarios');

  constructor(private firestore: Firestore, private router: Router) {}

  ngAfterViewInit() {
    // Necessary to ensure Bootstrap is loaded and initialized
  }

  async logIn() {
    try {
      const userQuery = query(
        this.Usuarios,
        where('User', '==', this.user),
        where('Password', '==', this.password)
      );
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        alert('Usuario no encontrado o contraseña incorrecta');
      } else {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']); // Redirige al componente deseado
      }
    } catch (error) {
      alert('Error al iniciar sesión: ');
    }
  }

  async signUp() {
    // Validaciones
    if (
      !this.registerUser ||
      !this.registerPassword ||
      !this.registerUsername
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }

    try {
      // Verificar si el usuario ya existe
      const userQuery = query(
        this.Usuarios,
        where('User', '==', this.registerUser)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        alert('El nombre de usuario ya está en uso');
        return;
      }

      // Crear un nuevo documento en la colección 'Usuarios' con un ID único generado automáticamente
      const docRef = await addDoc(this.Usuarios, {
        User: this.registerUser,
        Password: this.registerPassword,
        Username: this.registerUsername,
        UserId: '', // Campo temporal, se actualizará después de la creación
      });

      // Actualizar el documento para incluir el UserId
      await updateDoc(docRef, {
        UserId: docRef.id,
      });

      console.log('Usuario registrado con ID: ', docRef.id);
      alert('Usuario registrado con éxito');
      this.registerUser = '';
      this.registerPassword = '';
      this.registerUsername = '';
      this.closeModal();
    } catch (error) {
      alert('Error al registrar usuario: ');
    }
  }

  closeModal() {
    const modalElement = document.getElementById('signUpModal') as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const newModalInstance = new bootstrap.Modal(modalElement);
        newModalInstance.hide();
      }
    }
  }
}
