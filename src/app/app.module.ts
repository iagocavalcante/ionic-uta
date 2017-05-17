import { BrowserModule }          from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule  } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar }    from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';               // MODULO PARA PODER USAR STORAGE
import { HttpModule } from '@angular/http';                        // MODULO PARA PODER HACER PETICIONES HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // MODULOS PARA HACER LOS FORMULARIOS REACTIVOS

import { UtaService } from '../providers/uta-service';  // SERVICIOS
import { StorageService } from '../providers/storage-service';  // SERVICIOS

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    UtaService,
    StorageService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
