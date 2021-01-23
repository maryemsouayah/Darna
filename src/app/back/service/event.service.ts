import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})

export class EventService {
  constructor(private http: HttpClient) { }
  //Get all event
   getAllEvents() {
    return this.http.get(environment.host + '/api/getAllEvents');
  }
  //get Event
  getEvent(id) {
    return this.http.get(environment.host + '/api/details-event/' + id);
  }
  getEventByYear(createDate) {
    return this.http.get(environment.host + '/api/getEventByYear/' + createDate);
  }
  //Add Event
  addNewEvent(obj) {
    return this.http.post(environment.host + '/api/add-event', obj);
  }
  //Delete Event
  deleteEvent(id) {
    return this.http.delete(environment.host + '/api/delete-event/' + id);
  }
  //Update Event
  updateEvent(id, updateForm) {
    return this.http.put(environment.host + '/api/update-event/' + id, updateForm);
  }
  participate(id, userConnect) {
    return this.http.put(environment.host + '/api/participate-event/' + id, { userConnect });
  }
  publishEvent(id, value) {
    return this.http.put(environment.host + '/api/publish-event/' + id, { publish: value });
  }

  validP(id, email) {
    return this.http.put(environment.host + '/api/validate-participate/' + id, { email });
  }
  noValidP(id, email) {
    return this.http.put(environment.host + '/api/noValidate-participate/' + id, { email });
  }
}


