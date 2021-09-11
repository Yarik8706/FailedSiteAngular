import {Component, Injector} from '@angular/core';
import {UnityComponent} from "../Unity.component";

@Component({
  selector: 'app-profile-other-user',
  templateUrl: './profile-other-user.component.html',
  styleUrls: ['./profile-other-user.component.scss']
})
export class ProfileOtherUserComponent extends UnityComponent{

  User: String;
  AboutUser;
  Date;
  Status;
  Email: String;

  articles: any;
  private data;

  constructor(
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {

    console.log(location.pathname)
    this.userService.searchUser(location.pathname).subscribe(({success, name, message, status, date, email, aboutUser}) => {
      console.log(success, name, message, status, date, email, aboutUser)
      if (!success){
        this.createFlashMessage(message, 'danger', 4000)
        this.router.navigate(['/user-error'])
      } else {
        this.createFlashMessage(message, 'success', 4000)
        this.User = name;
        this.Date = date;
        this.AboutUser = aboutUser;
        this.Status = status;
        this.Email = email;
        this.searchUserArticle()
      }
    })
  }

  searchUserArticle() {
    console.log(this.Email)
    this.articleService.post(
      this.articleService.baseUrl+ "/search-articles-by-author",
      this.data = {
        email: this.Email
      }
    ).subscribe(({success, articles}) => {
      if (success) {
        this.articles = articles;
      }
    })
  }
}
