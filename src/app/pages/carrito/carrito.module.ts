import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarritoPage } from './carrito.page';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CarritoPage
  }
];

@NgModule({
  entryComponents:[
    FooterComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarritoPage]
})
export class CarritoPageModule {}
