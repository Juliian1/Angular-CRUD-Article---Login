import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UserI } from '../models/user';
import { Observable, throwError } from 'rxjs'; 
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginUrl = 'http://localhost:3200/login'; 
  private apikey = '';
  private userToken: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `${this.apikey}`
    })
  };

  constructor(private http: HttpClient) { 
    this.leerToken();
   }

   logout(): void { 
    localStorage.removeItem('token');
  }

  //metodo login
  login(user: UserI): Observable<UserI | void> {
    return this.http.post<UserI>(this.loginUrl, user)
      .pipe(
      map( (res: UserI) => {
        console.log('service login', res);
        this.guardarToken(res['token']);
        return res;
      })
    );
  };

  // private guardarToken(token: string):void {
  //   localStorage.setItem('token', token);
  // }
  private guardarToken(idToken: string) {
    console.log('idtoken', idToken);
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
