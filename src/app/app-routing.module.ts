import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './shared/route-guard';
import { ModalComponent } from './modal/modal.component';
import { RoleComponent } from './role/role.component';
import { AdminroleComponent } from './adminrole/adminrole.component';
import { UsersroleComponent } from './usersrole/usersrole.component';
import { AuthheaderComponent } from './authheader/authheader.component';
import { Custom404Component } from './custom404/custom404.component';
import { TodosRoutingModule } from './todos/todos-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountsRoutingModule } from './accounts/accounts-route.module';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  
  {path: '', component:HomeComponent},
  {path:'login', component:LoginComponent},
  // {path:'signup',loadChildren: () => SignupRoutingModule},
  {path:'signup', component:SignUpComponent},
  
  {path:'authhead',
   component:AuthheaderComponent,
   children:
   [
    { path: '', redirectTo: 'todos', pathMatch: 'full' },
    { path: 'todos', loadChildren: () => TodosRoutingModule },
    {path: 'deleteUser', component:ModalComponent,canActivate: [RouteGuard] },
    { path: 'accounts', loadChildren: () => AccountsRoutingModule },
    {
      path: 'role',
      component: RoleComponent,
      children: [
       
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
    },
   ]
  ,canActivate: [RouteGuard]
  },
  { path: '**', component: Custom404Component }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
