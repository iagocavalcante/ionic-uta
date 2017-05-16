import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydataPage } from './mydata';

@NgModule({
  declarations: [
    MydataPage,
  ],
  imports: [
    IonicPageModule.forChild(MydataPage),
  ],
  exports: [
    MydataPage
  ]
})
export class MydataModule {}
