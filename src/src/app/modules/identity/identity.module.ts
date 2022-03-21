import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityComponent } from './identity.component';
import { IdentityRoutingModule } from './identity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentitySignupComponent } from './components/identity-signup/identity-signup.component';
import { IdentityService } from './services/identity.service';
import { IdentityLoginComponent } from './components/identity-login/identity-login.component';

@NgModule({
  imports: [
    CommonModule,
    IdentityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    IdentityComponent,
    IdentitySignupComponent,
    IdentityLoginComponent
  ],
  providers: [
    IdentityService
  ]
})
export class IdentityModule { }
