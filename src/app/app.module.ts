import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Httplistener } from './services/interceptors/httplistener.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { MockBackend } from './services/interceptors/mock-backend';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Httplistener, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: MockBackend, multi: true },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '953334668962-1kblrri61s36cmhhbrn8phtbng6949fq.apps.googleusercontent.com'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
