import {  HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { Injectable } from "@angular/core";

const TOKEN_HEADER='Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private logService:LoginService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReq=req;

        let token=this.logService.getToken();
        if(token!=null){
            console.log("inside interceptor");
            authReq=authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`},
            });
        }
        return next.handle(authReq);
    }
}
export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
]