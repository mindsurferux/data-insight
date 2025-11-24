import { Component, Signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { DashboardHeader } from './dashboard-header/dashboard-header';
import { ModuleNavigation } from './module-navigation/module-navigation';
import { DashboardNavState } from './services/dashboard-nav-state';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, DashboardHeader, ModuleNavigation],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  currentUser: Signal<User | null>;
  activeModule: string = '';
  navState;

  constructor(
    private authService: AuthService,
    private router: Router,
    dashboardNavState: DashboardNavState
  ) {
    this.currentUser = this.authService.currentUser;
    this.navState = dashboardNavState;
    
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Redirect según rol del usuario
    const user = this.currentUser();
    if (user && this.router.url === '/dashboard') {
      if (user.role === 'stakeholder') {
        // Ana (stakeholder) → Proyectos
        this.router.navigate(['/dashboard/proyectos']);
      } else if (user.role === 'admin') {
        // Luis (admin) → Ciberseguridad (primer módulo)
        this.router.navigate(['/dashboard/ciberseguridad']);
      } else {
        // Otros → Resumen
        this.router.navigate(['/dashboard/resumen']);
      }
    }

    // Detectar módulo activo para sincronizar color del canvas
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      if (url.includes('/resumen')) {
        this.activeModule = 'resumen';
      } else if (url.includes('/proyectos')) {
        this.activeModule = 'proyectos';
      } else if (url.includes('/cms')) {
        this.activeModule = 'cms';
      } else if (url.includes('/ciberseguridad')) {
        this.activeModule = 'ciberseguridad';
      }
    });
  }

  logout(): void {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
