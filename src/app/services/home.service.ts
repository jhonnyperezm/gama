import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { RequestOptions,Headers,Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrlUsuarios = 'usuarios/';

  path: '';
  token: any;
  headers: any;
  options: any;
  rol: any
 
  constructor(private http: HttpClient, 
              public https: Http ) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwdGlnIiwiaWF0IjoxNTYxNjQxMjAxLCJleHAiOjE1NjE3Mjc2MDEsImlkVXN1YXJpbyI6MSwiaWRDbGllbnRlIjoxLCJ1c2VyIjoiR2FtYSIsInJvbCI6IkdhbWFzb2Z0IiwiY3JlYWRvUG9yIjoxLCJ1c2VyX2VtYWlsIjoiZ2FtYUBnYW1hLmNvbSIsImlkX3JvbCI6MX0.zV7bHZtkuwOA_UKTEZ5JWVrAYnye5ekWsNFNVUlOzrA'
    });
    this.options = new RequestOptions({ headers: this.headers });

  }

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  /* getUsuarios() {
    const response = this.https.get('http://localhost:8100/backgama/ptigGama/' + this.baseUrlUsuarios + 'findUsers/true', this.options).pipe(map(res => res.json()));
    return response;
  } */
}
