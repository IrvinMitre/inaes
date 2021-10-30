import { AuthService } from './auth.service';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  public canActivate() {
    return this.auth.isLogged;
  }
}
