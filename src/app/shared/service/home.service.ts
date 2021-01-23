import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }
 
  getAllHome() {
    return this.http.get(environment.host + '/api/get-section-home');
  }
  addHome(obj) {
    return this.http.post(environment.host + '/api/add-section-home', obj);
  }
  updateHome(id, updateForm) {
    return this.http.put(environment.host + '/api/update-section-home/' + id, updateForm);
  }
  getById(id) {
      return this.http.get(environment.host + '/api/details-section-home/' + id);
    }
  deleteSection(id, obj) {
      return this.http.put(environment.host + '/api/delete-section-home/' + id, obj);
     }
  deletePres(id, value) {
      return this.http.put(environment.host + '/api/delete-presentation-home/' + id, {presentation: value });
     }

     
}
