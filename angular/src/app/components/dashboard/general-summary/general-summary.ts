import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-summary',
  imports: [],
  templateUrl: './general-summary.html',
  styleUrl: './general-summary.css'
})
export class GeneralSummary {
  isHovered = false;

  constructor(private router: Router) {}

  openSummary(): void {
    // Por ahora redirige a una vista en construcción
    // En el futuro abrirá un modal o navegará a /dashboard/resumen
    alert('📊 Resumen General\n\nVista en construcción.\nAquí se mostrará un dashboard con métricas generales del sistema.');
  }
}
