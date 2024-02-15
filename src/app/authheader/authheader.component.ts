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
  userAuthenticated!:boolean;
  admin:boolean=false;
  superAdmin = false;

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
    
   });
   
   this.adminSub = this.authService.getAdminSub().subscribe(data=>
    {
this.admin = data;
   });

   this.superAdminSub = this.authService.getSuperAdminSub().subscribe(data=>
    {
this.superAdmin = data;
   });


  }

  
  logout(){
    
    this.authService.logout();
  }
}
