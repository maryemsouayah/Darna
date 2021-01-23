import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
//import { host } from 'src/app/host';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  postDemand(values) {
    return this.http.post(environment.host + '/api/register', values);
  }
  isLoggedIn() {
    let token = sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
