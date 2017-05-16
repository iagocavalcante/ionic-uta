import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartscreenPage } from './startscreen';

@NgModule({
  declarations: [
    StartscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(StartscreenPage),
  ],
  exports: [
    StartscreenPage
  ]
})
export class StartscreenModule {}
