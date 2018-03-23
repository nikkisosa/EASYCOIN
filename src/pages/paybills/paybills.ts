import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Refresher } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { CommonProvider } from "../../providers/common/common";
import { PaymentamountPage } from "../paymentamount/paymentamount";
@Component({
  selector: 'page-paybills',
  templateUrl: 'paybills.html',
})
export class PaybillsPage {
  @ViewChild(Refresher) refresher: Refresher;
  path: string = '';
  branches: any;
  holder: any;
  loading: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private services: ServicesProvider, private localSession: LocalsessionProvider,private common:CommonProvider) {
    this.path = this.localSession.base_url;
  }

  ionViewDidLoad() {
    this.loading = true;
    this.doRefresh(this.refresher);
  }

  async loadStore() {

    await this.services.branches('pay')
      .then((res) => {
        this.holder = res;
        this.branches = this.holder.branches;
        this.loading = false;
      }).catch((e) => {
        this.common.showAlert('Connection timeout','Please check your internet connection.');
        this.loading = false;
      })
  }

  details(partner,img){
    this.navCtrl.push(PaymentamountPage,{name:partner,image:img});
  }

  private doRefresh(refresh) {
    setTimeout(() => {
      refresh.complete();
      this.loadStore();
    }, 1000);

  }

}
