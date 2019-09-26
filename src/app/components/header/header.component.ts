import { Component, OnInit, Input, DoCheck  } from '@angular/core';
import { TotalinfoComponent } from '../totalinfo/totalinfo.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GruposventaService } from 'src/app/pages/gruposventa/gruposventa.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit , DoCheck  {
 
 
  @Input() titulo:string;
  @Input() contadorCart:number = 0;
  @Input() total:number = 0;
  dataString :any;
  DataCarrito:any=[];
  botonAtras:boolean;



  constructor( public popoverCtrl: PopoverController,
               public router : Router,
               public gruposVenta:GruposventaService )
               
               { 
               }

  ngOnInit() {

  }

  ngDoCheck(){
    
    if(localStorage.getItem('data') === null){
      this.DataCarrito = [];
      this.contadorCart = this.DataCarrito.length;
    } else {
      this.DataCarrito = JSON.parse(localStorage.getItem('data'))
      this.contadorCart = this.DataCarrito.length;
    }

    
     if (localStorage.getItem('total') === null ) {
      this.total = 0;
     }else {
     this.total = parseInt(localStorage.getItem('total'), 0);
     }
     
}



  // async presentPopover(ev: any) {
  //   this.DataCarrito = JSON.parse(localStorage.getItem('data'))
  //   const popover = await this.popoverCtrl.create({
  //     component: TotalinfoComponent,
  //     event: ev,
  //     animated:true,
  //     mode:"ios",
  //     translucent: false
  //   });
  
  //   await popover.present();
  // }

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

 

  redireccionCarrito(){
    this.DataCarrito = JSON.parse(localStorage.getItem('data'))
   this.dataString = JSON.parse(localStorage.getItem('data')) ;
   console.log(this.dataString);
    this.router.navigate([`/carrito`])
  }

  
  redireccionar() {
    this.DataCarrito = JSON.parse(localStorage.getItem('data'))
  }





}
