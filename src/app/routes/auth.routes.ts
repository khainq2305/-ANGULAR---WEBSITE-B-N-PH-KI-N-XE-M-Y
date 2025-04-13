// src/app/routes/auth.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/client/Auth/login/login.component';
import { RegisterComponent } from '../pages/client/Auth/register/register.component';

export const AuthRoutes: Routes = [
  { path: 'dang-nhap', component: LoginComponent },
  { path: 'dang-ky', component: RegisterComponent }
];
