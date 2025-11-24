import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DashboardNavState } from '../services/dashboard-nav-state';

@Component({
  selector: 'app-module-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './module-navigation.html',
  styleUrls: ['./module-navigation.css']
})
export class ModuleNavigation {
  isHovered: string | null = null;

  constructor(
    private authService: AuthService,
    public navState: DashboardNavState
  ) {}

  hasPermission(module: 'proyectos' | 'cms' | 'ciberseguridad'): boolean {
    return this.authService.hasPermission(module);
  }
}
