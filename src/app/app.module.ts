import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ModalComponent } from './modal/modal.component';
import { MatSliderModule } from '@angular/material/slider';
import { RoleComponent } from './role/role.component';
import { UsersroleComponent } from './usersrole/usersrole.component';
import { AdminroleComponent } from './adminrole/adminrole.component';
import { AuthheaderComponent } from './authheader/authheader.component';
import { Custom404Component } from './custom404/custom404.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ApprainbowDirective } from './todos/apprainbow.directive';
import { SignupModule } from './sign-up/sign-up.module';

import { TodosComponent } from './todos/todos.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ModalComponent,
    RoleComponent,
    UsersroleComponent,
    AdminroleComponent,
    AuthheaderComponent,
    Custom404Component,
    AccountsComponent,
    ApprainbowDirective,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    SignupModule , 
  ],
  providers: [
    provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
