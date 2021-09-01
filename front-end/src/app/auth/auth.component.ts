import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  email: String;
  password: String;


  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  userLoginClick() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authUser(user).subscribe(({message, success, token, user: user1}) => {
      if(!success) {
        this.flashMessages.show(message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
      } else {
        this.flashMessages.show("Вы успешно авторизовались", {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['dashboard'])
        this.authService.storeUser(token, user1);
      }
    })
  }
}
