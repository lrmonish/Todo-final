import { NgModule } from "@angular/core";
import { TodosComponent } from "./todos.component";
import { ApprainbowDirective } from "./apprainbow.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodosRoutingModule } from "./todos-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


@NgModule
({
declarations:[
    TodosComponent,
    ApprainbowDirective 
],
imports:[
    BrowserModule,
    TodosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
],
exports:[
    TodosComponent,
    ApprainbowDirective 
]

})
export class TodosModule {}