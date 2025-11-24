export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: {
    proyectos: boolean;
    cms: boolean;
    ciberseguridad: boolean;
  };
}

export const MOCK_USERS: { [key: string]: User } = {
  'luis': {
    id: '1',
    name: 'Luis',
    email: 'luis@datainsight.com',
    role: 'admin',
    permissions: {
      proyectos: true,
      cms: true,
      ciberseguridad: true
    }
  },
  'ana': {
    id: '2',
    name: 'Ana',
    email: 'ana@datainsight.com',
    role: 'editor',
    permissions: {
      proyectos: true,
      cms: true,
      ciberseguridad: false
    }
  }
};
