import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { FlashMessagesModule } from "angular2-flash-messages";
import { AuthService } from "./auth.service";
import { ArticlesService } from "./articles.service";
import { HttpClientModule } from '@angular/common/http';
import { LanguageService } from "./language.service";
import { QuillModule } from 'ngx-quill'
import { IsLoggedIn } from './isLogged.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ArticleCreationComponent } from './article-creation/article-creation.component';
import { ArticleComponent } from './article/article.component';
import { UserErrorComponent } from './user-error/user-error.component';
import { SearchComponent } from './search/search.component';
import { UnityComponent } from "./Unity.component";
import { MainDirective } from './directives/main.directive';
import { ProfileOtherUserComponent } from './profile-other-user/profile-other-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'reg', component: RegComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'create-article', component: ArticleCreationComponent, canActivate: [IsLoggedIn]},
  {
    path: 'article',
    component: ArticleComponent,
    children: [{
      path: '**',
      component: ArticleComponent
    }]
  },
  {
    path: 'search',
    component: SearchComponent,
    children: [{
      path: '**',
      component: SearchComponent
    }]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [IsLoggedIn]
  },
  {
    path: 'dashboard',
    component: ProfileOtherUserComponent,
    canActivate: [IsLoggedIn],
    children: [{
      path: '**',
      component: ProfileOtherUserComponent,
      canActivate: [IsLoggedIn]
    }]
  },
  { path: '**', component: UserErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    DashboardComponent,
    HomeComponent,
    FooterComponent,
    ArticleCreationComponent,
    ArticleComponent,
    UserErrorComponent,
    SearchComponent,
    UnityComponent,
    MainDirective,
    ProfileOtherUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    AuthService,
    ArticlesService,
    IsLoggedIn,
    LanguageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
