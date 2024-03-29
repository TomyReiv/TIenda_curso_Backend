import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  public save: boolean = false;
  private route = inject(ActivatedRoute);
  public productos!: Producto;
  public id!: string;
  public userData: any = JSON.parse(localStorage.getItem('userData')!) || null;
  public url: string = "https://vengeful-rat-production.up.railway.app/img/";
  private productService = inject(ProductServiceService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private cartService = inject(CartService)

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.productService.searchProduct(this.id).subscribe((result) => {
        this.productos = result;
      });
    });

  }
  public myForm: FormGroup = this.fb.group({
    valor: ['', Validators.required],
  });


  guardar(id: string) {
    const cartProductData = {
      pid: id.trim(),
      quantity: this.myForm.value.valor,
    };
    const carrito = {
      userId: this.userData.id.trim(),
      items: [cartProductData]
    }
    const data = JSON.stringify(carrito)
    this.cartService.addToCart(carrito).subscribe(
      (res) => {
      alert(res.message);
    },
    (err)=>{
      console.log(err);
      alert(err.error.message);
    }
    )
  }
}
