import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { TodoService } from '../shared/todo.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  author:string='';

constructor(private todoService: TodoService, private http: HttpClient){}
  
ngOnInit(): void 
{
  this.getTodos(); 
  }


  todos: any[] = [];
  arrayFull:Boolean=false;
apiUrl:any = environment.apiUrl;
TEST:String="CREATED BY:";





  getTodos() 
  {
    
    this.http.get<any[]>(`${this.apiUrl}/GetPostCompleted`).subscribe((todos) => {this.todos = todos});
  }


}
