import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface UserData {
  _id: string;
  name: string;
  update: boolean;
  create: boolean;
  delete: boolean;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolepermissionService implements OnInit, OnDestroy {

  apiUrl = environment.apiUrl; 
  roleFromLocal!:any;

  userPermissions: any[] = [];
 

  constructor(private http: HttpClient) { }


  // getUserP(): Observable<UserData[]> {
  //   return this.http.get<UserData[]>(`${this.apiUrl}/GetP`)
  //     .pipe(
  //       catchError(this.handleError),
  //       map(response => response.map((item: { _id: any; name: any; update: any; create: any; delete: any; completed: any; createdAt: any; updatedAt: any; }) => {
          
  //         return {
  //           _id: item._id,
  //           name: item.name,
  //           update: item.update,
  //           create: item.create,
  //           delete: item.delete,
  //           completed: item.completed,
  //           createdAt: item.createdAt,
  //           updatedAt: item.updatedAt,
  //         };
          
          
  //       }))
  //     );
  // }

  // private handleError(error: any): Observable<never> {
  //   console.error('An error occurred:', error);
  //   return throwError('Something went wrong retrieving data');
  // }

  ngOnDestroy()
   {
    // console.log(this.userPermissions);
  }
  
  ngOnInit() 
  {
 
    // this.getData()
  }
 
  
 
  

getRole()
{
     this.roleFromLocal = localStorage.getItem('role');
    return this.roleFromLocal;
}

getUserP()
{
  return this.http.get<any[]>(`${this.apiUrl}/GetP`)
}

// getData()
// {
//    this.http.get<any[]>(`${this.apiUrl}/GetP`).subscribe((p) => {this.userPermissions = p});
// }




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

  if(this.roleFromLocal === 'user')
  {
    // const val= this.http.get('http://localhost:3000/userPermissionof/update').subscribe();
    // const ret = val.fieldname;
    return true
  } 
  else {
    
    return true;
  }

}
  
createTodobool()
{

  if(this.roleFromLocal === 'user')
  {
    return false;
  } 
  else {
    
    return true;
  }

}

updateTodobool()
{

  if(this.roleFromLocal === 'user')
  {
    return false;
  } 
  else {
    
    return true;
  }

}

deleteTodobool()
{

  if(this.roleFromLocal === 'user')
  {
    return false;
  } 
  else {
    
    return true;
  }

}



}
