import { Injectable, signal, computed } from '@angular/core';
import { 
  UserPrivileges, 
  ModulePrivilege, 
  ProjectPrivilege, 
  ViewPrivilege,
  MOCK_PRIVILEGES 
} from '../models/privileges.model';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {
  private currentUserPrivileges = signal<UserPrivileges | null>(null);

  constructor() {}

  // Cargar privilegios del usuario
  loadUserPrivileges(userId: string): void {
    const privileges = MOCK_PRIVILEGES[userId];
    if (privileges) {
      this.currentUserPrivileges.set(privileges);
    }
  }

  // Obtener privilegios actuales
  getUserPrivileges() {
    return this.currentUserPrivileges();
  }

  // Obtener módulos disponibles
  getAvailableModules(): ModulePrivilege[] {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return [];
    return privileges.modules.sort((a, b) => a.order - b.order);
  }

  // Obtener módulo de aterrizaje
  getLandingModule(): string {
    const privileges = this.currentUserPrivileges();
    return privileges?.landing.module || 'resumen';
  }

  // Obtener proyecto de aterrizaje (si aplica)
  getLandingProject(): string | undefined {
    const privileges = this.currentUserPrivileges();
    return privileges?.landing.project;
  }

  // Obtener vista de aterrizaje (si aplica)
  getLandingView(): string | undefined {
    const privileges = this.currentUserPrivileges();
    return privileges?.landing.view;
  }

  // Verificar acceso a módulo
  canAccessModule(moduleId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const module = privileges.modules.find(m => m.id === moduleId);
    return module?.canView || false;
  }

  // Verificar edición de módulo
  canEditModule(moduleId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const module = privileges.modules.find(m => m.id === moduleId);
    return module?.canEdit || false;
  }

  // Obtener proyectos disponibles
  getAvailableProjects(): ProjectPrivilege[] {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return [];
    
    return Object.values(privileges.projects)
      .map(p => p.project)
      .sort((a, b) => a.order - b.order);
  }

  // Verificar acceso a proyecto
  canAccessProject(projectId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const project = privileges.projects[projectId];
    return project?.project.canView || false;
  }

  // Verificar edición de proyecto
  canEditProject(projectId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const project = privileges.projects[projectId];
    return project?.project.canEdit || false;
  }

  // Verificar eliminación de proyecto
  canDeleteProject(projectId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const project = privileges.projects[projectId];
    return project?.project.canDelete || false;
  }

  // Obtener vistas disponibles para un proyecto
  getAvailableViews(projectId: string): ViewPrivilege[] {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return [];
    
    const project = privileges.projects[projectId];
    if (!project) return [];
    
    return project.views.sort((a, b) => a.order - b.order);
  }

  // Obtener vista por defecto de un proyecto
  getDefaultView(projectId: string): string {
    const views = this.getAvailableViews(projectId);
    const defaultView = views.find(v => v.isDefault);
    return defaultView?.id || views[0]?.id || 'resumen';
  }

  // Verificar acceso a vista
  canAccessView(projectId: string, viewId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const project = privileges.projects[projectId];
    if (!project) return false;
    
    const view = project.views.find(v => v.id === viewId);
    return view?.canView || false;
  }

  // Verificar edición de vista
  canEditView(projectId: string, viewId: string): boolean {
    const privileges = this.currentUserPrivileges();
    if (!privileges) return false;
    
    const project = privileges.projects[projectId];
    if (!project) return false;
    
    const view = project.views.find(v => v.id === viewId);
    return view?.canEdit || false;
  }

  // Verificar si debe saltar vista resumen de módulo
  shouldSkipModuleResumen(): boolean {
    const privileges = this.currentUserPrivileges();
    return privileges?.skipModuleResumen || false;
  }

  // Verificar si debe saltar vista resumen de proyecto
  shouldSkipProjectResumen(): boolean {
    const privileges = this.currentUserPrivileges();
    return privileges?.skipProjectResumen || false;
  }

  // Obtener primera vista disponible (no resumen) de un proyecto
  getFirstNonResumenView(projectId: string): string | null {
    const views = this.getAvailableViews(projectId);
    const nonResumenView = views.find(v => v.id !== 'resumen');
    return nonResumenView?.id || null;
  }

  // Obtener primer módulo disponible (según order)
  getFirstModule(): ModulePrivilege | null {
    const modules = this.getAvailableModules();
    return modules.length > 0 ? modules[0] : null;
  }

  // Limpiar privilegios (logout)
  clearPrivileges(): void {
    this.currentUserPrivileges.set(null);
  }
}
