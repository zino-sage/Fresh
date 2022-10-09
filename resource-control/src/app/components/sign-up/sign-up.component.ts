import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return{
        passwordsDontMatch: true

      }
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router, private toast: HotToastService ) { }

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  }, {validators: passwordsMatchValidator()})

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
    const {name, email, password} = this.signUpForm.value;
    this.authService.signUp(name!, email!, password!).pipe(
      this.toast.observe({
        success: 'Congrats! You are signed up',
        loading: 'Signing in...',
        error :  ({message}) => `${message}` + ' Quite unfortunate'
      })
    ).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }
}
