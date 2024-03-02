import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from 'environments/environment';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  public productos: any[] = [];

  constructor() { }

  private readonly prodUrl: string = enviroment.Url;
  private http = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.prodUrl}/products`);
  }
  
  serachById(id: string){
    this.http.get(`${this.prodUrl}/products`).subscribe((data: any) => {
      const product = data.find((product: any) => product._id === id);
      this.productos = product ? [product] : [];
    });
  }


   searchProduct(productId: string): Observable<any> {
    return this.http.get(`${this.prodUrl}/products`).pipe(
      map((data: any) => {
        const product = data.payload.find((product: any) => product._id === productId);       
        return product;
      })
    );
  }

/*   getAllProducts(): Observable<any> {
    return this.http.get(this.userUrl);
  } */

}
