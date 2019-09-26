import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @ViewChild('lista') Lista: IonList

  DataCarrito: any = [];
  contadorPrincipal: any = 0;
  total: number = 0;
  carritoFinal: any = [];
  registrosCarrito: any = [];
  registrosCarritoFinal: any = [];
  totalAdicionalesMasArt: any;
  articulo: any = [];
  adicionales: any = [];
  adicionalesModal: any = [];


  constructor(public router: Router,
    public alertcCtrl: AlertController,

  ) { }

  ngOnInit() {
    if (localStorage.getItem('data') === null) {
      this.DataCarrito = [];
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'));
      this.contadorPrincipal = this.DataCarrito.length;
    }

    if (localStorage.getItem('total') === null) {
      this.total = 0;
    } else {
      this.total = parseInt(localStorage.getItem('total'), 0)
    }

    this.mostrarCarrito(this.DataCarrito);

    this.registrosCarrito = [];

    for (let i = 0; i < this.DataCarrito.length; i++) {
      this.registrosCarrito.push('incremento1');
    }

    console.log(this.DataCarrito);

  }

  mostrarCarrito(datosCarrito) {
    console.log('datosCarrito',datosCarrito);
    
    this.carritoFinal = [];
    for (const key of datosCarrito) {

      let exist;
      if (key.adicionales.length === 0) {
        exist = this.carritoFinal.filter(x => x.idArticulo === key.idArticulo && x.adicionales.length === 0);
      } else {
        exist = this.carritoFinal.filter(x => x.idArticulo === key.idArticulo && x.adicionales === key.adicionales);
          
      }      
      // console.log(exist);

      if (exist.length === 0  ) {
        let valorVentaFin = key.valorVenta;
        if (key.adicionales.length >= 1) {
          for (const iterator of key.adicionales) {
            valorVentaFin = valorVentaFin + iterator.valorAdicional;
          }
        } else {
          valorVentaFin = key.valorVenta;
        }

        this.carritoFinal.push({
          valorVenta: key.valorVenta,
          valorVentaFinal: valorVentaFin,
          descripcion: key.descripcion,
          idArticulo: key.idArticulo,
          idx: this.registrosCarritoFinal.length + 1,
          nombreArticulo: key.nombreArticulo,
          adicionales: key.adicionales,
          seleccion: key.seleccion,
          cantidad: 1,
          imagen: key.imagen

        })
        this.registrosCarritoFinal.push('carritoFinal1')
      } else {
        for (let i = 0; i < this.carritoFinal.length; i++) {
          if (this.carritoFinal[i].idArticulo === exist[0].idArticulo && this.carritoFinal[i].adicionales.length == 0) {
            this.carritoFinal[i].cantidad = this.carritoFinal[i].cantidad + 1;
            this.carritoFinal[i].valorVentaFinal = this.carritoFinal[i].valorVenta * this.carritoFinal[i].cantidad;
          }

        }
      }
    } 
    
    
    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    localStorage.setItem('total', this.total.toString());
   
  }

  sumarCantidad(obj) {
    console.log(this.carritoFinal);
    
    this.DataCarrito.push({
      idx: this.registrosCarrito.length + 1,
      valorVenta: obj.valorVenta,
      descripcion: obj.descripcion,
      idArticulo: obj.idArticulo,
      nombreArticulo: obj.nombreArticulo,
      seleccion: obj.seleccion,
      adicionales: obj.adicionales

    })
    this.registrosCarrito.push('incremento1');

    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    let exist;
    if (obj.adicionales.length === 0) {
      exist = this.carritoFinal.filter(x => x.idArticulo === obj.idArticulo && x.adicionales.length === 0);
    } else {
      exist = this.carritoFinal.filter(x => x.idArticulo === obj.idArticulo && x.adicionales == obj.adicionales);
    }

    if (exist.length >= 1) {

      for (let i = 0; i < this.carritoFinal.length; i++) {
        if (this.carritoFinal[i].idArticulo === exist[0].idArticulo && this.carritoFinal[i].adicionales.length == 0) {
          this.carritoFinal[i].cantidad = this.carritoFinal[i].cantidad + 1;
          this.carritoFinal[i].valorVentaFinal = this.carritoFinal[i].valorVenta * this.carritoFinal[i].cantidad;
        }
      }
    }

    this.total = this.total + obj.valorVenta;

    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    localStorage.setItem('total', this.total.toString());
  }

  restarCantidad(obj, id) {
    if (obj.cantidad > 1) {
      let index;
      const existe = this.DataCarrito.filter(x => x.idArticulo == obj.idArticulo && x.adicionales == obj.adicionales)[0].idx;

      for (let i = 0; i < this.DataCarrito.length; i++) {
        if (this.DataCarrito[i].idx == existe) {
          index = this.DataCarrito.indexOf(this.DataCarrito[i]);
          this.DataCarrito.splice(index, 1);
        }
      }

      for (let i = 0; i < this.carritoFinal.length; i++) {
        if (this.carritoFinal[i].idx === obj.idx) {
          this.carritoFinal[i].cantidad = this.carritoFinal[i].cantidad - 1;
          this.carritoFinal[i].valorVentaFinal = this.carritoFinal[i].valorVenta * this.carritoFinal[i].cantidad;
        }
      }
      if (this.total != 0) {
        this.total = this.total - obj.valorVenta;

      } else {
        this.total = 0;
      }

    }

    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    localStorage.setItem('total', this.total.toString());

  }

  borrar(data, pos) {
    console.log(this.DataCarrito);
    let index;
    for (let i = 0; i < this.carritoFinal.length; i++) {
      if (this.carritoFinal[i].idx == data.idx) {
        this.total = this.total - this.carritoFinal[i].valorVentaFinal;
        index = this.carritoFinal.indexOf(this.carritoFinal[i]);
        this.carritoFinal.splice(index, 1);
      }
    }

    let index2;

    const existe = this.DataCarrito.filter(x => x.idArticulo == data.idArticulo && x.adicionales.length == data.adicionales.length);
    console.log(existe);

    for (let i = 0; i < existe.length; i++) {
      for (let j = 0; j < this.DataCarrito.length; j++) {
        if (existe[i].idx == this.DataCarrito[j].idx) {
          console.log('hola');
          index2 = this.DataCarrito.indexOf(this.DataCarrito[j]);
          console.log(this.DataCarrito.indexOf(this.DataCarrito[j]));
          console.log(index2);
          this.DataCarrito.splice(index2, 1);
        }
      }
    }
    console.log(this.DataCarrito.length);


    localStorage.setItem('total', this.total.toString());
    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    console.log(this.DataCarrito);
    this.Lista.closeSlidingItems();
  }

  bindingAdicionales(articulo) {
    this.articulo = articulo;

  }

  borrarAdicional(idx) {
    for (let j = 0; j < this.articulo.adicionales.length; j++) {
           if (idx === this.articulo.adicionales[j].idx) {
        this.articulo.valorVentaFinal = this.articulo.valorVentaFinal - this.articulo.adicionales[j].valorAdicional;
        this.total = this.total - this.articulo.adicionales[j].valorAdicional;
        let index2 = this.articulo.adicionales.indexOf(this.articulo.adicionales[j]);
        this.articulo.adicionales.splice(index2, 1);
      }
    }
    console.log(this.articulo.adicionales);
    localStorage.setItem('total', this.total.toString());
    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
  }


  enviarPedido() {
    this.router.navigate(['/viewfinal'])
  }

  seguirComprando() {
    this.router.navigate(['/inicio'])
  }

  async elimninarPedido() {
    const alert = await this.alertcCtrl.create({
      header: '¿Estas seguro que deseas eliminar tu pedio?',
      mode: 'md',
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',

          handler: () => {

            localStorage.setItem('data', JSON.stringify(this.DataCarrito = []));
            localStorage.setItem('total', JSON.stringify(this.total = 0));
            this.router.navigate(['/viewinicial'])

          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',

          handler: () => {
            /* console.log('no pasa nada') */
          }
        }

      ],

    });
    await alert.present();
  }

}
