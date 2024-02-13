import { Component, OnInit } from '@angular/core';
import { RolepermissionService } from '../shared/rolepermission.service';

@Component({
  selector: 'app-usersrole',
  templateUrl: './usersrole.component.html',
  styleUrl: './usersrole.component.css'
})
export class UsersroleComponent implements OnInit {

  constructor(private rolePermission : RolepermissionService){}




  ngOnInit() {
    this.getUserP();
    const jsonString = JSON.stringify(this.userPermissions);
    localStorage.setItem('userP',`${jsonString}`);
  
  }

userPermissions: any[] = [];





  getUserP()
  {
    this.rolePermission.getUserP().subscribe((p) => {this.userPermissions = p});
    
    
  }

  userCP()
  {
    let createTodo = !this.userPermissions[0].create;

    this.rolePermission.userCP(createTodo)
  }

  userUP()
  {
    let createTodo = !this.userPermissions[0].update;
    
    this.rolePermission.userUP(createTodo)
  }

  userDP()
  {
    let createTodo = !this.userPermissions[0].delete;
    
    this.rolePermission.userDP(createTodo)
  }

  userBP()
  {
    let createTodo = !this.userPermissions[0].completed;
    
    this.rolePermission.userBP(createTodo)

  }
}
