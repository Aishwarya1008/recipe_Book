import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
email = new FormControl(null, Validators.required);
password = new FormControl(null, [Validators.required, Validators.minLength(6)]);
formGroup: FormGroup;
  emailValue: string;
  passwordValue: string;
  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
  }
onSubmit() {
  this.emailValue = this.email.value;
  this.passwordValue = this.password.value;
  this.authService.signUp(this.emailValue, this.passwordValue);
}
}
