import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, MOCK_USERS } from '../models/user.model';
import { PrivilegesService } from './privileges';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(
    private router: Router,
    private privilegesService: PrivilegesService
  ) {
    // Cargar usuario de localStorage si existe
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      this.currentUserSignal.set(user);
      // Cargar privilegios del usuario
      this.privilegesService.loadUserPrivileges(user.name.toLowerCase());
    }
  }

  /**
   * Login mock - simula autenticación sin backend
   */
  login(username: string): boolean {
    const user = MOCK_USERS.find(u => u.name.toLowerCase() === username.toLowerCase());
    
    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Cargar privilegios del usuario
      this.privilegesService.loadUserPrivileges(username.toLowerCase());
      
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
    this.privilegesService.clearPrivileges();
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
    return user ? user.permissions.includes(module) : false;
  }
}
