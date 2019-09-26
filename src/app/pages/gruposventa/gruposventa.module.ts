import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GruposventaPage } from './gruposventa.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TotalinfoComponent } from 'src/app/components/totalinfo/totalinfo.component';
import { ModalgruposventaPage } from '../modalgruposventa/modalgruposventa.page';
import { ModalgruposventaPageModule } from '../modalgruposventa/modalgruposventa.module';




const routes: Routes = [
  {
    path: '',
    component: GruposventaPage
  }
];

@NgModule({
  entryComponents:[
    HeaderComponent,
    FooterComponent,
    TotalinfoComponent,
    ModalgruposventaPage,
   
   ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalgruposventaPageModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GruposventaPage]
})
export class GruposventaPageModule {}
