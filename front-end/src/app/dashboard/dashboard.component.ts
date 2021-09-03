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

  constructor(
    injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    console.log(localStorage.getItem('user'))
    console.log(this.authService.getUserData())
    this.UserName = this.authService.getUserData()["name"]
    this.UserEmail = this.authService.getUserData()["email"]
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
    this.authService.updateUserData(data).subscribe(({message, success, token, user: user1, messages}) => {
      if (success == false) this.createFlashMessage(message, 'danger', 4000)
      else this.createFlashMessage(message, 'success', 4000)
      this.toUpdateData = false;
      this.toUpdateName = false;
    })
  }
}
