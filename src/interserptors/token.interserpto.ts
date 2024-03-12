import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.obtenerToken();
    const tokenSinComillas = token?.replace(/^"(.*)"$/, '$1');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenSinComillas?.trim()}`
        }
      });
    }

    return next.handle(request);
  }
}
