import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { enviroment } from 'environments/environment.prod';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private userService = inject(UserService);
  private router = inject(Router);
  public url = enviroment.Url;

  value: string = '';
  constructor(private fb: FormBuilder) { }

  handlePasswordChange(event: any) {
    this.value = event.value;
  }

  enviado: boolean = false;

  public myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
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
    this.userService.login(this.myForm.value).subscribe(
      (res) => {
      localStorage.setItem('userData', JSON.stringify(res.user));
      localStorage.setItem('token', JSON.stringify(res.token));
      this.router.navigate(['/pages/home']);
    },(err)=>{
      alert('Email o contraseña incorrectas')
      console.log(err);
      
    })

  }

  recoverPassword(){
    this.router.navigate(['/pages/recoverPassword']);
  }
}
