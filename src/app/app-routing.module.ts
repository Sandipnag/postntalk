import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { VerticalsComponent } from './components/verticals/verticals.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'verticals',component:VerticalsComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'category',component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
