import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ProductModule { }
