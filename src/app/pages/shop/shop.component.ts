import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  cartItems: any[] = []; 

  constructor() {}

  ngOnInit(): void {
    
     const cartData = JSON.parse(sessionStorage.getItem('savedProduct')!);
     this.cartItems = cartData || [];
     console.log(this.cartItems)
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio, 0);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
    sessionStorage.setItem('savedProduct', JSON.stringify(this.cartItems));
  }

}
