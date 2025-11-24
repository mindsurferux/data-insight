import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proyecto-detalle',
  imports: [],
  templateUrl: './proyecto-detalle.html',
  styleUrl: './proyecto-detalle.css'
})
export class ProyectoDetalle implements OnInit {
  proyectoId: string = '';
  proyectoNombre: string = '';
  proyectoIcon: string = 'fas fa-project-diagram';
  
  private proyectos: any = {
    'web-corporativa': { nombre: 'Web Corporativa', icon: 'fas fa-globe' },
    'app-mobile': { nombre: 'App Mobile', icon: 'fas fa-mobile-alt' },
    'ecommerce': { nombre: 'E-Commerce', icon: 'fas fa-shopping-cart' },
    'crm-interno': { nombre: 'CRM Interno', icon: 'fas fa-users-cog' }
  };
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proyectoId = params['id'];
      const proyecto = this.proyectos[this.proyectoId];
      if (proyecto) {
        this.proyectoNombre = proyecto.nombre;
        this.proyectoIcon = proyecto.icon;
      } else {
        this.proyectoNombre = 'Proyecto Desconocido';
      }
    });
  }
}
