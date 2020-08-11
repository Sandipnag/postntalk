import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostauthNavComponent } from './Components/postauth-nav/postauth-nav.component';


const routes: Routes = [
    {
        path: '', component: PostauthNavComponent,
        children: [
            { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
            { path: 'reset-password', loadChildren: () => import('./restpassword/restpassword.module').then(m => m.RestpasswordModule) },
            { path: 'category-listing', loadChildren: () => import('./category-listing/category-listing.module').then(m => m.CategoryListingModule) },
            { path: 'vertical-listing', loadChildren: () => import('./vertical-listing/vertical-listing.module').then(m => m.VerticalListingModule) },
            { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostauthRoutingModule { }
