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
  public productos!: any[];

  public owner: any = JSON.parse(localStorage.getItem('userData') || '{}');
  private router = inject(Router);
  private fb =  inject(FormBuilder);
  private productService =  inject(ProductServiceService);
  public url: string = "https://vengeful-rat-production.up.railway.app/img/";
  ngOnInit(): void {

    this.productService.getAllProducts().subscribe((data) => {
      if (data.status === 'success') {
        this.productos = data.payload;
      } else {
        console.error('Error al obtener los datos');
      }
    });
  }

  delete(id: any){
    this.productService.delete(id).subscribe(
      (res: any)=>{
      alert(res.message);
      this.router.navigate(['/pages/Producto']);
    },(err)=>{
      alert(err.error.message);
    }
    )
  };

  edit(id: any){
    this.router.navigate(['/pages/edit-product', id]);
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
    formData.append('title', this.myForm.value.title);
    formData.append('description', this.myForm.value.description);
    formData.append('price', this.myForm.value.price);
    formData.append('file', this.myForm.value.file); 
    formData.append('code', this.myForm.value.code);
    formData.append('stock', this.myForm.value.stock);
    formData.append('category', this.myForm.value.category);
    formData.append('owner', this.owner!.email);
    console.log(this.owner);
    
    this.productService.saveProduct(formData).subscribe(
      (res) => {
        console.log(formData);
        
        alert('Carga correctamente')
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  };
};
