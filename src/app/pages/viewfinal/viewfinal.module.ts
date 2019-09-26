import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewfinalPage } from './viewfinal.page';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ViewfinalPage
  }
];

@NgModule({
  entryComponents:[
   FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewfinalPage]
})
export class ViewfinalPageModule {}
