import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  items: MenuItem[] | undefined;

  private router = inject(Router);

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/pages/Home',

      },
      {
        label: 'Tienda',
        icon: 'pi pi-fw pi-shopping-bag',
        items: [
          {
            label: 'Libros',
            icon: 'pi pi-fw pi-book',
            routerLink: '/pages/Books'
          },
          {
            label: 'Otros',
            icon: 'pi pi-fw pi-ellipsis-h',
            routerLink: '/pages/Other'
          }
        ]
      },
      {
        label: 'Mi cuenta',
        icon: 'pi pi-fw pi-user',
        routerLink: '/pages/Account'
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
      }
    ]
  }

  redirectTo() {
    window.open(`http://localhost:4200/pages/Shopping_cart`, "_self");
  }
}
