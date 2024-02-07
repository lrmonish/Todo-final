import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 
 

  private authenticationSub!: Subscription;
  userAuthenticated = false;
  userRole!:string;
  istrue:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    })

    this.userRole = this.authService.userRole;
    console.log(this.userRole);
    
    // if(this.userRole == 'admin')
    // {
    //     this.istrue = true;
    // }
    // else{
    //   this.istrue=false;
    // }
  }

  logout(){
    this.authService.logout();
  }
  
  deleteUser(){
   
    // this.authService.deleteUser()

    // if (confirm('Are you sure?')) {
     
      
    // } else {
          
    //   console.log('Cancel is clicked.');
    // }
    
  }

}
