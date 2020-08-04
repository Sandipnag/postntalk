import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthGuardService } from './Services/auth-guard.service';
import { JwtHelperService, JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

const jwtModuleOptions: JwtModuleOptions = {
  config: {
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot(jwtModuleOptions)
  ],
  providers: [AuthGuardService, JwtHelperService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
