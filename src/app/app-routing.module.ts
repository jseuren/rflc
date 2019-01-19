import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';

const routes: Routes = [
  { path: 'slides', component: CarouselBasicComponent },
  { path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: true } ),
    CommonModule
  ]
})
export class AppRoutingModule { }


