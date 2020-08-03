import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalListingRoutingModule } from './vertical-listing-routing.module';
import { VerticalListingComponent } from './vertical-listing.component';


@NgModule({
  declarations: [VerticalListingComponent],
  imports: [
    CommonModule,
    VerticalListingRoutingModule
  ]
})
export class VerticalListingModule { }
