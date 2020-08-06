import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListingComponent } from './category-listing.component';

const routes: Routes = [{ path: '', component: CategoryListingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryListingRoutingModule { }
