import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthModel } from "./auth.model";
import { environment } from "../../environment/environment";



@Injectable({providedIn:"root"})


export class AuthService {

    private token!: any;

    private authenticatedSub = new Subject<boolean>();
    private adminSub = new Subject<boolean>();
    private superAdminSub = new Subject<boolean>();
    

    private isAuthenticated!:boolean;
    private isAdmin!:boolean;
    private isSuperAdmin!:boolean;
   

    private logoutTimer: any;
    userRole!: boolean;
    usernameLoggedin!:string;
    userrolename!:string;

     apiUrl:any = environment.apiUrl;


     constructor(private http: HttpClient, private router: Router){}
    
    
    
    getIsAuthenticated()
    {
        return this.isAuthenticated;
    }
    getIsAdmin()
    {
        return this.isAdmin;
    }
    getIsSuperAdmin()
    {
        return this.isSuperAdmin;
    }




    getAuthenticatedSub()
    {
        return this.authenticatedSub.asObservable();
    }

    getAdminSub()
    {
        return this.adminSub.asObservable();
    }
    getSuperAdminSub()
    {
        return this.superAdminSub.asObservable();
    }


    getToken()
    {
        // const tk = localStorage.getItem('tokenIn');
        return this.token;
    }
    
   getUserRole()
   {
    return this.userrolename;
   }
    
    signupUser(username: string, password: string, adminkey:string)
    {
  
        const authData: AuthModel = {username, password, adminkey};
        
        return this.http.post(this.apiUrl+'/sign-up/', authData);
    }


    
   

    loginUser(username: string, password: string)
    {
        const authData: AuthModel = {username, password, adminkey: ""};

        this.http.post<{token: string, expiresIn: number, user:boolean, username:string, role:string}>(this.apiUrl+'/login/', authData)
            .subscribe(res => {
                this.userrolename = res.role;
                this.userRole = res.user;
                this.token = res.token;
                this.usernameLoggedin = res.username;
                
                localStorage.setItem('auth', `${this.userrolename}`);
                

                if(this.userrolename === 'admin')
                {
                    localStorage.setItem('admin','true');
                    this.adminSub.next(true);
                    this.isAdmin = true;    
                }
                else if(this.userrolename === 'superadmin')
                {
                    localStorage.setItem('admin','true');
                    localStorage.setItem('superadmin','true');
                    this.superAdminSub.next(true);
                    this.adminSub.next(true);
                    this.isSuperAdmin = true;
                    this.isAdmin = true; 
                }
                
                if(this.token){
                    // localStorage.setItem('tokenIn',`${this.token}`);
                    this.userRole = this.userRole
                    this.authenticatedSub.next(true);
                    this.isAuthenticated = true;
                    this.router.navigate(['/todos']);
                    this.logoutTimer = setTimeout(() => {this.logout()}, res.expiresIn * 1000);
                    const now = new Date();
                    const expiresDate = new Date(now.getTime() + (res.expiresIn * 1000));
                    this.storeLoginDetails(this.token, expiresDate, this.userRole, this.usernameLoggedin, this.userrolename);
                    alert("Login success!!!");
                    
                }
            },err => {
                let errfromwrong = err.error.message;
                    alert(errfromwrong);
               
              })
    }





///////////////////////////////////
    updateUser(user:any)
    {
    
    const id = user._id;
    let completedz = !user.isAdmin;
    
   return this.http.put(`${this.apiUrl}/updateAcess/${id}`,user);
    
    }

    getUsers() 
    {
        return this.http.get(`${this.apiUrl}/getallusers`);
    }


    getUsersForAdmin()
    {
        
        return this.http.get(`${this.apiUrl}/getallUsersForAdmin`);
    }



    deleteUserByAdmin(id:any) 
    {
        return this.http.delete(`${this.apiUrl}/deleteuserbyadmin/${id}`)
    }


      edituserbyadmin(id: string, user:any)
    {
        return this.http.put(`${this.apiUrl}/edituserbyadmin/${id}`, user);
    }


    deleteUser(pass: any) 
    {
        const id = pass;
        
        this.http.delete<any>(`${this.apiUrl}/deleteUser/${id}`, { body: pass })
        .subscribe((data) => {
           
              alert("User deleted successfully:");
          
          this.logout();
        }, (error) => {
            alert("Invalid Password");

        
        });
      }







    storeLoginDetails(token: string, expirationDate: Date, userRole: boolean, usernameLogggedin:string,userrolename:string)
    {
        localStorage.setItem('username',usernameLogggedin)
        localStorage.setItem('isAdmin',`${userRole}`)
        localStorage.setItem('role',userrolename)
        localStorage.setItem('token', token);
        localStorage.setItem('expiresIn', expirationDate.toISOString());
        
        
        
    }

    clearLoginDetails()
    {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('username');
        localStorage.removeItem('role')
        sessionStorage.removeItem('authAdmin');
        localStorage.removeItem('userP')
        localStorage.removeItem('auth')
        localStorage.removeItem('admin');
        localStorage.removeItem('superadmin');
        
    }

    getLocalStorageData()
    {
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

    authenticateFromLocalStorage()
    {
        const localStorageData = this.getLocalStorageData();
        
        if(localStorageData){
            const now = new Date();
            const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

            if(expiresIn > 0){
                this.token = localStorageData.token;
                this.isAuthenticated = true;
                
            }
        }
    }
    
    
    

    



    logout()
    {
        this.token = '';
        this.authenticatedSub.next(false);
        this.superAdminSub.next(false);
        this.adminSub.next(false);
        
        this.isAuthenticated = false;
        this.isSuperAdmin = false;
        this.isAdmin = false;

        this.router.navigate(['/home']);
        clearTimeout(this.logoutTimer);
        this.clearLoginDetails();
    }
    
}




