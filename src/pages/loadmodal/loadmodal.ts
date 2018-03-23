import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,App,AlertController } from 'ionic-angular';

import { NetworkProvider } from "../../providers/network/network";
import { CommonProvider } from "../../providers/common/common";
import { ContactPage } from "../contact/contact";
import { LoadtabPage } from "../loadtab/loadtab";
import { ServicesProvider } from "../../providers/services/services";
/**
 * Generated class for the LoadmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loadmodal',
  templateUrl: 'loadmodal.html',
})
export class LoadmodalPage {

  amount:any;
  network:any;
  pcode:any;
  customer_no:string;
  my_no:any;
  key:any;
  response:any;
  title:any;
  description:any;
  prompt_alert:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    private app:App,
    private common:CommonProvider,
    private services:ServicesProvider,
    private alertCtrl:AlertController) {
  }

  ionViewWillEnter(){
    this.loadAll();
  }

  ionViewCanEnter(){
    this.loadAll();
  }

  ionViewDidLoad() {
    this.loadAll();
  }

  ionViewDidLeave(){
    localStorage.removeItem('contact_number');
  }

  private loadAll(){
    this.amount = localStorage.getItem('amount');
    this.network = localStorage.getItem('net-desc');
    this.pcode = localStorage.getItem('pcode');
    this.key = localStorage.getItem('priv_key');
    this.customer_no = localStorage.getItem('contact_number');
    this.my_no = localStorage.getItem('phone');
    this.title = localStorage.getItem('title');
    this.description = localStorage.getItem('description');
  }

  private openContact(){
    this.navCtrl.push(ContactPage);
  }

  private async send(){
    this.common.activeLoading();
    try {
      if (this.customer_no.length < 11) {
        this.common.showAlert('Error', 'Invalid number');
        this.common.closeLoading();
      } else if (this.customer_no == "undefined") {
        this.common.showAlert('Error', 'Please enter customer no#');
        this.common.closeLoading();
      } else if (this.customer_no == "null") {
        this.common.showAlert('Error', 'Please enter customer no#');
        this.common.closeLoading();
      } else if (this.customer_no == "") {
        this.common.showAlert('Error', 'Please enter customer no#');
        this.common.closeLoading();
      } else if (this.customer_no.length == 11) {
        await this.services.buy(this.my_no, this.customer_no, this.key, this.network, this.pcode)
          .then((res) => {
            this.response = res;
            if (this.response.error_code == '0x0000') {
              this.common.showAlert('Load', 'Successfully loaded');
              this.navCtrl.pop();
            } else {
              this.common.showAlert('Load', 'UnSuccessfully loaded');
            }
          }).catch(e => alert(e));

        this.common.closeLoading();
      }
    } catch (e) {
      this.common.showAlert('Error', 'Please enter customer no#');
      this.common.closeLoading();
    }
    
  }

  

  private proceed_or_not(){
    this.prompt_alert = this.alertCtrl.create({
      title: 'Proceed?',
      message: 'Do you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.send();
          }
        }
      ]
    });
    this.prompt_alert.present();
  }

}
