import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router}  from '@angular/router';

export class Article {
    id: number = null;
    category: string = null;
    title: string = null;
    images: string = null;
  }

  class tokenResponse{
    token:string
  }

  export class UserI{
    id: number;
    name: string;
    username: string;
    password: string;
    token: string;
  }

  @Injectable()
  export class AuthenticationService{
    private token : string;
    
    constructor(private http:HttpClient ,private router:Router ){}

    private guardarToken(token:string): void{
      localStorage.setItem('userToken',token);
      this.token = token;
    }

    // private getToken(): string{
    //   if(!this.token){
    //     this.token = localStorage.getItem('userToken')
    //   }
    //   return this.token
    // }

    // public getUserDetail(): boolean {
    //   const token = this.getToken();
    //   let payload
    //   if (token){
    //     payload = token.split('.')[1]
    //     payload = window.atob(payload)
    //     return JSON.parse(payload)
    //   }else{
    //     return null;
    //   }
    // }

    public login(user: UserI): Observable<any>{
      const base = this.http.post(`/article/login`, user)

      const request = base.pipe(map((data: tokenResponse)=>{
        if(data.token){
          this.guardarToken(data.token)
        }
        return data
      }))
      return request
    }
    
    public logout(): void{
      this.token = '';
      window.localStorage.removeItem('userToken');
      this.router.navigateByUrl('/')
    }
}
