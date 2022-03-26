import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from '../identity/services/user-logged-in-guard.service';
import { UserComponent } from './components/user/user.component';
import { GardenMainComponent } from './garden.component';

const routes: Routes = [
  { path: '', component: GardenMainComponent, children: [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent, canActivate: [ UserLoggedInGuard ] }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GardenRoutingModule { }