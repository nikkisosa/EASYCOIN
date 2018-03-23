import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//import { DatePicker } from '@ionic-native/date-picker';
import { ServicesProvider } from "../../providers/services/services";
import { CommonProvider } from "../../providers/common/common";
import { Network } from '@ionic-native/network';
import { LocalsessionProvider } from '../../providers/localsession/localsession';
@Component({
  selector: 'page-useredit',
  templateUrl: 'useredit.html',
})
export class UsereditPage {

  /* data=[]; */
  name:any;
  phone:any;
  address:any;
  email:any;
  dob:any;
  date:any = 'date';
  response:any;
  sig:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private platForm: Platform,
    private services:ServicesProvider,
    private network:Network,
    private common:CommonProvider,
    private localSession:LocalsessionProvider) {
  
  }


  ionViewWillEnter(){
    this.name = this.localSession.get_local_name();
    this.phone = this.localSession.get_local_phone();
    this.address = this.localSession.get_local_address();
    this.email = this.localSession.get_local_email();
    this.dob = this.localSession.get_local_date_of_birth();
    this.sig = this.localSession.get_local_priv_key();
    console.log(this.name,
this.phone,
this.address,
this.email,
this.dob,
this.sig);
      if (this.address == "undefined") {
          this.address = '';
      }else if (this.address == "null") {
        this.address = '';
      }
      if (this.email == "undefined") {
          this.email = '';
      } else if (this.email == "null") {
        this.email = '';
      }
      if (this.dob == "null") {
          this.dob = '';
      } else if (this.dob == "undefined") {
        this.dob = '';
      }
  }

  /* onDob(){
    if(this.platForm.is("android")){
        this.platForm.ready().then(()=>{
          this.datePicker.show({
            date: new Date(),
            mode: 'date',
            allowOldDates: true,
            allowFutureDates: false,
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
          }).then((pick) => {
            this.date = pick;
          });
      })
    }
  } */

  async onSave(){
    this.common.activeLoading();
    await this.services.update_vw_account(this.name, this.email, this.phone, this.sig)
      .then((update_result) => {
        let error_code:any = update_result;
        if(error_code.code == "0x0000"){
          //if (this.network.type === "wifi" || this.network.type === "2g" || this.network.type === "3g" || this.network.type === "4g" || this.network.type === "cellular" || this.network.type == "ethernet") {
             this.services.user_update(localStorage.getItem('id'), localStorage.getItem('token'), this.name, this.phone, this.address, this.email, this.dob)
                .then((result) => {
                  this.response = result;
                  console.log(this.response);
                  if (this.response.status == 'valid data') {
                    this.localSession.set_local_name(this.response.result[0].fname);
                    this.localSession.set_local_email(this.response.result[0].email);
                    this.localSession.set_local_address(this.response.result[0].address);
                    this.localSession.set_local_date_of_birth(this.response.result[0].dob);
                    this.common.closeLoading();
                    this.common.presentToast('Successfully update');
                  } else {
                    this.common.closeLoading();
                    this.common.presentToast('invalid data');
                  }

                }).catch(e => console.log(e));
          /* }else{
              this.common.closeLoading();
              this.common.presentToast('No Internet Connection');
          } */
        }else{
          this.common.closeLoading();
          this.common.showAlert('Update','Error... please try again');
        }
      }).catch(e => console.log(e));
    
  }
}
