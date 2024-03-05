import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { StylesModule } from '../styles/styles.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { UserViewComponent } from './user-view/user-view.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NewPassComponent } from './new-pass/new-pass.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ShopComponent,
    ItemComponent,
    UserViewComponent,
    EditProductComponent,
    RecoverPasswordComponent,
    NewPassComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PagesRoutingModule,
    StylesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
