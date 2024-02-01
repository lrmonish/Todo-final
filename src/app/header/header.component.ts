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

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status;
    })
  }

  logout(){
    this.authService.logout();
  }
  
  deleteUser(){
    if (confirm('Are you sure?')) {
      this.authService.deleteUser()
      
    } else {
          
      console.log('Cancel is clicked.');
    }
    
  }

}
