import { FullComponent } from '../layouts/full/full.component';
import { ClientLayoutComponent } from '../layouts/client/client.component';
import { AdminRoutes } from './admin.routes';
import { ClientRoutes } from './client.routes';
import { Routes } from '@angular/router';
import { NotFoundComponent } from '../pages/ui-components/not-found/not-found.component';

export const AppRoutes: Routes = [
  {
    path: 'admin',
    component:  FullComponent,
    children: AdminRoutes
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: ClientRoutes
  }
];
