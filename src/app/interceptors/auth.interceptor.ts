import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from "../utils/local-storage.service";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService : LocalStorageService, private router: Router, public authService: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedRoutes = [
      'auth/signin',
      'auth/signup'
    ];

    const shouldExclude = excludedRoutes.some(url => req.url.includes(url));

    if (shouldExclude) {
      return next.handle(req);
    } else {
      const {token} = this.localStorageService.get('user')!;
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService.logout();
            this.localStorageService.delete('user');
            this.router.navigate(['/auth/boxed-signin']);
          }
          return throwError(error);
        })
      );
    }
  }
}
