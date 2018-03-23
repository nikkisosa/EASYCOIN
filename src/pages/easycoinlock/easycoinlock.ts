import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { ServicesProvider } from "../../providers/services/services";
import { CommonProvider } from "../../providers/common/common";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { HomePage } from "../home/home";
import { LoginPage } from "../login/login";
/**
 * Generated class for the EasycoinlockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-easycoinlock',
  templateUrl: 'easycoinlock.html',
})
export class EasycoinlockPage {

  @ViewChild('passcode1') passcode1;
  @ViewChild('passcode2') passcode2;
  @ViewChild('passcode3') passcode3;
  @ViewChild('passcode4') passcode4;
  @ViewChild('passcode5') passcode5;
  @ViewChild('passcode6') passcode6;
  private values: any = [];
  private pin: string = '';

  private uuid: any;
  private model: any;

  private pcode1: string;
  private pcode2: string;
  private pcode3: string;
  private pcode4: string;
  private pcode5: string;
  private pcode6: string;

  private index: number = 0; //input index

  private phone:any;

  private uid:any; 

  private is_mpin:boolean=false;
  private is_set_mpin:boolean=false;
  private mpinShowLabel:boolean=false;
  private secondsRemaining: number = 300;
  private displayTime: string;
  private timer;
  private resend:boolean = false;
  private btn:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device,
    private services:ServicesProvider,private viewCtrl:ViewController,
    private common:CommonProvider,private localSession:LocalsessionProvider) {
  }

  ionViewDidLoad() {
    this.timerTick();
    
    this.uuid = this.device.uuid;
    this.model = this.device.model;
    this.phone = this.navParams.get('phone');
    let checker: any = this.navParams.get('code');
    if(checker){
      if (checker == 'pin') 
      {
        this.is_mpin = false;
        this.mpinShowLabel = false;
        this.uid = this.navParams.get('uid');
      } 
      else if (checker == 'setmpin')
      {
        this.is_set_mpin = true;
        this.mpinShowLabel = true;
        this.uid = this.navParams.get('uid');
      }
      else 
      {
        this.is_mpin = true;
        this.mpinShowLabel = false;
        this.uid = this.navParams.get('uid');
      }
    }else{
      this.is_mpin = true;
      this.uid = this.navParams.get('uid');
      this.mpinShowLabel = false;
    }
    

  }

  private pincode(event, pin) {
    if (this.index == 6) {

    } else {
      this.index = this.index + 1;
     
      switch (this.index) {
        case 1:
          this.pcode1 = pin;
          break;
        case 2:
          this.pcode2 = pin;
          break;
        case 3:
          this.pcode3 = pin;
          break;
        case 4:
          this.pcode4 = pin;
          break;
        case 5:
          this.pcode5 = pin;
          break;
        case 6:
          this.pcode6 = pin;
          if(this.is_mpin == true){
            this.enterMpin();
          }else if (this.is_set_mpin == true) {
            this.setMpin();
          }
          else{
            this.access_code('pin');
          }
          break;
        default:
          break;
      }

      this.onKeyUp(event, this.index);
    }
  }

  private eraser(event){
    switch (this.index) {
      case 1:
          this.pcode1 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;
      case 2:
          this.pcode2 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;
      case 3:
          this.pcode3 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;
      case 4:
          this.pcode4 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;
      case 5:
          this.pcode5 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;
      case 6:
          this.pcode6 = "";
          this.index = this.index - 1;
          this.onKeyUp(event,this.index);
        break;

      default:
        break;
    }
  }
  

  private onKeyUp(event, index) {
    if (event.target.textContent.length != 1) {
      this.setFocus(index - 1);
    } else {
      this.values.push(event.target.textContent);
      this.setFocus(index);
    }
    event.stopPropagation();
  }

  private submit(e: Event) {
    
    this.values = [];
    this.passcode1.value = "";
    this.passcode2.value = "";
    this.passcode3.value = "";
    this.passcode4.value = "";
    this.passcode5.value = "";
    this.passcode6.value = "";
    e.stopPropagation();

  }

  private setFocus(index) {

    switch (index) {
      case 0:
        this.passcode1.setFocus();
        break;
      case 1:
        this.passcode2.setFocus();
        break;
      case 2:
        this.passcode3.setFocus();
        break;
      case 3:
        this.passcode4.setFocus();
        break;
      case 4:
        this.passcode5.setFocus();
        break;
      case 5:
        this.passcode6.setFocus();
        break;
    }
  }
  
  private async access_code(route:string) {
    let compiledKey: any = this.pcode1.toString() + this.pcode2.toString() + this.pcode3.toString() + this.pcode4.toString() + this.pcode5.toString() + this.pcode6.toString();
    if(route == 'mpin'){

    }else{
      await this.services.pass_key(this.uuid,this.model,this.uid,compiledKey)
      .then((result)=>{
        let data:any = result;
        if(data.result.error_code == '0x0000'){
          this.navCtrl.setRoot(EasycoinlockPage,{code:'setmpin',uid:this.uid,phone:this.phone});
          this.is_set_mpin = true;
        }else if(data.result.error_code == '0x0002'){
          this.common.showAlert('EASYCOIN','','Invalid device.');
        } else if (data.result.error_code == '0x0003') {
          this.common.showAlert('EASYCOIN', '', 'Invalid pin.');
        } else if (data.result.error_code == '0x0004') {
          this.common.showAlert('EASYCOIN', '', 'Please verify this device.');
        } else if (data.result.error_code == '0x0001') {
          this.common.showAlert('EASYCOIN', '', 'Enter receive pin code');
        }
      }).catch((e)=>{
        console.log(e);
      })
    }
  }

  private getSecondsAsDigitalClock(inputSeconds: number) {
    const secNum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);
    let hoursString = '';
    let minutesString = '';
    let secondsString = '';
    hoursString = (hours < 10) ? '0' + hours : hours.toString();
    minutesString = (minutes < 10) ? '0' + minutes : minutes.toString();
    secondsString = (seconds < 10) ? '0' + seconds : seconds.toString();
    return minutesString + ':' + secondsString;
  }

  private timerTick() {
    setTimeout(() => {
      this.secondsRemaining--;
      this.displayTime = this.getSecondsAsDigitalClock(this.secondsRemaining);
      if (this.secondsRemaining > 0) {
        this.timerTick();
      } else {
        this.resend = true;
      }
    }, 1000);
  }

  private resend_code(){
    this.btn = true;
    this.services.resend_pin(this.uuid,this.model,this.uid)
    .then((res)=>{
      this.timerTick();
      this.btn = false;
      this.secondsRemaining = 300;
      this.resend = false;
    }).catch((e)=>{
      this.resend = false;
      this.btn = false;
      this.common.showAlert("EASYCOIN",'',"Please try again");
    })
  }

  private async setMpin()
  {
    let compiledKey: any = this.pcode1.toString() + this.pcode2.toString() + this.pcode3.toString() + this.pcode4.toString() + this.pcode5.toString() + this.pcode6.toString();
    
    await this.services.setMPin(this.uuid, this.model, this.uid, compiledKey)
      .then((result) => {
        let data: any = result;
        if (data.result.error_code == '0x0000') {
          this.navCtrl.setRoot(EasycoinlockPage, { code: 'mpin', uid: this.uid, phone: this.phone });
          this.is_mpin = true;
          this.localSession.set_local_loggedin('is_loggedin');
        } else {
          this.common.showAlert('EASYCOIN', '', 'Invalid Device');
        }
      }).catch((e) => {
        console.log(e);
      })
  }

  private async enterMpin()
  {
    this.common.activeLoading();
    let compiledKey: any = this.pcode1.toString() + this.pcode2.toString() + this.pcode3.toString() + this.pcode4.toString() + this.pcode5.toString() + this.pcode6.toString();

    await this.services.devices(this.uuid, this.model, this.uid, '', '',compiledKey)
    .then((device)=>{
      let data: any = device;
      console.log(data);
      if (data.result.error_code == '0x0000') {
          this.navCtrl.setRoot(HomePage);
          this.is_mpin = true;
          this.common.closeLoading();
      } else {
        this.common.closeLoading();
        this.common.showAlert('EASYCOIN', '', data.result.message);
      }
    }).catch((e)=>{
      this.common.closeLoading();
      console.log(e);
    })
  }

  private logout()
  {
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }

}
