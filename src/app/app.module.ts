import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { SettingsPage } from "../pages/settings/settings";
import { NetworkPage } from "../pages/network/network";
import { LoadtabPage } from "../pages/loadtab/loadtab";
import { LoginPage } from "../pages/login/login";
import { RegistrationPage} from "../pages/registration/registration";
import { UserprofilePage } from "../pages/userprofile/userprofile";
import { UsereditPage } from "../pages/useredit/useredit";
import { VerificationPage } from "../pages/verification/verification";
//modal
import { LoadmodalPage } from "../pages/loadmodal/loadmodal";
import { ConverterPage } from "../pages/converter/converter";
//contact
import { ContactPage } from "../pages/contact/contact";

import { CommonProvider } from '../providers/common/common';
import { NetworkProvider } from '../providers/network/network';
import { ServicesProvider } from '../providers/services/services';
//import { DatePicker } from '@ionic-native/date-picker';

import { AppVersion } from '@ionic-native/app-version';


//codepush
import { CodePush } from '@ionic-native/code-push';
//base64
import { Base64 } from '@ionic-native/base64';
//local notification
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AndroidPermissions } from '@ionic-native/android-permissions';
//
import { Contacts } from '@ionic-native/contacts';

import { SplashscreenPage } from "../pages/splashscreen/splashscreen";
//security
import { PincodePage } from "../pages/pincode/pincode";
import { SecurityPage } from "../pages/security/security";
import { ChangepassPage } from "../pages/changepass/changepass";
import { VerifyemailPage } from "../pages/verifyemail/verifyemail";
import { LevelsPage } from "../pages/levels/levels";
import { LocalsessionProvider } from '../providers/localsession/localsession';
import { AddressPage } from "../pages/address/address";
//facebook
import { Facebook } from '@ionic-native/facebook';
//
import { TickerProvider } from '../providers/ticker/ticker';
import { CashinPage } from '../pages/cashin/cashin';
import { CashindetailsPage } from "../pages/cashindetails/cashindetails";
import { AccountPage } from "../pages/account/account";
import { MoneytransferPage } from "../pages/moneytransfer/moneytransfer";

//component
import { LoadingcomponentComponent } from "../components/loadingcomponent/loadingcomponent";
import { MenuComponent } from "../components/menu/menu";
import { ShortcutComponent } from "../components/shortcut/shortcut";
import { AdsComponent } from "../components/ads/ads";
import { PaybillsPage } from "../pages/paybills/paybills";
import { PaymentamountPage } from "../pages/paymentamount/paymentamount";
import { CoinwalletProvider } from '../providers/coinwallet/coinwallet';
import { TestPage } from "../pages/test/test";
import { EasycoinlockPage } from "../pages/easycoinlock/easycoinlock";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    HomePage,
    SettingsPage,
    NetworkPage,
    LoadtabPage,
    LoginPage,
    RegistrationPage,
    LoadmodalPage,
    UserprofilePage,
    UsereditPage,
    ContactPage,
    PincodePage,
    SecurityPage,
    SplashscreenPage,
    ChangepassPage,
    ConverterPage,
    VerificationPage,
    VerifyemailPage,
    LevelsPage,
    AddressPage,
    CashinPage,
    CashindetailsPage,
    AccountPage, 
    MoneytransferPage,
    PaybillsPage,
    PaymentamountPage,
    LoadingcomponentComponent,
    MenuComponent, ShortcutComponent,
    EasycoinlockPage, TestPage, AdsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      scrollAssist: false, autoFocusAssist: false, menuType: 'push', platforms: {
        ios: {
          menuType: 'overlay',
        },
        android: {
          menuType: 'overlay',
        }
      }
    }), HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    HomePage,
    SettingsPage,
    NetworkPage,
    LoadtabPage,
    LoginPage,
    RegistrationPage,
    LoadmodalPage,
    UserprofilePage,
    UsereditPage,
    ContactPage,
    PincodePage,
    SecurityPage,
    SplashscreenPage,
    ChangepassPage,
    ConverterPage,
    VerificationPage,
    VerifyemailPage,
    LevelsPage,
    AddressPage,
    CashinPage,
    CashindetailsPage,
    AccountPage, 
    MoneytransferPage,
    PaybillsPage,
    PaymentamountPage,
    EasycoinlockPage, TestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider,
    NetworkProvider,
    ServicesProvider, HttpModule,
    Network, CodePush,LocalNotifications, AndroidPermissions,
    Contacts, Base64, AppVersion,
    LocalsessionProvider, Facebook,
    TickerProvider, Device,BarcodeScanner,
    CoinwalletProvider, Device, InAppBrowser
  ]
})
export class AppModule {}
