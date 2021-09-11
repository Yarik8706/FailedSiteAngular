import {Component, Injector, OnInit} from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import {UnityComponent} from "../Unity.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends UnityComponent {

  email: String;
  password: String;


  constructor(
    private injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
  }

  userLoginClick() {
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authUser(user).subscribe(({message, success, token, user: user1, messages, id}) => {
      if(!success) {
        this.flashMessages.show(message, {
          cssClass: 'alert-danger',
          timeout: 4000
        });
        for (let i = 0; i <= messages.length; i++) {
          this.createFlashMessage(messages[i].msg, "danger", 4000)
        }
      } else {
        this.flashMessages.show("Вы успешно авторизовались", {
          cssClass: 'alert-success',
          timeout: 4000
        });
        this.router.navigate(['dashboard'])
        this.authService.storeUser(user1, id, token);
      }
    })
  }
}
