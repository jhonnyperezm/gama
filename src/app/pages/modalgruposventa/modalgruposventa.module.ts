import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ModalgruposventaPage } from './modalgruposventa.page';

/* const routes: Routes = [
  {
    path: '',
    component: ModalgruposventaPage
  }
]; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
  ],
  declarations: [ModalgruposventaPage]
})
export class ModalgruposventaPageModule {}
