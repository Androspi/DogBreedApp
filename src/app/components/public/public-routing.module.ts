import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';

const routes: Routes = [{
  component: PublicComponent,
  path: '',
  children: [
    { path: 'home', loadComponent: () => import('./home/home.component').then(e => e.HomeComponent) },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
  ]
}, { path: '**', pathMatch: 'full', redirectTo: '/home' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
