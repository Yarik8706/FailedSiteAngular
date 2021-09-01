import { Injectable } from '@angular/core';
// @ts-ignore
import * as data from '../assets/languages.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  ReturnLanguages(): any {
    let language = localStorage.getItem("language")
    if (language == undefined) language = "ru";

    return data["default"][language]
  }
}
