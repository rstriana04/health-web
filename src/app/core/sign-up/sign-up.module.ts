import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  declarations: [SignUpComponent],
  exports: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SignUpModule {}
