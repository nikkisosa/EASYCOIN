import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadtabPage } from "../loadtab/loadtab";
import { HomePage } from "../home/home";
/**
 * Generated class for the NetworkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-network',
  templateUrl: 'network.html',
})
export class NetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  private onNetworkProvider(network:any){
    localStorage.setItem("network",network);
    this.navCtrl.push(LoadtabPage);
  }
  
  private goBack(){
    this.navCtrl.setRoot(HomePage);
  }

}
