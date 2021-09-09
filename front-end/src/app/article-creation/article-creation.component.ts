import { Component, Injector } from '@angular/core';
import { ArticlesService } from "../articles.service";
import {UnityComponent} from "../Unity.component";
import * as $ from "jquery";


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent extends UnityComponent {

  Languages: any;
  articleTitle: String;
  mainArticleText: String;
  whatIsArticle: Number;
  IsScp

  constructor(
    private injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    this.Languages = this.ReturnLanguages("create-article");
    if (this.whatIsArticle == 1) {
      $('.mb-3 > .from-control').attr('type', 'number').attr('min', '3').attr('maxLength', '4')
    }
  }

  CreateArticle() {
    let article = {
      author: this.authService.getUserData()["name"],
      email: this.authService.getUserData()["email"],
      title: this.articleTitle,
      text: this.mainArticleText,
      type: this.whatIsArticle
    }

    this.articleService.CreateArticle(article).subscribe(({message, success, messages}) => {
      if (!success) {
        console.log(messages)
        this.createFlashMessage(message, 'danger', 4000)
        for (let i = 0; i <= messages.length; i++) {
          console.log("debug")
          this.createFlashMessage(messages[i].msg, "danger", 4000)
        }
      } else {
        this.createFlashMessage(message, 'success', 4000)
        this.router.navigate(['/dashboard'])
      }
    })
    return false;
  }

}
