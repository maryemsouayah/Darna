import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS,HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

 /*    const customReq = request.clone({

    });
    return next.handle(customReq);
  } */
  if(sessionStorage.getItem('token') != null)
  {
    const token =  sessionStorage.getItem('token');
  // if the token is  stored in localstorage add it to http header
  const headers = new HttpHeaders().set('Authorization' ,'Bearer ' + token);
     //clone http to the custom AuthRequest and send it to the server
  const AuthRequest = request.clone( { headers: headers});
  return next.handle(AuthRequest)
     }else {
       return next.handle(request);
     }
}
}
export const InterceptorProvider ={
  provide :HTTP_INTERCEPTORS,
  useClass: Interceptor,
  multi: true
}
