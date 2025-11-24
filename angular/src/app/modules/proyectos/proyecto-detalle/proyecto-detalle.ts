import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectoVistaNav } from '../vistas/proyecto-vista-nav/proyecto-vista-nav';

@Component({
  selector: 'app-proyecto-detalle',
  imports: [RouterModule, ProyectoVistaNav],
  templateUrl: './proyecto-detalle.html',
  styleUrl: './proyecto-detalle.css'
})
export class ProyectoDetalle {}
