import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyListModule } from "@angular/material/legacy-list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminTopbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatLegacyListModule,
    MatSidenavModule,
    RouterModule
  ],
  exports: [AdminLayoutComponent]
})
export class AdminLayoutModule { }
