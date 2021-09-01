import {Component, Injector, OnInit} from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import { UnityComponent } from "../Unity.component";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent extends UnityComponent{

  Languages: any;
  name: String;
  email: String;
  password: String;
  res: any;

  constructor(
    private injector: Injector
    ) {
    super(injector)
  }

  ngOnInit(): void {
    this.Languages = this.ReturnLanguages(['registration'])
  }

  UserRegisterClick() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }
    let checkInfo:boolean = true

    if(user.name == undefined){
      this.createFlashMessage("Name is undefined", 'danger', 4000)
      checkInfo = false;
    }

    if(user.email == undefined){
      this.createFlashMessage("Email is undefined", 'danger', 4000)
      checkInfo = false;
    }

    if(user.password == undefined) {
      this.createFlashMessage("Password is undefined", 'danger', 4000)
      checkInfo = false;
    }

    if (!checkInfo) return false;

    this.authService.registerUser(user).subscribe(({message, success}) => {
      if (!success) {
        this.flashMessages.show(message, {
          cssClass: 'alert-danger',
          timeout: 4000
        })
        this.router.navigate(['/reg']);
      } else {
        this.flashMessages.show(message, {
          cssClass: 'alert-success',
          timeout: 4000
        })
        this.router.navigate(['/auth']);
      }
    })

  }
}
