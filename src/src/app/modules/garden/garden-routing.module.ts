import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from '../identity/services/user-logged-in-guard.service';
import { GardenDetailComponent } from './components/garden-detail/garden-detail.component';
import { UserComponent } from './components/user/user.component';
import { GardenMainComponent } from './garden.component';

const routes: Routes = [
  { path: '', component: GardenMainComponent, children: [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', component: UserComponent, canActivate: [ UserLoggedInGuard ] },
    { path: 'user/garden/:id', component: GardenDetailComponent, canActivate: [ UserLoggedInGuard ] }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GardenRoutingModule { }