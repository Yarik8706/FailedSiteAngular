import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class UnityService {

  public http: HttpClient;
  protected mainUrlServer: String;

  constructor(
    private injector: Injector
  ) {
    this.http = injector.get(HttpClient)
  }

  public post(url, data, headers) {
    return this.http.post(
      url,
      data,
      {headers: headers}
    ).pipe((response: any) => response);
  }
}
