import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-startscreen',
  templateUrl: 'startscreen.html',
})
export class StartscreenPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Startscreen');
  }

  goToLogin()
  {
    this.navCtrl.push("LoginPage",  {
            animate: false});
  }

}
