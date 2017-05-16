import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // VALIDACIONES DE FORMULARIO
// import { CustomValidators } from 'ng2-validation';                    // VALIDACIONES PERSONALIZADAS DE FORMULARIO

import { UtaService } from '../../providers/uta-service'

@IonicPage()
@Component({
  selector:    'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;

  //PARAMETROS PARA LA CODIFICACION BASE64
  private PADCHAR: string = '=';
  private ALPHA: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


  constructor(
    public navCtrl:     NavController,
    public fb:          FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl:   AlertController,
    public _uta:        UtaService
  ) {
    //  GRUPO DE VALIDACIONES PARA EL FORMULARIO
    this.loginForm = this.fb.group({
      // LO QUE ESTA ENTRE COMILLA NO ES NECESARIO (QUITAR AL FINAL PRUEBAS)
      rut:   ["18313961",   Validators.compose([ Validators.required ])],
      clave: ["08/12/1992", Validators.compose([ Validators.required ])],
    });
  }


  ionViewDidLoad() {
  }

  // LLAMADA A SERVICIO DE LOGIN
  login(){
    let loader = this.loadingCtrl.create();
    loader.present();

    this._uta.login(this.loginForm.value.rut,this.encode(this.loginForm.value.clave))
    .then( _ => {
      loader.dismiss();
      this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'forward' });
    })
    .catch(error => {
      loader.dismiss();

      switch (error.error) {  // DEPENDIENDO DEL ERROR LO MUESTRA EN FORMULARIO
        case "Usuario no se encuentra registrado.":
          this.loginForm.controls.rut.setErrors({ norut: true }); 
          break;
        case "Clave no valida.":
          this.loginForm.controls.clave.setErrors({ wrongpass: true }); 
          break;
        default:
          console.log("Error no registrado: ", error); 
          error.error = "Error al conectarse con el servidor, revise su conexión a internet ó intentelo mas tarde."
          break;
      }

      this.alertMsg("Inicio sesión", error.error); // MOSTRAR MSG CON EL ERROR
      
      //RECORRE TODOS LOS CAMPOS DEL FORMULARIO Y LOS 'ENSUCIA' PARA MOSTRAR LOS ERRORES EXISTENTES
      Object.keys(this.loginForm.controls).forEach(key => { 
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].markAsTouched();
      });
    })
  }


  //MOSTRAR UN PEQUEÑO ALERT CON MENSAJE ESPECIFICO
  alertMsg(titulo: string, msg: string): Alert {
    let alert = this.alertCtrl.create({
      title:    titulo,
      subTitle: msg,
      buttons:  ['Aceptar']
    })
    alert.present();
    return alert;
  }

  //FUNCIONES PARA REALIZAR LA CODIFICACION BASE64
  private getByte(s: string, i: number): number {
    const x = s.charCodeAt(i);
    return x;
  }

  public encode(s: string): string {
    s = String(s);

    let i, b10, x = [],
      imax = s.length - s.length % 3;

    if (s.length === 0) {
      return s;
    }

    for (i = 0; i < imax; i += 3) {
      b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8) | this.getByte(s, i + 2);
      x.push(this.ALPHA.charAt(b10 >> 18));
      x.push(this.ALPHA.charAt((b10 >> 12) & 63));
      x.push(this.ALPHA.charAt((b10 >> 6) & 63));
      x.push(this.ALPHA.charAt(b10 & 63));
    }

    switch (s.length - imax) {
      case 1:
        b10 = this.getByte(s, i) << 16;
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.PADCHAR + this.PADCHAR);
        break;
      case 2:
        b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.ALPHA.charAt((b10 >> 6) & 63) + this.PADCHAR);
        break;
      }

      return x.join('');
    }
    //FIN FUNCIONES CODIFICACION BASE64*******************

}
