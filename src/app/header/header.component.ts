import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges  {
 
 

  private authenticationSub!: Subscription;
  userAuthenticated = false;
  userRole!:string;
  istrue:boolean = true;
  authAdmin!:any;
  
  
  

  constructor(private authService: AuthService, private todoservice : TodoService) { 
    setTimeout(()=>{
      let role = localStorage.getItem('role');
     
      if(role == 'admin'){
        this.authAdmin = true 
        console.log("if",this.authAdmin);
        
      }
      else{
        this.authAdmin = false;
        console.log("else",this.authAdmin);
        
      }
      
    }); 
  }
  ngOnChanges(changes: SimpleChanges): void 
  {
  
  }

  ngOnDestroy(): void {
    this.authenticationSub.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => {
      this.userAuthenticated = status
      setTimeout(()=>{
        let role = localStorage.getItem('role');
       
        if(role == 'admin'){
          this.authAdmin = true 
          console.log("if",this.authAdmin);
          
        }
        else{
          this.authAdmin = false;
          console.log("else",this.authAdmin);
          
        }
        
      }); 

      
    })

    this.userRole = this.authService.userRole;
   
    
   
  }

  logout(){
    this.authService.logout();
    this.authAdmin = false
  }
  
  deleteUser(){
   
   
    
  }

}
