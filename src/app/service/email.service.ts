import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly userUrl: string = enviroment.UrlEmail;
  private http = inject(HttpClient);
  public data: any = JSON.parse(localStorage.getItem('userData')!)  || null;

  send(body:any){
    const url = `${this.userUrl}/pass-recover`;
    return this.http.post(url, body);
  }

  constructor() { }
}
