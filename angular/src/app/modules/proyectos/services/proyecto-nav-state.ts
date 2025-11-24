import { Injectable, computed } from '@angular/core';
import { NavigationStateService } from '../../../services/navigation-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoNavState {
  constructor(private navStateService: NavigationStateService) {}
  
  isCollapsed = computed(() => this.navStateService.proyectosState());
  
  toggle(): void {
    this.navStateService.toggleProyectos();
  }
  
  collapse(): void {
    // Implementado a través del servicio centralizado
  }
  
  expand(): void {
    // Implementado a través del servicio centralizado
  }
}
