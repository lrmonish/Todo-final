import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService {

 
  apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }
  roleFromLocal!:any;
   



getUserP()
{
  return this.http.get<any[]>(`${this.apiUrl}/GetadminP`);
}



userCP(create:boolean)
{
 
  

return this.http.put(`${this.apiUrl}/updateAdminCreateP`,{boolval:create}).subscribe();

}

userUP(update:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateAdminUpdateP`,{boolval:update}).subscribe();

}

userDP(deleteP:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateAdminDeleteP`,{boolval:deleteP}).subscribe();

}

userBP(box:boolean)
{
  
return this.http.put(`${this.apiUrl}/updateAdminCompletedP`,{boolval:box}).subscribe();

}









}
