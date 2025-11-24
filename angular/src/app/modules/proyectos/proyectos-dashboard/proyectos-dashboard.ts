import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProyectoNav } from '../proyecto-nav/proyecto-nav';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-proyectos-dashboard',
  imports: [RouterModule, ProyectoNav],
  templateUrl: './proyectos-dashboard.html',
  styleUrls: ['./proyectos-dashboard.css']
})
export class ProyectosDashboard {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Redirect condicional según proyectos asignados
    const user = this.authService.currentUser();
    if (user && this.router.url === '/dashboard/proyectos') {
      const proyectosAsignados = user.proyectosAsignados || [];
      
      if (proyectosAsignados.length === 1) {
        // Usuario con 1 solo proyecto → Ir directo al proyecto
        this.router.navigate(['/dashboard/proyectos', proyectosAsignados[0]]);
      } else {
        // Usuario con múltiples proyectos → Ir a reportes
        this.router.navigate(['/dashboard/proyectos/reportes']);
      }
    }
  }
}
