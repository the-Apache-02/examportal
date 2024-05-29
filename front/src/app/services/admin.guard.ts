import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:
  RouterStateSnapshot) => {
    // const authService=inject(LoginService);
    // if(!authService.isloggedIn()){
    //   return inject(Router).navigate(['login']);
    // }else if(authService.getUserRole()=='Normal'){
    //   return inject(Router).navigate(['login']);
    // }else{
    //   return true;
    // }
  return inject(LoginService).isloggedIn() && (inject(LoginService).getUserRole()=='Admin')?true:inject(Router).navigate(['login']);
};
