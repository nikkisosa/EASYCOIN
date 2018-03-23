import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentamountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-paymentamount',
  templateUrl: 'paymentamount.html',
})
export class PaymentamountPage {
  partner:any;
  img:any;
  details:boolean = true;
  confirm_details:boolean = false;
  success_details:boolean = false;
  account_no: any;
  reference_no: any;
  amount: any;
  fname:any;
  lname:any;
  mname: any;
  phone: any;
  service: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.partner = this.navParams.get("name");
    this.img = this.navParams.get("image");
  }

  private onNext(){
    this.confirm_details = true;
    this.details = false;
  }

  private onProceed(){

  }

}
