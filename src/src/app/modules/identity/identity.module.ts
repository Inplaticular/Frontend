import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityComponent } from './identity.component';
import { IdentityRoutingModule } from './identity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentitySignupComponent } from './components/identity-signup/identity-signup.component';
import { IdentityService } from './services/identity.service';
import { IdentityLoginComponent } from './components/identity-login/identity-login.component';
import { IdentityForgotPasswordComponent } from './components/identity-forgot-password/identity-forgot-password.component';
import { IdentitySetNewPasswordComponent } from './components/identity-forgot-password/components/identity-set-new-password/identity-set-new-password.component';
import { IdentityGetResetTokenComponent } from './components/identity-forgot-password/components/identity-get-reset-token/identity-get-reset-token.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    IdentityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    IdentityComponent,
    IdentitySignupComponent,
    IdentityLoginComponent,
    IdentityForgotPasswordComponent,
    IdentityGetResetTokenComponent,
    IdentitySetNewPasswordComponent
  ],
  providers: [
    IdentityService
  ]
})
export class IdentityModule { }
