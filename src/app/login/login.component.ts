import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = "";
  password = "";

  Usuarios = collection(this.firestore, "Usuarios");

  constructor(private firestore: Firestore, private router: Router) { }

  async logIn() {
    try {
      const userQuery = query(this.Usuarios, where("User", "==", this.user), where("Password", "==", this.password));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        console.log("Usuario no encontrado o contraseña incorrecta");
      } else {
        console.log("Inicio de sesión exitoso");
        this.router.navigate(['/dashboard']);  // Redirige al componente deseado
      }
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
    }
  }
}