import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TotalinfoComponent } from 'src/app/components/totalinfo/totalinfo.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  entryComponents:[
   TotalinfoComponent,
   FooterComponent,
   HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
