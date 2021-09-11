import {Component, Injector, OnInit} from '@angular/core';
import {UnityComponent} from "../Unity.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnityComponent {

  UserName: String;
  UserEmail: String;
  toUpdateData: boolean;
  toUpdateName: boolean;

  hasYourArticles: boolean;
  yourArticles: any;
  private data;

  constructor(
    injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    this.UserName = this.getUserData()["name"]
    this.UserEmail = this.getUserData()["email"]
    this.searchYourArticle()
  }

  logoutUser() {
    this.authService.logout();
    this.createFlashMessage("Вы вышли из учетной записи", "danger", 4000)
    this.router.navigate(['']);
    return false;
  }

  updateData() {
    let data = {
      name: this.UserName,
      email: this.UserEmail
    };
    this.authService.updateUserData(data).subscribe(({message, success, user}) => {
      if (success == false){
        this.createFlashMessage(message, 'danger', 4000)
        this.authService.storeUser(user)
      }
      else {
        this.createFlashMessage(message, 'success', 4000)
      }
      this.toUpdateData = false;
      this.toUpdateName = false;
    })
  }

  searchYourArticle() {
    this.articleService.post(
      this.articleService.baseUrl+ "/search-articles-by-author",
      this.data = {
        email:this.UserEmail
      }
      ).subscribe(({success, message, articles}) => {
      if (!success) {
        this.hasYourArticles = false;
      } else {
        this.hasYourArticles = true;
        this.yourArticles = articles;
      }
    })
  }
}
