import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-totalinfo',
  templateUrl: './totalinfo.component.html',
  styleUrls: ['./totalinfo.component.scss'],
})
export class TotalinfoComponent implements OnInit {


  
@Input() total:number = 0;
  dataString :any;
  DataCarrito:any=[];
  botonAtras:boolean;
  // contadorCart:any;
  dataJsonModal: any = [];
  registrosModalFinal: any = [];

  constructor( ) { }

  ngOnInit() {

    if(localStorage.getItem('data') === null){
      this.DataCarrito = [];
      //this.contadorCart = this.DataCarrito.length;
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'))
      // this.contadorCart = this.DataCarrito.length;
    }

    
     if (localStorage.getItem('total') === null ) {
      this.total = 0;
     }else {
     this.total = parseInt(localStorage.getItem('total'), 0);
     }
     
    this.agregarCarrito(this.DataCarrito);
  }

  
  agregarCarrito(datosCarrito) {
    this.dataJsonModal = [];
    for (const key of datosCarrito) {

      let exist;
      if (key.adicionales.length === 0) {
        exist = this.dataJsonModal.filter(x => x.idArticulo === key.idArticulo && x.adicionales.length === 0);
      } else {
        exist = this.dataJsonModal.filter(x => x.idArticulo === key.idArticulo && x.adicionales == key.adicionales);
      }

      if (exist.length === 0) {
        let valorVentaFin = key.valorVenta;
        if (key.adicionales.length >= 1) {
          for (const iterator of key.adicionales) {
            valorVentaFin = valorVentaFin + iterator.valorAdicional;
          }
        } else {
          valorVentaFin = key.valorVenta;
        }

        this.dataJsonModal.push({
          valorVenta: key.valorVenta,
          valorVentaFinal: valorVentaFin,
          descripcion: key.descripcion,
          idArticulo: key.idArticulo,
          idx: this.registrosModalFinal.length + 1,
          nombreArticulo: key.nombreArticulo,
          adicionales: key.adicionales,
          seleccion: key.seleccion,
          cantidad: 1

        })
        this.registrosModalFinal.push('carritoFinal1')
      } else {
        for (let i = 0; i < this.dataJsonModal.length; i++) {
          if (this.dataJsonModal[i].idArticulo === exist[0].idArticulo && this.dataJsonModal[i].adicionales.length == 0) {
            this.dataJsonModal[i].cantidad = this.dataJsonModal[i].cantidad + 1;
            this.dataJsonModal[i].valorVentaFinal = this.dataJsonModal[i].valorVenta * this.dataJsonModal[i].cantidad;
          }

        }
      }
    }
  }


  
}

  

