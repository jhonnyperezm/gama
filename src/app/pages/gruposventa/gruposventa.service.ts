import { Injectable } from '@angular/core';
import { RutasService } from 'src/app/services/rutas.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { InicioService } from '../inicio/inicio.service';


@Injectable({
  providedIn: 'root'
})
export class GruposventaService {

  baseUrlArticulosGrupoVenta ='articulosGruposVenta/'
  baseUrlClasesGruposVenta= 'clasesGruposVenta/'
  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;

  constructor(
    public https: Http,
    public rutasService: RutasService,
    public inicioService: InicioService,
    ) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }


   getArticulosGrupos(id){
     const response = this.https.get( this.path + this.baseUrlArticulosGrupoVenta + 'findArticulosByGrupoVenta/'+ id,this.options).pipe(map(res => res.json()));
     return response;
   }

   getClasesGruposVenta() {
    const response = this.https.get(this.path + this.baseUrlClasesGruposVenta + 'findClasesGruposVenta', this.options).pipe(map(res => res.json()));
    return response;
  }

 

 







}