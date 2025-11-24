import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProyectoVistaNav } from '../vistas/proyecto-vista-nav/proyecto-vista-nav';
import { PrivilegesService } from '../../../services/privileges';
import { ProjectPrivilege } from '../../../models/privileges.model';

@Component({
  selector: 'app-proyecto-detalle',
  imports: [CommonModule, RouterModule, ProyectoVistaNav],
  templateUrl: './proyecto-detalle.html',
  styleUrls: ['./proyecto-detalle.css']
})
export class ProyectoDetalle implements OnInit {
  proyecto: ProjectPrivilege | null = null;
  projectId: string = '';

  constructor(
    private route: ActivatedRoute,
    private privilegesService: PrivilegesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      console.log('ProyectoDetalle - projectId:', this.projectId);
      
      // Obtener información del proyecto
      const proyectos = this.privilegesService.getAvailableProjects();
      this.proyecto = proyectos.find(p => p.id === this.projectId) || null;
      console.log('ProyectoDetalle - proyecto encontrado:', this.proyecto);
    });
  }
}
