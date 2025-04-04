import { FullComponent } from '../layouts/full/full.component';
import { ClientLayoutComponent } from '../layouts/client/client.component';
import { AdminRoutes } from './admin.routes';
import { ClientRoutes } from './client.routes';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  {
    path: 'admin',
    component:  FullComponent,
    children: AdminRoutes
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: ClientRoutes
  }
];
