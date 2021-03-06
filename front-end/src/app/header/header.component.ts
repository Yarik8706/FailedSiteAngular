import { Component, Injector } from '@angular/core';
import {UnityComponent} from "../Unity.component";
import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnityComponent {

  Languages: any;
  UserInfo: {};
  search: String;
  sidebar;
  closeBtn;
  searchBtn;
  body;

  constructor(
    private injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    console.log("Что за хуйня?")
    this.Languages = this.ReturnLanguages("navbar");
    this.body = $('body');

    this.sidebar = $(".sidebar");
    this.closeBtn = $("#btn");
    this.searchBtn = $(".bx-search");
    this.optimization()
    this.closeBtn.on("click", () => {
      this.sidebar.toggleClass("open");
      this.menuBtnChange(); //calling the function(optional)
    });
    this.searchBtn.on("click", () => { // Sidebar open when you click on the search icon
      this.sidebar.toggleClass("open");
      this.menuBtnChange(); //calling the function(optional)
    });
  }

  SearchArticle(url): boolean {
    if (this.search == undefined) {
      this.createFlashMessage("Нет текста для поиска", 'danger', 4000)
      return false;
    }
    location.href = url;
    location.reload()
  }

  optimization(){
    if (!this.isLogged()) {
      this.sidebar.css('display', 'none');
      this.body.css('marginLeft', '0')
    }
    else {
      //Здесь код который должен выполняться когда пользователь зарегестрировался, но непоказыватся когда !зарегестрировался
      this.UserInfo = {
        name: this.getUserData()['name'],
        status: this.getUserData()['status']
      }
      this.body.css('marginLeft', '78')
    }
    if (this.isMobile()){
      let topNavigation = $('.top-navigation')
      $('.top-navigation img').css('width', '50px').css('height', '50px')
      topNavigation.css('fontSize', '11px')
      $('#search').css('width', '150px !important')
      if(this.sidebar.css('display') != 'none')
        $('#SidebarButton').css('bottom', '75px')
      else if(this.sidebar.css('display') == 'none')
        $('#SidebarButton').css('bottom', '15px')
    } else {

    }
  }

  openOrCloseMainSidebar() {
    let button = $('#SidebarButton')
    if (this.sidebar.css('display') == 'none') {
      button.css('bottom', '75px')
      this.body.css('marginLeft', '78px')
      this.sidebar.css("display", "block");
      return;
    }
    button.css('bottom', '15px')
    this.body.css('marginLeft', '0px')
    this.sidebar.css("display", "none");
  }

  // following are the code to change sidebar button(optional)
  menuBtnChange() {
    if(this.sidebar.hasClass("open")) {
      this.closeBtn.removeClass("bx-menu")
      this.closeBtn.addClass("bx-menu-alt-right")
    }
    else {
      this.closeBtn.addClass("bx-menu")
      this.closeBtn.removeClass("bx-menu-alt-right")
    }
  }
}
