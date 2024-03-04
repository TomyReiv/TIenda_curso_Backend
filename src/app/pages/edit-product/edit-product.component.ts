import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/interface/producto';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  public productos!: any;
  public pid!: string;

  public owner: any = localStorage.getItem('userData');
  private route = inject(ActivatedRoute);
  private fb =  inject(FormBuilder);
  private productService =  inject(ProductServiceService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pid = params.get('id')!;
      this.productService.searchProduct(this.pid).subscribe((result) => {
        this.productos = result;
        // Almacena los valores originales del producto
        this.myForm.patchValue({
          title: result.title,
          description: result.description,
          price: result.price,
          code: result.code,
          stock: result.stock,
          category: result.category
        });
      });
    });
  }

  public myForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    file: ['', Validators.required],
    code: ['', Validators.required],
    stock: ['', Validators.required],
    category: ['', Validators.required],
  });

  constructor() {}

  onFileSelected(event: any) {
    const file = event.target.files[0]; 
    this.myForm.patchValue({ file: file });
  }

  submitForm() {
    const formData = new FormData();

    // Compara los valores actuales con los originales y agrega al FormData solo los campos modificados
    const formValues = this.myForm.value;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key) && formValues[key] !== this.productos[key]) {
        formData.append(key, formValues[key]);
        
        
      }
    }

    formData.append('owner', this.owner!.email);
    console.log(formData);
    this.route.paramMap.subscribe((params)=>{
      this.pid = params.get('id')!;
      console.log(this.pid);
      
      this.productService.updateProduct(this.pid, formData).subscribe(
        (res) => {
          alert('Carga correctamente');
          window.location.reload();
        },
        (error) => {
          console.error(error);
        }
      );
    })
  }
}
