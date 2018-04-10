import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ServicesProvider } from "../../providers/services/services";
import { CommonProvider } from "../../providers/common/common";
import { LoginPage } from "../login/login";
import { VerificationPage } from "../verification/verification";
import { Network } from '@ionic-native/network';
import { LocalsessionProvider } from '../../providers/localsession/localsession';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  user: any;
  password: any;
  retype: any;
  _name: any;
  _mname: any;
  _lname: any;
  _data: any;
  _info: any;
  _email: any;
  balance_inquiry: any;
  private proceed: boolean = false;
  private tap:boolean = false;
  private checkvalue: boolean = false; 
  squestion:any = [
    {
      q:'Who was your childhood hero?'
    },
    {
      q: 'What is the name of your favorite pet?'
    },
    {
      q: 'What is your father\'s middle name?'
    }, 
    {
      q: 'Who is your favorite actor, musician, or artist?'
    },
    {
      q: 'In what city were you born?'
    },
    {
      q: 'What is the name of your first grade teacher?'
    },
    {
      q: 'What street did you grow up on?'
    }
  ];
  question:any;
  sanswer:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private common: CommonProvider,
    private platform: Platform,
    private network: Network,
    private localSession: LocalsessionProvider) {
  }

  private async signup() {
    if(this.question)
    {
      if(this.sanswer)
      {
        
        if (this.user) 
        {
          if (this.password) 
          {
            if (this.retype == this.password) 
            {
              this.tap = true;
              await
                this.services.registration(this.user, this.password, this._name, this._mname, this._lname, this._email, this.question, this.sanswer).then((result) => {
                  this._data = result;
                  if (this._data.response == 'success') {

                    // this.services.create_account(this._name + ' ' + this._mname + ' ' + this._lname, '', this.user)
                    //   .then((res) => {
                    //     this._info = res;
                    //     console.log(this._info);
                    //     if (this._info.code == "0x0000") {
                    //       this.tap = false;
                    //       this.localSession.set_local_phone(this.user);
                    //       this.localSession.set_local_priv_key(this._info.result);
                         

                    //     }

                    //   }).catch(() => {
                    //     this.common.showAlert('Connection Error', '', 'Please check your internet connection.')
                    //   })
                    this.navCtrl.setRoot(VerificationPage);

                  }
                  else if (this._data.response == 'invalid number') {
                    this.common.presentToast('Invalid Number');
                  }
                  else {
                    this.common.presentToast('Mobile number is already exist.');
                  }
                }).catch(() => {
                    this.common.showAlert('Connection Error', '', 'Please check your internet connection.')
                })
            } 
            else 
            {
              this.common.presentToast('Password not match');
            }
          } 
          else 
          {
            this.common.presentToast('Invalid password');
          }
        } 
        else 
        {
          this.common.presentToast('Invalid name');
        }
      }
      else
      {
        this.common.presentToast('Provide answer.');
      }
    }
    else
    {
      this.common.presentToast('Invalid security question');
    }
  }

  private backToSignin() {
    this.navCtrl.setRoot(LoginPage);
  }

  private onProceed()
  {
    if(this.user && this.password && this._name && this._mname && this._lname && this._email && this.retype)
    {
      if(this.retype == this.password)
      {
        this.proceed = true;
      }
      else
      {
        this.common.presentToast('Retype password not match');
      }
    }
    else
    {
      this.common.presentToast('Please fill-up all fields');
    }
  }

  private onChange()
  {
    this.checkvalue = true;
  }

}
