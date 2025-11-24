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
      const skipModuleResumen = this.privilegesService.shouldSkipModuleResumen();
      const skipProjectResumen = this.privilegesService.shouldSkipProjectResumen();
      
      if (skipModuleResumen) {
        // STAKEHOLDER: Salta resumen, va al primer módulo disponible
        const firstModule = this.privilegesService.getFirstModule();
        
        if (firstModule && firstModule.id === 'proyectos') {
          // Si el primer módulo es Proyectos
          const proyectos = this.privilegesService.getAvailableProjects();
          
          if (proyectos.length === 1 && skipProjectResumen) {
            // Stakeholder con 1 proyecto: ir a primera vista (no resumen)
            const projectId = proyectos[0].id;
            const firstView = this.privilegesService.getFirstNonResumenView(projectId);
            if (firstView) {
              this.router.navigate(['/dashboard', 'proyectos', projectId, firstView]);
            } else {
              this.router.navigate(['/dashboard', 'proyectos', projectId, 'resumen']);
            }
          } else if (proyectos.length > 1) {
            // Múltiples proyectos: ir a reportes
            this.router.navigate(['/dashboard', 'proyectos', 'reportes']);
          } else {
            // Sin proyectos: ir al módulo
            this.router.navigate(['/dashboard', 'proyectos']);
          }
        } else if (firstModule) {
          // Primer módulo NO es Proyectos: ir al módulo directamente
          this.router.navigate(['/dashboard', firstModule.id]);
        } else {
          // Sin módulos: ir a resumen
          this.router.navigate(['/dashboard', 'resumen']);
        }
      } else {
        // USUARIO NORMAL (NO stakeholder): Va a vista resumen
        this.router.navigate(['/dashboard', 'resumen']);
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
