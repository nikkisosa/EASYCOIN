import { Component } from '@angular/core';
import { ServicesProvider } from "../../providers/services/services";
import { LocalsessionProvider } from "../../providers/localsession/localsession";
@Component({
  selector: 'ads',
  templateUrl: 'ads.html'
})
export class AdsComponent {

  base_url:any;
  advertise:any=[];

  constructor(private services:ServicesProvider,private localSession:LocalsessionProvider) {
    this.base_url = this.localSession.base_url;
  }

  ngAfterViewInit()
  {
    this.ads();
  }

  private async ads()
  {
    
    await 
    
    this.services.ads()
    .then((ads)=>{
      let data:any = ads;
      this.advertise = data.advert;
    })
    .catch((e)=>{
      console.log(e);
    })
  }

}
