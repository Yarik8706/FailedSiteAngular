import {Injectable, Injector} from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import {UnityService} from "./unity.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends UnityService{

  public baseUrl: String;

  constructor(injector: Injector) {
    super(injector)
    if(this.mainUrlServer != undefined) this.baseUrl = this.mainUrlServer + "/login"
    else this.baseUrl = "/login"
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
    return this.put(this.baseUrl + "/update-user-data", data, headers)
  }

  storeUser(user, id?, token?) {
    if (token != undefined) sessionStorage.setItem('token', token);
    if (id != undefined) localStorage.setItem('id', id);
    localStorage.setItem('user', JSON.stringify(user))
  }

  logout() {
    localStorage.clear()
    sessionStorage.clear()
  }

  isLoggedIn() {
    return sessionStorage.getItem('token') != undefined;
  }
}
