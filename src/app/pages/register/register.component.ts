import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  private fb=  inject(FormBuilder);

  enviado: boolean = false;

  public myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    lastname: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    address: this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required]
    })
  });

  validField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  fieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `*Este campo es obligatorio`;
        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} caraters`;
      }
    }
    return null;
  }
  send() {
    this.userService.register(this.myForm.value).subscribe((res) => {
      alert(res.message)
      this.router.navigate(['/pages/Login'])
    })
  }
}
