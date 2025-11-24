import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  
  proyectos: Proyecto[] = [
    { id: 'web-corporativa', nombre: 'Web Corporativa', icon: 'fas fa-globe' },
    { id: 'app-mobile', nombre: 'App Mobile', icon: 'fas fa-mobile-alt' },
    { id: 'ecommerce', nombre: 'E-Commerce', icon: 'fas fa-shopping-cart' },
    { id: 'crm-interno', nombre: 'CRM Interno', icon: 'fas fa-users-cog' }
  ];
}
