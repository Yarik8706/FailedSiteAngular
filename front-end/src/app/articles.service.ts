import {Injectable, Injector} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {UnityService} from "./unity.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends UnityService {

  public readonly baseUrl: String;

  constructor(injector: Injector) {
    super(injector)
    if(this.mainUrlServer != undefined) this.baseUrl = this.mainUrlServer + "/articles"
    else this.baseUrl = "/articles"
  }

  CreateArticle(Article) {
    console.log(Article)
    return this.http.post(
      this.baseUrl + '/create-article',
      Article,
      {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    ).pipe((response: any) => response);
  }

  SearchArticleByUrl(url, id) {
    url = {
      url: url.slice(url.lastIndexOf('/') + 1, url.length),
      id: id
    }
    return this.http.post(
      this.baseUrl + '/search-article-by-url',
      url,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    ).pipe((response: any) => response);
  }

  SearchArticlesByTitle(title, id: number) {
    title = title.slice(title.lastIndexOf('#') + 1, title.length)
    title = {
      title: title,
      id: id
    }
    return this.http.post(
      this.baseUrl + '/search-articles-by-title',
      title,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    ).pipe((response: any) => response)
  }


  editArticleData(data, title, who, commit) {
    data = {
      text: data,
      title: title,
      id: who,
      commit: commit
    }
    console.log(who)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.post(this.baseUrl + "/update-article-data", data, headers)
  }

  editArticleStatus(status: boolean, url, id: any) {
    url = {
      status: status,
      url: url,
      id: id
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(
      this.baseUrl + "/edit-article-status",
      url,
      {headers}).pipe((response: any) => response)
  }

  infoEditArticle(Title: String) {
    let data = {
      title: Title
    }
    let headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(
      this.baseUrl + "/article-editing-history",
      data,
      {headers}).pipe((response: any) => response)
  }

}
