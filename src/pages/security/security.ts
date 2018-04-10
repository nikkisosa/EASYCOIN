import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import { ChangepassPage } from "../changepass/changepass";
/**
 * Generated class for the SecurityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage {

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private common:CommonProvider
    ) 
    {}

  pincode(page){
    switch (page) {
      case 'changepass':
        this.common.openModal(ChangepassPage);
        break;
      default:
        break;
    }
   
  }

}
