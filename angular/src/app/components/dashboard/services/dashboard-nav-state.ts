import { Injectable, computed } from '@angular/core';
import { NavigationStateService } from '../../../services/navigation-state.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardNavState {
  constructor(private navStateService: NavigationStateService) {}
  
  isCollapsed = computed(() => this.navStateService.dashboardState());
  
  toggle(): void {
    this.navStateService.toggleDashboard();
  }
  
  collapse(): void {
    // Implementado a través del servicio centralizado
  }
  
  expand(): void {
    // Implementado a través del servicio centralizado
  }
}
