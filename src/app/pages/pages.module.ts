import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { BooksComponent } from './books/books.component';
import { OtherComponent } from './other/other.component';
import { ShopComponent } from './shop/shop.component';
import { ItemComponent } from './item/item.component';
import { StylesModule } from '../styles/styles.module';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    BooksComponent,
    OtherComponent,
    ShopComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PagesRoutingModule,
    StylesModule
  ]
})
export class PagesModule { }
