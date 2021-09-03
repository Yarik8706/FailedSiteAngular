import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {response} from "express";
import {filter, map} from "rxjs/operators";
import {UnityService} from "./unity.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends UnityService {

  private baseUrl: String;

  constructor(injector: Injector) {
    super(injector)
    if(this.mainUrlServer != undefined) this.baseUrl = this.mainUrlServer + "/articles"
    else this.baseUrl = "/articles"
  }

  CreateArticle(Article) {
    return this.http.post(
      this.baseUrl + '/create-article',
      Article,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json'}), responseType: null }
      ).pipe((response: any) => response);
  }

  SearchArticleByUrl(url) {
    url = {
      url: url.slice(url.lastIndexOf('/') + 1, url.length)
    }
    return this.http.post(
      this.baseUrl + '/search-article-by-url',
      url,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
      ).pipe((response: any) => response);
  }

  public search$ = new Subject<String>();
  SearchArticlesByTitle(title) {
    title = title.slice(title.lastIndexOf('#') + 1, title.length)
    this.search$.next(title);
    title = {
      title: title
    }

    return  this.http.post(
      this.baseUrl + '/search-articles-by-title',
      title,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
      ).pipe((response: any) => response)
  }
}
