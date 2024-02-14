import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { SignUpComponent } from './sign-up.component';
import { SignupRoutingModule } from './sign-up-routing.module';
import { CommonModule } from '@angular/common';





@NgModule({
  declarations: [
    SignUpComponent,
  ],

  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,  
    SignupRoutingModule,
    CommonModule
  ],

  exports:[
    SignUpComponent
  ]
})
export class SignupModule { }
