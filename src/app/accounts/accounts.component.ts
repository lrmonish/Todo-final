import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  users: any[] = [];
  newTodoDescription!:any;
  showUpdate:boolean=false;
  showeditbutton:boolean=false;
  editbutton:boolean=true;

constructor(private http :HttpClient, private authService : AuthService, private todoservice : TodoService){}
  ngOnInit(): void {
   this.getUsers();
   
  }

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

getUsers() {
  
      this.authService.getUsers().subscribe((data)=>
      {
        // console.log(data);
        
        this.users = data as any[];
        
      })
      
      
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
