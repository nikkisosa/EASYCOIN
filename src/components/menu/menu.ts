import { Component,Input} from '@angular/core';
import { NavController,MenuController,ModalController } from "ionic-angular";
import { NetworkPage } from "../../pages/network/network";
import { SettingsPage } from "../../pages/settings/settings";
import { UserprofilePage } from "../../pages/userprofile/userprofile";
import { ConverterPage } from "../../pages/converter/converter";
import { VerifyemailPage } from "../../pages/verifyemail/verifyemail";
import { LevelsPage } from "../../pages/levels/levels";
import { CashinPage } from "../../pages/cashin/cashin";
import { AccountPage } from "../../pages/account/account";
import { LoginPage } from "../../pages/login/login";
import { MoneytransferPage } from "../../pages/moneytransfer/moneytransfer";
import { HistoryPage } from "../../pages/history/history";
import { PaybillsPage } from "../../pages/paybills/paybills";
import { CommonProvider } from "../../providers/common/common";
/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  @Input('name') label;
  menu = [];
  name:string;
  constructor(private navCtrl: NavController, private menuCtrl: MenuController, private modalCtrl: ModalController, private common: CommonProvider) {
    

  }

  ngAfterViewInit(){
    setInterval(()=>{
      this.name = this.label;
    },1000)
    
    
    this.menu = [
      {
        "title": "Account",
        "page": "account",
        "bgcolor": "bodycolor",
        "icon_name": "ios-person",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "History",
        "page": "history",
        "bgcolor": "bodycolor",
        "icon_name": "ios-timer-outline",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Add Money",
        "page": "money",
        "bgcolor": "bodycolor",
        "icon_name": "ios-cash-outline",
        "icon_class": "navicnlft", 
        "label_class": "nvlbllnk"
      },
      {
        "title": "Levels and Limits",
        "page": "levels",
        "bgcolor": "bodycolor",
        "icon_name": "ios-stats",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Convert",
        "page": "convert",
        "bgcolor": "bodycolor",
        "icon_name": "ios-swap",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Transfer",
        "page": "qr",
        "bgcolor": "bodycolor",
        "icon_name": "ios-share-alt",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Buy Load",
        "page": "network",
        "bgcolor": "bodycolor",
        "button_classs": "itmpnlnv",
        "icon_name": "ios-basket",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Pay Bills",
        "page": "paybills",
        "bgcolor": "bodycolor",
        "button_classs": "itmpnlnv",
        "icon_name": "ios-card",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      },
      {
        "title": "Settings",
        "page": "settings",
        "bgcolor": "bodycolor",
        "icon_name": "ios-settings",
        "icon_class": "navicnlft",
        "label_class": "nvlbllnk"
      }
    ];
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
      case "settings":
        this.navCtrl.push(SettingsPage);
        this.menuCtrl.close();
        break;
      case "user_profile":
        this.navCtrl.push(UserprofilePage);
        this.menuCtrl.close();
        break;
      case "levels":
        this.navCtrl.push(LevelsPage)
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
      case "account":
        this.navCtrl.push(AccountPage);
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
       case "paybills":
        this.navCtrl.push(PaybillsPage);
        this.menuCtrl.close();
        break; 
      case "logout":
        this.common.activeLoading();
        setTimeout(() => {
          localStorage.clear();
          this.navCtrl.setRoot(LoginPage);
          this.menuCtrl.close();
          this.common.closeLoading()
        }, 3000);
        break;
      default:
        break;
    }
  }

}
