import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CoinwalletProvider } from "../../providers/coinwallet/coinwallet";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
import { CommonProvider } from "../../providers/common/common";
@Component({
  selector: 'page-moneytransfer',
  templateUrl: 'moneytransfer.html',
})
export class MoneytransferPage {

  data: string = '';
  options:BarcodeScannerOptions;
  amount: number;
  currency: any;
  phone:any;
  key:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController,
    private coin:CoinwalletProvider,private localSession:LocalsessionProvider,
    private common:CommonProvider) {
    
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.phone = this.localSession.get_local_phone();
      this.key = this.localSession.get_local_key();
    }, 1000);
    
  }

  scan() {
    this.data = '';
    this.options = {
      prompt:"Please scan qrcode to transfer.",
      disableSuccessBeep:true,
      resultDisplayDuration:0
    }

    this.barcodeScanner.scan(this.options).then((barcodeData) => {
      let decode: any = barcodeData.text;
      let barcode: any = barcodeData.cancelled;
      if(barcodeData.cancelled){

      }else{
        if (decode.search('easycoin') != -1) {
          this.data = decode.substring(9, 21);
        } else {
          alert('not easycoin qrcode');
        }
      }
    }, (err) => {
      alert('Unable to scan. '+ err)
    });

  }

  private proceed() {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Confirm to transfer money.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.transfer();
          }
        }
      ]
    });
    alert.present();
  }


  private async transfer(){
    if(this.currency){
      await this.coin.balance_transfer(this.phone, this.key, this.currency, this.data, this.amount)
        .then((result) => {
          let success: any = result;
          if (success.error_code == '0x0005') {
            this.common.showAlert('EASYCOIN', 'Insufficient funds');
          } else if (success.error_code == '0x0002') {
            this.common.showAlert('EASYCOIN', 'Please try again');
          } else if (success.error_code == '0x0000') {
            this.common.showAlert('EASYCOIN', 'Successfully transfered');
          }
        }).catch((e) => {
          this.common.showAlert('EASYCOIN', 'Unable to connect');
        })
    }else{
      this.common.showAlert('EASYCOIN', 'Please choose currency');
    }
    
  }

}
