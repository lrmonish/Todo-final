import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit, OnDestroy{
  users: any[] = [];
  // usersForAdmin: any[] = [];
  newTodoDescription!:any;
  showUpdate:boolean=false;
  showeditbutton:boolean=false;
  editbutton:boolean=true;
  isSuperAdmin:boolean = false;


constructor(private http :HttpClient, private authService : AuthService, private todoservice : TodoService){}
  ngOnDestroy() {
    console.log(this.users);
    
  }
  ngOnInit(): void {
   this.getUsers();
   
  }

  isAdmin = false;

  showedit(x:any){
    this.edituserbyadmin(x);
    this.editall(x)
    this.showUpdate=true;
    }

  showEditButton()
  {
    this.showeditbutton=!this.showeditbutton;
    this.editbutton = !this.editbutton;
    this.newTodoDescription = "";
  }

  changeAcess(user:any)
  {

    this.authService.updateUser(user).subscribe();

  }

getUsers() {
  
      this.authService.getUsers().subscribe((data)=>
      {
        
        this.users = data as any[];
        let currentUser = localStorage.getItem('username');
        if(currentUser === 'admin')
        {
         ;
this.isSuperAdmin = true;
        }
        
        let filteredArray = this.users.filter(obj => obj.username !== 'admin' && obj.username !== currentUser );
        
        
       
this.users=filteredArray
        
        
        
      })
      
      
    }

getAllUsers() 
    {

this.authService.getUsersForAdmin().subscribe()
    }

    deleteUserByAdmin(user:any) {
      
      return this.authService.deleteUserByAdmin(user._id).subscribe(()=>{ this.users = this.users.filter((t) => t._id !== user._id)});
    }
    
    edituserbyadmin(user:any)
    {
      const updatedDescription = this.newTodoDescription;
 
    
 
 
    const updatedTodo = { ...user, username: updatedDescription };
    
    this.authService.edituserbyadmin(user._id, updatedTodo).subscribe((res) => 
    {
      try{
        const index = this.users.findIndex((t) => t._id === updatedTodo._id);


        if (index !== -1) 
        {
          this.users[index] = updatedTodo;
        }
        return alert("user updated");
      }
      catch{
         return null;
      }
      
    }
    );
    }

    editall(user:any)
    {
     
     return this.todoservice.editAll(user).subscribe();
     
       

    }



    
}
