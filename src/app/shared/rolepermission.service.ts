import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  constructor() { }
  todoCheckBox!:boolean;
  roleFromLocal!:any;
   

getRole()
{
     this.roleFromLocal = localStorage.getItem('role');
    return this.roleFromLocal;
}




createPermission()
{

}
updatePermission()
{
  
}
deletePermission()
{
  
}
completedPermission()
{
  if(this.roleFromLocal === 'user') return false;
  else return true;
}
  
}
