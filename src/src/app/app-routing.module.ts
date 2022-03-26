import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'identity', loadChildren: () => import('./modules/identity/identity.module').then(m => m.IdentityModule) },
  { path: '', loadChildren: () => import('./modules/garden/garden.module').then(m => m.GardenModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
