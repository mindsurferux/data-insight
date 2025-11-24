import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PrivilegesService } from '../../../../services/privileges';
import { ViewPrivilege } from '../../../../models/privileges.model';

@Component({
  selector: 'app-proyecto-vista-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-vista-nav.html',
  styleUrls: ['./proyecto-vista-nav.css']
})
export class ProyectoVistaNav implements OnInit {
  isCollapsed = signal<boolean>(false);
  hoveredVista: string | null = null;
  isHeaderHovered: boolean = false;
  vistas: ViewPrivilege[] = [];
  projectId: string = '';
  projectName: string = '';
  projectIcon: string = 'fas fa-folder';
  
  constructor(
    private privilegesService: PrivilegesService,
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
    this.isCollapsed.set(!this.isCollapsed());
  }
}
