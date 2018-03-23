import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Device } from '@ionic-native/device';
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  id:any;
  name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private device: Device) {
    this.id = this.device.uuid;
    this.name = this.device.model;
  }

}
