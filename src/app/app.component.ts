import { Component,NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush, SyncStatus } from '@ionic-native/code-push';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Network } from '@ionic-native/network';


import { LoginPage } from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { PaymentamountPage } from "../pages/paymentamount/paymentamount";
import { SplashscreenPage } from "../pages/splashscreen/splashscreen";
import { TestPage } from "../pages/test/test";
import { EasycoinlockPage } from "../pages/easycoinlock/easycoinlock";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SplashscreenPage;
  prog: any = '';
  constructor(
                private platForm: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private codePush: CodePush,
                private localNotifications: LocalNotifications,
                private androidPermissions: AndroidPermissions,
                private network: Network,
                private ngZone: NgZone ) {

    platForm.ready().then(() => {
      // statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#1E1E28');
      splashScreen.hide();
      if (platForm.is("android")){

        platForm.ready().then(() => {

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
          success => console.log('Permission granted'),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
        );

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
          success => console.log('Permission granted'),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.INTERNET)
        );

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.INTERNET).then(
          success => console.log('Permission granted'),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
        );

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          success => console.log('Permission granted'),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );
          

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.INTERNET]);
        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
          this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
        //storage.local();
        //this.App_updates();
        });
      }
    });
  }

  App_updates() {
    let v_check = localStorage.getItem("version_update");

    if(v_check == "true"){
        this.platForm.ready().then(() => {
          if (this.platForm.is("android")) {
          this.codePush.sync({}, (progress) => {
            this.ngZone.run(()=>{
              this.prog = `Downloading ${progress.receivedBytes} of ${progress.totalBytes}`;
            })
          }).subscribe((status) => {
            if (status == SyncStatus.CHECKING_FOR_UPDATE) {
              this.localNotifications.schedule({
                title:'Version',
                text: 'Checking for update'
              });

            }  //this.common.presentToast('Checking for update...');
            if (status == SyncStatus.DOWNLOADING_PACKAGE) {
              this.localNotifications.schedule({
                title: 'Downloading',
                text: this.prog,
              });
            }  //this.common.presentToast('Downloading...');
            if (status == SyncStatus.IN_PROGRESS) {
              this.localNotifications.schedule({
                title: 'In progress',
                text: 'in progress...'
              });
            }  //this.common.presentToast('Installing updates...');
            if (status == SyncStatus.UP_TO_DATE) {
              this.localNotifications.schedule({
                title: 'Version',
                text: 'Up to date'
              });
            }  //this.common.presentToast('Up to update...');
            if (status == SyncStatus.INSTALLING_UPDATE) {
              this.localNotifications.schedule({
                title: 'Installing',
                text: 'installing update'
              });
            }  //this.common.presentToast('Update installed...');
            if (status == SyncStatus.ERROR) {
              this.localNotifications.schedule({
                title: 'Version',
                text: 'unable to update'
              });
            }  //this.common.presentToast('Error...');
          })
          }
          else {

          }
        })

    }else{
      //leave it blank
    }
  }
}
