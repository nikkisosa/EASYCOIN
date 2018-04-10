import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import CryptoJS from "crypto-js";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
import { Base64 } from '@ionic-native/base64';

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  //private url = 'http://192.168.1.2/esy-coin/api2/access/v2';
  private url = 'http://hyperloop.servehttp.com/esy-coin/api2/access/v2/';

  private sig:any;
  private date:any;
  private random:any;
  private combine:any;

  private max = 1000000;
  private min = 100;
  constructor(public http: Http) {
  }

  signiture(mobile_no, key, _default: string = 'SHA1') {
    this.date = Date.now();
    this.random = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
    this.combine = mobile_no + this.date + this.random;
    if (_default == 'SHA1') {
      this.sig = CryptoJS.HmacSHA1(this.combine, key);
    } else if (_default == 'SHA2') {
      this.sig = CryptoJS.HmacSHA256(this.combine, key);
    }
  }

  ads() {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('path', 'ads');

      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  resend_pin(uuid,model,uid){
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('uuid', uuid);
      body.append('model', model);
      body.append('uid', uid);
      body.append('path', 'resend_sms');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  verify_sms(number,code){
    return new Promise((resolve,reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('sms',code);
      body.append('number',number);
      body.append('path', 'verify_sms_code');
      
      this.http.post(this.url,body,{headers:headers}).
      subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        reject(err);
      });
    });
  }

  accountUpdate(key, mobile_no) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('key', key);
      body.append('mobile_no', mobile_no);
      body.append('path', 'updateaccount');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  

  branches(code = 'money') {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('code', code);
      body.append('path', 'branches');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // exchange_php_btc(account_no,btc,php,token) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append('account_no', account_no);
  //     body.append('btc', btc);
  //     body.append('php', php);
  //     body.append('token', token);
  //     this.http.post(this.convert_php_btc, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  cash_in(number, branch_id,amount,name) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('accno', number);
      body.append('branch_id', branch_id);
      body.append('amount', amount);
      body.append('name', name);
      body.append('path', 'cashin');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  verify_address(id,current_address,permanent_address){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });

      let body = new FormData();
      body.append('id',id);
      body.append('current_address',current_address);
      body.append('permanent_address',permanent_address);
      body.append('path', 'address');
      
      this.http.post(this.url,body,{headers:headers}).
      subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        reject(err);
      });
    });
  }

  limits(id){
    return new Promise((resolve,reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('id',id);
      body.append('path', 'levels');
      
      this.http.post(this.url,body,{headers:headers}).
      subscribe(res=>{
        resolve(res.json());
      },(err)=>{
        reject(err);
      });
    });
  }

  resend_code(number) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('number', number);
      body.append('path', 'resend_sms_code');
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  submit_email(fullname,number,email) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append('email', email);
      body.append('fullname', fullname);
      body.append('number', number);
      body.append('path', 'submit_email');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  registration(username, password, fname, mname, lname, email, question,answer) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("USR", username);
      body.append("PWD", password);
      body.append("FNAME", fname);
      body.append("MNAME", mname);
      body.append("LNAME", lname);
      body.append("EMAIL", email);
      body.append("QUESTION", question);
      body.append("ANSWER", answer);
      body.append("path", 'register');
      this.http.post(this.url, body,{headers:headers}).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  devices(uuid, model, uid, email='', name='',mpin='') {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("uuid", uuid);
      body.append("model", model);
      body.append("uid", uid);
      body.append("email", email);
      body.append("name", name);
      body.append("mpin", mpin);
      body.append("path", 'connect_device');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  // update_vw_account(fullname, email,mobile_no,key) {
  //   this.signiture(mobile_no, key);
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("fullname", fullname);
  //     body.append("email", email);
  //     body.append("mobile_no", mobile_no);
  //     body.append("date_time", this.date);
  //     body.append("random_no", this.random);
  //     body.append("sig", this.sig.toString(CryptoJS.enc.Base64));
  //     this.http.post(this.user_update_vw_account, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }


  // buy(mobile_no,customer_no, key,nwallet,pcode) {
  //   this.signiture(mobile_no, key);
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("mobile_no", mobile_no);
  //     body.append("date_time", this.date);
  //     body.append("random_no", this.random);
  //     body.append("sig", this.sig.toString(CryptoJS.enc.Base64));
  //     body.append("nwallet",nwallet);
  //     body.append("pcode",pcode);
  //     body.append("customer_no", customer_no);
  //     this.http.post(this.send, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }

  // create_account(fullname, email, mobile_no) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("fullname", fullname);
  //     body.append("email", email);
  //     body.append("mobile_no", mobile_no);

  //     this.http.post(this.user_create, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }

  // bal_inquiry(mobile_no,key) {
  //   this.signiture(mobile_no, key);
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("mobile_no", mobile_no);
  //     body.append("date_time", this.date);
  //     body.append("random_no", this.random);
  //     body.append("sig", this.sig.toString(CryptoJS.enc.Base64));
  //     this.http.post(this.user_bal, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // key(mobile_no) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("mobile_no", mobile_no);
  //     this.http.post(this.user_ret_priv, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }

  login(username, password) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("USR", username);
      body.append("PWD", password);
      body.append("path", 'user');
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  // user_update(id,token,name,phone,address,email,dob){
  //   return new Promise((resolve, reject) => {
  //       let headers = new Headers({
  //           'Accept': 'application/x-www-form-urlencoded'
  //       });
  //       let body = new FormData();
  //       body.append("NAME", name);
  //       body.append("PHONE", phone);
  //       body.append("ADDRESS", address);
  //       body.append("EMAIL", email);
  //       body.append("DOB", dob);
  //       body.append("TOKEN", token);
  //       body.append("ID", id);
  //       this.http.post(this.update_user, body, { headers: headers }).
  //           subscribe(res => {
  //               resolve(res.json());
  //           }, (err) => {
  //               reject(err);
  //           });

  //   });
  // }

  user_trans(page:any=1,userid){
    return new Promise((resolve, reject) => {
      let headers = new Headers({
          'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("page", page);
      body.append("userid", userid);
      body.append("path", 'transaction_history');
    
      this.http.post(this.url, body, { headers: headers }).
          subscribe(res => {
              resolve(res.json());
          }, (err) => {
              reject(err);
          });

    });
  }

  pass_key(uuid, model, uid, code) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("uuid", uuid);
      body.append("model", model);
      body.append("uid", uid);
      body.append("code", code);
      body.append("path", 'otp');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  //deprecated
  // setPincode(name,pincode){
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("name", name);
  //     body.append("pincode", pincode);
  //     this.http.post(this.updatePincode, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }

  setMPin(uuid,model,uid,mpin) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("uuid", uuid);
      body.append("model", model);
      body.append("uid", uid);
      body.append("mpin", mpin);
      body.append("path", "setmpin");
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  // enterPincode(user, pincode) {
  //   return new Promise((resolve, reject) => {
  //     let headers = new Headers({
  //       'Accept': 'application/x-www-form-urlencoded'
  //     });
  //     let body = new FormData();
  //     body.append("user", user);
  //     body.append("pincode", pincode);
  //     this.http.post(this.enter_pin, body, { headers: headers }).
  //       subscribe(res => {
  //         resolve(res.json());
  //       }, (err) => {
  //         reject(err);
  //       });

  //   });
  // }

  easycoin_balance(account_no,token){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("account_no", account_no);
      body.append("token", token);
      body.append("path", 'check_balance');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    })
  }

  validate_user(mobile_no, key) {
    this.signiture(mobile_no, key,'SHA2');
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Accept': 'application/x-www-form-urlencoded'
      });
      let body = new FormData();
      body.append("mobile_no", mobile_no);
      body.append("date_time", this.date);
      body.append("random_no", this.random);
      body.append("sig", this.sig.toString(CryptoJS.enc.Base64));
      body.append("path", 'validate_user');
      
      this.http.post(this.url, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  

}
