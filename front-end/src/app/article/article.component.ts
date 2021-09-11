import { Component, Injector } from '@angular/core';
import { ArticlesService } from "../articles.service";
import { FlashMessagesService } from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";
import { LanguageService } from "../language.service";
import {UnityComponent} from "../Unity.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends UnityComponent {

  Languages: any;
  Title: String;
  Text: String;
  Author: String;
  isLikeArticle: boolean;
  private authorEmail: String;
  articleUrl;

  toEdit: boolean;

  constructor(
    injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    this.Languages = this.ReturnLanguages("article");
    this.toEdit = false;
    this.searchArticle()
  }

  searchArticle() {
    this.articleService.SearchArticleByUrl(location.pathname).subscribe(({success, message, title, text, author, email: authorEmail, type, url}) =>{
      if (!success) {
        this.createFlashMessage(message, 'danger', 4000)
        this.router.navigate(['/user-error']);
      } else {
        this.articleUrl = url;
        this.Text = text;
        this.Title = title;
        this.Author = author;
        this.authorEmail = authorEmail;
      }
    })
  }

  updateData() {
    let data = {
      text: this.Text,
      title: this.Title
    };
    this.articleService.editArticleData(data).subscribe(({message, success}) => {
      if (success == false) this.createFlashMessage(message, 'danger', 4000)
      else this.createFlashMessage(message, 'success', 4000)
      this.toEdit = false;
    })
  }

  editArticleStatus(good: boolean) {
    this.isLikeArticle = good
    this.articleService.editArticleStatus(good, this.articleUrl, this.getUserData()['id']).subscribe(({success, article}) => {
      console.log(article)
      if (!success) {
        this.createFlashMessage("Жопа", 'danger', 4000)
      } else {
        this.createFlashMessage("Success", 'danger', 4000)
      }
    })
  }
}
