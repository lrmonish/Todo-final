import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TodosComponent } from './todos/todos.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApprainbowDirective } from './todos/apprainbow.directive';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ModalComponent } from './modal/modal.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MatSliderModule } from '@angular/material/slider';
import { RoleComponent } from './role/role.component';
import { UsersroleComponent } from './usersrole/usersrole.component';
import { AdminroleComponent } from './adminrole/adminrole.component';
import { AuthheaderComponent } from './authheader/authheader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TodosComponent,
    SignUpComponent,
    ApprainbowDirective,
    ModalComponent,
    AccountsComponent,
    RoleComponent,
    UsersroleComponent,
    AdminroleComponent,
    AuthheaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
