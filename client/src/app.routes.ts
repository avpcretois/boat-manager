import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './app/auth/auth.guard';
import { BoatListComponent } from './app/boat/boat-list/boat-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: BoatListComponent,
    canActivate: [authGuard],
  }
];
