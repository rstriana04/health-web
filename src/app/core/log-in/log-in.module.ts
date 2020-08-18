import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../shared/shared.module';
import { SignUpModule } from '../sign-up/sign-up.module';

import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';
import { LogInEffects } from './store/effects/log-in.effects';

@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    LogInRoutingModule,
    SharedModule,
    SignUpModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([LogInEffects])
  ]
})
export class LogInModule {}
