import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http,Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RutasService } from 'src/app/services/rutas.service';




@Injectable({
  providedIn: 'root'
})


export class GruposventaseleccionService {

  baseUrlGruposventaseleccion = 'articulosGrupoSeleccionCantidadKiosko/';

  baseUrlArticulosGrupoVenta ='articulosGruposVenta/';

  path: any;
  token: any;
  headers: any;
  options: any;
  rol: any;


  constructor(public http: HttpClient, public https: Http , public rutasService: RutasService) {
    this.path = this.rutasService.getPath();
    this.token = localStorage.getItem('token');
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'token': this.token
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getArticulosSeleccion(id) {
    const response = this.https.get(this.path + this.baseUrlGruposventaseleccion + 'findSeleccionArticulo/' + id, this.options).pipe(map(res => res.json()));
    return response
  }
  getArticulosGrupos(id){
    const response = this.https.get( this.path + this.baseUrlArticulosGrupoVenta + 'findArticulosByGrupoVenta/'+ id,this.options).pipe(map(res => res.json()));

    return response
  }
}
