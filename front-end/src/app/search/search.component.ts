import {Component, Injector} from '@angular/core';
import {UnityComponent} from "../Unity.component";
import {BootstrapColor} from "../enums/bootstrap-color.enum";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent extends UnityComponent{

  articles: any;
  success: boolean;
  isLoading: boolean;
  bootstrapColor: any = BootstrapColor;

  constructor(
    private injector: Injector
  ) {super(injector)}

  ngOnInit(): void {
    this.isLoading = true;
    this.searchArticle()
  }

  searchArticle() {
    if (location.hash.length == 1) {
      this.createFlashMessage("Вы не набрали текст для поиска", 'danger', 4000)
      return false;
    }
    this.articleService.SearchArticlesByTitle(location.hash).subscribe(({success, message, articles}) =>{
      this.success = success;
      if (!success) {
        this.createFlashMessage(message, "danger", 4000)
      } else {
        this.createFlashMessage(message, "success", 4000)
        this.articles = articles;
        this.isLoading = false;
      }
    })
  }
}
