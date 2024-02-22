import { AfterViewInit, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service'
import { RolepermissionService } from '../shared/rolepermission.service';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnDestroy, DoCheck, AfterViewInit, OnInit {

  todos: any[] = [];
  userP : any[] = [];
  adminP : any[] = [];

  newTodo: string = '';
  newTodoDescription: any ;
  showUpdate:boolean=false;
  showeditbutton:boolean=false;
  editbutton:boolean=true;
  userRoles:any = '';
 
  TEST:String="CREATED BY:";
  ownerInformation!:boolean ; 

  createTodobool!:boolean ;
  updateTodobool!:boolean;
  deleteTodobool!:boolean;
  todoCheckBoxbool!:boolean;
  

  constructor(private todoService: TodoService, private rolePermission: RolepermissionService, private authService: AuthService) {}
  
  ngAfterViewInit()
   {
   
    
  }
  
 

  
  
  
  ngOnDestroy() 
  {

   this.adminP= [];
   this.userP = [];
    
  }
  
  
  ngOnInit() 
  {
   
    this.getTodos();
    this.getUserP();
    this.getAdminP();
 

  
    this.userRoles = localStorage.getItem('admin')
     let userSA = localStorage.getItem('superadmin')
    
    if(this.userRoles === 'true' || userSA === 'true')
    {
       this.ownerInformation = true;
    }
    else{
      this.ownerInformation = false;
    }
  }


  ngDoCheck() 
  {
    if (this.userP.length > 0 && this.adminP.length > 0) {
      const userRole = this.rolePermission.getRole();
      if (userRole === 'user') {
        this.deleteTodobool = this.userP[0].delete;
        this.createTodobool = this.userP[0].create;
        this.updateTodobool = this.userP[0].update;
        this.todoCheckBoxbool = this.userP[0].completed;
      } else if (userRole === 'admin') {
        this.deleteTodobool = this.adminP[0].delete;
        this.createTodobool = this.adminP[0].create;
        this.updateTodobool = this.adminP[0].update;
        this.todoCheckBoxbool = this.adminP[0].completed;
      } else {
        this.deleteTodobool = true;
        this.createTodobool = true;
        this.updateTodobool = true;
        this.todoCheckBoxbool = true;
      }
    }
   
  }
  

  getUserP()
  {
  this.rolePermission.getUserP().subscribe((data) => {this.userP = data});
  }

  getAdminP()
  {
  this.rolePermission.getAdminP().subscribe((data) => {this.adminP = data});
  }


  showEditButton()
  {
    this.showeditbutton=!this.showeditbutton;
    this.editbutton = !this.editbutton;
    this.newTodoDescription = "";
   
    
  }
  
  showedit(x:any){
  this.updateTodo(x);
  this.showUpdate=true;
  }

  getTodos() 
  {

    this.todoService.getTodos().subscribe((todos) => {this.todos = todos});

  }

  createTodo() 
  {
    
    
    if (!this.newTodo) return;
    this.todoService.createTodo({ description: this.newTodo }).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = '';
      
      
    });
  }


  completed(todocom:any)
  {
    this.todoService.completed(todocom).subscribe();
    
  }

  updateTodo(todo: any) 
  {
    const updatedDescription = this.newTodoDescription;
    const updatedTodo = { ...todo, description: updatedDescription };
    
    this.todoService.updateTodo(todo._id, updatedTodo).subscribe(() => {
      const index = this.todos.findIndex((t) => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;

      }
    });
  }

  deleteTodo(todo: any)
  {
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.todos = this.todos.filter((t) => t._id !== todo._id);
    });
  }

}
