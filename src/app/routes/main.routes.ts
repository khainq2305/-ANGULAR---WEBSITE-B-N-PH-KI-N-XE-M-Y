import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { ClientLayoutComponent } from '../layouts/client/client.component';
import { AuthLayoutComponent } from '../layouts/auth/auth.component'; // ✅ mới thêm
import { AdminRoutes } from './admin.routes';
import { ClientRoutes } from './client.routes';
import { AuthRoutes } from './auth.routes'; // ✅ mới thêm
import { NotFoundComponent } from '../pages/ui-components/not-found/not-found.component';

export const AppRoutes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    children: AdminRoutes
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: ClientRoutes
  },
  {
    path: '',
    component: AuthLayoutComponent, // ✅ layout riêng cho login/register/cart/checkout
    children: AuthRoutes
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
