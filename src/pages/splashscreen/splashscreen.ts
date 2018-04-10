import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import { EasycoinlockPage } from "../easycoinlock/easycoinlock";
import { LoginPage } from "../login/login";
import { LocalsessionProvider } from '../../providers/localsession/localsession';

/**
 * Generated class for the SplashscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splashscreen',
  templateUrl: 'splashscreen.html',
})
export class SplashscreenPage {

  pin:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private common:CommonProvider,
    private localSession: LocalsessionProvider) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.pin = this.localSession.get_local_loggedin();
      console.log(this.localSession.get_local_loggedin()); 
      if (this.pin == "undefined") {
        this.navCtrl.setRoot(LoginPage);
      } else if (this.pin == null) {
        this.navCtrl.setRoot(LoginPage);
      } else if (this.pin == "") {
        this.navCtrl.setRoot(LoginPage);
      } else if (this.pin != null) {
        this.navCtrl.setRoot(EasycoinlockPage, { code: 'mpin', phone: this.localSession.get_local_phone(), uid: this.localSession.get_local_account_id() });
      }
    }, 4000);
  }
}
