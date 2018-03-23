import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { CommonProvider } from "../../providers/common/common";
import { LocalsessionProvider } from "../../providers/localsession/localsession";

/**
 * Generated class for the VerifyemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-verifyemail',
  templateUrl: 'verifyemail.html',
})
export class VerifyemailPage {
  name: any;
  mobileNo: any;
  email: any;
  holder:any;
  constructor(private alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, private services: ServicesProvider, private common: CommonProvider, private localSession:LocalsessionProvider) {
  }

  ionViewDidLoad() {
    this.name = this.localSession.get_local_name() +" "+ this.localSession.get_local_mname() +" "+ this.localSession.get_local_lname();
    this.mobileNo = this.localSession.get_local_phone();
  }

  sendEmail(){
    this.services.submit_email(this.name, this.mobileNo , this.email)
    .then((res)=>{
      this.holder = res;
      if(this.holder.success == 'true'){
        this.showAlert('Email',"Please verify your email",'','Close');
      }else{
        this.showAlert('Email','This email address is already used.','','Ok');
      }
    })
    .catch((e)=>{
      alert(e);
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
