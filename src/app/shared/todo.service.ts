import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = 'http://localhost:3000/api/todos'; 

  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<any[]>(this.apiUrl+'/GetPost');
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
    let completedz = !todocom.completed;

   return this.http.put(`${this.apiUrl}/updateComplete/${id}`,todocom);

  }
}
