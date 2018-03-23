import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';

import { SecurityPage } from "../security/security";
import { PincodePage } from "../pincode/pincode";
import { CommonProvider } from "../../providers/common/common";
import { AppVersion } from '@ionic-native/app-version';
import { SetPage } from "../set/set";
import { ChangepassPage } from "../changepass/changepass";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  auto:any;
  check:any;
  version:any;
  appname:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     private alertCtrl: AlertController, 
     private appVersion: AppVersion,
    private common:CommonProvider ) {
  }

  ionViewDidLoad() {
    this.check = localStorage.getItem('version_update');
    console.log(this.check);
    if(this.check == 'true'){
      this.auto = 'true';
    }else{
      this.auto = 'false';
    }

    this.version = this.appVersion.getVersionNumber();

    this.appname = this.appVersion.getAppName();
  }
  update(){
    if (this.auto == 'true'){
      this.auto = 'false';
      console.log(this.auto);
      localStorage.setItem('version_update','false');
    } else if (this.auto == 'false') {
      this.auto = 'true';
      console.log(this.auto);
      localStorage.setItem('version_update', 'true');
    }
  }

  pages(page){
    switch (page) {
      case 'security':
        this.navCtrl.push(SecurityPage);
        break;
      case 'pincode':
        this.navCtrl.push(PincodePage);
        break;
      case 'help':
        //this.navCtrl.push(PincodePage);
        let alertHelp = this.alertCtrl.create({
          title: 'Help',
          message: '',
          buttons: ['Close']
        });
        alertHelp.present();
        break;
      case 'about':
        //this.navCtrl.push(PincodePage);
        let alert = this.alertCtrl.create({
          title: 'About',
          subTitle: this.appname,
          message: 'Version ' + this.version,
          buttons: ['Close']
        });
        alert.present();
        break;
      default:
        break;
    }
  }

  pincode(page){
    switch (page) {
      case 'pin':
        this.common.openModal(SetPage);
        break;
      case 'changepass':
        this.common.openModal(ChangepassPage);
        break;
      default:
        break;
    }
   
  }
}
