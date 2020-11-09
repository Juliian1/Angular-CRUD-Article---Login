import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from 'src/app/component/article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from './services/article.service';
import { MenuComponent } from 'src/app/component/menu/menu.component';
import { LoginComponent } from 'src/app/component/login/login.component';
import { LoginService } from 'src/app/services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AuthGuard } from 'src/app/component/guard/auth.guard';
import {AuthenticationService} from 'src/app/services/authentication.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'menu', component: MenuComponent },
  // { path: 'article', canActivate: [AuthGuard] ,component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
     ArticleComponent,
     MenuComponent,
     LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ArticleService,
    LoginService,
    // AuthGuard,
    AuthenticationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
