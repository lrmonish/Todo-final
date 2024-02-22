import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authheader',
  templateUrl: './authheader.component.html',
  styleUrl: './authheader.component.css'
})
export class AuthheaderComponent implements OnInit, OnDestroy
 {
  userAuthenticated!:any;
  admin:any=false;
  superAdmin:any = false;

  userAuthenticatedSub!:Subscription;
  adminSub!:Subscription;
  superAdminSub!:Subscription;

  constructor(private authService: AuthService, private todoservice : TodoService) {} 

  ngOnDestroy(): void {
   this. userAuthenticatedSub.unsubscribe();
  }
  
  
  ngOnInit() 
  {
    

   this.userAuthenticatedSub = this.authService.getAuthenticatedSub().subscribe(data=>
    {
    this.userAuthenticated = data;
    localStorage.setItem('auth',`${data}`);
    console.log('auth');
    
   });
   
   
   this.adminSub = this.authService.getAdminSub().subscribe(data=>
    {
this.admin = data;
console.log('authAdmin');
   });

   this.superAdminSub = this.authService.getSuperAdminSub().subscribe(data=>
    {
this.superAdmin = data;
console.log('authAsuperAdmin');
   });

   this.log();

  }

  log()
  {
    
      if(localStorage.getItem('superadmin') === 'true')
      {
        this.userAuthenticated =true;
        this.admin = true;
        this.superAdmin = true;
      }
      else if(localStorage.getItem('admin') === 'true')
      {
        this.userAuthenticated =true;
        this.admin = true;
      }
      else if(localStorage.getItem('auth') === 'true')
      {
        this.userAuthenticated =true;
      }

    
  }
  
  logout(){
    
    this.authService.logout();
  }
}
