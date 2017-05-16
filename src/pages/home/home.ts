import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public user: any;

  constructor(
    public navCtrl:   NavController,
  ) {
  }

  ionViewDidLoad() {
  }
}