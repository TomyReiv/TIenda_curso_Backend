import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public productos!: any[];
  public save: boolean = false;
  public product_imageUrl: string = '../../assets/mueble.webp'
  public userData: any = JSON.parse(localStorage.getItem('userData')!) || null;
  private productService = inject(ProductServiceService);
  private router = inject(Router);
  private cartService = inject(CartService)

  constructor() { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((data) => {
      if (data.status === 'success') {
        this.productos = data.payload;
        console.log(this.productos);
      } else {
        console.error('Error al obtener los datos');
      }
    });
  }

  redireccionarSerie(id: number) {
    console.log(id);

    this.router.navigate(['/pages/Item/', id]);
  }

  guardarProducto(id: string, quantity: number) {
    const cartProductData = {
      pid: id.trim(),
      quantity,
    };
    const carrito = {
      userId: this.userData.id.trim(),
      items: [cartProductData]
    }
    this.cartService.addToCart(carrito).subscribe((res) => {
      alert(res.message);
    })
  }
}
