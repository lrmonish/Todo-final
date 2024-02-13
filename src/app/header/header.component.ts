import { AfterViewChecked, Component} from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
 
 

  // userAuthenticated = false;
  // authAdmin = false;
  // authSuperadmin = false;

  // userRole!:boolean;
  // istrue:boolean = true;
  
  //  role!:any;
  
  
  

  constructor() {} 

  // ngAfterViewChecked() 
  // {

    
  //     this.userAuthenticated = this.authService.getIsAuthenticated();
    
  //     this.authAdmin = this.authService.getIsAdmin();
  //     this.authSuperadmin = this.authService.getIsSuperadmin();
      
  
  // let  TTT = this.authService.getIsAdmin();
 

  //      if(TTT)
  //      {
  //       this.authAdmin = true;
  //      }
  //      else
  //      {
  //       this.authAdmin= false;
  //      }

   

  //   this.userRole = this.authService.userRole;
  // }
  

  

  // logout(){
    
  //   this.authService.logout();
  // }
  
 

}
