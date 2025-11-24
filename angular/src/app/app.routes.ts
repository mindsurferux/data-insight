import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Catalogo } from './pages/catalogo/catalogo';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'nosotros', component: Nosotros },
  { path: 'catalogo', component: Catalogo },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '/home' }
];
