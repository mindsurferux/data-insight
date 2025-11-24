import { Injectable, signal } from '@angular/core';

/**
 * Servicio centralizado para manejar el estado de expansión/colapso
 * de todas las barras de navegación
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  // Estados de cada nivel de navegación
  private dashboardCollapsed = signal<boolean>(false);
  private proyectosCollapsed = signal<boolean>(false);
  private vistasCollapsed = signal<boolean>(false);

  // Exponer como readonly
  readonly dashboardState = this.dashboardCollapsed.asReadonly();
  readonly proyectosState = this.proyectosCollapsed.asReadonly();
  readonly vistasState = this.vistasCollapsed.asReadonly();

  /**
   * Expandir/colapsar dashboard (nivel 1)
   * Cuando se expande dashboard, colapsa proyectos y vistas
   */
  toggleDashboard(): void {
    const newState = !this.dashboardCollapsed();
    this.dashboardCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande dashboard, colapsar hijos
      this.proyectosCollapsed.set(true);
      this.vistasCollapsed.set(true);
    }
  }

  /**
   * Expandir/colapsar proyectos (nivel 2)
   * Cuando se expande proyectos, colapsa dashboard (padre) y vistas (hijo)
   */
  toggleProyectos(): void {
    const newState = !this.proyectosCollapsed();
    this.proyectosCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande proyectos, colapsar padre e hijo
      this.dashboardCollapsed.set(true);
      this.vistasCollapsed.set(true);
    }
  }

  /**
   * Expandir/colapsar vistas (nivel 3)
   * Cuando se expande vistas, colapsa dashboard y proyectos (padres)
   */
  toggleVistas(): void {
    const newState = !this.vistasCollapsed();
    this.vistasCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande vistas, colapsar padres
      this.dashboardCollapsed.set(true);
      this.proyectosCollapsed.set(true);
    }
  }

  /**
   * Click en módulo: expande dashboard, colapsa proyectos y vistas
   */
  onModuleClick(): void {
    this.dashboardCollapsed.set(false);
    this.proyectosCollapsed.set(true);
    this.vistasCollapsed.set(true);
  }

  /**
   * Click en proyecto: expande proyectos y vistas, colapsa dashboard
   */
  onProjectClick(): void {
    this.dashboardCollapsed.set(true);
    this.proyectosCollapsed.set(false);
    this.vistasCollapsed.set(false);
  }

  /**
   * Click en vista: expande vistas, colapsa dashboard y proyectos
   */
  onViewClick(): void {
    this.dashboardCollapsed.set(true);
    this.proyectosCollapsed.set(true);
    this.vistasCollapsed.set(false);
  }

  /**
   * Resetear todos los estados
   */
  reset(): void {
    this.dashboardCollapsed.set(false);
    this.proyectosCollapsed.set(false);
    this.vistasCollapsed.set(false);
  }

  /**
   * Obtener estado actual de dashboard
   */
  isDashboardCollapsed(): boolean {
    return this.dashboardCollapsed();
  }

  /**
   * Obtener estado actual de proyectos
   */
  isProyectosCollapsed(): boolean {
    return this.proyectosCollapsed();
  }

  /**
   * Obtener estado actual de vistas
   */
  isVistasCollapsed(): boolean {
    return this.vistasCollapsed();
  }
}
