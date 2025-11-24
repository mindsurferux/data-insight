import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrivilegesService } from '../../../services/privileges';
import { ProjectPrivilege } from '../../../models/privileges.model';

@Component({
  selector: 'app-reportes-generales',
  imports: [CommonModule],
  templateUrl: './reportes-generales.html',
  styleUrl: './reportes-generales.css',
})
export class ReportesGenerales implements OnInit {
  proyectos: ProjectPrivilege[] = [];

  constructor(
    private privilegesService: PrivilegesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proyectos = this.privilegesService.getAvailableProjects();
  }

  navigateToProject(projectId: string): void {
    this.router.navigate(['/dashboard', 'proyectos', projectId, 'resumen']);
  }
}
