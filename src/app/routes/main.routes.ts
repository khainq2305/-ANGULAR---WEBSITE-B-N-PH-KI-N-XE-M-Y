import { Routes } from '@angular/router';
import { FullComponent } from '../layouts/full/full.component';
import { ClientLayoutComponent } from '../layouts/client/client.component';
import { AuthLayoutComponent } from '../layouts/auth/auth.component';
import { AdminRoutes } from './admin.routes';
import { ClientRoutes } from './client.routes';
import { AuthRoutes } from './auth.routes';
import { NotFoundComponent } from '../pages/ui-components/not-found/not-found.component';
import { AdminGuard } from '../guards/admin.guard'; // ✅ IMPORT GUARD
import { ThongTinComponent } from '../pages/client/account/thong-tin/thong-tin.component';
import { DonMuaComponent } from '../pages/client/account/don-mua/don-mua.component';
import { ClientAccountLayoutComponent } from '../layouts/client-account-layout/client-account-layout.component';



export const AppRoutes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AdminGuard],
    children: AdminRoutes,
  },
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      ...ClientRoutes,
      {
        path: 'tai-khoan',
        component: ClientAccountLayoutComponent,
        children: [
          { path: 'thong-tin', component: ThongTinComponent },
          { path: 'don-mua', component: DonMuaComponent },
          { path: '', redirectTo: 'thong-tin', pathMatch: 'full' },
        ],
      }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: AuthRoutes,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
