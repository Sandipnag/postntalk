import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VerticalListingRoutingModule } from './vertical-listing-routing.module';
import { VerticalListingComponent } from './vertical-listing.component';


@NgModule({
  declarations: [VerticalListingComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    VerticalListingRoutingModule
  ]
})
export class VerticalListingModule { }
