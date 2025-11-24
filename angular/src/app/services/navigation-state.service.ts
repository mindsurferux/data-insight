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
  // Dashboard (Módulos) siempre expandido por defecto
  // Proyectos y Vistas colapsados por defecto
  private dashboardCollapsed = signal<boolean>(false);
  private proyectosCollapsed = signal<boolean>(true);
  private vistasCollapsed = signal<boolean>(true);
  
  // Estado de lock: cuando está activo, los triggers no afectan el estado
  // Solo los botones de toggle pueden cambiar el estado
  private navigationLocked = signal<boolean>(false);

  // Exponer como readonly
  readonly dashboardState = this.dashboardCollapsed.asReadonly();
  readonly proyectosState = this.proyectosCollapsed.asReadonly();
  readonly vistasState = this.vistasCollapsed.asReadonly();
  readonly lockState = this.navigationLocked.asReadonly();

  /**
   * Toggle manual dashboard (botón expandir/colapsar)
   * INDEPENDIENTE de triggers - solo afecta su propio estado
   * Regla: Colapsa todo a la izquierda, expande todo a la derecha
   */
  toggleDashboard(): void {
    const newState = !this.dashboardCollapsed();
    this.dashboardCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande dashboard, expande todo a la derecha
      this.proyectosCollapsed.set(false);
      this.vistasCollapsed.set(false);
    }
    // Si se colapsa, no afecta a los demás
  }

  /**
   * Toggle manual proyectos (botón expandir/colapsar)
   * INDEPENDIENTE de triggers
   * Regla: Colapsa todo a la izquierda, expande todo a la derecha
   */
  toggleProyectos(): void {
    const newState = !this.proyectosCollapsed();
    this.proyectosCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande proyectos, colapsa izquierda y expande derecha
      this.dashboardCollapsed.set(true);    // Colapsa izquierda
      this.vistasCollapsed.set(false);      // Expande derecha
    }
    // Si se colapsa, no afecta a los demás
  }

  /**
   * Toggle manual vistas (botón expandir/colapsar)
   * INDEPENDIENTE de triggers
   * Regla: Colapsa todo a la izquierda, expande todo a la derecha
   */
  toggleVistas(): void {
    const newState = !this.vistasCollapsed();
    this.vistasCollapsed.set(newState);
    
    if (!newState) {
      // Si se expande vistas, colapsa todo a la izquierda
      this.dashboardCollapsed.set(true);    // Colapsa izquierda
      this.proyectosCollapsed.set(true);    // Colapsa izquierda
    }
    // Si se colapsa, no afecta a los demás
  }

  /**
   * Toggle del lock de navegación
   * Cuando está activo, los triggers no afectan el estado
   */
  toggleLock(): void {
    this.navigationLocked.set(!this.navigationLocked());
  }

  /**
   * Click en módulo NO-Proyectos (nivel 1):
   * - Expande Dashboard (Módulos)
   * - Colapsa Proyectos y Vistas
   * RESPETA EL LOCK: Si está bloqueado, no hace nada
   */
  onModuleClick(): void {
    if (this.navigationLocked()) return; // 🔒 Lock activo, ignorar trigger
    
    this.dashboardCollapsed.set(false);  // EXPANDE Dashboard
    this.proyectosCollapsed.set(true);   // COLAPSA Proyectos
    this.vistasCollapsed.set(true);      // COLAPSA Vistas
  }

  /**
   * Click en módulo Proyectos (nivel 1):
   * - Expande Dashboard (Módulos)
   * - Expande Proyectos (hijo)
   * - Colapsa Vistas
   * RESPETA EL LOCK: Si está bloqueado, no hace nada
   */
  onProyectosModuleLoad(): void {
    if (this.navigationLocked()) return; // 🔒 Lock activo, ignorar trigger
    
    this.dashboardCollapsed.set(false);  // EXPANDE Dashboard (actual)
    this.proyectosCollapsed.set(false);  // EXPANDE Proyectos (hijo)
    this.vistasCollapsed.set(true);      // COLAPSA Vistas
  }

  /**
   * Click en proyecto (nivel 2):
   * - Expande Proyectos (nivel actual)
   * - Expande Vistas (nivel hijo, para mostrar opciones)
   * - COLAPSA Módulos (nivel padre)
   * RESPETA EL LOCK: Si está bloqueado, no hace nada
   */
  onProjectClick(): void {
    if (this.navigationLocked()) return; // 🔒 Lock activo, ignorar trigger
    
    this.dashboardCollapsed.set(true);   // COLAPSA padre (Módulos)
    this.proyectosCollapsed.set(false);  // EXPANDE actual (Proyectos)
    this.vistasCollapsed.set(false);     // EXPANDE hijo (Vistas)
  }

  /**
   * Click en vista (nivel 3):
   * - Expande Vistas (nivel actual)
   * - COLAPSA Proyectos (nivel padre)
   * - COLAPSA Módulos (nivel abuelo)
   * RESPETA EL LOCK: Si está bloqueado, no hace nada
   */
  onViewClick(): void {
    if (this.navigationLocked()) return; // 🔒 Lock activo, ignorar trigger
    
    this.dashboardCollapsed.set(true);   // COLAPSA abuelo (Módulos)
    this.proyectosCollapsed.set(true);   // COLAPSA padre (Proyectos)
    this.vistasCollapsed.set(false);     // EXPANDE actual (Vistas)
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
