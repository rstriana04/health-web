import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../shared/shared.module';
import { GetUserAuthenticated } from '../log-in/store/effects/get-user-authenticated';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeReducer } from './store/reducers/home.reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('home', HomeReducer),
    EffectsModule.forFeature([GetUserAuthenticated])
  ]
})
export class HomeModule {}
