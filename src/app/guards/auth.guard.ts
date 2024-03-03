import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class authGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.userService.isLoggedIn().pipe(
            switchMap(isLoggin => {
              if (isLoggin) {
                return of(true);
              } else {
                alert("Debe iniciar seción para acceder a esta pagina");
                this.router.navigate(['/pages/login']);
                return of(false);
              }
            })
          );
    }
}
