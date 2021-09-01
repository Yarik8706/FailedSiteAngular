import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private baseUrl: String;
  token: any;
  user: any;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/login"
  }

  registerUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      this.baseUrl + 'login/reg',
      user,
      {headers: headers}
      ).pipe((response: any) => response);
  }

  authUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      this.baseUrl + '/auth',
      user,
      {headers: headers}
      ).pipe((response: any) => response);
  }

  storeUser(token, user) {
    sessionStorage.setItem('token', token)
    //localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('userName', user.name)
    localStorage.setItem('userEmail', user.email)
    localStorage.setItem('userPassword', user.password)
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear()
    sessionStorage.clear()
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != undefined;
  }
}
