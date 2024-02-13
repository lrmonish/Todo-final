import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-authheader',
  templateUrl: './authheader.component.html',
  styleUrl: './authheader.component.css'
})
export class AuthheaderComponent
 {
  userAuthenticated = false;
  authAdmin = false;
  authSuperadmin = false;

  userRole!:boolean;
  istrue:boolean = true;
  
   role!:any;
  constructor(private authService: AuthService, private todoservice : TodoService) {} 

  ngAfterViewChecked() 
  {

    
      this.userAuthenticated = this.authService.getIsAuthenticated();
    
      this.authAdmin = this.authService.getIsAdmin();
      this.authSuperadmin = this.authService.getIsSuperadmin();
      
  
  let  TTT = this.authService.getIsAdmin();
 

       if(TTT)
       {
        this.authAdmin = true;
       }
       else
       {
        this.authAdmin= false;
       }

   

    this.userRole = this.authService.userRole;
  }
  

  
  logout(){
    
    this.authService.logout();
  }
}
