import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { CommonProvider } from "../../providers/common/common";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { LoginPage } from '../login/login';
import { CoinwalletProvider } from "../../providers/coinwallet/coinwallet";
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  holder:any;
  showResend:boolean = false;
  counter:boolean = true;
  sms_code:number;
  loading:boolean = false;
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private services: ServicesProvider,private common:CommonProvider,
    private localSession: LocalsessionProvider,
    private coin: CoinwalletProvider
  ) {}

  private async verifying(){
    this.loading = true;
    await
    this.services.verify_sms(this.localSession.get_local_phone(),this.sms_code)
    .then((res)=>{
      this.holder = res;
      console.log(this.holder);
      if (this.holder.success == 'false'){
        if(this.holder.code == 'invalid'){
          this.showResend = false;
          this.loading = false;
        } else if (this.holder.code == 'expire') {
          this.showResend = true;
          this.counter = false;
          this.loading = false;
        }
        this.common.presentToast(this.holder.response);
      }else{
        this.showResend = false;
        this.counter = false;
        this.localSession.set_compiled_value(
          this.holder.data[0].id, this.holder.data[0].fname,
          this.holder.data[0].lname, this.holder.data[0].mname,
          this.localSession.get_local_phone(), '',
          '', this.holder.data[0].dob,
          '', this.localSession.get_local_priv_key(), this.holder.data[0].user_token
        );

        this.coin.create_wallet(this.holder.data[0].fname + ' ' + this.holder.data[0].mname + ' ' + this.holder.data[0].lname, this.localSession.get_local_phone(), this.holder.email)
          .then((results) => {
            let priv: any = results;
            console.log(priv);
            this.services.accountUpdate(priv.privatekey, this.localSession.get_local_phone())
              .then((updateResult) => {
                let update: any = updateResult;
                if (update.error_code == "0x0000") {
                  this.navCtrl.setRoot(LoginPage);
                  this.loading = true;
                }
                else if (update.error_code == "0x0001") {
                  this.common.showAlert("Error", "", update.message);
                  this.loading = true;
                }
                else {
                  this.common.showAlert("Error", "", update.message);
                  this.loading = true;
                }
              })
          }).catch((e) => {
            console.log(e);
          })
        
        this.common.presentToast(this.holder.response);
      }
    }).catch(()=>{
      alert('No Internet Connection. Please try again');
    })
  }

  resend(){
    this.services.resend_code(this.localSession.get_local_phone());
  }

}
