import { Routes } from '@angular/router';
import { StarterComponent } from '../pages/starter/starter.component';

// ===== CATEGORY =====
import { ListComponent } from '../pages/ui-components/category/list/list.component';
import { AddComponent } from '../pages/ui-components/category/add/add.component';
import { EditComponent } from '../pages/ui-components/category/edit/edit.component';
import { DeleteComponent } from '../pages/ui-components/category/delete/delete.component';

// ===== PRODUCT =====
import { ProductListComponent } from '../pages/ui-components/product/product-list/product-list.component';
import { ProductCreateComponent } from '../pages/ui-components/product/product-create/product-create.component';
import { ProductEditComponent } from '../pages/ui-components/product/product-edit/product-edit.component';
import { DeletedProductsComponent } from '../pages/ui-components/product/deleted-products/deleted-products.component';

// ===== USER =====
import { UserCreateComponent } from '../pages/ui-components/user/user-create/user-create.component';
import { UserListComponent } from '../pages/ui-components/user/user-list/user-list.component';

// ===== ORDER =====
import { OrderListComponent } from '../pages/ui-components/order/order-list/order-list.component';
import { OrderDetailComponent } from '../pages/ui-components/order/order-detail/order-detail.component';

// ===== CONTACT =====
import { ContactListComponent } from '../pages/ui-components/contact/contact-list/contact-list.component';

// ===== COMMENT =====
import { CommentComponent } from '../pages/ui-components/comment/comment-list/comment.component';
import { CommentDetailComponent } from '../pages/ui-components/comment/comment-detail/comment-detail.component';
import { NotFoundComponent } from '../pages/ui-components/not-found/not-found.component';

export const AdminRoutes: Routes = [
    {
        path: 'dashboard',
        component: StarterComponent,
        data: {
          title: 'Starter Page',
          urls: [
            { title: 'Dashboard', url: '/admin/dashboard' },
            { title: 'Starter Page' },
          ],
        },
      },
  {
    path: 'ui-components',
    children: [
     
      {
        path: 'category',
        children: [
          { path: 'list', component: ListComponent },
          { path: 'add', component: AddComponent },
          { path: 'edit/:id', component: EditComponent },
          { path: 'delete', component: DeleteComponent },
        ]
      },

      // PRODUCT
      {
        path: 'product',
        children: [
          { path: 'product-list', component: ProductListComponent },
          { path: 'product-create', component: ProductCreateComponent },
          { path: 'product-edit/:id', component: ProductEditComponent }, // ✅ thêm :id
          { path: 'deleted-products', component: DeletedProductsComponent },
        ]
      },

      // USER
      {
        path: 'user',
        children: [
          { path: 'user-list', component: UserListComponent },
          { path: 'user-create', component: UserCreateComponent },
        ]
      },

      // ORDER
      {
        path: 'order',
        children: [
          { path: 'order-list', component: OrderListComponent },
          { path: 'order-detail/:id', component: OrderDetailComponent },
        ]
      },

      // CONTACT
      {
        path: 'contact',
        children: [
          { path: 'contact-list', component: ContactListComponent },
        ]
      },

      // COMMENT
      {
        path: 'comment',
        children: [
          { path: 'comment-list', component: CommentComponent },
          { path: 'comment-detail/:id', component: CommentDetailComponent },
        ]
      },
      { path: '**', component: NotFoundComponent }

    ]
  }
];
