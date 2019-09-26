import { Component, OnInit} from '@angular/core';
import { ModalgruposventaService } from './modalgruposventa.service';
import { NavParams, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-modalgruposventa',
  templateUrl: './modalgruposventa.page.html',
  styleUrls: ['./modalgruposventa.page.scss'],
})
export class ModalgruposventaPage implements OnInit {

  listaArticulos:any =[];
  passDataGrupVenta:any = [];
  datosGrupoVenta:any=[];
  nombreArticulo:any=[];
  

 
  constructor( private modalGruposVentaService:ModalgruposventaService,
               private navParams: NavParams,
               private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.passDataGrupVenta = this.navParams.get('data');
    this.nombreArticulo = this.passDataGrupVenta.nombreArticulo;
    this.datosGrupoVenta.push(this.passDataGrupVenta);

    console.log('modal' , this.datosGrupoVenta);
  }


  getArticulos(id){
    this.modalGruposVentaService.getArticulosGrupos(id).subscribe(data => {
      this.listaArticulos = data;
      console.log('funciona', this.listaArticulos)
      return this.listaArticulos;
    })
  }

  dismiss(){

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


}
