import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Catalogo } from './pages/catalogo/catalogo';
import { Login } from './pages/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { ResumenDashboard } from './modules/resumen/resumen-dashboard/resumen-dashboard';
import { ProyectosDashboard } from './modules/proyectos/proyectos-dashboard/proyectos-dashboard';
import { ReportesGenerales } from './modules/proyectos/reportes-generales/reportes-generales';
import { ProyectoDetalle } from './modules/proyectos/proyecto-detalle/proyecto-detalle';
import { Tareas } from './modules/proyectos/vistas/tareas/tareas';
import { Gantt } from './modules/proyectos/vistas/gantt/gantt';
import { Calendario } from './modules/proyectos/vistas/calendario/calendario';
import { Gastos } from './modules/proyectos/vistas/gastos/gastos';
import { Usuarios } from './modules/proyectos/vistas/usuarios/usuarios';
import { CmsDashboard } from './modules/cms/cms-dashboard/cms-dashboard';
import { CiberseguridadDashboard } from './modules/ciberseguridad/ciberseguridad-dashboard/ciberseguridad-dashboard';

export const routes: Routes = [
  // Rutas públicas
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'nosotros', component: Nosotros },
  { path: 'catalogo', component: Catalogo },
  { path: 'login', component: Login },
  
  // Dashboard (requiere autenticación)
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', component: ResumenDashboard },
      { 
        path: 'proyectos', 
        component: ProyectosDashboard,
        children: [
          { path: '', redirectTo: 'reportes', pathMatch: 'full' },
          { path: 'reportes', component: ReportesGenerales },
          { 
            path: ':id', 
            component: ProyectoDetalle,
            children: [
              { path: '', redirectTo: 'tareas', pathMatch: 'full' },
              { path: 'tareas', component: Tareas },
              { path: 'gantt', component: Gantt },
              { path: 'calendario', component: Calendario },
              { path: 'gastos', component: Gastos },
              { path: 'usuarios', component: Usuarios }
            ]
          }
        ]
      },
      { path: 'cms', component: CmsDashboard },
      { path: 'ciberseguridad', component: CiberseguridadDashboard }
    ]
  },
  
  // Wildcard
  { path: '**', redirectTo: '/home' }
];
