import { Component } from '@angular/core';
import {AuthService} from "./auth.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  password: String = '}z#nC4Ci7~MlS4LN?5%h';
  userPassword: String;
  access: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void{
    if (localStorage.getItem('access') == 'true') this.access = true;
  }

  CheckPassword() {
    if (this.userPassword == this.password) {
      this.access = true;
      localStorage.setItem('access', 'true')
      return false;
    }
  }
}
