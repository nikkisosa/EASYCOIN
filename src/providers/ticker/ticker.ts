import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TickerProvider {

  private USD = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  private USD_TO_PHP = 'https://api.fixer.io/latest?base=USD';
  
  private coinbase_pricing = 'https://api.coinbase.com/v2/prices/spot?currency=';
  constructor(public http: Http) {
  }

  btcUSD() {
    return new Promise((resolve, reject) => {
      this.http.get(this.USD).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  php_rate(){
    return new Promise((resolve, reject) => {
      this.http.get(this.USD_TO_PHP).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  pricing_in_coinbase(currency = 'USD') {
    return new Promise((resolve, reject) => {
      this.http.get(this.coinbase_pricing+currency).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

}
