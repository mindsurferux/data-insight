import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrivilegesService } from '../../../services/privileges';
import { NavigationStateService } from '../../../services/navigation-state.service';
import { DashboardNavState } from '../services/dashboard-nav-state';
import { ModulePrivilege } from '../../../models/privileges.model';

@Component({
  selector: 'app-module-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './module-navigation.html',
  styleUrls: ['./module-navigation.css']
})
export class ModuleNavigation {
  isHovered: string | null = null;
  modules: ModulePrivilege[] = [];

  constructor(
    private privilegesService: PrivilegesService,
    private navigationStateService: NavigationStateService,
    public navState: DashboardNavState
  ) {
    // Cargar módulos disponibles según privilegios
    this.modules = this.privilegesService.getAvailableModules();
  }

  onModuleClick(): void {
    // Trigger: expande dashboard, colapsa proyectos y vistas
    this.navigationStateService.onModuleClick();
  }
}
