import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GruposventaseleccionPage } from './gruposventaseleccion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TotalinfoComponent } from 'src/app/components/totalinfo/totalinfo.component';

const routes: Routes = [
  {
    path: '',
    component: GruposventaseleccionPage
  }
];

@NgModule({
  entryComponents:[
   HeaderComponent,
   FooterComponent,
   TotalinfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GruposventaseleccionPage]
})
export class GruposventaseleccionPageModule {}
