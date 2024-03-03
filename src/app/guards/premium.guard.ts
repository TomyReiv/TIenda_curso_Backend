import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class premiumGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.userService.isPremium().pipe(
      switchMap(isAdmin => {
        if (isAdmin) {
          return of(true);
        } else {
          alert("Solo administradores y usuarios premium tienen acceso a esta ruta")
          this.router.navigate(['/pages/home']);
          return of(false);
        }
      })
    );
  }
}
