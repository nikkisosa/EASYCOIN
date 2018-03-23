import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { CommonProvider } from "../../providers/common/common";
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  id:any;
  current_address:any;
  permanent_address:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localSession:LocalsessionProvider,private services:ServicesProvider,
  private common:CommonProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.id = this.localSession.get_local_account_id();
    console.log(this.id);
  }

  private address(){
    this.services.verify_address(this.id,this.current_address,this.permanent_address)
    .then((res)=>{
      console.log(this.permanent_address);
      this.showAlert('Successfull','','Thank you for sending your current address','Close');
      this.localSession.set_local_verified_address('true');
    }).catch((e)=>{
      this.showAlert('Error','No Internet connection','Please Try again.','Ok');
    })
  }

  showAlert(Title,Subtitle,message = '',button:string="Ok"){
    let alert = this.alertCtrl.create({
        title: Title,
        subTitle: Subtitle,
        message: message,
        buttons: [{
                    text: button,
                    handler: () => {
                      this.navCtrl.pop();
                    }
                 }]
      });
      alert.present();
  }

}
