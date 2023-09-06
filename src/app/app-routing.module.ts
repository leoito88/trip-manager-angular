import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/admin-layout/admin-layout.component";


const routes: Routes = [
  {path: '', redirectTo: 'person', pathMatch: 'full'},
 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'person',
        loadChildren: () =>
          import('./modules/person-administration/person-administration.module').then(mod => mod.PersonAdministrationModule)
      },
      {
        path: 'buses',
        loadChildren: () =>
          import('./modules/buses-administration/buses-administration.module').then(mod => mod.BusesAdministrationModule)
      },
      {
        path: 'trips',
        loadChildren: () =>
          import('./modules/trip-administration/trip-administration.module').then(mod => mod.TripAdministrationModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
