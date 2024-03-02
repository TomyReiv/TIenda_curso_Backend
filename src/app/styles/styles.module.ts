import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CarouselModule,
    MenubarModule,
    PasswordModule,
    InputTextModule
  ],
  exports:[
    ButtonModule,
    CarouselModule,
    MenubarModule,
    PasswordModule,
    InputTextModule
  ]
})
export class StylesModule { }
