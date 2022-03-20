import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'identity', pathMatch: 'full'},
  { path:'identity', loadChildren: () => import('./modules/identity/identity.module').then(m => m.IdentityModule) },
  { path: '**', redirectTo: 'identity', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
