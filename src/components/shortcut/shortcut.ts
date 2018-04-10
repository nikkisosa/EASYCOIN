import { NavController, MenuController,ModalController} from 'ionic-angular';
import { Component } from '@angular/core';

import { CashinPage } from "../../pages/cashin/cashin";
import { ConverterPage } from "../../pages/converter/converter";
import { NetworkPage } from "../../pages/network/network";
import { PaybillsPage } from "../../pages/paybills/paybills";
import { MoneytransferPage } from "../../pages/moneytransfer/moneytransfer";

/**
 * Generated class for the ShortcutComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'shortcut',
  templateUrl: 'shortcut.html'
})
export class ShortcutComponent {

  text: string;

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private modalCtrl: ModalController) {
  }

  private page(page){
    switch(page){
      case "money":
      this.navCtrl.push(CashinPage);
      this.menuCtrl.close();
      break;
      case "convert":
        let modal = this.modalCtrl.create(ConverterPage);
        modal.present();
        this.menuCtrl.close();
        break;
      case "load":
      this.navCtrl.push(NetworkPage);
      this.menuCtrl.close();
      break;
      case "bills":
      this.navCtrl.push(PaybillsPage);
      this.menuCtrl.close();
      break;
      case "transfer":
      this.navCtrl.push(MoneytransferPage);
      this.menuCtrl.close();
      break;
    }

  }
}
