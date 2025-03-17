import { Routes } from '@angular/router';

// ui
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
// Import các component Product
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import {DeletedProductsComponent } from './product/deleted-products/deleted-products.component'; // 🔥 Thêm component này
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tables',
        component: AppTablesComponent,
      },
      // Route cho Product
      {
        path: 'product/product-list',
        component: ProductListComponent,
      },
      {
        path: 'product/product-create',
        component: ProductCreateComponent,
      },
      {
        path: 'product/product-edit',
        component: ProductEditComponent,
      },
      {
        path: 'product/deleted-products',  
        component: DeletedProductsComponent,
      },
      { path: 'user/user-create', component: UserCreateComponent },
      { path: 'user/user-list', component: UserListComponent },
      
    ],
  },
];
