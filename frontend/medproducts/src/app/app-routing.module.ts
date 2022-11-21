import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { HomeComponent  } from './features/home/home.component';
import {AuthGuard} from './core/helpers/auth.guard'


const routes: Routes = [

  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
