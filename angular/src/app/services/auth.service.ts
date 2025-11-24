import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, MOCK_USERS } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    // Cargar usuario de localStorage si existe
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  /**
   * Login mock - simula autenticación sin backend
   */
  login(username: string): boolean {
    const user = MOCK_USERS[username.toLowerCase()];
    
    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  }

  /**
   * Logout - limpia sesión
   */
  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  /**
   * Verifica si el usuario tiene acceso a un módulo específico
   */
  hasPermission(module: 'proyectos' | 'cms' | 'ciberseguridad'): boolean {
    const user = this.currentUser();
    return user ? user.permissions[module] : false;
  }
}
