import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostauthNavComponent } from './Components/postauth-nav/postauth-nav.component';


const routes: Routes = [
    {
        path: '', component: PostauthNavComponent,
        children: [
            { path: 'vertical-listing', loadChildren: () => import('./vertical-listing/vertical-listing.module').then(m => m.VerticalListingModule) },
            { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostauthRoutingModule { }