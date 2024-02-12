import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './shared/route-guard';
import { ModalComponent } from './modal/modal.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AdminRoleGuard } from './shared/adminrole-guard';
import { RoleComponent } from './role/role.component';
import { AdminroleComponent } from './adminrole/adminrole.component';
import { UsersroleComponent } from './usersrole/usersrole.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'todos',component: TodosComponent, canActivate:[RouteGuard]},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  {path: 'deleteUser', component:ModalComponent, canActivate:[RouteGuard]},
  {path: 'accounts',component: AccountsComponent,canActivate: [AdminRoleGuard]},
  {
    path: 'role',
    component: RoleComponent,
    children: [
      // Default route to redirect to `adminrole` for enhanced user experience
      { path: '', redirectTo: 'adminrole', pathMatch: 'full' },
      {
        path: 'adminrole',
        component: AdminroleComponent,
        canActivate: [RouteGuard],
        data: { roles: ['admin'] },

      },
      {
        path: 'userrole',
        component: UsersroleComponent,     
        canActivate: [RouteGuard],
        data: { roles: ['user'] },
      }
    ]
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
