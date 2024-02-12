import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }
  roleFromLocal!:any;
   

getRole()
{
     this.roleFromLocal = localStorage.getItem('role');
    return this.roleFromLocal;
}

getUserP()
{
  return this.http.get<any[]>(`${this.apiUrl}/GetP`);
}



userCP(create:boolean)
{
 
  

return this.http.put(`${this.apiUrl}/updateUserCreateP`,{boolval:create}).subscribe();

}

userUP(update:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateUserupdateP`,{boolval:update}).subscribe();

}

userDP(deleteP:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateUserDeleteP`,{boolval:deleteP}).subscribe();

}

userBP(box:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateUserCompletedP`,{boolval:box}).subscribe();

}








completedPermission()
{
  if(this.roleFromLocal === 'user') return false;
  else return true;
}
  
}
