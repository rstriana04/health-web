import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', loadChildren: () => import('./core/log-in/log-in.module').then(m => m.LogInModule) },
  { path: 'sign-up', loadChildren: () => import('./core/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'home', loadChildren: () => import('./core/home/home.module').then(m => m.HomeModule) },
  { path: '**', redirectTo: 'log-in', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
