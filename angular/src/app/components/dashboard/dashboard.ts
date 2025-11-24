import { Component, Signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PrivilegesService } from '../../services/privileges';
import { NavigationStateService } from '../../services/navigation-state.service';
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
    dashboardNavState: DashboardNavState,
    public navigationStateService: NavigationStateService
  ) {
    this.currentUser = this.authService.currentUser;
    this.navState = dashboardNavState;
    
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // ============================================================
    // LÓGICA DE ATERRIZAJE CONDICIONAL - NO FUNCIONA
    // ============================================================
    // La lógica de skipModuleResumen y skipProjectResumen no se ejecuta
    // correctamente en el constructor del Dashboard. El router ya tiene
    // una ruta asignada cuando se ejecuta este código.
    // 
    // TODO: Investigar alternativas:
    // - Usar guards de routing
    // - Implementar lógica en el servicio de autenticación
    // - Usar resolvers de Angular
    // ============================================================
    
    /*
    // Verificar que privilegios estén cargados
    const currentPrivileges = this.privilegesService['currentUserPrivileges']();
    
    if (!currentPrivileges) {
      return;
    }

    // Redirect según privilegios del usuario
    if (this.router.url === '/dashboard') {
      const skipModuleResumen = this.privilegesService.shouldSkipModuleResumen();
      const skipProjectResumen = this.privilegesService.shouldSkipProjectResumen();
      
      if (skipModuleResumen) {
        const firstModule = this.privilegesService.getFirstModule();
        
        if (firstModule && firstModule.id === 'proyectos') {
          const proyectos = this.privilegesService.getAvailableProjects();
          
          if (proyectos.length === 1 && skipProjectResumen) {
            const projectId = proyectos[0].id;
            this.router.navigate(['/dashboard', 'proyectos', projectId, 'resumen']);
          } else if (proyectos.length > 1) {
            this.router.navigate(['/dashboard', 'proyectos', 'reportes']);
          } else {
            this.router.navigate(['/dashboard', 'proyectos']);
          }
        } else if (firstModule) {
          this.router.navigate(['/dashboard', firstModule.id]);
        } else {
          this.router.navigate(['/dashboard', 'resumen']);
        }
      } else {
        this.router.navigate(['/dashboard', 'resumen']);
      }
    }
    */

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

  toggleNavigationLock(): void {
    this.navigationStateService.toggleLock();
  }
}
