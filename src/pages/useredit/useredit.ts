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

  async onSave(){
    
  }
}
