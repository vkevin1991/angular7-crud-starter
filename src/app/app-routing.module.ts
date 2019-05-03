import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AuthGuard } from './guards/auth-guard.service';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-post',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'list-post',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/create',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:id',
    component: EditCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
