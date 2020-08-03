import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: 'vertical-listing', loadChildren: () => import('./vertical-listing/vertical-listing.module').then(m => m.VerticalListingModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostauthRoutingModule { }
