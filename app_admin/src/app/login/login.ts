import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ){}

  ngOnInit(): void{}

  public onLoginSubmit(): void {
  this.formError = '';

  if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
    this.formError = 'All fields are required, please try again';
    // Optionally clear the form or stay on the same page
  } else {
    this.doLogin();
  }
}

private doLogin(): void {
  const newUser = {
    name: this.credentials.name,
    email: this.credentials.email
  } as User;

  this.authenticationService.login(newUser, this.credentials.password);

  // Immediately check if the user is logged in
  if (this.authenticationService.isLoggedIn()) {
    this.router.navigate(['']);
  } else {
    // Try again after a short delay in case login is async
    setTimeout(() => {
      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['']);
      } else {
        this.formError = 'Login failed. Please try again.';
      }
    }, 3000);
  }
}


}


