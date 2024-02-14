import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AccountsComponent } from "./accounts.component";
import { AccountsRoutingModule } from "./accounts-route.module";


@NgModule
({
declarations:[
   AccountsComponent
],
imports:[
    BrowserModule,
    AccountsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
],
exports:[
    AccountsComponent
]

})
export class AccountsModule {}