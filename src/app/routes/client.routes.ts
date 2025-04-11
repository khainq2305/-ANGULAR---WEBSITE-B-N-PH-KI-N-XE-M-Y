import { Routes } from '@angular/router';

import { HomeComponent } from '../pages/client/home/home.component';
import { ProductComponent } from '../pages/client/product/product.component';
import { DetailComponent } from '../pages/client/product/detail/detail.component';

import { CategoriesComponent } from '../pages/client/categories/categories.component';
import { CartComponent } from '../pages/client/cart/cart.component';
import { PaymentComponent } from '../pages/client/payment/payment.component';
import { AboutComponent } from '../pages/client/about/about.component';
import { StoreComponent } from '../pages/client/store/store.component';
import { ContactComponent } from '../pages/client/contact/contact.component';
import { NewsComponent } from '../pages/client/news/news.component';
import { LoginComponent } from '../pages/client/Auth/login/login.component';
import { RegisterComponent } from '../pages/client/Auth/register/register.component';  // Import RegisterComponent

export const ClientRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'san-pham', component: ProductComponent },
  { path: 'san-pham/:id', component: DetailComponent }
,
  { path: 'chi-tiet-san-pham/:id', component: DetailComponent },
  { path: 'danh-muc', component: CategoriesComponent },
  { path: 'gio-hang', component: CartComponent },
  { path: 'thanh-toan', component: PaymentComponent },
  { path: 'gioi-thieu', component: AboutComponent },
  { path: 'cua-hang', component: StoreComponent },
  { path: 'lien-he', component: ContactComponent },
  { path: 'tin-tuc', component: NewsComponent },
  { path: 'dang-nhap', component: LoginComponent },
  { path: 'dang-ky', component: RegisterComponent }  // Thêm route đăng ký
];
