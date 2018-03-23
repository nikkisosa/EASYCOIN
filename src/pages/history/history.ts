import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from '../../providers/localsession/localsession';
import { CommonProvider } from "../../providers/common/common";
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  items: any = [];
  pages: number = 1;
  loading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localSession: LocalsessionProvider, private common: CommonProvider,
    private services: ServicesProvider,) {
  }

  ionViewDidLoad() {
    this.loading = true;
    this.onload();
  }

  onload() {
    let id: any = this.localSession.get_local_account_id();
    setTimeout(() => {
      this.services.user_trans(this.pages, id)
        .then((result) => {
          let data: any = result;
          if(data.success == 'true'){
            for (var i = 0; i < data.history.length; i++) {
              this.items.push({ 'id': data.history[i].trans_id, 'title': data.history[i].title, 'partner': data.history[i].partners, 'description': data.history[i].description, 'action': data.history[i].action_name, 'amount': data.history[i].amount, 'rate': data.history[i].rate, 'date': data.history[i].date, 'time': data.history[i].time });
            }
            this.pages = this.pages + 1;
          }else{

          }

          console.log(this.pages);
          
        }).catch((e) => {
          alert('Please try again.');
        })
      this.loading = false;
    }, 2000);
  }
  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.onload();
        resolve();
      }, 500);
    })
  }

}
