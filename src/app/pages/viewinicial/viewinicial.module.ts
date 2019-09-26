import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewinicialPage } from './viewinicial.page';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ViewinicialPage
  }
];

@NgModule({
  entryComponents:[
   FooterComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewinicialPage]
})
export class ViewinicialPageModule {}
