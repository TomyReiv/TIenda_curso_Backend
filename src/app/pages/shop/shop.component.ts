import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  private router = inject(Router);
  private cartService = inject(CartService)
  public cartItems: any[] = []; 
  public userData: any = JSON.parse(localStorage.getItem('userData')!) || null;
  public cid?: any;
  public waiting: boolean = false;
  public url: string = "https://vengeful-rat-production.up.railway.app/img/";

  ngOnInit(): void {
    
     this.cartService.getCart(this.userData.cart).subscribe((res)=>{
      this.cid = res._id
      this.cartItems.push(res.items);    
     })
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems[0]?.forEach((item: { pid: { price: number; }; quantity: number; }) => {
      totalPrice += (item.pid.price * item.quantity);
    });

    return totalPrice;
  }

  removeFromCart(pid: any): void {
    this.cartService.deleteToCart(this.cid, pid).subscribe((res: any)=>{
      alert(res.message);
      this.router.navigate(['/pages/Shopping_cart']);
    })
  }
  buy(){
    this.waiting = true
    let body = {
      email: this.userData.email,
      username: this.userData.username,
    };
    this.cartService.buyCart(this.cid, body).subscribe(
      (res:any)=>{
      this.waiting = false
      alert(res.message)
      window.location.reload();
    },(err)=>{
      console.error(err);
      
    }
    )
  }

}
