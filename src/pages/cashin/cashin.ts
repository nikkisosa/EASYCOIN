import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { CashindetailsPage } from "../cashindetails/cashindetails";
/**
 * Generated class for the CashinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cashin',
  templateUrl: 'cashin.html',
})
export class CashinPage {

  //path: string = 'http://hyperloop.servehttp.com/esy-coin/';
  path: string = '';
  branches:any;
  holder:any;
  loading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,private localSession:LocalsessionProvider) {
    this.path = this.localSession.base_url;
  }

  ionViewDidLoad() {
    this.loading = true;
    this.loadStore();
  }
  async loadStore(){
    
    await this.services.branches()
      .then((res) => {
        this.holder = res;
        this.branches = this.holder.branches;
        this.loading = false;
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      })
  }

  open_branch(partners,partners_id){
    this.localSession.set_local_partners(partners);
    this.localSession.set_local_partners_id(partners_id);
    this.navCtrl.push(CashindetailsPage);
  }

  private doRefresh(refresh){
    setTimeout(() => {
      refresh.complete();
      this.loadStore();
    }, 1000);
   
  }

}
