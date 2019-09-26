import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TotalinfoComponent } from 'src/app/components/totalinfo/totalinfo.component';
import { InicioService } from './inicio.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, DoCheck {

  idGru: any;
  nomGru: any;
  listaGrupoVenta : any =[];
  clasesGruposVenta : any = [];
  datosGrupo:any =[];
  @Input() contadorCart:number = 0;
  @Input() total:number = 0;
  DataCarrito:any=[];
  contadorPrincipal: any = 0;
  dataString:string;
  dataArrGrupoVenta:any =[];
 


  constructor( private inicioService : InicioService ,
               public popoverCtrl: PopoverController,
               public router: Router,
               public roter: ActivatedRoute ) {
                 
                this.idGru = this.roter.snapshot.params.idGrupo;
                this.nomGru = this.roter.snapshot.params.nombreGrupo;
                }

  ngOnInit() {
    this.getGrupoVenta();
    if (localStorage.getItem('data') === null) {
      this.DataCarrito = [];
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'));

      const existeGrupo = this.DataCarrito.filter(x => x.idGrupo == this.idGru);
      this.contadorPrincipal = existeGrupo.length;
    }

    if (localStorage.getItem('total') === null) {
      this.total = 0;
    } else {
      this.total = parseInt(localStorage.getItem('total'));
    }
   
  }

  ngDoCheck(){
    if (localStorage.getItem('data') === null) {
      this.DataCarrito = [];
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'));

      const existeGrupo = this.DataCarrito.filter(x => x.idGrupo == this.idGru);
      this.contadorPrincipal = existeGrupo.length;
    }

    if (localStorage.getItem('total') === null) {
      this.total = 0;
    } else {
      this.total = parseInt(localStorage.getItem('total'));
    }
  }

  getGrupoVenta(){
    this.inicioService.getClasesGruposVenta().subscribe(data => { 
      
      this.dataArrGrupoVenta = data;
      this.listaGrupoVenta = []; 
      
      const exist = this.dataArrGrupoVenta.filter(x => x.oculto === false)
      console.log(exist);
       
      for (const key  of exist) {
        if (key.imagen === undefined || key.imagen === '' ||key.imagen === null ) {
          key.noImage = true;
         }else{
           key.imagenUrl = 'data:image/png;base64,' + key.imagen;
          key.noImage = false;
         }
    

        this.listaGrupoVenta.push({
          "creadoPor": key.creadoPor,
          "estado": key.estado,
          "fechaCreacion": key.fechaCreacion,
          "fechaModificacion": key.fechaModificacion,
          "id": key.id,
          "imagen":key.imagenUrl,
          "noImage":key.noImage,
          "modificadoPor": key.modificadoPor,
          "nombre": key.nombre,
          "orden":key.orden,
          "oculto":key.oculto
        })
      }
      console.log(this.listaGrupoVenta);
      
    })
  }

  getClasesGruposVent(){
    this.inicioService.getClasesGruposVenta().subscribe(data => {
      return data;
    })
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
  
  redireccion(id, name){
   this.datosGrupo.IdGrupo = id;
   this.datosGrupo.NameGrupo = name;
   this.router.navigate([`gruposventa/${this.datosGrupo.IdGrupo}/${this.datosGrupo.NameGrupo}`]);
  
  }

  redireccionCarrito(){
    this.DataCarrito = JSON.parse(localStorage.getItem('data'))
    this.dataString = JSON.parse(localStorage.getItem('data')) ;
   console.log(this.dataString);
    this.router.navigate([`/carrito`])
  }






}
