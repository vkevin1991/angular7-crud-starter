import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  decodeToken: any;
  apiUrl: string = environment.apiUrl;
  constructor(
    private _http: HttpClient) { }
  isAuthenticated(){
    let token: string = localStorage.getItem("token");
    if(!token){
      return false;
    }else{
      this.token = token;
      this.decodeToken = this.getUserInfo();
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
  getUserInfo(){
    const helper = new JwtHelperService();
    return helper.decodeToken(this.token);
  }
  getPermissions(){
    return this.decodeToken.permissions;
  }
  evaluatePermissions(permission:string){
    let permissions = this.getPermissions();
    return (permissions.length && permissions[0] === 'all') || permissions.indexOf(permission) !== -1;
  }
  login(data): Observable<any>{
    return this._http.post(`${this.apiUrl}/login`, data);
  }
  logout(){
    localStorage.removeItem("token");
    this.token = '';
  }
}
