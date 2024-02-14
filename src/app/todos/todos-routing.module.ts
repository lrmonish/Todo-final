import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodosComponent } from "./todos.component";
import { RouteGuard } from "../shared/route-guard";


const routes:Routes = [
    { path: '', component: TodosComponent, canActivate: [RouteGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers: [RouteGuard]
})
export class TodosRoutingModule{

}