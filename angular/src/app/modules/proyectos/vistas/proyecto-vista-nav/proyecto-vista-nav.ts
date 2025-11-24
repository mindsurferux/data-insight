import { Component, computed, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivilegesService } from '../../../../services/privileges';
import { NavigationStateService } from '../../../../services/navigation-state.service';
import { ViewPrivilege } from '../../../../models/privileges.model';

@Component({
  selector: 'app-proyecto-vista-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-vista-nav.html',
  styleUrls: ['./proyecto-vista-nav.css']
})
export class ProyectoVistaNav implements OnInit, OnChanges {
  @Input() projectId: string = '';
  
  isCollapsed = computed(() => this.navStateService.vistasState());
  hoveredVista: string | null = null;
  isHeaderHovered: boolean = false;
  vistas: ViewPrivilege[] = [];
  projectName: string = '';
  projectIcon: string = 'fas fa-folder';
  
  constructor(
    private privilegesService: PrivilegesService,
    private navStateService: NavigationStateService
  ) {}
  
  ngOnInit(): void {
    this.loadProjectData();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].firstChange) {
      this.loadProjectData();
    }
  }
  
  private loadProjectData(): void {
    if (!this.projectId) {
      console.warn('ProyectoVistaNav - projectId no definido');
      return;
    }
    
    console.log('ProyectoVistaNav - Cargando datos para proyecto:', this.projectId);
    
    // Obtener información del proyecto
    const proyectos = this.privilegesService.getAvailableProjects();
    const proyecto = proyectos.find(p => p.id === this.projectId);
    
    if (proyecto) {
      this.projectName = proyecto.name;
      this.projectIcon = proyecto.icon;
      console.log('ProyectoVistaNav - Proyecto encontrado:', proyecto.name);
    } else {
      console.warn('ProyectoVistaNav - Proyecto no encontrado:', this.projectId);
    }
    
    // Cargar vistas disponibles según privilegios del proyecto
    // EXCLUIR "resumen" del listado (está asociado al header, no es vista operativa)
    const allViews = this.privilegesService.getAvailableViews(this.projectId);
    this.vistas = allViews.filter(v => v.id !== 'resumen');
    console.log('ProyectoVistaNav - Vistas operativas cargadas:', this.vistas.length, this.vistas);
  }
  
  toggle(): void {
    this.navStateService.toggleVistas();
  }

  onViewClick(): void {
    // Trigger: expande vistas, colapsa dashboard y proyectos
    this.navStateService.onViewClick();
  }
}
