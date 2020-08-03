import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalListingComponent } from './vertical-listing.component';

const routes: Routes = [{ path: '', component: VerticalListingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalListingRoutingModule { }
