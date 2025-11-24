import { Component, Signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PrivilegesService } from '../../services/privileges';
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
    private privilegesService: PrivilegesService,
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

    // Redirect según privilegios del usuario
    if (this.router.url === '/dashboard') {
      const landingModule = this.privilegesService.getLandingModule();
      const landingProject = this.privilegesService.getLandingProject();
      const skipModuleResumen = this.privilegesService.shouldSkipModuleResumen();
      const skipProjectResumen = this.privilegesService.shouldSkipProjectResumen();
      
      if (landingProject && landingModule === 'proyectos') {
        // Usuario con proyecto específico de aterrizaje
        if (skipProjectResumen) {
          // Stakeholder con 1 proyecto: ir a primera vista (no resumen)
          const firstView = this.privilegesService.getFirstNonResumenView(landingProject);
          if (firstView) {
            this.router.navigate(['/dashboard', landingModule, landingProject, firstView]);
          } else {
            this.router.navigate(['/dashboard', landingModule, landingProject, 'resumen']);
          }
        } else {
          // Usuario normal: ir a resumen del proyecto o reportes
          if (landingProject === 'reportes') {
            this.router.navigate(['/dashboard', landingModule, 'reportes']);
          } else {
            this.router.navigate(['/dashboard', landingModule, landingProject, 'resumen']);
          }
        }
      } else if (skipModuleResumen && landingModule !== 'proyectos') {
        // Stakeholder en módulo no-proyectos: cargar módulo directamente
        this.router.navigate(['/dashboard', landingModule]);
      } else {
        // Usuario normal: ir al módulo
        this.router.navigate(['/dashboard', landingModule]);
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
