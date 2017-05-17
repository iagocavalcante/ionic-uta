import { Injectable }            from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';


//PARA TRABAJAR LAS PETICIONES HTTP
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Events }  from 'ionic-angular';
import { Storage } from '@ionic/storage';

//URLS
export class URLs {
  //public static base = "http://desasisaca.uta.cl/wwwregistraduria/public/movil/index/";
  public static base = "/utaAPI/"; // USANDO PROXY PARA EVITAR ERRORES DE CORS
}

@Injectable()
export class UtaService {

  /** Funciones para el uso de la api de los servicios webs de UTA */
  constructor(
    public http:    Http, 
    public events:  Events, 
    public storage: Storage
  ) { }


  /** Envia credenciales al servidor, en caso exitoso guarda el usuario en localstorage y levanta evento login */
  login(rut: string, clave: string):Promise<any> {
    let params = new URLSearchParams();  //  PARAMETROS PARA PETICION GET
    params.set('rut',   rut);
    params.set('clave', clave);

    return this.http.get(URLs.base + "iniciar-sesion", { search: params })
    .map( res => res.json()) // MAPEAR RESPUESTA PARA QUE SEA UN OBJETO CON SOLO LA DATA
    .toPromise()             // CONVIERTE OBSERVABLE EN PROMESA, NO ES NECESARIO PERO FACILITA ALGUNAS COSAS
    .then( data => {
      data = data.sesion[0]; //GUARDO EL SESION[0](RESPUESTA SERVIDOR) EN DATA

      // SI NO RETORNA ERROR EL SERVIDOR, OBTENER DATOS DE USUARIO, PUBLICAR EVENTO Y GUARDAR EN STORAGE
      if (data.estado == '1' && data.error == ""){
        this.getUserData(data.idUsuario).then( u => {
          let user = u.sesion[0].datos;
          
          this.storage.ready()
          .then( _ => this.storage.set('user', user)
            .then( _ => {
              this.events.publish("login:success", user);
              return user;
            }) 
          );
        })
      } else 
        throw data;
    })
  }


  /** Retorna los datos del usuario segun su id */ 
  getUserData(idUsuario): Promise<any>{
    let params = new URLSearchParams();  // PARAMETROS PARA PETICION GET
    params.set('idUsuario', idUsuario);

    return this.http.get(URLs.base + "actualizar-datos", { search: params })
    .map( res => res.json())
    .toPromise() 
  }


  /** Retorna si esta logueado o no (buscar en storage 'user') RETORNA EL OBJETO USUARIO, EL ARRAY ENTERO*/
  getAuth(): Promise<any> {
    return this.storage.ready().then( _ => this.storage.get('user').then(user => user ) );
  }


  /** Borra user del storage y levanta evento logout*/
  logout(): Promise<any>{
    return this.storage.ready()
      .then( _ => this.storage.remove('user')
        .then( _ => this.events.publish("logout:success")) );
  }

}
