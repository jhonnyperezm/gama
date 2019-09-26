import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposventaseleccionService } from './gruposventaseleccion.service';
import { IonSegment, PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { TotalinfoComponent } from 'src/app/components/totalinfo/totalinfo.component';


@Component({
  selector: 'app-gruposventaseleccion',
  templateUrl: './gruposventaseleccion.page.html',
  styleUrls: ['./gruposventaseleccion.page.scss']
})
export class GruposventaseleccionPage implements OnInit, DoCheck {

  @ViewChild(IonSegment) segment: IonSegment;


  DataCarrito: any = [];
  contadorPrincipal: any = 0;
  total: number = 0;
  idGru: any;
  nomGru: any;
  dataSeleccion: any = [];
  lista: any = [];
  idLista: any = [];
  contadorArt: number;
  idArticulo: any;
  dataGrupoSeleccion: any = [];
  valorArticulo: number;
  nombreArticulo: any;
  dataString: string;
  contadorCart: number = 0;
  valorTotalAdicionales: number = 0;
  totalAdicionalesMasArt: number = 0;
  adicionales: any;

  adicionalArr: any = [];
  idxSeleccion: any = [];

  registrosCarrito: any = [];
  listaPrecioGruSel: any = [];

  dataArticuloSeleccion: any = [];
  idArt: any;
  totalFinal: number;

  DataArrayArticulos: any = [];
  img: any;
  // imagenUrl:any;
  DataArrayGrupoSeleccion: any = [];
  dataArticulosGrupo: any = [];
  noimage = true;


  constructor(public router: ActivatedRoute,
    public dataGS: GruposventaseleccionService,
    public routers: Router,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController) {
    this.idGru = this.router.snapshot.params.idGrupo;
    this.nomGru = this.router.snapshot.params.nombreGrupo;
    this.idArticulo = this.router.snapshot.params.idArt;
    this.setArr(this.idArticulo);
    this.grupoSeleccion(this.idArticulo);
  }



  ngOnInit() {
    if (localStorage.getItem('data') === null) {
      this.DataCarrito = [];
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'));
      this.contadorPrincipal = this.DataCarrito.length;
      for (const iterator of this.DataCarrito) {
        this.registrosCarrito.push('registrocarrito1');
      }
    }

    if (localStorage.getItem('total') === null) {
      this.total = 0;
    } else {
      this.total = parseInt(localStorage.getItem('total'), 0)
    }



  }



  ngDoCheck() {

    if (localStorage.getItem('data') === null) {
      this.DataCarrito = [];
      this.contadorCart = this.DataCarrito.length;
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'))
      this.contadorCart = this.DataCarrito.length;
    }


    if (localStorage.getItem('total') === null) {
      this.total = 0;
    } else {
      this.total = parseInt(localStorage.getItem('total'), 0);
    }

  }

  setArr(idArt) {
    this.dataGS.getArticulosGrupos(this.idGru).subscribe(data => {
      this.DataArrayArticulos = data;
      const exist = this.DataArrayArticulos.filter(x => x.idArticulo == parseInt(idArt, 0));
      console.log(exist);

      this.dataArticuloSeleccion.idArticuloPrincipal = exist[0].idArticulo;
      this.dataArticuloSeleccion.nombreArticuloPrincipal = exist[0].nombreArticulo;
      this.dataArticuloSeleccion.descripcion = exist[0].descripcion;
      this.dataArticuloSeleccion.seleccion = exist[0].seleccion;
      this.dataArticuloSeleccion.valorVenta = exist[0].articulosListaPreciosPojo[0].valorVenta;
      this.totalAdicionalesMasArt = exist[0].articulosListaPreciosPojo[0].valorVenta;
      this.img = exist[0].imagen;


      if (this.img != undefined) {

        this.dataArticuloSeleccion.imagen = 'data:image/png;base64,' + this.img;
        this.noimage = false;

      } else {
        this.noimage = true;
        // this.dataArticuloSeleccion.imagen = "/assets/img/no-image.png";
      }
    });
  }
  valorVenta: any = [];

  grupoSeleccion(id) {
    this.dataGS.getArticulosSeleccion(id).subscribe(data => {

      this.DataArrayGrupoSeleccion = data;
      this.dataGrupoSeleccion = [];
      //this.dataGrupoSeleccion = data
      for (const i of this.DataArrayGrupoSeleccion) {
        console.log(i);
        for (const j of i.articulosGrupoSeleccionPojo) {
          console.log("dfdfdfr", j);
          for (const k of j.articulosListaPreciosPojo) {
            this.dataArticulosGrupo.push({
              "codPlu": j.codPlu,
              "descargaKardex": j.descargaKardex,
              "id": j.id,
              "idArticulo": j.idArticulo,
              "idUnidad": j.idUnidad,
              "idUnidadVenta": j.idUnidadVenta,
              "incrementa": j.incrementa,
              "iord": j.iord,
              "nombreArticulo": j.nombreArticulo,
              "nombreUnidad": j.nombreUnidad,
              "nombreUnidadVenta": j.nombreUnidadVenta,
              "orimver": j.orimver,
              "valorventa": k.valor_venta
            });
          }
        }
        this.dataGrupoSeleccion.push({
          "cantidad": i.cantidad,
          "id": i.id,
          "idGrupoSeleccion": i.idGrupoSeleccion,
          "incrementoArticulo": i.incrementoArticulo,
          "incrementoGrupo": i.incrementoGrupo,
          "nombreGrupoSeleccion": i.nombreGrupoSeleccion,
          "precioMasAlto": i.precioMasAlto,
          "valorIncremento": i.valorIncremento,
          "articulosGrupoSeleccionPojo": this.dataArticulosGrupo
          /* {
          } */
        });

      }

      console.log(this.dataGrupoSeleccion);


    })

  }

  incrementaValor(datosAdicional) {
    console.log(datosAdicional);

   
    for (const key of this.dataGrupoSeleccion) {
     
      if (this.adicionalArr.length !== key.cantidad || this.adicionalArr.length > key.cantidad ) {
        this.valorTotalAdicionales = this.valorTotalAdicionales + datosAdicional.valorventa;
        
        this.totalAdicionalesMasArt = this.totalAdicionalesMasArt + datosAdicional.valorventa;
        
        this.nombreArticulo = datosAdicional.nombreArticulo;
        
        this.adicionalArr.push({
          idx: this.idxSeleccion.length + 1,
          valorAdicional: datosAdicional.valorventa,
          idArticuloAdicional: datosAdicional.idArticulo,
          nombreArticuloAdicional: datosAdicional.nombreArticulo
        })
        this.idxSeleccion.push('incrementa')
        this. presentToast();
      } else {

      this.errorToast();
      }
  }
  console.log(this.adicionalArr);
  
}



  agregarArr(datosArticulo) {
    console.log(datosArticulo);
    
    this.registrosCarrito = [];
    for (let i = 0; i < this.DataCarrito.length; i++) {
      this.registrosCarrito.push('incremento1');
    }
    for (let i = 0; i < this.DataCarrito.length; i++) {
      if (this.DataCarrito[i].idArticulo === datosArticulo.idArticulo) {
        this.DataCarrito[i].contadorArt = this.DataCarrito[i].contadorArt + 1;
        this.contadorPrincipal = this.contadorPrincipal + 1;
      }
    }

    this.DataCarrito.push({
      idx: this.registrosCarrito.length + 1,
      valorVenta: datosArticulo.valorVenta,
      descripcion: datosArticulo.descripcion,
      idArticulo: datosArticulo.idArticuloPrincipal,
      nombreArticulo: datosArticulo.nombreArticuloPrincipal,
      seleccion: datosArticulo.seleccion,
      idGrupo: this.idGru,
      adicionales: this.adicionalArr,
      imagen: datosArticulo.imagen

    })
    this.registrosCarrito.push('incremento1');

    this.totalFinal = this.total + this.totalAdicionalesMasArt;

    localStorage.setItem('data', JSON.stringify(this.DataCarrito));
    localStorage.setItem('total', this.totalFinal.toString());
    this.routers.navigate([`inicio`]);

  }


  redireccionCarrito() {
    this.DataCarrito = JSON.parse(localStorage.getItem('data'));
    this.dataString = JSON.parse(localStorage.getItem('data'));
    console.log(this.dataString);
    this.routers.navigate([`/carrito`])
  }


  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Agrego Adicional',
      position: "top",
      color: "toast",
      duration: 500,
    });
    toast.present();
  }
  async errorToast() {
    const toast = await this.toastCtrl.create({
      message: 'Limite de adicionales alcanzado',
      position: "top",
      color: "danger",
      duration: 1500,
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    this.DataCarrito = JSON.parse(localStorage.getItem('pedidos'))

    if (this.total !== 0) {
      const popover = await this.popoverCtrl.create({
        component: TotalinfoComponent,
        event: ev,
        showBackdrop: false,
        mode: 'ios',
        animated: true,
        translucent: false,
        cssClass: ['ancho', 'espacio'],

      });

      await popover.present();

      setTimeout(() => {
        popover.dismiss()
      }, 6000);
    }
  }






}
