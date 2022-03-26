import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentityService } from './modules/identity/services/identity.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    }),
    MatDialogModule
  ],
  providers: [
    IdentityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
