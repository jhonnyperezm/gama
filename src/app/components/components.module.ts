import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TotalinfoComponent } from './totalinfo/totalinfo.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  entryComponents:[
    TotalinfoComponent,
  ],
  declarations: [
    TotalinfoComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports:[
   TotalinfoComponent,
   HeaderComponent,
   FooterComponent
   
  ],
  imports: [
    CommonModule,
    IonicModule,
    
  ]
})
export class ComponentsModule { }
