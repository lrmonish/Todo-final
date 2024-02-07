import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthModel } from "./auth.model";
import { environment } from "../../environment/environment";


@Injectable({providedIn:"root"})
export class AuthService{

    private token!: any;
    private authenticatedSub = new Subject<boolean>();
    private isAuthenticated = false;
    private logoutTimer: any;
    errorMessageForLogin:any = null;
    deleteUserRes:any ="";
    userRole!: string;
    currenttoken!:any;
    role!:any;
    

   
     apiUrl:any = environment.apiUrl;
    

    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    getAuthenticatedSub(){
        return this.authenticatedSub.asObservable();
    }
    getToken(){
        return this.token;
    }
    
    constructor(private http: HttpClient, private router: Router){}
    
    signupUser(username: string, password: string, adminkey:string)
    {
  
        const authData: AuthModel = {username, password, adminkey};
        
        return this.http.post(this.apiUrl+'/sign-up/', authData);
    }
    

    loginUser(username: string, password: string)
    {
        const authData: AuthModel = {username, password, adminkey: ""};

        this.http.post<{token: string, expiresIn: number, user:string}>(this.apiUrl+'/login/', authData)
            .subscribe(res => {
                
                this.userRole = res.user;
               
                
                this.token = res.token;
                let resdata:any = res;
                if(this.token){
                    this.userRole = this.userRole
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.router.navigate(['todos']);
                    this.logoutTimer = setTimeout(() => {this.logout()}, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
                    this.storeLoginDetails(this.token, expiresDate, this.userRole);

                    setTimeout(function() {
                        alert("Login success!!!");
                      },500)
                    
                }
            },err => {
                setTimeout(() => {
                    let errfromwrong = err.error.message;
                    alert(errfromwrong);
                }, 0);
               
                
               
              })
            }

    logout(){
        this.token = '';
        this.isAuthenticated = false;
        this.authenticatedSub.next(false);
        this.router.navigate(['/']);
        clearTimeout(this.logoutTimer);
        this.clearLoginDetails();
    }

    deleteUser(pass: any) {
        const id = pass;
        
        this.http.delete<any>(`${this.apiUrl}/deleteUser/${id}`, { body: pass })
        .subscribe((data) => {
           
              alert("User deleted successfully:");
          
          this.logout();
        }, (error) => {
            alert("Invalid Password");

        
        });
      }



    storeLoginDetails(token: string, expirationDate: Date, userRole: string)
    {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expirationDate.toISOString());
        localStorage.setItem('role',userRole)
    }

    clearLoginDetails(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('role');
    }

    getLocalStorageData(){
        const token = localStorage.getItem('token');
        
        const expiresIn = localStorage.getItem('expiresIn');

        if(!token || !expiresIn){
            return;
        }
        return {
            'token': token,
            'expiresIn': new Date(expiresIn)
        }
    }

    authenticateFromLocalStorage(){
        const localStorageData = this.getLocalStorageData();
        
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                this.authenticatedSub.next(true);
                this.logoutTimer.setTimeout(expiresIn / 1000);
            }
        }
    }

    getUsers() {
        return this.http.get(`${this.apiUrl}/getallusers`);
      }

      deleteUserByAdmin(id:any) {
        return this.http.delete(`${this.apiUrl}/deleteuserbyadmin/${id}`)
      }


      edituserbyadmin(id: string, user:any)
    {
        return this.http.put(`${this.apiUrl}/edituserbyadmin/${id}`, user);
    }

    
}




