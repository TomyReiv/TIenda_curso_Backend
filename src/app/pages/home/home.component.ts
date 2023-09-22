import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public productos: any;
  public save: boolean = false;
  public product_imageUrl: string = '../../assets/mueble.webp'

  private productService = inject(ProductServiceService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((result) => {
      this.productos = result;
    });
  }

  redireccionarSerie(id: number) {
    this.router.navigate(['/pages/Item/', id]); 
  }

  guardarProducto(imagen:string, precio: string, nombre: string, id: any) {
    const savedItems = JSON.parse(sessionStorage.getItem('savedProduct') || '[]');
    savedItems.push({ imagen: imagen, precio: precio, nombre: nombre, id: id });
    sessionStorage.setItem('savedProduct', JSON.stringify(savedItems));
    this.save = true;
  }
}
