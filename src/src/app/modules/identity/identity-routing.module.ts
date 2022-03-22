import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentityForgotPasswordComponent } from './components/identity-forgot-password/identity-forgot-password.component';
import { IdentityLoginComponent } from './components/identity-login/identity-login.component';
import { IdentitySignupComponent } from './components/identity-signup/identity-signup.component';
import { IdentityComponent } from './identity.component';

const routes: Routes = [
  { path: '', component: IdentityComponent, children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'signup', component: IdentitySignupComponent },
    { path: 'login', component: IdentityLoginComponent},
    { path: 'forgot_password', component: IdentityForgotPasswordComponent},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IdentityRoutingModule { }