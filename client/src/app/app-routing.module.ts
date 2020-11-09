import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from 'src/app/component/article/article.component';
import { MenuComponent } from 'src/app/component/menu/menu.component';
import { LoginComponent } from 'src/app/component/login/login.component';
// import { AuthGuard } from "src/app/component/guard/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'menu', component: MenuComponent },
  // { path: 'article', canActivate: [AuthGuard] ,component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
