import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor(private authservice: AuthService){}


  user = {
    password: '',
  };

  onSubmit() {
    this.authservice.deleteUser(this.user.password)
    
  }

  
}
