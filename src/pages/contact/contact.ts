import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ViewController,App } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName, ContactFieldType } from '@ionic-native/contacts';
import { LoadmodalPage } from "../loadmodal/loadmodal";
import { CommonProvider } from "../../providers/common/common";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  contactName: ContactFieldType[] = ['displayName'];
  contactfound:any = [];
  contactToBeFound = '';
  search: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private app:App, private contacts: Contacts,private platForm:Platform,private common:CommonProvider) {
   this.initializeItems();
  }

  initializeItems() {
    if(this.platForm.is("android")){
      this.platForm.ready().then(()=>{
        this.con('');
      })
    }
  }

  private async con(val:any){
    await this.contacts.find(this.contactName, { filter: val })
      .then((contact) => {
        this.contactfound = contact;
      })
  }

  private findContact(val) {
    if (val && val.trim() != '') {
      this.con(val);
    }
  }

  /* 
    •validate number that include +63 or 63.
    •if +63 OR 63 are included. replace 09.
    •check if number is valid or not.
  */
  number:string;
  private selected(val){
    
    this.number = val;
    
    let result = this.number.substring(0, 3);

    if(result == '+63' || result == '639'){

      let regx = /\+63|639/gi;

      let rep = this.number.replace(regx,'0');

      localStorage.setItem('contact_number', rep);

      this.viewCtrl.dismiss();

    } else if (this.number.length < 11){

      this.common.presentToast('Invalid number');

    }else{

      localStorage.setItem('contact_number', this.number);

      this.viewCtrl.dismiss();
    }
  }
  private onCancel(val){
    this.viewCtrl.dismiss();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.con(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contactfound = this.contactfound.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
}
