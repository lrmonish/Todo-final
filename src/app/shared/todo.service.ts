import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  modal:boolean = false;
   
   
  apiUrl = environment.apiUrl; 
  
  

  constructor(private http: HttpClient, private authservice : AuthService) {}
   

  getTodos() {
    
    
    return this.http.get<any[]>(`${this.apiUrl}/GetPost`);
    
    
  }
 

  
  getTodo(id: string) {

    return this.http.get<any>(`${this.apiUrl}/GetPost/${id}`);
  }

  createTodo(todo: any) {
    return this.http.post(this.apiUrl+'/CreatePost', todo);
  }

  updateTodo(id: string, todo: any) {
    return this.http.put(`${this.apiUrl}/EditPost/${id}`, todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.apiUrl}/DeletePost/${id}`);
  }

  completed(todocom:any)
  {

    const id = todocom._id;
    

   return this.http.put(`${this.apiUrl}/updateComplete/${id}`,todocom);

  }

  editAll(user:any)
  {
     let userId = user._id
     let usname = user.username;
     
     
     return this.http.put(`${this.apiUrl}/editAll`,{userId, usname});
  }
}
