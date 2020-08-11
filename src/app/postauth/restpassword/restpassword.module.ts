import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestpasswordRoutingModule } from './restpassword-routing.module';
import { ResetComponent } from './reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    RestpasswordRoutingModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class RestpasswordModule { }
