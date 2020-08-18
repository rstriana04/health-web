import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './core/home/guards/home.guard';
import { LogInGuard } from './core/log-in/guards/log-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', loadChildren: () => import('./core/log-in/log-in.module').then(m => m.LogInModule), canLoad: [LogInGuard] },
  { path: 'sign-up', loadChildren: () => import('./core/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'home', loadChildren: () => import('./core/home/home.module').then(m => m.HomeModule), canLoad: [HomeGuard] },
  { path: '**', redirectTo: 'log-in', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
