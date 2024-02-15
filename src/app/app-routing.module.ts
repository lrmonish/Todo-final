import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './shared/route-guard';
import { ModalComponent } from './modal/modal.component';
import { RoleComponent } from './role/role.component';
import { AdminroleComponent } from './adminrole/adminrole.component';
import { UsersroleComponent } from './usersrole/usersrole.component';
import { AuthheaderComponent } from './authheader/authheader.component';
import { Custom404Component } from './custom404/custom404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignupModule)},

  
  
  {path:'authhead',
   component:AuthheaderComponent,
   children:
   [
    { path: '', redirectTo: 'todos', pathMatch: 'full' },

    { path: 'todos', component:TodosComponent},

    {path: 'deleteUser', component:ModalComponent,canActivate: [RouteGuard] },
    { path: 'accounts', component:AccountsComponent },
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
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
