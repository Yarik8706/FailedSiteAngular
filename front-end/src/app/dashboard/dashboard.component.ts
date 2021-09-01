import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  UserName: String;
  UserEmail: String;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.UserName = localStorage.getItem('userName')
    this.UserEmail = localStorage.getItem('userEmail')
  }

  logoutUser() {
    this.authService.logout();
    this.flashMessages.show("Вы вышли из учетной записи", {
      cssClass: 'alert-warning',
      timeout: 4000
    });
    this.router.navigate(['']);
    return false;
  }
}
