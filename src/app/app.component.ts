import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, NavbarComponent],
  template: `
    <router-outlet></router-outlet>
    <app-navbar></app-navbar>
    <app-login></app-login>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gastrogenius';
}
