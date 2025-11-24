import { Component, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrivilegesService } from '../../../../services/privileges';
import { NavigationStateService } from '../../../../services/navigation-state.service';
import { ViewPrivilege } from '../../../../models/privileges.model';

@Component({
  selector: 'app-proyecto-vista-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-vista-nav.html',
  styleUrls: ['./proyecto-vista-nav.css']
})
export class ProyectoVistaNav implements OnInit {
  isCollapsed = computed(() => this.navStateService.vistasState());
  hoveredVista: string | null = null;
  isHeaderHovered: boolean = false;
  vistas: ViewPrivilege[] = [];
  projectId: string = '';
  projectName: string = '';
  projectIcon: string = 'fas fa-folder';
  
  constructor(
    private privilegesService: PrivilegesService,
    private navStateService: NavigationStateService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    // Obtener ID del proyecto desde la ruta
    this.route.parent?.params.subscribe(params => {
      this.projectId = params['id'];
      
      // Obtener información del proyecto
      const proyectos = this.privilegesService.getAvailableProjects();
      const proyecto = proyectos.find(p => p.id === this.projectId);
      
      if (proyecto) {
        this.projectName = proyecto.name;
        this.projectIcon = proyecto.icon;
      }
      
      // Cargar vistas disponibles según privilegios del proyecto
      this.vistas = this.privilegesService.getAvailableViews(this.projectId);
    });
  }
  
  toggle(): void {
    this.navStateService.toggleVistas();
  }

  onViewClick(): void {
    // Trigger: expande vistas, colapsa dashboard y proyectos
    this.navStateService.onViewClick();
  }
}
