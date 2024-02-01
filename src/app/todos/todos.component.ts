import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {

  todos: any[] = [];
  newTodo: string = '';
  newTodoDescription: any ;
  showUpdate:boolean=false;
  showeditbutton:boolean=false;
  editbutton:boolean=true;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
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

  getTodos() {
    this.todoService.getTodos().subscribe((todos) => this.todos = todos);
  }

  createTodo() {
    if (!this.newTodo) return;
    this.todoService.createTodo({ description: this.newTodo }).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = '';
      console.log(this.todos);
      
    });
  }

  completed(todocom:any)
  {
    this.todoService.completed(todocom).subscribe();
    
  }

  updateTodo(todo: any) {
    
    const updatedDescription = this.newTodoDescription;
 
    
 
 
    const updatedTodo = { ...todo, description: updatedDescription };
    
    this.todoService.updateTodo(todo._id, updatedTodo).subscribe(() => {
      const index = this.todos.findIndex((t) => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;

      }
    });
  }

  deleteTodo(todo: any) {
    this.todoService.deleteTodo(todo._id).subscribe(() => {
      this.todos = this.todos.filter((t) => t._id !== todo._id);
    });
  }

}
