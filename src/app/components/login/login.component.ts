import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Subscription } from 'rxjs';

import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });
  error: string = '';
  subscription: Subscription = new Subscription;

  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  socialAuthenticate() {
    this.subscription = this.socialAuthService.authState.subscribe((user) => {
      this.retriveUserSubscription(user.name, user.email)
    });
  }

  onSubmit(form: FormGroup) {
    this.retriveUserSubscription(this.f.name.value, this.f.password.value)
  }

  retriveUserSubscription(name: string, password: string) {
    this.authService.login(name, password)
      .pipe(first()).subscribe(response => this.router.navigate(['dashboard']),
        (error: HttpErrorResponse) => {
          this.error = error.error.message
          this.loginForm.reset();
        });
  }

  get f() { return this.loginForm.controls; }

  loginWithGoogle(): void {
    this.socialAuthenticate();
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


