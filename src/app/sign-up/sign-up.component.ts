import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from "@angular/router";
// import { error } from 'console';
// import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage: any = null;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'adminkey': new FormControl('',),
      'password': new FormControl('', [Validators.required])
    })
  }

  async onSubmit(){
   
    this.authService.signupUser(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.adminkey).subscribe(res => {
     
      this.router.navigate(['login']);
    },
    err => {
      
      this.errorMessage = err.message;
      alert(err.error.message);
     
      this.errorMessage='';
    }
  )
  }
}
