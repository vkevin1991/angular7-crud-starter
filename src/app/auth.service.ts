import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) { }
  isAuthenticated(){
    let token: string = localStorage.getItem("token");
    if(!token){
      return false;
    }else{
      this.token = token;
      return true;
    }
  }
  getToken(){
    return this.token;
  }
  setToken(token){
    localStorage.setItem('token', token);
    this.token = token;
  }
  login(data): Observable<any>{
    return this._http.post(`${this.apiUrl}/login`, data);
  }
  logout(){
    localStorage.removeItem("token");
    this.token = '';
  }
}
