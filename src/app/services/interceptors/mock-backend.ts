import { Observable, throwError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { users, Client } from '../../models/client'

@Injectable()
export class MockBackend implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        if (url.endsWith('/login/authenticate') && method === 'POST') {
            const { name, password } = body;
            const user = users.find(user => user.name === name && user.password === password);
            if (!user)
                return throwError({ status: 401, error: { message: 'Oops! Unauthorised  Login' } });
            else {
                let body: Client = { id: user.id, name: user.name, accessable: true }
                return of(new HttpResponse({ status: 200, body }))
            }
        }
        else
            return next.handle(request);
    }
}

