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

  private readonly userUrl: string = enviroment.Url;
  private http = inject(HttpClient);

 /*  searchProduct(){
    this.http.get(this.userUrl).subscribe((data: any) => {
      return data;
    });
  } */
  
  serachById(id: number){
    this.http.get(this.userUrl).subscribe((data: any) => {
      const product = data.find((product: any) => product.id === id);
      this.productos = product ? [product] : [];
    });
  }


  searchProduct(productId: number): Observable<any> {
    return this.http.get(this.userUrl).pipe(
      map((data: any) => {
        const product = data.find((product: any) => product.id === productId);
        console.log(product)
        return product ? [product] : [];
      })
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.userUrl);
  }

}
