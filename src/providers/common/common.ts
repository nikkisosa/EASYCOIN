import { Injectable } from '@angular/core';
import { PopoverController, LoadingController, ToastController, ModalController, AlertController} from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Injectable()
export class CommonProvider {

  private _popOver:any;
  private loader: any;
  private modal:any;
  constructor(public popOver: PopoverController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, private modalCtrl: ModalController, private alertCtrl: AlertController/* ,private sqlite:SQLite */) {

  }

  public openPopOver(Page){
    this._popOver = this.popOver.create(Page);
    this._popOver.present();
  }

  public closePopOver(){
    this._popOver.dismiss;
  }

  public activeLoading(){
    this.loader = this.loadingCtrl.create({content: "Please wait ..."})
     this.loader.present();
   }

  public closeLoading(){
   this.loader.dismiss();
   }

  public presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  openModal(page) {
    this.modal = this.modalCtrl.create(page);
    this.modal.present();
  }
  closeModal() {
    this.modal.dismiss;
  }

  showAlert(Title,Subtitle,message = '',pop_to_page:any='',button:string="Ok"){
    let alert = this.alertCtrl.create({
        title: Title,
        subTitle: Subtitle,
        message: message,
        buttons: [{
                    text: button,
                    handler: () => {
                      pop_to_page;
                    }
                 }]
      });
      alert.present();
  }

  __alert(title,subtitle,message,execute:any='',btnrole='Ok',btncancel='Cancel'){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      message: message,
      buttons: [
                  {
                    text: btncancel,
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                  text: btnrole,
                  handler: () => {
                    return execute;
                  }
                }
              ]
    });
    alert.present();
  }


}
