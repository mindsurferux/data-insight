import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProyectoNav } from '../proyecto-nav/proyecto-nav';
import { PrivilegesService } from '../../../services/privileges';
import { NavigationStateService } from '../../../services/navigation-state.service';

@Component({
  selector: 'app-proyectos-dashboard',
  imports: [RouterModule, ProyectoNav],
  templateUrl: './proyectos-dashboard.html',
  styleUrls: ['./proyectos-dashboard.css']
})
export class ProyectosDashboard {
  
  constructor(
    private privilegesService: PrivilegesService,
    private navigationStateService: NavigationStateService,
    private router: Router
  ) {
    // Al cargar el módulo Proyectos, expandir Proyectos y colapsar Módulos
    this.navigationStateService.onProyectosModuleLoad();
    
    // Redirect condicional según proyectos asignados
    if (this.router.url === '/dashboard/proyectos') {
      const proyectos = this.privilegesService.getAvailableProjects();
      const skipProjectResumen = this.privilegesService.shouldSkipProjectResumen();
      
      if (proyectos.length === 1) {
        // Usuario con 1 solo proyecto
        const projectId = proyectos[0].id;
        
        if (skipProjectResumen) {
          // Stakeholder: ir a primera vista (no resumen)
          const firstView = this.privilegesService.getFirstNonResumenView(projectId);
          if (firstView) {
            this.router.navigate(['/dashboard/proyectos', projectId, firstView]);
          } else {
            this.router.navigate(['/dashboard/proyectos', projectId, 'resumen']);
          }
        } else {
          // Usuario normal: ir a resumen del proyecto
          this.router.navigate(['/dashboard/proyectos', projectId, 'resumen']);
        }
      } else if (proyectos.length > 1) {
        // Usuario con múltiples proyectos → Ir a reportes
        this.router.navigate(['/dashboard/proyectos/reportes']);
      }
    }
  }
}
