import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';


@NgModule({
  declarations: [BrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class BrandModule { }
