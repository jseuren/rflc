
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';

@NgModule({
  imports:      [ BrowserModule, NgbCarouselModule ],
  declarations: [ AppComponent, CarouselBasicComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }