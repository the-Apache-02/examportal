import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) {
    
   }

  public addUser(user:any){
    return this.http.post(`${baseUrl}/create/`,user);
  }
}
