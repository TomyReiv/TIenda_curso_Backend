import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    CarouselModule,
    MenubarModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule
  ],
  exports:[
    ButtonModule,
    CarouselModule,
    MenubarModule,
    PasswordModule,
    InputTextModule,
    ProgressSpinnerModule
  ]
})
export class StylesModule { }
