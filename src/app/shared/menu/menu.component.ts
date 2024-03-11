import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items: MenuItem[] | undefined;

  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/pages/Home',

      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: '/pages/Login'
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-edit',
        routerLink: '/pages/Register'
      },
      {
        label: 'Premium',
        icon: 'pi pi-fw pi-user',
        items:[
          {
            label: 'Producto',
            icon: 'pi pi-fw pi-list',
            routerLink: '/pages/Producto'
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-fw pi-user-edit',
            routerLink: '/pages/Usuario'
          }
        ]
      }
    ]
  }

  redirectTo() {
    this.router.navigate(['/pages/Shopping_cart']);
  }
  logout() {
    let id: any = JSON.parse(localStorage.getItem('userData')!)  
    this.userService.logout(id.id).subscribe(
      (res)=>{
        console.log(res); 
    },(err)=>{
      console.log(err);
    })
    localStorage.removeItem("userData");
    this.router.navigate(['/pages/Login']);
  }
}
