import {Injectable, Injector} from '@angular/core';
import {UnityService} from "../unity.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends UnityService{

  public baseUrl: String;

  constructor(
    injector: Injector
  ) {
    super(injector)
    if(this.mainUrlServer != undefined) this.baseUrl = this.mainUrlServer + "/user"
    else this.baseUrl = "/user"
  }

  // protection(data) {
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(
  //     this.baseUrl + '/protect',
  //     data,
  //     {headers: headers}
  //   ).pipe((response: any) => response);
  // }
  searchUser(id) {
    id = {
      id: id.slice(id.lastIndexOf('/') + 1, id.length)
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(id)
    return this.http.post(
        this.baseUrl + '/search-user-by-id',
        id,
        {headers }
      ).pipe((response: any) => response);
  }
}
