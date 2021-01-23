import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  jwt: string;
  username: string;
  user;
  constructor(private http: HttpClient, private router: Router) { }
  login(data) {
    return this.http.post(environment.host + '/api/login', data, {
      observe: 'response',
    });
  }

  saveToken(jwt: string, user: object) {
    sessionStorage.setItem('token', jwt);
    sessionStorage.setItem('user', JSON.stringify(user));
    this.jwt = jwt;
    this.user = user;
    // console.log( this.jwt)
  }
  loadToken() {
    this.jwt = sessionStorage.getItem('token');
  }
  initParams() {
    this.jwt = undefined;
    this.user = undefined;
  }

  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
