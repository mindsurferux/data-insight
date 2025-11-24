import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectoNav } from '../proyecto-nav/proyecto-nav';

@Component({
  selector: 'app-proyectos-dashboard',
  imports: [RouterModule, ProyectoNav],
  templateUrl: './proyectos-dashboard.html',
  styleUrls: ['./proyectos-dashboard.css']
})
export class ProyectosDashboard {

}
