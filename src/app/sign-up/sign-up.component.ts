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
      'password': new FormControl('', [Validators.required])
    })
  }

  async onSubmit(){
    //   let pas:any;
    // pas = await bcrypt.hash(this.signupForm.value.password, 8);

    this.authService.signupUser(this.signupForm.value.username, this.signupForm.value.password).subscribe(res => {
      // Handle successful sign-up
      this.router.navigate(['login']);
    },
    err => {
      // Handle sign-up error
      this.errorMessage = err.message;
      alert(err.error.message);
     
      this.errorMessage='';
    }
  )
  }
}
