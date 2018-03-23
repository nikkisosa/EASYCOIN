import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import CryptoJS from 'crypto-js';
import 'rxjs/add/operator/map';

@Injectable()
export class CoinwalletProvider {
  
  // private request_url = 'http://192.168.1.2/esy-coin/api/balance_wallet';
  // private request_transefer_url = 'http://192.168.1.2/esy-coin/api/balance_transfer';
  // private request_createwallet_url = 'http://192.168.1.2/esy-coin/api/create_wallet';
  // private request_converter_url: string = 'http://192.168.1.2/esy-coin/api/converter';
  private request_url = 'http://hyperloop.servehttp.com/esy-coin/api/balance_wallet';
  private request_transefer_url = 'http://hyperloop.servehttp.com/esy-coin/api/balance_transfer';
  private request_createwallet_url = 'http://hyperloop.servehttp.com/esy-coin/api/create_wallet';
  private request_converter_url: string = 'http://hyperloop.servehttp.com/esy-coin/api/converter';
  private sig:any;
  constructor(public http: Http) {
  }

  create_wallet(name,mobile_no,email){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('mobile',mobile_no);
      body.append('name', name);
      body.append('email', email);
      this.http.post(this.request_createwallet_url,body,{headers:headers}).
      subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        reject(err);
      })
    })
  }

  balance_wallet(mobile_no, key) {
    this.signiture(mobile_no,key);
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });

      let body = new FormData();
      body.append('pubkey', CryptoJS.MD5(mobile_no).toString());
      body.append('sighash', this.sig.toString(CryptoJS.enc.Base64));
      this.http.post(this.request_url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    })
  }

  balance_transfer(mobile_no, key,currencyType,addressTo,amount) {
    this.signiture(mobile_no, key);
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });

      let body = new FormData();
      body.append('pubkey', CryptoJS.MD5(mobile_no).toString());
      body.append('sighash', this.sig.toString(CryptoJS.enc.Base64));
      body.append('amount', amount);
      body.append('address', addressTo);
      body.append('currency', currencyType);
      body.append('sender', mobile_no);
      this.http.post(this.request_transefer_url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    })
  }

  converter(mobile_no, key, from, to, amount) {
    this.signiture(mobile_no, key);
    return new Promise((resolve, reject) => {

      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });

      let body = new FormData();
      body.append('pubkey', CryptoJS.MD5(mobile_no).toString());
      body.append('sighash', this.sig.toString(CryptoJS.enc.Base64));
      body.append('amount', amount);
      body.append('from', from);
      body.append('to', to);
      body.append('mobile_no', mobile_no);
      this.http.post(this.request_converter_url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        })
    })
  }

 signiture(mobile_no, key, _default: string = 'SHA1') {
    if (_default == 'SHA1') {
      this.sig = CryptoJS.HmacSHA1(CryptoJS.MD5(mobile_no).toString(), key);
    } else if (_default == 'SHA2') {
      this.sig = CryptoJS.HmacSHA256(mobile_no, key);
    }
    
  }

}
