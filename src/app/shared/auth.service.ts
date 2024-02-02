import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthModel } from "./auth.model";
import { environment } from "../../environment/environment";


@Injectable({providedIn:"root"})
export class AuthService{

    private token!: string;
    private authenticatedSub = new Subject<boolean>();
    private isAuthenticated = false;
    private logoutTimer: any;
    errorMessageForLogin:any = null;
    deleteUserRes:any ="";
    userData!: object;
    
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
    
    signupUser(username: string, password: string)
    {

        const authData: AuthModel = {username: username, password: password};
        
        return this.http.post(this.apiUrl+'/sign-up/', authData);
    }
    

    loginUser(username: string, password: string)
    {
        const authData: AuthModel = {username: username, password: password};

        this.http.post<{token: string, expiresIn: number}>(this.apiUrl+'/login/', authData)
            .subscribe(res => {
                
                this.userData = res;
            console.log(this.userData);
            
            

                this.token = res.token;
                let resdata:any = res;
                if(this.token){
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.router.navigate(['todos']);
                    this.logoutTimer = setTimeout(() => {this.logout()}, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
                    this.storeLoginDetails(this.token, expiresDate);

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



    storeLoginDetails(token: string, expirationDate: Date){
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expirationDate.toISOString());
    }

    clearLoginDetails(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
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
}

function tap(arg0: (res: any) => void): import("rxjs").OperatorFunction<any, unknown> {
    throw new Error("Function not implemented.");
}


function throwError(arg0: () => Error) {
    throw new Error("Function not implemented.");
}
