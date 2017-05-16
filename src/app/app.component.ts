import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, LoadingController, MenuController, Events } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UtaService } from '../providers/uta-service';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages:    Array<{title: string, component: any, icon: string}>;
  user:     any;


  constructor(
    public platform:     Platform, 
    public statusBar:    StatusBar,
    public splashScreen: SplashScreen,
    public _uta:         UtaService,
    public loadingCtrl:  LoadingController,
    public menuCtrl:     MenuController,
    public events:       Events
  ) {
    this.user  = null; // DATOS DE USUARIO ACTUAL

    // PAGINAS DEL MENU - TODAS VAN AL HOMEPAGE
    this.pages = [
      { title: 'Inicio',      component: 'HomePage', icon: 'home' },
      { title: 'Asignaturas', component: 'AsignaturasPage', icon: 'clipboard' },
      { title: 'Estudiante',  component: 'MydataPage', icon: 'school' },
    ];
  }


  //ON INIT
  ngOnInit() {
    this.initializeApp();  //INICIALIZA PLUGINS Y LLAMADAS NATIVAS

    let loader = this.loadingCtrl.create();
    loader.present();

    // PREGUNTAR SI ESTA LOGUEADO - LLAMA AL SERVICIO UTA IMPORTADO  DE UTA-SERVICE.TS Y A LA FUNCION GETAUTH
    //SI GETAUTH RETORNA RETORNA USUARIO Y SE ALMACENA EN AUTH ENTONCES SACA EL LOADING Y ASIGNA LOS VALORES DEL  
    this._uta.getAuth().then( auth => {
      loader.dismiss();
      this.user = auth;
      console.log(auth);
      if ( auth ){
      // SI ESTA LOGEADO ACTIVAR MENU E IR A PAGINA 'HomePage'
        this.menuCtrl.enable(true);
        this.nav.setRoot('HomePage', {}, { animate: true, direction: 'forward' });
        // this.rootPage = "HomePage";
      } else {
      // EN CASO CONTRARIO DESACTIVAR MENU E IR A PAGINA 'LoginPage'
        this.menuCtrl.enable(false);
        this.nav.setRoot('StartscreenPage', {}, { animate: true, direction: 'forward' });
        // this.rootPage = "LoginPage";
      }
    })

    // MANEJADORES DE EVENTOS LOGIN & LOGOUT
    this.events.subscribe("login:success",  user => this.onLogin(user));
    this.events.subscribe("logout:success",  _ => this.onLogout());
  }
  // ON INIT


  // INCIALIZACION DE PLUGINS NATIVOS
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      /*
     //PARA LA UTILIZACION DE ONESIGNAL. NOTIFICACIONES PUSH
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
      .startInit("237040ab-54a9-4cd4-b6b6-1a48d3c31327", "293024235261")
  	  .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
      */
    });
  }

  //IR A PAGINA ESPECIFICA
  openPage(page) {
    this.nav.setRoot(page.component);
  }


  //CERRAR SESION
  logout() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this._uta.logout().then(_ => {
      loader.dismiss();
    })
  }


  //CUANDO SE EMITE EL EVENTO LOGIN
  onLogin(user){
    console.log("onLogin:", user);
    this.user = user;
    this.menuCtrl.enable(true);
  }


  //CUANDO SE EMITE EL EVENTO LOGOUT
  onLogout(){
    console.log("onLogout");
    this.user = null;
    this.menuCtrl.enable(false);
    this.nav.setRoot('StartscreenPage', {}, { animate: true, direction: 'forward' });
  }
}
