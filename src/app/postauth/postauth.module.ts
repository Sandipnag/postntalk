import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostauthRoutingModule } from './postauth-routing.module';
import { PostauthNavComponent } from './Components/postauth-nav/postauth-nav.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [PostauthNavComponent],
  imports: [
    CommonModule,
    PostauthRoutingModule,
    NgxSpinnerModule
  ],
  exports: [PostauthNavComponent]
})
export class PostauthModule { }
