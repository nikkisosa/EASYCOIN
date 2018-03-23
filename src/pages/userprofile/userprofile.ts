import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsereditPage } from "../useredit/useredit";
import { LocalsessionProvider } from '../../providers/localsession/localsession';
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  name:any;
  phone:any;
  address:any;
  email:any;
  dob:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private localSession:LocalsessionProvider) {

    this.load();
  }

  ionViewWillEnter(){
    this.load();
    if (this.address == "undefined") {
      this.address = '';
    } else if (this.address == "null") {
      this.address = '';
    }
    if (this.email == "undefined") {
      this.email = '';
    } else if (this.email == "null") {
      this.email = '';
    }
    if (this.dob == "undefined") {
        this.dob = '';
    } else if (this.dob == "null") {
      this.dob = '';
    }
  }

  ionViewDidLoad(){
    this.load();
  }

  load(){
    this.name = this.localSession.get_local_name();
    this.phone = this.localSession.get_local_phone();
    this.address = this.localSession.get_local_address();
    this.email = this.localSession.get_local_email();
    this.dob = this.localSession.get_local_date_of_birth();
  }


  onEdit(){
    this.navCtrl.push(UsereditPage);
  }
}
