import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RoleComponent } from "./role.component";
import { UsersroleComponent } from "../usersrole/usersrole.component";
import { AdminroleComponent } from "../adminrole/adminrole.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


@NgModule
({
declarations:[
    RoleComponent,
    UsersroleComponent,
    AdminroleComponent,
],
imports:[
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule ,
    CommonModule
],
exports:[ 
    RoleComponent,
    UsersroleComponent,
    AdminroleComponent,
]

})
export class RoleModule {}