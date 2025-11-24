import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Vista {
  id: string;
  nombre: string;
  icon: string;
}

@Component({
  selector: 'app-proyecto-vista-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './proyecto-vista-nav.html',
  styleUrls: ['./proyecto-vista-nav.css']
})
export class ProyectoVistaNav {
  isCollapsed = signal<boolean>(false);
  hoveredVista: string | null = null;
  
  vistas: Vista[] = [
    { id: 'tareas', nombre: 'Tareas', icon: 'fas fa-tasks' },
    { id: 'gantt', nombre: 'Gantt', icon: 'fas fa-chart-bar' },
    { id: 'calendario', nombre: 'Calendario', icon: 'fas fa-calendar-alt' },
    { id: 'gastos', nombre: 'Gastos', icon: 'fas fa-dollar-sign' },
    { id: 'usuarios', nombre: 'Usuarios', icon: 'fas fa-users' }
  ];
  
  toggle(): void {
    this.isCollapsed.set(!this.isCollapsed());
  }
}
