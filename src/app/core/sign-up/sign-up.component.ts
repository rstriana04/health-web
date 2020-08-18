import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpService } from './services/sign-up.service';

@Component({
  selector: 'health-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
  formSignUp: FormGroup;

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initFormSignUp();
  }

  public goToLogIn() {
    this.router.navigate(['']);
  }

  private initFormSignUp() {
    this.formSignUp = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      phone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      dni: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      dateBirth: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5)]))
    });
  }

  public sendFormSignUp(formSignUp: FormGroup) {
    if ( formSignUp.valid ) {
      const user = { ...formSignUp.value, dateBirth: formSignUp.value.dateBirth.toISOString() };
      this.signUpService.signUp(user).subscribe(response => {
        this.toastService.success(`${ response.message }, Please login`, '¡Success!', {
          closeButton: true,
          timeOut: 9000,
          progressAnimation: 'decreasing',
          progressBar: true
        });
        this.formSignUp.reset();
      }, error => {
        this.toastService.error(error.error.message, '¡Oops, error!', {
          closeButton: true,
          timeOut: 9000,
          progressAnimation: 'decreasing',
          progressBar: true
        });
        console.error(error);
      });
    }
  }
}
