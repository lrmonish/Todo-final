import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "../shared/route-guard";
import { AccountsComponent } from "./accounts.component";


const routes:Routes = [
    {path: '',component: AccountsComponent,canActivate: [RouteGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers: [RouteGuard]
})
export class AccountsRoutingModule{

}