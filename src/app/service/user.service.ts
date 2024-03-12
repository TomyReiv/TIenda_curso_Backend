import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
  /* public data: any = JSON.parse(localStorage.getItem('userData')!)  || null; */
  public user?: User;


  login(credentials: any): Observable<any> {
    const url = `${this.userUrl}/users/login`;
/*     const options = {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), 
      withCredentials: true,
    }  */
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
  getById(id: any){
    const url = `${this.userUrl}/users/${id}`;
    return this.http.get(url);
  }

  isLoggedIn(): Observable<boolean> {
    let dataStorage = JSON.parse(localStorage.getItem('userData')!) || null;
    
    if(!dataStorage){
      return of(false);
    }
    const url = `${this.userUrl}/users/${dataStorage.id}`;
   
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

  obtenerToken(): string | null {   
    return localStorage.getItem('token');
  }

  isPremium(): Observable<boolean> {
    let dataStorage = JSON.parse(localStorage.getItem('userData')!) || null;
    const url = `${this.userUrl}/users/${dataStorage.id}`;
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
    let dataStorage = JSON.parse(localStorage.getItem('userData')!) || null;
    
    const url = `${this.userUrl}/users/${dataStorage.id}`;
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

  newPass(id: any, body: any){
    const url = `${this.userUrl}/users/${id}`;
    return this.http.put(url, body)
  }
  updateUser(id:any, data:any){
    const url = `${this.userUrl}/users/${id}`;
    return this.http.put(url, data)
  }
  delete(id: any){
    const url = `${this.userUrl}/users/${id}`;
    return this.http.delete(url)
  }
  logout(id: any){
    const url = `${this.userUrl}/users/logout/${id}`;
    return this.http.get(url)
  }
}
