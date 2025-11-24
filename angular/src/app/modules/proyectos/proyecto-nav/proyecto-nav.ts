import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProyectoNavState } from '../services/proyecto-nav-state';
import { PrivilegesService } from '../../../services/privileges';
import { ProjectPrivilege } from '../../../models/privileges.model';

@Component({
  selector: 'app-proyecto-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-nav.html',
  styleUrls: ['./proyecto-nav.css']
})
export class ProyectoNav implements OnInit {
  isHeaderHovered = false;
  hoveredProyecto: string | null = null;
  isCollapsed;
  
  proyectos: ProjectPrivilege[] = [];
  
  constructor(
    public navState: ProyectoNavState,
    private privilegesService: PrivilegesService,
    private router: Router
  ) {
    // Inicializar isCollapsed
    this.isCollapsed = this.navState.isCollapsed;
    
    // Cargar proyectos disponibles según privilegios
    this.proyectos = this.privilegesService.getAvailableProjects();
  }
  
  ngOnInit(): void {}
  
  onProyectoClick(): void {
    // El auto-collapse se maneja en el router subscription
  }
  
  toggleNav(): void {
    this.navState.toggle();
  }
}
