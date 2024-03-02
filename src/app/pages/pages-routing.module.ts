import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { ItemComponent } from './item/item.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'Home', component: HomeComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'Register', component: RegisterComponent},
      {path: 'Account', component: AccountComponent},
      {path: 'Shopping_cart', component: ShopComponent},
      {path: 'Item/:id', component: ItemComponent},
      {path: '**', redirectTo: 'Home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
