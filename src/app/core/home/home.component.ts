import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../store/reducers/app.reducer';
import { LogInService } from '../log-in/services/log-in.service';
import { GetUserAuthenticatedAction } from '../log-in/store/actions/log-in.actions';
import { selectUserAuthenticated } from '../log-in/store/selectors/log-in.selectors';
import { User } from '../sign-up/models/user';

@Component({
  selector: 'health-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(
    Breakpoints.Handset).pipe(map(result => result.matches));
  user$: Observable<User>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private logInService: LogInService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(GetUserAuthenticatedAction({ token: this.logInService.getTokenAuth() }));
    this.user$ = this.store.pipe(select(selectUserAuthenticated));
  }

  public logout() {
    this.logInService.logout().subscribe(response => {
      if ( response ) {
        sessionStorage.removeItem('token');
        this.router.navigate(['./log-in']);
      }
    }, error => {
      console.error(error);
    });
  }

  public redirect(link: string) {
    this.router.navigate([`./home/${ link }`]);
  }
}
