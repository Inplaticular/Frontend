import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentitySignupComponent } from './components/identity-signup/identity-signup.component';
import { IdentityComponent } from './identity.component';

const routes: Routes = [
  { path: '', component: IdentityComponent, children: [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: IdentitySignupComponent },
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }