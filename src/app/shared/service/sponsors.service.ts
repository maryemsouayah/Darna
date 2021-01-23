import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private http: HttpClient) { }
  getSponsors() {
    return this.http.get(environment.host + '/api/all-sponsors');
  }
  addNewSponsor(obj) {
    return this.http.post(environment.host + '/api/add-sponsor', obj);
  }
  deleteSponsor(id) {
    return this.http.delete(environment.host + '/api/delete-sponsor/' + id);
  }
  updateSponsor(id, updateGoalForm) {
    return this.http.put(environment.host + '/api/update-sponsor/' + id, updateGoalForm);
  }
  getSponsorById(id) {
      return this.http.get(environment.host + '/api/details-sponsor/' + id);
    }
}


