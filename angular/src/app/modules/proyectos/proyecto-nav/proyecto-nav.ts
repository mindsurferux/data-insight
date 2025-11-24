import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { ProyectoNavState } from '../services/proyecto-nav-state';
import { AuthService } from '../../../services/auth.service';
import { filter } from 'rxjs/operators';

interface Proyecto {
  id: string;
  nombre: string;
  icon: string;
}

@Component({
  selector: 'app-proyecto-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-nav.html',
  styleUrls: ['./proyecto-nav.css']
})
export class ProyectoNav {
  isHeaderHovered = false;
  hoveredProyecto: string | null = null;
  isCollapsed;
  
  todosLosProyectos: Proyecto[] = [
    { id: 'web-corporativa', nombre: 'Web Corporativa', icon: 'fas fa-globe' },
    { id: 'app-mobile', nombre: 'App Mobile', icon: 'fas fa-mobile-alt' },
    { id: 'ecommerce', nombre: 'E-Commerce', icon: 'fas fa-shopping-cart' },
    { id: 'crm-interno', nombre: 'CRM Interno', icon: 'fas fa-users-cog' }
  ];
  
  proyectos: Proyecto[] = [];
  
  constructor(
    public navState: ProyectoNavState,
    private router: Router,
    private authService: AuthService
  ) {
    // Inicializar isCollapsed
    this.isCollapsed = this.navState.isCollapsed;
    
    // Filtrar proyectos según usuario
    const user = this.authService.currentUser();
    const proyectosAsignados = user?.proyectosAsignados || [];
    
    this.proyectos = this.todosLosProyectos.filter(p => 
      proyectosAsignados.includes(p.id)
    );
    
    // Auto-collapse cuando se navega a un proyecto hijo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.url;
      // Si la URL contiene un ID de proyecto (no es /reportes), colapsar
      const isProyectoDetalle = this.proyectos.some(p => url.includes(`/proyectos/${p.id}`));
      if (isProyectoDetalle) {
        this.navState.collapse();
      }
    });
  }
  
  onProyectoClick(): void {
    // El auto-collapse se maneja en el router subscription
  }
  
  toggleNav(): void {
    this.navState.toggle();
  }
}
