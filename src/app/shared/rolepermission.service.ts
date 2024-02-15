import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class RolepermissionService {

  apiUrl = environment.apiUrl; 
  roleFromLocal!:any;
 

  constructor(private http: HttpClient, private authService: AuthService) { }


getRole()
{
     this.roleFromLocal = this.authService.getUserRole();
    return this.roleFromLocal;
}

getUserP()
{
  return this.http.get<any[]>(`${this.apiUrl}/GetP`)
}

getAdminP()
{
  return this.http.get<any[]>(`${this.apiUrl}/GetadminP`)
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

}
