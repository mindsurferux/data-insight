import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardNavState } from '../services/dashboard-nav-state';
import { NavigationStateService } from '../../../services/navigation-state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrls: ['./dashboard-header.css']
})
export class DashboardHeader {
  isHovered = false;
  
  constructor(
    public navState: DashboardNavState,
    private navigationStateService: NavigationStateService
  ) {}

  onHeaderClick(): void {
    // Trigger: Expande Dashboard, colapsa Proyectos y Vistas
    this.navigationStateService.onModuleClick();
  }
}
