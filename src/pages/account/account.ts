import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import Qrcode from 'qrcode';
import { LocalsessionProvider } from "../../providers/localsession/localsession";
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  code:any = '' ;
  generated = '';
  info:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private localSession:LocalsessionProvider) {

  }

  displayQrCode() {
    return this.generated !== '';
  }

  ionViewDidLoad() {
    this.code = 'easycoin ' + this.localSession.get_local_phone();
    const qrcode = Qrcode;
    const self = this;
    qrcode.toDataURL(JSON.stringify(this.code), { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    })

    
  }

  ionViewDidEnter(){
    this.info.push(
      {
        "name": this.localSession.get_local_name(),
        "email": this.localSession.get_local_email(),
        "number": this.localSession.get_local_phone(),
        "address": this.localSession.get_local_address()
      }
    );

  }

}
