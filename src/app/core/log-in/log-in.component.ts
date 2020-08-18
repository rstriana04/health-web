import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from '../../store/reducers/app.reducer';
import { LogInService } from './services/log-in.service';
import { AuthUserAction } from './store/actions/log-in.actions';

@Component({
  selector: 'health-sign-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogInComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logInService: LogInService,
    private toastService: ToastrService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  public goToSignUp() {
    this.router.navigate(['./sign-up']);
  }

  private initFormLogin() {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))
    });
  }

  public sendFormLogin(formLogin: FormGroup) {
    if ( formLogin.valid ) {
      this.store.dispatch(AuthUserAction({ credentials: formLogin.value }));
    }
  }
}
