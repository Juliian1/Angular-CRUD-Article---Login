import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { Article } from '../models/Article';

@Injectable()
export class ArticleService {

  // URL for CRUD operations
  articleUrl = 'http://localhost:3200';
  // Create constructor to get Http instance
  constructor(private http: HttpClient, private router: Router) {  }
//////////////////////////////////////////////////////////

public uploadImage(images: File): Observable<any>{
  const formData = new FormData();
  formData.append('images', images);
  return this.http.post('assets/images/', formData);
}

/////////////////////////////////////////////////////////////

  // Fetch all articles
  getAllArticles() {
      return this.http.get(`${this.articleUrl}/article/get-article`);
  }

  // Create article
  createArticle(article: Article): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return this.http.post(
      this.articleUrl + "/article/create-article",
      JSON.stringify(article),
      { headers: headers }
    );
  }  

  // Fetch article by id
  getArticleById(articleId: string) {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new HttpRequest({ headers: cpHeaders });
    console.log(this.articleUrl + '/get-article-by-id?id=' + articleId);
    return this.http.get(this.articleUrl + '/article/get-article-by-id?id=' + articleId);
  }

  // Update article
  updateArticle(article: Article) {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new HttpRequest({ headers: cpHeaders });
    return this.http.put(this.articleUrl + '/article/update-article', article);
  }

  // Delete article
  deleteArticleById(articleId: string) {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new HttpRequest({ headers: cpHeaders });
    return this.http.delete(this.articleUrl + '/article/delete-article?id=' + articleId);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}

