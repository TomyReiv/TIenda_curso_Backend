import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from 'environments/environment';
import { Observable } from 'rxjs';
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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userData');
  }

  isAdmin(): boolean{
    const url = `${this.userUrl}/users/${this.data.id}`;
    this.http.get(url).subscribe((res: any)=>{
      res = this.user;
    });
    if(this.user!.rol === "admin" || this.user!.rol === "premium"){
      return true;
    } else{
      return false;
    }
  }
}
