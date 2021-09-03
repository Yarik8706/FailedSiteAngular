import {Injectable, Injector} from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {UnityService} from "./unity.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends UnityService{

  private baseUrl: String;
  token: any;
  user: any;

  constructor(injector: Injector) {
    super(injector)
    this.baseUrl = this.mainUrlServer + "/login"
  }

  registerUser(user) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      this.baseUrl + '/reg',
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

  updateUserData(data) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.storeUser(data)
    return this.post(this.baseUrl + "/update-user-data", data, headers)
  }

  storeUser(user, token?) {
    if (token != undefined) sessionStorage.setItem('token', token); this.token = token;
    localStorage.setItem('user', JSON.stringify(user))
    this.user = user;
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'))
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
