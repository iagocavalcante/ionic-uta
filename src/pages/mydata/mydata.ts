import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../providers/storage-service';

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
    public st_service: StorageService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mydata');

    this.st_service.getPersonal().then( auth => {
      this.user = auth;
      console.log("objetoPersonal", this.user);
    });
  }

}
