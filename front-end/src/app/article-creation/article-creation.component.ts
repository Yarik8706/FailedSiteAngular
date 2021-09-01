import { Component, Injector } from '@angular/core';
import { ArticlesService } from "../articles.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import { LanguageService } from "../language.service";
import {UnityComponent} from "../Unity.component";


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent extends UnityComponent {

  Languages: any;
  articleTitle: String;
  mainArticleText: String;

  constructor(
    private injector: Injector,
    private articleService: ArticlesService
  ) {super(injector)}

  ngOnInit(): void {
    this.Languages = this.ReturnLanguages("create-article");
  }

  CreateArticle() {
    if (this.articleTitle == undefined) {
      this.createFlashMessage("Нет названия для статьи", 'danger', 4000)
      return false;
    } else if (this.mainArticleText == undefined) {
      this.createFlashMessage("Текста нет, что показывать?", 'danger', 4000)
      return false;
    }

    let article = {
      author: localStorage.getItem('userName'),
      title: this.articleTitle,
      text: this.mainArticleText
    }

    this.articleService.CreateArticle(article).subscribe(({message, success}) => {
      if (!success) {
        this.createFlashMessage(message, 'danger', 4000)
      } else {
        this.createFlashMessage(message, 'success', 4000)
        this.router.navigate(['/dashboard'])
      }
    })
    return false;
  }

}
