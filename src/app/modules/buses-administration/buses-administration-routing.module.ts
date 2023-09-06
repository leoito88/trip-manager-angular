import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusesListComponent } from './buses-list/buses-list.component';
import { BusesDetailComponent } from './buses-detail/buses-detail.component';

const routes: Routes = [
  {path: "", redirectTo: "list", pathMatch: "full"},
  {path: "list", component: BusesListComponent},
  {path: "create", component: BusesDetailComponent},
  {path: "detail/:id", component: BusesDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesAdministrationRoutingModule { }
