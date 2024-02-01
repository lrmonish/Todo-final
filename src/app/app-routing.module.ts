import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TodosComponent } from './todos/todos.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RouteGuard } from './shared/route-guard';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'todos',component: TodosComponent, canActivate:[RouteGuard]},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  {path: 'deleteUser', component:ModalComponent, canActivate:[RouteGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
