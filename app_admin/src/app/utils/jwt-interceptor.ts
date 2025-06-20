import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authentication } from '../services/authentication';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: Authentication) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI = false;

    // Identify login or register requests
    if (
      request.url.startsWith('login') ||
      request.url.startsWith('register')
    ) {
      isAuthAPI = true;
    }

    // Only attach token if logged in and not an auth API call
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    // No token needed
    return next.handle(request);
  }
}

// Optional: a placeholder functional interceptor (not used if class-based is active)
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};