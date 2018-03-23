import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { VerifyemailPage } from "../verifyemail/verifyemail";
import { AddressPage } from "../address/address";
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
/**
 * Generated class for the LevelsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html',
})
export class LevelsPage {

  email:any='false';
  address:any='false';
  govid:any='false';
  vc:any='false';
  bankStatement:any='false';
  billingStatement:any='false';
  holder:any;

  loading: boolean = true; // initialize
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private device: Device,platform: Platform,
              private services:ServicesProvider,private localSession:LocalsessionProvider
  ) {}

  ionViewDidLoad(){
    this.onload();
  }

  async onload(){
    this.loading = true;
    await
      this.services.limits(this.localSession.get_local_account_id())
        .then((res) => {
          this.holder = res;
          if (this.holder.success == "true") {
            this.email = this.holder.verify[0].email_verified;
            this.address = this.holder.verify[0].address_verify;
            this.govid = this.holder.verify[0].gov_verify;
            this.vc = this.holder.verify[0].vc_verify;
            this.bankStatement = this.holder.verify[0].bank_statement_verify;
            this.billingStatement = this.holder.verify[0].billing_statement_verify;
            this.localSession.set_local_verified_email(this.holder.verify[0].email_verified);
            this.localSession.set_local_verified_kyc(this.holder.verify[0].gov_verify);
          } else {
          }
          this.loading = false;
        }).catch((e) => {
          console.log(e);
          this.loading = false;
        })
  }

  public page(Page) {
    switch (Page) {
      case "email":
        this.navCtrl.push(VerifyemailPage);
        break;
      case "address":
        this.navCtrl.push(AddressPage);
        break;
    }
  }
}
