import { User } from 'src/app/interface/user';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { enviroment } from 'environments/environment.prod';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  public user!: any;
  private userService = inject(UserService);
  private router = inject(Router);
  public url = enviroment.Url;
  private fb = inject(FormBuilder);
  public id: any;
  private route = inject(ActivatedRoute);
  public owner: any = localStorage.getItem('userData');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.userService.getById(this.id).subscribe((result: any) => {
        this.user = result;
        // Almacena los valores originales del producto
        this.myForm.patchValue({
          username: result.username,
          lastname: result.lastname,
          email: result.email,
          rol: result.rol,
          status: result.status,
        });
      });
    });
  };

  public myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', Validators.required],
    status: ['', Validators.required],
  });

  submitForm() {

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;

      this.userService.updateUser(this.id, this.myForm.value).subscribe(
        (res: any) => {
          alert(res.message);
          this.router.navigate(["pages/Usuario"]);
        },
        (error) => {
          console.error(error);
        }
      );
    })
  };
}
