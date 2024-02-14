import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteGuard } from "../shared/route-guard";
import { RoleComponent } from "./role.component";
import { AdminroleComponent } from "../adminrole/adminrole.component";
import { UsersroleComponent } from "../usersrole/usersrole.component";


const routes:Routes = [
    {
        path: '',
        component: RoleComponent,
        children: [
         
          { path: '', redirectTo: 'adminrole', pathMatch: 'full' },
          {
            path: 'adminrole',
            component: AdminroleComponent,
            data: { roles: ['admin'] },
    
          },
          {
            path: 'userrole',
            component: UsersroleComponent,     
            canActivate: [RouteGuard],
            data: { roles: ['user'] },
          }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers: [RouteGuard]
})
export class RoleRoutingModule{

}