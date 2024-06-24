import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const checkAuthenticated = this.authService.checkAuthenticated();
    if (checkAuthenticated) {
      this.router.navigate(['/apps/todolist'])
    }

    return checkAuthenticated;
  }
}
