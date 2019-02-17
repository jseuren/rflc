import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
import { SlidesResolve } from './slides/resolve/slidesResolve';

const routes: Routes = [
  { path: 'slides', component: CarouselBasicComponent, resolve: {slides: SlidesResolve}  },
  { path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: true } ),
    CommonModule
  ],
  providers:[SlidesResolve]
})
export class AppRoutingModule { }


