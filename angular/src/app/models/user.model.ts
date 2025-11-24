export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'stakeholder' | 'editor' | 'viewer' | 'dev';
  permissions: string[];
  proyectosAsignados?: string[]; // IDs de proyectos asignados
}

// Mock users para desarrollo
export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Luis',
    email: 'luis@datainsight.com',
    role: 'stakeholder', // Luis es stakeholder
    permissions: ['ciberseguridad', 'proyectos', 'cms'],
    proyectosAsignados: ['crm-interno'] // Solo 1 proyecto
  },
  {
    id: 2,
    name: 'Ana',
    email: 'ana@datainsight.com',
    role: 'stakeholder', // Ana es stakeholder
    permissions: ['proyectos', 'cms'],
    proyectosAsignados: ['web-corporativa', 'app-mobile', 'ecommerce', 'crm-interno'] // Múltiples proyectos
  },
  {
    id: 3,
    name: 'Jorge',
    email: 'jorge@datainsight.com',
    role: 'dev', // Jorge es dev (NO stakeholder)
    permissions: ['proyectos', 'cms', 'ciberseguridad'],
    proyectosAsignados: ['crm-interno'] // Solo 1 proyecto pero flujo normal
  }
];
