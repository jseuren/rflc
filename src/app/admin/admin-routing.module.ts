import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { SpotifyComponent } from './spotify/spotify.component';

const adminRoutes: Routes = [
    { path: '', component: AdminComponent }, 
    { path: 'spotify', component: SpotifyComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }