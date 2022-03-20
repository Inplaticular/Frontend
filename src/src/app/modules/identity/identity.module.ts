import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityComponent } from './identity.component';
import { IdentityRoutingModule } from './identity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdentitySignupComponent } from './components/identity-signup/identity-signup.component';
import { IdentityService } from './services/identity.service';

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
  ],
  providers: [
    IdentityService
  ]
})
export class IdentityModule { }
