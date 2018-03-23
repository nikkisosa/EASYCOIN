import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TickerProvider } from "../../providers/ticker/ticker";
import { CommonProvider } from "../../providers/common/common";
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from '../../providers/localsession/localsession';
import { HomePage } from "../../pages/home/home";
import { CoinwalletProvider } from "../../providers/coinwallet/coinwallet";
@Component({
  selector: 'page-converter',
  templateUrl: 'converter.html',
})
export class ConverterPage {
  private balance:any = 0;
  private timeout: any;                           // to clear Interval
  private btcUSD:any = [];                        // hold the json data
  private btcPHP:number = 0;                         // bitcoin price in peso(php)
  private sell_price:number = 0;
  private php:any;                                // inputed peso amount
  private exchanged:number;                          // bitcoin/php value
  private php_exchange_rate:any = 0;              // peso exchange rate
  private php_exchange_rate_holder: any = 0;      // peso exchange rate holder
  private convertion: any = 'v_btc';         // to convert php -> btc vice versa 
  private btc_in_php:any = 0;                     // value of bitcoin in peso (real-time)
  private current_btc:any = 0.00000000;            // value of bitcoin (real-time)


  private current_exchange : any = 0;              // holding a current bitcoin price in ph
  private update_to_current_exchange:any = 0;

  private fixed_decimal:number = 0;

  private account_no:any;
  private token:any;

  private onTap:boolean = false;

  private disabled:boolean = false;

  private loading:boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private viewCtrl: ViewController,private ticker:TickerProvider,
    private localSession: LocalsessionProvider,private common:CommonProvider,
    private services:ServicesProvider,private coinwallet:CoinwalletProvider) {

      this.account_no = this.localSession.get_local_phone();
      this.token = this.localSession.get_local_token();
    
  }

  ionViewDidEnter(){
    this.entering();
  }

  async entering(){
    this.loading = true;
    this.balance = this.localSession.get_local_balance();
    this.timeout = await setInterval(() => {
      this.ticker.pricing_in_coinbase('PHP').then((json) => {
        this.btcUSD = json;
        let get_exchange: any = parseInt(this.btcUSD.data.amount);
        let btcphp: any = (0.05 * get_exchange) + get_exchange;
        this.btcPHP = btcphp.toFixed(2); //  check btc to php
        this.sell_price = get_exchange;
        if (this.current_exchange == 0) {
          this.current_exchange = this.btcPHP;
        } else {
          this.update_to_current_exchange = this.btcPHP;
        }
        this.loading = false;
      }).catch((e) => {
        clearInterval(this.timeout);
        console.log('Error: ' + e);
        //this.common.showAlert('Connection Error', '', 'Please check your internet connection.');
      })
    })
  }

  ionViewDidLeave(){
   clearInterval(this.timeout);
  }

  private close(){
    this.viewCtrl.dismiss();
  }

  private convert(){
    this.ticker.pricing_in_coinbase('PHP').then((json) => {
      this.btcUSD = json;
      var php_total;
      php_total = parseInt(this.btcUSD.data.amount);
      let ex: any = (this.php / this.btcPHP);
      this.exchanged = ex.toFixed(7);
      this.current_exchange = this.btcPHP;
      // if (this.convertion == 'PHP_TO_BTC') {
      //   php_total = parseInt(this.btcUSD.data.amount);
      //   let ex: any = (this.php / this.btcPHP);
      //   this.exchanged = ex.toFixed(7);
      //   this.current_exchange = this.btcPHP;
      // } else if (this.convertion == 'BTC_TO_PHP') {
      //   php_total = parseInt(this.btcUSD.data.amount);
      //   this.exchanged = (this.php / this.btcPHP);
      //   this.current_exchange = this.btcPHP;
      // }

    }).catch((e) => {
      console.log('Error: ' + e);
      this.common.showAlert('Connection Error', '', 'Please check your internet connection.');
    })
  }

  private tapToConvert(){
    this.onTap = true;
    this.disabled = true;
    if (this.current_exchange == this.btcPHP){
      this.converter();
    }else{
      this.common.__alert('Proceed', 'bitcoin rate has change.', 'Do you want to continue with the updated rate.?', this.converter(),'Ok');
    }
  }

  /**
   * deprecated
   * 
   */
  private executeExchange(){
    this.convert();
    if(this.php){
      this.services.exchange_php_btc(this.account_no, this.exchanged, this.php, this.token)
        .then((result) => {
          let res: any = result;
          if(res.result.success == 'success'){
            this.localSession.set_local_balance(res.result.balance);
            this.localSession.set_local_bitcoin(res.result.w_btc);
            this.common.showAlert('Easycoin','',res.result.message);
          }else{
            this.common.showAlert('Easycoin','',res.result.message);
          }

          this.php = 0;
          this.exchanged = 0.0000000;
          this.onTap = false;
          this.disabled = false;
          
        }).catch((e) => {
          this.common.showAlert('Error', '', 'Could not connection to server');
        })
    }else{
      this.disabled = false;
      this.onTap = false;
      this.common.showAlert('Error', '','Please enter your desire amount');
      
    }
  }

  private converter(){
    this.convert();
    if (this.php)
    {
      this.coinwallet.converter(this.account_no, this.localSession.get_local_key(), "v_fphp", this.convertion, this.php)
        .then((res) => {
          let data: any = res;
          if (data.error_code == "0x0000") {
            this.localSession.set_local_balance(data.origin_bal);
            this.localSession.set_local_bitcoin(data.dest_bal);
            this.common.showAlert('Convert', '', 'Successfully convert');
          }
          else {
            this.common.showAlert('Error', '', 'Please try again');
          }

          this.php = 0;
          this.exchanged = 0.0000000;
          this.onTap = false;
          this.disabled = false;
        }).catch((e) => {
          this.common.showAlert('Error', 'Could not connection to server', 'Please check your internet connection');
        })
    }
    else
    {
      this.disabled = false;
      this.onTap = false;
      this.common.showAlert('Error', '', 'Please enter your desire amount');
    }
    
  }


  
}
