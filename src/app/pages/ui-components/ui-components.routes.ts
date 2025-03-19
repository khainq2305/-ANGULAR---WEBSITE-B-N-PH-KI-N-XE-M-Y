import { Routes } from '@angular/router';
import { ListComponent } from './category/list/list.component';
import { AddComponent } from './category/add/add.component';
import { EditComponent } from './category/edit/edit.component';
import { DeleteComponent } from './category/delete/delete.component'
// Import các component Product
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { DeletedProductsComponent } from './product/deleted-products/deleted-products.component';
// user
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserListComponent } from './user/user-list/user-list.component';
// order
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
// 📌 Import Contact List Component
import { ContactListComponent } from './contact/contact-list/contact-list.component';

import { CommentComponent } from './comment/comment-list/comment.component';
import { CommentDetailComponent } from './comment/comment-detail/comment-detail.component';

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
      {
        path: 'category/delete',  
        component: DeleteComponent,
      },
      {
        path: 'order/order-list',
        component: OrderListComponent,
      },
      {
        path: 'order/order-detail/:id', // 🔥 Truyền ID đơn hàng
        component: OrderDetailComponent,
      },
      {
        path: 'contact/contact-list',
        component: ContactListComponent,
      },
      { path: 'comment/comment-list', component: CommentComponent },
      { path: 'comment/comment-detail/:id', component: CommentDetailComponent },
    ],
  },
];
