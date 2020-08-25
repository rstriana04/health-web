import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInService } from '../../core/log-in/services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private logInService: LogInService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if ( req.url.indexOf('/auth/log-in') !== -1 ) {
      return next.handle(req);
    }
    try {
      const token = this.logInService.getTokenAuth();
      if ( token ) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + token);
        const newRequest = req.clone({
          headers
        });
        return next.handle(newRequest);
      } else {
        console.warn('Token Not Found');
        // Logout
        this.logInService.logout();
        return next.handle(req);
      }
    } catch ( e ) {
      console.error('Authentication Not Found');
      // Logout
      this.logInService.logout();
      return next.handle(req);
    }
  }

}
