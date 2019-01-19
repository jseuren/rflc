import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { AdminComponent }           from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SpotifyComponent } from './spotify/spotify.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    SpotifyComponent
  ]
})
export class AdminModule {}