import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../models/client';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userAuthentication = new BehaviorSubject(false);;
  isLoggedUser: Observable<boolean>;
  userDetails!: Client;

  constructor(private http: HttpClient) {
    this.isLoggedUser = this.userAuthentication.asObservable();
  }

  login(name: string, password: string) {
    return this.http.post<any>(`/login/authenticate`, { name, password })
      .pipe(map(response => {
        this.userDetails = response;
        this.userAuthentication.next(true);
        sessionStorage.setItem("loggedUser", JSON.stringify(response));
        return response;
      }));
  }

  getUserDetails() {
    return this.userDetails;
  }

  logout() {
    sessionStorage.removeItem("loggedUser");
    this.userAuthentication.next(false);
  }
  public get loggedInUser(): boolean {
    return this.userAuthentication.value;
  }
}
