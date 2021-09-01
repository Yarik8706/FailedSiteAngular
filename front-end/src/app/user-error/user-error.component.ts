import { Component, OnInit } from '@angular/core';
import { LanguageService } from "../language.service";

@Component({
  selector: 'app-user-error',
  templateUrl: './user-error.component.html',
  styleUrls: ['./user-error.component.scss']
})
export class UserErrorComponent implements OnInit {

  Languages: any;

  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.Languages = this.languageService.ReturnLanguages()["user-error"];

  }

}
