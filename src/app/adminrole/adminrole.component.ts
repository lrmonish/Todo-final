import { Component, OnDestroy, OnInit } from '@angular/core';
import { RolepermissionService } from '../shared/rolepermission.service';
import { AdminPermissionService } from '../shared/admin-permission.service';

@Component({
  selector: 'app-adminrole',
  templateUrl: './adminrole.component.html',
  styleUrl: './adminrole.component.css'
})
export class AdminroleComponent implements OnInit
{
  error: any;


  constructor(private adminRole : AdminPermissionService){}



  ngOnInit() {
    this.getUserP();
  
  }

adminPermissions: any[] = [];


  getUserP()
  {
    this.adminRole.getUserP().subscribe((p) => {this.adminPermissions = p}, error => {
      this.error = error.message;
    });
    
    
  }

  userCP()
  {
    let createTodo = !this.adminPermissions[0].create;

    this.adminRole.userCP(createTodo)
  }

  userUP()
  {
    let createTodo = !this.adminPermissions[0].update;
    
    this.adminRole.userUP(createTodo)
  }

  userDP()
  {
    let createTodo = !this.adminPermissions[0].delete;
    
    this.adminRole.userDP(createTodo)
  }

  userBP()
  {
    let createTodo = !this.adminPermissions[0].completed;
    
    this.adminRole.userBP(createTodo)

  }
}
