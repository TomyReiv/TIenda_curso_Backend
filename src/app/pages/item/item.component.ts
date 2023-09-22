import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  public save: boolean = false;
  private route = inject(ActivatedRoute);
  public productos: any[] = [];
  public productIdToSearch!: number;
  public product_imageUrl: string = '../../assets/mueble.webp'

  private productService = inject(ProductServiceService);

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.productIdToSearch = +params.get('id')!;
      this.productService.searchProduct(this.productIdToSearch).subscribe((result) => {
        this.productos = result;
      });
    });

  }


  guardarProducto(imagen:string, precio: string, nombre: string, id: any) {
    const savedItems = JSON.parse(sessionStorage.getItem('savedProduct') || '[]');
    savedItems.push({ imagen: imagen, precio: precio, nombre: nombre, id: id });
    sessionStorage.setItem('savedProduct', JSON.stringify(savedItems));
    this.save = true;
  }
}
