import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryListingRoutingModule } from './category-listing-routing.module';
import { CategoryListingComponent } from './category-listing.component';


@NgModule({
  declarations: [CategoryListingComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    CategoryListingRoutingModule
  ]
})
export class CategoryListingModule { }
