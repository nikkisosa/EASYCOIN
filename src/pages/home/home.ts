import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, MenuController, ModalController, Refresher } from 'ionic-angular';
import { CommonProvider } from "../../providers/common/common";

import { CodePush, SyncStatus } from '@ionic-native/code-push';
//home
import { NetworkPage } from "../network/network";
import { ConverterPage } from "../converter/converter";
import { VerifyemailPage } from "../verifyemail/verifyemail"
import { CashinPage } from "../cashin/cashin";
//services
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from '../../providers/localsession/localsession';

import { MoneytransferPage } from "../moneytransfer/moneytransfer";
import { HistoryPage } from "../history/history";

import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CoinwalletProvider } from "../../providers/coinwallet/coinwallet";
import { TickerProvider } from "../../providers/ticker/ticker";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Refresher) refresher: Refresher;
  private SMS: any;
  private generated = '';
  private balance: any = '0';
  private name: any = '';
  private number: any = '';
  private test: any;
  private timer: any;
  private vw: any;
  private showDiv: boolean = true;
  private email_bottom_banner: any;
  private identifier_bottom_banner: any;

  private items: any = [];
  private pages: number = 1;

  private w_btc: any = '0';
  private v_eth: any = '0';
  private v_ltc: any = '0';
  private v_zec: any = '0';
  private v_lcc: any = '0';
  private v_usdt: any = '0';
  private v_bcc: any = '0';
  private v_btg: any = '0';


  private token: any;
  private loading: boolean = true;

  private error:any;

  private request:boolean;
  
  private key:any;

  private btc_in_php:any = '0.00';
  private phpRate:any = '0.00';
  private btcSellPrice:any = '0.00';
  constructor(
    public navCtrl: NavController,
    private common: CommonProvider,
    private services: ServicesProvider,
    private platForm: Platform,
    private codePush: CodePush,
    private localSession: LocalsessionProvider,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController, private coin: CoinwalletProvider, private ticker: TickerProvider) {
    

  }

  ionViewWillLeave() {
    clearInterval(this.timer);
  }
  
  ionViewDidLoad() {
    this.loading = true;
    this.convertCurrencyToPhp();
    this.doRefresh(this.refresher);
  }

  onload() {
    
    this.token = this.localSession.get_local_token();
    this.key = this.localSession.get_local_key();

    this.name = this.localSession.get_local_name() + ' ' + this.localSession.get_local_lname();
    this.number = this.localSession.get_local_phone();
    this.email_bottom_banner = this.localSession.get_local_verified_email();

    if (this.email_bottom_banner == 'false') {
      this.email_bottom_banner = 'false';
    } else {
      this.email_bottom_banner = 'true';
    }

    this.identifier_bottom_banner = this.localSession.get_local_verified_kyc();
    if (this.identifier_bottom_banner == 'false') {
      this.identifier_bottom_banner = 'false';
    } else {
      this.identifier_bottom_banner = 'true';
    }
  }


  showHideDiv() {
    if (this.showDiv == true) {
      this.showDiv = false;
    } else {
      this.showDiv = true;
    }
  }

   user_request(){
     this.services.validate_user(this.number, this.token)
    .then((res)=>{
      let data:any = res;
      if (data.result.err_code == '0x0000') {
        this.onload_refresh();
      } else {
        this.common.showAlert('Request', 'Error code: ' + data.result.err_code, 'Please report this issue. thank you');
      }
    }).catch((e)=>{

    })
  }

  async check_wallet() {
    await this.coin.balance_wallet(this.number, this.key)
      .then((res) => {
        let result: any = res;
        if (result.error_code == '0x0000') {
          this.balance = result.v_fphp;
          this.w_btc = result.v_btc;
          this.v_eth = result.v_eth;
          this.v_ltc = result.v_ltc;
          this.v_zec = result.v_zec;
          this.v_lcc = result.v_lcc;
          this.v_usdt = result.v_usdt;
          this.v_bcc = result.v_bcc;
          this.v_btg = result.v_btg;
          // Convertion
          this.btc_in_php = (this.btcSellPrice * this.w_btc).toFixed(2);

        } else {
          this.common.presentToast('invalid record. error code - '+result.error_code);
        }

      }).catch((e) => {
        console.log('Error: ' + e);
      })
  }

  async onload_refresh() {

    //this.w_btc = this.localSession.get_local_bitcoin();
    let id: any = this.localSession.get_local_account_id();
    await setTimeout(() => {
      this.services.user_trans(this.pages, id)
        .then((result) => {
          let data: any = result;

          if (data.success == 'true') {
            this.items = [];
            for (var i = 0; i < data.history.length; i++) {
              this.items.push({ 'id': data.history[i].trans_id, 'title': data.history[i].title, 'partner': data.history[i].partners, 'description': data.history[i].description, 'action': data.history[i].action_name, 'amount': data.history[i].amount, 'rate': data.history[i].rate, 'date': data.history[i].date, 'time': data.history[i].time });
            }
          } else {

          }
          
        }).catch((e) => {
          alert('Please try again.');
        })
      this.loading = false;
    }, 500);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  convert() {
    let modal = this.modalCtrl.create(ConverterPage);
    modal.present();
  }

  private page(Page) {
    switch (Page) {
      case "network":
        this.navCtrl.push(NetworkPage);
        this.menuCtrl.close();
        break;
      case "convert":
        let modal = this.modalCtrl.create(ConverterPage);
        modal.present();
        this.menuCtrl.close();
        break;
      case "email":
        this.navCtrl.push(VerifyemailPage);
        this.menuCtrl.close();
        break;
      case "money":
        this.navCtrl.push(CashinPage);
        this.menuCtrl.close();
        break;
      case "qr":
        this.navCtrl.push(MoneytransferPage);
        this.menuCtrl.close();
        break;
      case "history":
        this.navCtrl.push(HistoryPage);
        this.menuCtrl.close();
        break;
      default:
        break;
    }
  }

  async doRefresh(refresher?) {
    this.loading = true;
    
    await setTimeout(() => {
      this.onload();
      this.check_wallet();
      this.user_request();
      
      refresher.complete();
    }, 2000);
  }

  private async getPhpRate()
  {
    await
    this.ticker.php_rate()
    .then((res)=>{
      let rate:any = res;
      this.phpRate = rate.rates.PHP;
    }).catch((e)=>{
      this.common.showAlert('EASYCOIN','Can\'t connect to server','Please check your connection');
    })
  }

  private async getBtcSellPrice()
  {
    await
    this.ticker.pricing_in_coinbase('PHP')
    .then((res)=>{
      let sellPrice: any = res;
      this.btcSellPrice = sellPrice.data.amount;
    }).catch((e)=>{
      this.common.showAlert('EASYCOIN', 'Can\'t connect to server', 'Please check your connection');
    })
  }

  private convertCurrencyToPhp()
  {
    setTimeout(()=>{
      this.getPhpRate();
      this.getBtcSellPrice();
    },1000)
  }
}
