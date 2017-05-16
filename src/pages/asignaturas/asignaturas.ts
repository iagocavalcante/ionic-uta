import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtaService } from '../../providers/uta-service';


@IonicPage()
@Component({
  selector: 'page-asignaturas',
  templateUrl: 'asignaturas.html',
})
export class AsignaturasPage {
  public user: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _uta:  UtaService
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Asignaturas');
    this._uta.getAuth().then( auth => {
      this.user = auth;
    });
  }


}
