import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { NavController, NavParams,Platform } from 'ionic-angular';
import { RegistrationPage } from "../registration/registration";
import { Network } from '@ionic-native/network';
import { CommonProvider } from "../../providers/common/common";
import { ServicesProvider } from "../../providers/services/services";

import { LocalsessionProvider } from '../../providers/localsession/localsession';
import { EasycoinlockPage } from "../easycoinlock/easycoinlock";
import { Device } from '@ionic-native/device';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formGroup: FormGroup;
  /* user:AbstractControl;
  pw:AbstractControl; */
  user: any;
  pw: any;
  reponse:any;
  priv:any;
  balance_inquiry:any;
  userData = null;
  limit_holder:any;
  
  uuid:any;
  model:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platForm: Platform ,
    private common: CommonProvider,
    private network:Network,
    private services:ServicesProvider,
    private formBuilder:FormBuilder,
    private localSession:LocalsessionProvider,
    private device: Device
  ) {
    
  }

  private directToSignup(){
    this.navCtrl.setRoot(RegistrationPage);
  }


  /* for future purpose */
  /* private async facebook(){
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[])
        .then(profile=>{
          this.userData = {email:profile['email'],first_name:profile['first_name'],picture:profile['picture_large']['data']['url'],username:profile['name']};
          console.log(this.userData);
        })
      })
      .catch(e => console.log('Error logging into Facebook', e));
  } */

  private async signin(){
    this.common.activeLoading();
    await setTimeout(() => {

      if (this.user != '') {

        if (this.pw != '') {

           this.services.login(this.user, this.pw).then((result) => {

            this.reponse = result;
            

            if (this.reponse.status == "verified") {

              
              // this.services.key(this.reponse.data[0].user)
              // .then((res) => {
              //   this.priv = res;
              //   this.services.bal_inquiry(this.reponse.data[0].user, this.priv.priv_key)
              //     .then((bal) => {
              //       let inquiry: any = bal;
                    
              //     });
              // }).catch((e) => {
              //   this.common.closeLoading();
              //   this.common.showAlert('Connection Error', '', 'Please check your internet connection.');
              // });
              this.localSession.set_local_account_id(this.reponse.data[0].account_id);
              this.localSession.set_compiled_value(
                this.reponse.data[0].id, this.reponse.data[0].fname,
                this.reponse.data[0].lname, this.reponse.data[0].mname,
                this.reponse.data[0].user, this.reponse.data[0].email,
                this.reponse.data[0].address, this.reponse.data[0].dob,
                '', '', this.reponse.data[0].user_token
              );
              this.localSession.set_local_key(this.reponse.data[0].keys);
              this.localSession.set_local_balance(this.reponse.data[0].balance);
              this.services.limits(this.reponse.data[0].account_id)
                .then((limits) => {
                  this.limit_holder = limits;
                  if (this.limit_holder.success == "true") {
                    this.localSession.set_local_verified_email(this.limit_holder.verify[0].email_verified);
                    this.localSession.set_local_verified_kyc(this.limit_holder.verify[0].address_verify);
                  } else {
                    this.localSession.set_local_verified_email('false');
                    this.localSession.set_local_verified_kyc('false');
                  }

                  this.services.devices(this.uuid, this.model, this.reponse.data[0].account_id, this.user, this.reponse.data[0].fname)
                    .then((device) => {

                      let dev_res: any = device;
                      this.common.closeLoading();
                      if (dev_res.result.error_code == '0x0000') {
                        this.directTo(dev_res.result.direct, this.reponse.data[0].user, this.reponse.data[0].account_id);

                        this.common.presentToast('welcome ' + this.reponse.data[0].fname);
                      } else {
                        this.common.showAlert('EASYCOIN', '', dev_res.result.message);
                      }
                    }).catch((e) => {
                      this.common.closeLoading();
                      console.log(e);
                    })
                }).catch((e) => {
                  this.common.closeLoading();
                  alert(e);
                })

            } else if (this.reponse.status == "not verified") {
              this.common.closeLoading();

              this.common.presentToast('Invalid password');
            } else {
              this.common.closeLoading();

              this.common.presentToast('Invalid account. Please signup');
            }

          }).catch((e)=>{
            this.common.closeLoading();
            this.common.showAlert('Error', '', e);
          })
        } else {
          this.common.closeLoading();

          this.common.presentToast('Invalid password');
        }
      } else {
        this.common.closeLoading();

        this.common.presentToast('Please enter your username');
      }
    }, 5000);

  }

  ionViewDidLoad(){
    this.uuid = this.device.uuid;
    this.model = this.device.model;
  }

  directTo(direct:any,phone:any,uid){
    switch (direct) {
      case "code":
        this.navCtrl.push(EasycoinlockPage, { code: 'pin', phone: phone, uid: uid});
        break;
      case "mpin":
          this.localSession.set_local_loggedin('is_loggedin');
          
          this.navCtrl.setRoot(EasycoinlockPage,{code:'mpin',phone:phone,uid:uid});
        break;
      default:
        break;
    }
  }

}
