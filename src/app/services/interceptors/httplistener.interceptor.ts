import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class Httplistener implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (this.authService.loggedInUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${true}`
        }
      });
    }

    return next.handle(request);
  }
}

