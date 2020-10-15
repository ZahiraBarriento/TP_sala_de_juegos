import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private AFauth : AngularFireAuth, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //VERIFICO QUE HAYA ALGUIEN LOGEADO
    return this.AFauth.authState.pipe(map(auth =>{
      if(auth === null || auth === undefined){
        this.router.navigate(['/login']);
        return false
      }else{
        return true
      }
    }))  
  }
}
