import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }
  modalClose() {
    this.viewCtrl.dismiss();
  }

}
