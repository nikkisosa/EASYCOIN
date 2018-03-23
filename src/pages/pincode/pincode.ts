import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";

/**
 * Generated class for the PincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage {

  pincode:string = '';
  limit:string = '0';
  shake:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  private pinCode(pin){
    if(this.pincode == "undefined"){
      
    }else{
      if(this.limit == '6'){
        
        /* if(this.pincode == localStorage.getItem('pin')){
          this.navCtrl.setRoot(HomePage);
        }else{
          this.shake = 'flxrrwshk';
        } */
      }else{
        this.pincode = this.pincode + pin;
        this.limit = this.pincode.length.toString();
        if (this.limit == '6') {

          if (this.pincode == localStorage.getItem('pin')) {
            this.navCtrl.setRoot(HomePage);
          } else {
            this.shake = 'flxrrwshk';
          }
        }
        console.log(this.pincode);
      }
    }
  }

  private onDelete() {
    var str = this.pincode;
    str = str.slice(0, -1);
    if(this.pincode == ''){
      this.pincode = ''
    }else{
      this.pincode = str;
      this.limit = this.pincode.length.toString();
    }

    console.log(this.pincode);
  }

}
