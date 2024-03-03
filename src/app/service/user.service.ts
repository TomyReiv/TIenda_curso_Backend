import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from 'environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userUrl: string = enviroment.Url;
  private http = inject(HttpClient);
  public data: any = JSON.parse(localStorage.getItem('userData')!)  || null;
  public user?: User;


  login(credentials: any): Observable<any> {
    const url = `${this.userUrl}/users/login`;
    return this.http.post(url, credentials);
  }
  register(credentials: any): Observable<any> {
    const url = `${this.userUrl}/users`;
    return this.http.post(url, credentials);
  }
  get(){
    const url = `${this.userUrl}/users`;
    return this.http.get(url);
  }

  isLoggedIn(): Observable<boolean> {
    if(!this.data){
      return of(false);
    }
    const url = `${this.userUrl}/users/${this.data.id}`;
   
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.rol === "admin" || res.rol === "premium" || res.rol === "user";
      }),
      catchError(error => {
        console.error('Error al obtener el rol del usuario:', error);
        return of(false);
      })
    );
  }

  isPremium(): Observable<boolean> {
    const url = `${this.userUrl}/users/${this.data.id}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.rol === "admin" || res.rol === "premium";
      }),
      catchError(error => {
        console.error('Error al obtener el rol del usuario:', error);
        return of(false);
      })
    );
  }

  isAdmin(): Observable<boolean> {
    const url = `${this.userUrl}/users/${this.data.id}`;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res.rol === "admin";
      }),
      catchError(error => {
        console.error('Error al obtener el rol del usuario:', error);
        return of(false);
      })
    );
  }
}
