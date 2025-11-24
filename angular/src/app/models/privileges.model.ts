// Modelo de privilegios por módulo, proyecto y vista

export interface ModulePrivilege {
  id: string;
  name: string;
  icon: string;
  canView: boolean;
  canEdit: boolean;
  order: number; // Orden de visualización
  isDefault?: boolean; // Módulo de aterrizaje
}

export interface ProjectPrivilege {
  id: string;
  name: string;
  icon: string;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  order: number; // Orden de visualización
}

export interface ViewPrivilege {
  id: string;
  name: string;
  icon: string;
  canView: boolean;
  canEdit: boolean;
  order: number;
  isDefault?: boolean; // Vista por defecto al entrar al proyecto
}

export interface UserPrivileges {
  userId: string;
  userName: string;
  role: 'admin' | 'stakeholder' | 'viewer' | 'editor' | 'member' | 'dev';
  
  // Módulos disponibles
  modules: ModulePrivilege[];
  
  // Proyectos asignados con sus privilegios
  projects: {
    [projectId: string]: {
      project: ProjectPrivilege;
      views: ViewPrivilege[];
    };
  };
  
  // Configuración de landing
  landing: {
    module: string; // ID del módulo de aterrizaje
    project?: string; // ID del proyecto (si aplica)
    view?: string; // ID de la vista (si aplica)
  };
  
  // Comportamiento especial
  skipModuleResumen?: boolean; // Stakeholders saltan vista resumen de módulo
  skipProjectResumen?: boolean; // Usuarios con 1 proyecto saltan vista resumen de proyecto
}

