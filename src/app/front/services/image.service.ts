import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) { }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest(
      'POST',
      environment.host + '/api/uploadFile',
      formdata,
      {
        reportProgress: true,
        responseType: 'text',
      }
    );
    return this.http.request(req);
  }
  getFile(): Observable<any> {
    return this.http.get(environment.host + '/api/getfile/' + name);
  }
}
