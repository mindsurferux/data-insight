import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModuleNavigation } from './module-navigation/module-navigation';
import { DashboardHeader } from './dashboard-header/dashboard-header';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, ModuleNavigation, DashboardHeader],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  currentUser;
  activeModule: string = 'proyectos';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.currentUser;
    
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
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
