import { Component, Injector } from '@angular/core';
import {UnityComponent} from "../Unity.component";
import {BootstrapColor} from "../enums/bootstrap-color.enum";

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
  private userId;
  articleUrl;
  status: number;
  isHistoryWhoEdit: boolean;
  EditHistory;
  bootstrapColor: any = BootstrapColor;
  CreateDate;
  Commit: String;

  toEdit: boolean;

  constructor(
    injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    this.userId = this.getUserData()['id']
    this.Languages = this.ReturnLanguages("article");
    this.toEdit = false;
    this.isHistoryWhoEdit = false;
    this.searchArticle()
  }

  searchArticle() {
    this.articleService.SearchArticleByUrl(location.pathname, this.userId).subscribe((
      {success, message, title, text, author, email: authorEmail, type, url, userStatus, rating}) =>{
      if (!success) {
        this.createFlashMessage(message, 'danger', 4000)
        this.router.navigate(['/user-error']);
      } else {
        this.articleUrl = url;
        this.Text = text;
        this.Title = title;
        this.Author = author;
        this.authorEmail = authorEmail;
        this.isLikeArticle = userStatus
        this.status = rating.status;
      }
    })
  }

  updateData() {
    this.articleService.editArticleData(this.Text, this.Title, this.userId, this.Commit).subscribe(({message, success}) => {
      if (success == false) this.createFlashMessage(message, 'danger', 4000)
      else this.createFlashMessage(message, 'success', 4000)
      this.toEdit = false;
    })
  }

  getInfoEditHistory() {
    this.articleService.infoEditArticle(this.Title).subscribe(({success, whoEdit, date}) => {
      this.isHistoryWhoEdit = true;
      this.EditHistory = whoEdit;
    })
  }

  editArticleStatus(good: boolean) {
    this.isLikeArticle = good
    this.articleService.editArticleStatus(good, this.articleUrl, this.userId).subscribe()
  }
}
