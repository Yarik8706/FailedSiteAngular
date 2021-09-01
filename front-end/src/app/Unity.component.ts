import { OnInit, Component, Injector } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';
import { LanguageService } from "./language.service";
import { AuthService } from "./auth.service";

@Component({
  selector: 'unity',
  template: ''
})
export class UnityComponent implements OnInit {

  protected flashMessages: FlashMessagesService;
  protected router: Router;
  protected languageService: LanguageService;
  protected authService: AuthService

  constructor(injector: Injector) {
    this.flashMessages = injector.get(FlashMessagesService);
    this.router = injector.get(Router);
    this.languageService = injector.get(LanguageService);
    this.authService = injector.get(AuthService)
  }

  ngOnInit(): void {}

  public createFlashMessage(message, cssClass: String, timeout: Number) {
    this.flashMessages.show(message, {
      cssClass: 'alert-'+cssClass,
      timeout: timeout
    })
  }

  public ReturnLanguages(to) {
    return this.languageService.ReturnLanguages()[to]
  }

  public isMobile() {
    return window.screen.width <= 420;
  }

  public isLogged(): boolean {
    return this.authService.isLoggedIn()
  }
}