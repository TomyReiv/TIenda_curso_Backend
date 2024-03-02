import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Cart } from '../interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartUrl: string = enviroment.Url;
  private http = inject(HttpClient);
  
  getCart(id: string): Observable<any>{
    const url = `${this.cartUrl}/cart/${id}`;
    return this.http.get(url)
  }
  addToCart(cartData: any): Observable<any> {
    const url = `${this.cartUrl}/cart/`;
    return this.http.post(url, cartData);
  }
  deleteToCart(cid: string, pid: string){
    const url = `${this.cartUrl}/cart/${cid}/product/${pid}`;
    return this.http.delete(url);
  }
  buyCart(cid: string, body: any){
    const url = `${this.cartUrl}/cart/${cid}/shop`;
    return this.http.post(url, body);
  }
}
