import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../providers/storage-service';


@IonicPage()
@Component({
  selector: 'page-asignaturas',
  templateUrl: 'asignaturas.html',
})
export class AsignaturasPage {
  public inscripcion: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public _st:  StorageService
    ){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Asignaturas');
    this._st.getInscripcion().then( data => {
      this.inscripcion = data;
      console.log("objetoPersonal", this.inscripcion);
    });
  }


}
