import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from 'src/app/service/email.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
  private emailService = inject(EmailService);
  private router = inject(Router);
  private fb = inject(FormBuilder); 
  value: string = '';

  handlePasswordChange(event: any) {
    this.value = event.value;
  }

  enviado: boolean = false;

  public myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
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
    this.emailService.send(this.myForm.value).subscribe(
      (res: any) => {
      alert(res.message)
      this.router.navigate(['/login']);
    },(err)=>{
      alert('Email incorrectas')
    })

  }
}
