import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class LogInGuard implements CanLoad {
  constructor(private logInService: LogInService, private router: Router) {

  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const userAuthenticated = !!this.logInService.getTokenAuth();
    if ( !userAuthenticated ) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
