import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../../log-in/services/log-in.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanLoad {
  constructor(private logInService: LogInService, private router: Router) {
  }

  canLoad(
    route: Route): Observable<boolean> | Promise<boolean> | boolean {
    const userAuthenticated = !!this.logInService.getTokenAuth();
    if ( !userAuthenticated ) {
      this.router.navigate(['/log-in']);
      return false;
    }
    return true;
  }
}
