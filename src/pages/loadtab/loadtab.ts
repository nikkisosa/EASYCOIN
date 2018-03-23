import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";
import { NetworkProvider } from "../../providers/network/network";
import { NetworkPage } from "../network/network";
import { LoadmodalPage } from "../loadmodal/loadmodal";
/**
 * Generated class for the LoadtabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loadtab',
  templateUrl: 'loadtab.html',
})
export class LoadtabPage {
  network:any;
  net_desc:string = 'regular';
  products:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private common: CommonProvider, private net: NetworkProvider) {
    
  }

  ionViewDidLoad(){
    this.ionSelect();
  }
  

  ionSelect(net:string = 'regular'){
    //this.common.activeLoading();
    this.network = localStorage.getItem("network");
    this.products = this.net._net(this.network, net);
    
    //this.common.closeLoading();
  }

  open(amount, network, pcode, title, description) {
    localStorage.setItem('amount', amount);
    localStorage.setItem('net-desc', network);
    localStorage.setItem('pcode', pcode);
    localStorage.setItem('title', title);
    localStorage.setItem('description', description);
    //this.app.getRootNav().setRoot(LoadmodalPage);
    this.navCtrl.push(LoadmodalPage);
  }

}
