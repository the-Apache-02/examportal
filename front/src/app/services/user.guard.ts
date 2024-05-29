import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

export const userGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  // const authService=inject(LoginService);
  // if(!authService.isloggedIn()){
  //   return inject(Router).navigate(['login']);
  // }else if(authService.isloggedIn() && authService.getUserRole()=='Normal'){
  //   return true;
  // }else{
  //   return inject(Router).navigate(['login']);
  // }
  return inject(LoginService).isloggedIn() && 
  inject(LoginService).getUserRole()=='Normal'?true:inject(Router).navigate(['login']);
};
