import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtaService } from '../../providers/uta-service';

@IonicPage()
@Component({
  selector: 'page-mydata',
  templateUrl: 'mydata.html',
})
export class MydataPage {
  public user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _uta: UtaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mydata');

    this._uta.getAuth().then( auth => {
      this.user = auth;
    });
  }

}
