export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'stakeholder' | 'editor' | 'viewer';
  permissions: string[];
  proyectosAsignados?: string[]; // IDs de proyectos asignados
}

// Mock users para desarrollo
export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Luis',
    email: 'luis@datainsight.com',
    role: 'admin',
    permissions: ['ciberseguridad', 'proyectos', 'cms'],
    proyectosAsignados: ['crm-interno'] // Solo 1 proyecto
  },
  {
    id: 2,
    name: 'Ana',
    email: 'ana@datainsight.com',
    role: 'stakeholder',
    permissions: ['proyectos', 'cms'],
    proyectosAsignados: ['web-corporativa', 'app-mobile', 'ecommerce', 'crm-interno'] // Múltiples proyectos
  }
];
