import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked  {
 
 

  // private authenticationSub!: Subscription;
  // private authAdminSub!:Subscription;

  userAuthenticated = false;
  authAdmin = false;

  userRole!:boolean;
  istrue:boolean = true;
  
   role!:any;
  
  
  

  constructor(private authService: AuthService, private todoservice : TodoService) {} 

  ngAfterViewChecked() 
  {

    
      this.userAuthenticated = this.authService.getIsAuthenticated();
    
      this.authAdmin = this.authService.getIsAdmin();
      // this.authenticationSub = this.authService.getAuthenticatedSub().subscribe(status => 
      //   {
      //   this.userAuthenticated = status
      // })
  

      // this.authAdmin = this.authService.getIsAdmin();
  
      //  this.authAdminSub = this.authService.getAdminSub().subscribe(status=>{
        
          // localStorage.setItem('authAdmin',`${status}`);
        // this.authAdmin = status
      //  })
  let  TTT = this.authService.getIsAdmin();
  // sessionStorage.setItem('authAdmin', `${TTT}`);

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
  
  ngOnDestroy() {
    // this.authenticationSub.unsubscribe();
    // this.authAdminSub.unsubscribe();
    
  }


  ngAfterViewInit()
  {

    
   
    
  }
  ngOnInit() {
    
    
   
  }

  logout(){
    
    this.authService.logout();
  }
  
 

}
