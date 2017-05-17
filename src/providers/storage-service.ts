import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Injectable()
export class StorageService {

  constructor(
    public http: Http,
    public storage: Storage
  ){}

  getAll(): Promise<any> {
    return this.storage.ready()
    .then( _ => this.storage.get('user')
    .then(user => user ) );
  }

  //DEVUELVE DATOS PERSONALES
  getPersonal(): Promise<any> {
    return this.storage.ready()
    .then(_ => this.storage.get('user')
    .then(data => data = data.personal)
    .then(personal => personal))
  }

  //DEVUELVE INSCRIPCIONES
  getInscripcion(): Promise<any> {
    return this.storage.ready()
    .then(_ => this.storage.get('user')
    .then(data => data = data.inscripcion)
    .then(inscripcion => inscripcion))
  }

}
