import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router ) { }

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  get name() {
    return this.signUpForm.get('name')
  }
  get email() {
    return this.signUpForm.get('email')
  }
  get password() {
    return this.signUpForm.get('password')
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')
  } 
  
  ngOnInit(): void {
  } 

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }
  }
}
