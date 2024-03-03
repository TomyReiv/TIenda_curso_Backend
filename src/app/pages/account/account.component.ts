import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  product: any = {}; 

  public owner: any = localStorage.getItem('userData');
  private router = inject(Router);
  private fb =  inject(FormBuilder);
  private productService =  inject(ProductServiceService);

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
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    this.myForm.patchValue({ file: file }); // Asignar el archivo al campo 'file' del formulario
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.myForm.value.title);
    formData.append('description', this.myForm.value.description);
    formData.append('price', this.myForm.value.price);
    formData.append('file', this.myForm.value.file); // Obtener el archivo del campo 'file'
    formData.append('code', this.myForm.value.code);
    formData.append('stock', this.myForm.value.stock);
    formData.append('category', this.myForm.value.category);
    formData.append('owner', this.owner!.email);

    this.productService.saveProduct(formData).subscribe(
      (res) => {
        alert('Carga correctamente')
        this.myForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
