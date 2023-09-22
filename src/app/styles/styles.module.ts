import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CarouselModule,
    MenubarModule,
  ],
  exports:[
    ButtonModule,
    CarouselModule,
    MenubarModule,
  ]
})
export class StylesModule { }
