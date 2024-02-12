import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usersrole',
  templateUrl: './usersrole.component.html',
  styleUrl: './usersrole.component.css'
})
export class UsersroleComponent implements OnInit {
  ngOnInit() {
  console.log(this.updateTodo);
  
  }

  updateTodo:boolean = false;
  createTodo:boolean = true; 
  deleteTodo!:boolean; 
  markTodo!:boolean; 

  onclick()
  {
    this.createTodo = false;
    
  }
  
}
