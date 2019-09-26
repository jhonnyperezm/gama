import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestOptions, Headers, Http } from '@angular/http';
import { RutasService } from 'src/app/services/rutas.service';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  private baseUrlUsuarios = 'usuarios/';
  private baseUrlGrupoVentaInv = 'grupoVentaInv/'
  private baseUrlClasesGruposVenta = 'clasesGruposVenta/'

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any


  constructor(
    public https: Http, public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });

  }


  getUsuarios() {
    const response = this.https.get('http://localhost:8080/backgama/ptigGama/' + this.baseUrlUsuarios + 'findUsers/true', this.options).pipe(map(res => res.json()));
    return response;
  }


  getClasesGruposVenta() {
    const response = this.https.get(this.path + this.baseUrlClasesGruposVenta + 'findClasesGruposVenta', this.options).pipe(map(res => res.json()));
    return response;
  }

}
