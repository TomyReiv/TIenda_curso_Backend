import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { ShopComponent } from './shop/shop.component';
import { ItemComponent } from './item/item.component';
import { authGuard } from '../guards/auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { UserViewComponent } from './user-view/user-view.component';
import { premiumGuard } from '../guards/premium.guard';
import { EditProductComponent } from './edit-product/edit-product.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'Home', component: HomeComponent},
      {path: 'Login', component: LoginComponent},
      {path: 'Register', component: RegisterComponent},
      {path: 'Producto', canActivate: [premiumGuard], component: AccountComponent},
      {path: 'Usuario', canActivate: [adminGuard], component: UserViewComponent},
      {path: 'Shopping_cart', canActivate: [authGuard], component: ShopComponent},
      {path: 'Item/:id', canActivate: [authGuard], component: ItemComponent},
      {path: 'edit-product/:id', canActivate: [premiumGuard], component: EditProductComponent},
      {path: '**', redirectTo: 'Home'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
