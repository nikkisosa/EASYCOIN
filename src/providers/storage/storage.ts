import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public sqliteDB: SQLite) {
    
  }

  public local(){
    this.sqliteDB.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT,name text,sid text, balance float, token text,active text,num text,dob text,email text,address text,priv_key text);', {})
          .then(res => console.log('SQL EXECUTED!'))
          .catch(e => console.log('ERROR Code No#- 0001'));
        db.executeSql('CREATE TABLE IF NOT EXISTS settings(id INTEGER PRIMARY KEY AUTOINCREMENT,auto_update text);', {})
          .then(res => console.log('SQL EXECUTED!'))
          .catch(e => console.log('ERROR Code No#- 0001'));
      })
      .catch(e => console.log('ERROR Code No#- 0000'));
  }
}
