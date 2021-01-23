import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ListeDemandeService {
  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {
     };
  }
  getListDemand() : Observable<any>{
    return this.http.get(environment.host + '/api/listDemands').pipe(
      map(this.extractData));
  }
  deleteDemand(id) {
    return this.http.get(environment.host + '/api/deleteDemand/' + id);
  }
  acceptDemand(demand) {
    return this.http.post(environment.host + '/api/acceptDemand', demand);
  }
}
