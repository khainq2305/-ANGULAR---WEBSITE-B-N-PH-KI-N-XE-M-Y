import { Routes } from '@angular/router';
import { ListComponent } from './category/list/list.component';
import { AddComponent } from './category/add/add.component';
import { EditComponent } from './category/edit/edit.component';
// ui

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
      {
        path: 'category/list',
        component: ListComponent,
      },
      {
        path: 'category/add',
        component: AddComponent,
      },
      {
        path: 'category/edit/:id',
        component: EditComponent,
      },
    ],
  },
];
