import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  public goToSignUp() {
    this.router.navigate(['./sign-up']);
  }

  private initFormLogin() {
    this.formLogin = new FormGroup({
      user: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]))
    });
  }

  public sendFormLogin(formLogin: FormGroup) {
    if (formLogin.valid) {
      this.router.navigate(['./home']);
    }
  }
}
