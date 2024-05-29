import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public loginStatusSubject=new Subject<boolean>();

    constructor(private http:HttpClient,
    private route:Router) { }

  //get current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/currentuser`);
  }

  public generateToken(logindata:any){
    return this.http.post(`${baseUrl}/generate-token`,logindata);
  }


  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //console.log("logout");
    //this.route.navigate(['login']);
  }

  public isloggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==null || tokenStr==undefined || tokenStr.trim()==''){
      return false;
    }else{
      return true;
    }
  }

  public getToken(){
    return localStorage.getItem('token');

  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));

  }

  public getUser(){
    
    let userStr=localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }

}
