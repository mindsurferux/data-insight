import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  loginAs(username: string): void {
    // Mostrar alert de desarrollo
    alert(`🔓 Acceso en modo desarrollo\nUsuario: ${username}\n\nEn producción se requerirá autenticación real.`);
    
    // Realizar login mock
    const success = this.authService.login(username);
    
    if (success) {
      // Redirigir al dashboard
      this.router.navigate(['/dashboard']);
    } else {
      alert('Error al iniciar sesión');
    }
  }
}
