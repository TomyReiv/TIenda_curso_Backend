import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder); 
  public id: any;
  value: string = '';

  handlePasswordChange(event: any) {
    this.value = event.value;
  }

  enviado: boolean = false;

  public myForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    re_password: ['', Validators.required],
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
  send(): any {
    const equalPass =  this.myForm.value.password === this.myForm.value.re_password
    if(!equalPass){
      return alert("Las contraseñas no coinciden")
    }
    
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.userService.newPass(this.id, this.myForm.value).subscribe(
        (res: any) => {
        alert(res.message)
    this.router.navigate(["/pages/login"])
      },(err)=>{
        alert(err.message)
      }
      );
    });

  }
}
