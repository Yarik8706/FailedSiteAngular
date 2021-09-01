import { Component, Injector } from '@angular/core';
import { AuthService } from "../auth.service";
import {ArticlesService} from "../articles.service";
import {UnityComponent} from "../Unity.component";
import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnityComponent {

  Languages: any;
  search: String;

  constructor(
    private injector: Injector,
    private articlesService: ArticlesService,
    public authService: AuthService,
  ) {super(injector)}

  ngOnInit(): void {
    this.Languages = this.ReturnLanguages("navbar");
    if ((this.isMobile() && this.isLogged()) || this.isLogged()) {
      $('.sidebar').css('display', 'none')
      $('body').css('marginLeft', '0')
    }
    this.sidebar = document.querySelector(".sidebar");
    this.closeBtn = document.querySelector("#btn");
    this.searchBtn = document.querySelector(".bx-search");
    this.closeBtn.addEventListener("click", ()=>{
      this.sidebar.classList.toggle("open");
      this.menuBtnChange();//calling the function(optional)
    });
    this.searchBtn.addEventListener("click", () => { // Sidebar open when you click on the search iocn
      this.sidebar.classList.toggle("open");
      this.menuBtnChange(); //calling the function(optional)
    });
  }

  SearchArticle(): boolean {
    if (this.search == undefined) {
      this.flashMessages.show("Нет текста для поиска", {
        cssClass: 'alert-danger',
        timeout: 4000
      });
      return false;
    }
    return true;
  }

  openOrCloseMainSidebar() {
    let sidebar = $('.sidebar')
    let button = $('#SidebarButton')
    if (sidebar.css('display') == 'none') {
      button.css('right', '15px')
      $('body').css('marginLeft', '78px')
      sidebar.css("display", "block");
      return;
    }
    button.css('left', '15px')
    $('body').css('marginLeft', '0px')
    sidebar.css("display", "none");
  }

  sidebar;
  closeBtn;
  searchBtn;
  // following are the code to change sidebar button(optional)
  menuBtnChange() {
    if(this.sidebar.classList.contains("open"))
      this.closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the icons class
    else
      this.closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the icons class
  }
}