// Mock data de privilegios
export const MOCK_PRIVILEGES: { [userId: string]: UserPrivileges } = {
  'luis': {
    userId: 'luis',
    userName: 'Luis',
    role: 'stakeholder',
    
    modules: [
      {
        id: 'ciberseguridad',
        name: 'Ciberseguridad',
        icon: 'fas fa-shield-alt',
        canView: true,
        canEdit: false,
        isDefault: true,
        order: 0
      },
      {
        id: 'proyectos',
        name: 'Proyectos',
        icon: 'fas fa-project-diagram',
        canView: true,
        canEdit: false,
        order: 1
      }
    ],
    
    projects: {
      'crm-interno': {
        project: {
          id: 'crm-interno',
          name: 'CRM Interno',
          icon: 'fas fa-users-cog',
          canView: true,
          canEdit: true,
          canDelete: true,
          order: 1
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: true,
            order: 0,
            isDefault: true // Vista por defecto
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: true,
            order: 1
          },
          {
            id: 'gantt',
            name: 'Gantt',
            icon: 'fas fa-chart-bar',
            canView: true,
            canEdit: true,
            order: 2
          },
          {
            id: 'calendario',
            name: 'Calendario',
            icon: 'fas fa-calendar-alt',
            canView: true,
            canEdit: true,
            order: 3
          },
          {
            id: 'gastos',
            name: 'Gastos',
            icon: 'fas fa-dollar-sign',
            canView: true,
            canEdit: true,
            order: 4
          },
          {
            id: 'usuarios',
            name: 'Usuarios',
            icon: 'fas fa-users',
            canView: true,
            canEdit: true,
            order: 5
          }
        ]
      }
    },
    
    landing: {
      module: 'ciberseguridad', // Luis aterriza en Ciberseguridad
      project: 'crm-interno' // Luis tiene 1 solo proyecto
    },
    
    skipModuleResumen: true, // Stakeholder salta vista resumen de módulo
    skipProjectResumen: true // Usuario con 1 proyecto salta vista resumen de proyecto
  },
  
  'ana': {
    userId: 'ana',
    userName: 'Ana',
    role: 'stakeholder',
    
    modules: [
      {
        id: 'proyectos',
        name: 'Proyectos',
        icon: 'fas fa-project-diagram',
        canView: true,
        canEdit: false,
        order: 0,
        isDefault: true // Ana aterriza aquí
      },
      {
        id: 'cms',
        name: 'CMS',
        icon: 'fas fa-edit',
        canView: true,
        canEdit: true,
        order: 1
      }
    ],
    
    projects: {
      'web-corporativa': {
        project: {
          id: 'web-corporativa',
          name: 'Web Corporativa',
          icon: 'fas fa-globe',
          canView: true,
          canEdit: false,
          canDelete: false,
          order: 1
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: false,
            order: 0,
            isDefault: true
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: false,
            order: 1
          },
          {
            id: 'gantt',
            name: 'Gantt',
            icon: 'fas fa-chart-bar',
            canView: true,
            canEdit: false,
            order: 2
          },
          {
            id: 'calendario',
            name: 'Calendario',
            icon: 'fas fa-calendar-alt',
            canView: true,
            canEdit: false,
            order: 3
          }
          // Ana NO tiene acceso a Gastos ni Usuarios
        ]
      },
      'app-mobile': {
        project: {
          id: 'app-mobile',
          name: 'App Mobile',
          icon: 'fas fa-mobile-alt',
          canView: true,
          canEdit: false,
          canDelete: false,
          order: 2
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: false,
            order: 0,
            isDefault: true
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: false,
            order: 1
          },
          {
            id: 'calendario',
            name: 'Calendario',
            icon: 'fas fa-calendar-alt',
            canView: true,
            canEdit: false,
            order: 2
          }
          // Ana NO tiene acceso a Gantt, Gastos ni Usuarios en este proyecto
        ]
      },
      'ecommerce': {
        project: {
          id: 'ecommerce',
          name: 'E-Commerce',
          icon: 'fas fa-shopping-cart',
          canView: true,
          canEdit: false,
          canDelete: false,
          order: 3
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: false,
            order: 0,
            isDefault: true
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: false,
            order: 1
          }
          // Ana solo tiene acceso limitado a este proyecto
        ]
      },
      'crm-interno': {
        project: {
          id: 'crm-interno',
          name: 'CRM Interno',
          icon: 'fas fa-users-cog',
          canView: true,
          canEdit: false,
          canDelete: false,
          order: 4
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: false,
            order: 0,
            isDefault: true
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: false,
            order: 1
          },
          {
            id: 'gantt',
            name: 'Gantt',
            icon: 'fas fa-chart-bar',
            canView: true,
            canEdit: false,
            order: 2
          }
        ]
      }
    },
    
    landing: {
      module: 'proyectos', // Ana aterriza en Proyectos
      project: 'reportes' // Va a reportes generales (tiene múltiples proyectos)
    },
    
    skipModuleResumen: true // Stakeholder salta vista resumen de módulo
  },
  
  'jorge': {
    userId: 'jorge',
    userName: 'Jorge',
    role: 'dev', // Usuario dev - flujo default (NO stakeholder)
    
    modules: [
      {
        id: 'proyectos',
        name: 'Proyectos',
        icon: 'fas fa-project-diagram',
        canView: true,
        canEdit: true,
        order: 0,
        isDefault: true
      },
      {
        id: 'cms',
        name: 'CMS',
        icon: 'fas fa-edit',
        canView: true,
        canEdit: true,
        order: 1
      },
      {
        id: 'ciberseguridad',
        name: 'Ciberseguridad',
        icon: 'fas fa-shield-alt',
        canView: true,
        canEdit: false,
        order: 2
      }
    ],
    
    projects: {
      'crm-interno': {
        project: {
          id: 'crm-interno',
          name: 'CRM Interno',
          icon: 'fas fa-users-cog',
          canView: true,
          canEdit: true,
          canDelete: false,
          order: 0
        },
        views: [
          {
            id: 'resumen',
            name: 'Resumen',
            icon: 'fas fa-chart-pie',
            canView: true,
            canEdit: false,
            order: 0,
            isDefault: true
          },
          {
            id: 'tareas',
            name: 'Tareas',
            icon: 'fas fa-tasks',
            canView: true,
            canEdit: true,
            order: 1
          },
          {
            id: 'gantt',
            name: 'Gantt',
            icon: 'fas fa-chart-bar',
            canView: true,
            canEdit: true,
            order: 2
          },
          {
            id: 'calendario',
            name: 'Calendario',
            icon: 'fas fa-calendar-alt',
            canView: true,
            canEdit: true,
            order: 3
          },
          {
            id: 'gastos',
            name: 'Gastos',
            icon: 'fas fa-dollar-sign',
            canView: true,
            canEdit: true,
            order: 4
          },
          {
            id: 'usuarios',
            name: 'Usuarios',
            icon: 'fas fa-users',
            canView: true,
            canEdit: true,
            order: 5
          }
        ]
      }
    },
    
    landing: {
      module: 'proyectos',
      project: 'crm-interno'
    }
    
    // Jorge NO tiene skipModuleResumen ni skipProjectResumen
    // Verá las vistas resumen por defecto (flujo normal)
  }
};
