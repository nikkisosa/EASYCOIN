import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ViewController } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from '../../providers/localsession/localsession';
/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  limit: string = '';
  response:any;
  isenabled: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private common:CommonProvider,
    private platForm:Platform,
    private viewCtrl:ViewController,
    private services:ServicesProvider,
    private localSession:LocalsessionProvider) {
  }

  setPin(){
    if(this.limit.length == 6){
      this.services.setPincode(this.localSession.get_local_name(),this.limit)
      .then((res)=>{
        this.response = res;
        if(this.response.response == "success"){
          this.localSession.set_local_pin(this.limit);
          this.common.presentToast('pin code successfully set');
        }else{
          this.common.presentToast('Please try again.')
        }
      }).catch(e => console.log('set pin error'));
      
    }else{
      this.common.presentToast('minimum & maximum of 6 number');
    }
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
