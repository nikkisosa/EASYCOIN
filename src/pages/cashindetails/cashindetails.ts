import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { CommonProvider } from "../../providers/common/common";
import { ServicesProvider } from "../../providers/services/services";

@Component({
  selector: 'page-cashindetails',
  templateUrl: 'cashindetails.html',
})
export class CashindetailsPage {

  branch_name:any;
  branch_id:any;
  amount:number;
  account_number:any;
  holder:any;
  btn:boolean=true;
  receipt:any;
  show_receipt:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private localSession:LocalsessionProvider,private common:CommonProvider, private sevices: ServicesProvider) {
    this.branch_name = localSession.get_local_partners();
    this.branch_id = localSession.get_local_partners_id();
    this.account_number = localSession.get_local_phone();
  }


private async cashin(){
  this.common.activeLoading();
  await this.sevices.cash_in(this.account_number, this.branch_id, this.amount,this.localSession.get_local_name())
  .then((res) =>{
      this.holder = res;
      
      if(this.holder.code == 'cash-in success'){
        this.receipt = this.holder.receipt;
        this.show_receipt = true;
        this.btn = false;
        this.common.closeLoading();
      }else if (this.holder.code == 'cash-in'){
        this.common.closeLoading();
        this.common.showAlert('Error', 'Please verify your email first.', '', '', 'Ok');
      }else {
        this.common.closeLoading();
        this.common.showAlert('Error', 'Please enter your desired amount.', '', '', 'Ok');
      }
      
      
  }).catch((e)=>{
    this.common.showAlert('Error', 'Unable to access the web services', 'Please try again..', '', 'Ok');
  })
  
}  


}
