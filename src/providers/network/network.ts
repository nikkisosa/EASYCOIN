import { Injectable } from '@angular/core';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {

  smart = [
    {
      "title"       : "Smart Load 15",
      "currency"    : "php",
      "amount"      : "15.00",
      "validity"    : "Valid for 15 day(s)",
      "code"        : "15",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 20",
      "currency"    : "php",
      "amount"      : "20.00",
      "validity"    : "Valid for 15 day(s)",
      "code"        : "20",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 30",
      "currency"    : "php",
      "amount"      : "30.00",
      "validity"    : "Valid for 15 day(s)",
      "code"        : "30",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 50",
      "currency"    : "php",
      "amount"      : "50.00",
      "validity"    : "Valid for 15 day(s)",
      "code"        : "50",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 60",
      "currency"    : "php",
      "amount"      : "60.00",
      "validity"    : "Valid for 15 day(s)",
      "code"        : "60",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 100",
      "currency"    : "php",
      "amount"      : "100.00",
      "validity"    : "Valid for 30 day(s)",
      "code"        : "100",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 115",
      "currency"    : "php",
      "amount"      : "115.00",
      "validity"    : "Valid for 45 day(s)",
      "code"        : "115",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 200",
      "currency"    : "php",
      "amount"      : "200.00",
      "validity"    : "Valid for 60 day(s)",
      "description" : "P200 Airtime Load; 30 Text ALLNET",
      "code"        : "200",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 300",
      "currency"    : "php",
      "amount"      : "300.00",
      "validity"    : "Valid for 75 day(s)",
      "description" : "P300 Airtime Load; 33 Text ALLNET",
      "code"        : "300",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Load 500",
      "currency"    : "php",
      "amount"      : "500.00",
      "validity"    : "Valid for 120 day(s)",
      "description" : "P500 Airtime Load; 83 Text ALLNET",
      "code"        : "500",
      "network"     : "SMARTLOAD"
    },
  ];

  smart_calltext = [
    {
      "title"       : "Patok-o-Text10",
      "currency"    : "php",
      "amount"      : "10.00",
      "validity"    : "Valid for 1 day",
      "description" : "",
      "code"        : "PT10",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Patok-o-Text20",
      "currency"    : "php",
      "amount"      : "20.00",
      "validity"    : "Valid for 2 day(s)",
      "description" : "",
      "code"        : "20",
      "network"     : "SMARTLOAD"
    },
  ];

  smart_data = [
    {
      "title"       : "Smart Data SURFMAX50",
      "currency"    : "php",
      "amount"      : "50.00",
      "validity"    : "Valid for 1 day",
      "description" : "SurfMax Plus 800MB Data",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Bro SURFMAX85",
      "currency"    : "php",
      "amount"      : "85.00",
      "validity"    : "Valid for 2 day(s)",
      "description" : "SurfMax Plus 800MB Data",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Bro SURFMAX250",
      "currency"    : "php",
      "amount"      : "250.00",
      "validity"    : "Valid for 7 day(s)",
      "description" : "SurfMax Plus 800MB Data",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Bro SURFMAX995",
      "currency"    : "php",
      "amount"      : "995.00",
      "validity"    : "Valid for 30 day(s)",
      "description" : "SurfMax Plus 800MB Data",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Data GIGA50",
      "currency"    : "php",
      "amount"      : "50.00",
      "validity"    : "Valid for 3 day(s)",
      "description" : "1GB Data 300MB iflix",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Data GIGA99",
      "currency"    : "php",
      "amount"      : "99.00",
      "validity"    : "Valid for 7 day(s)",
      "description": "1.5GB 300MB iflix,Fox,Spinnr",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Data GIGA299",
      "currency"    : "php",
      "amount"      : "299.00",
      "validity"    : "Valid for 30 day(s)",
      "description" : "1.5GB 300MB iflix,Fox,Spinnr",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Data GIGA499",
      "currency"    : "php",
      "amount"      : "499.00",
      "validity"    : "Valid for 30 day(s)",
      "description" : "GIGA for PostPaid",
      "network"     : "SMARTLOAD"
    },
    {
      "title"       : "Smart Data GIGA999",
      "currency"    : "php",
      "amount"      : "999.00",
      "validity"    : "Valid for 30 day(s)",
      "description" : "GIGA for Smart bro",
      "network"     : "SMARTLOAD"
    },
  ];
  
  globe = [
    {
      "title"       : "Globe Load 15",
      "currency"    : "php",
      "amount"      : "15.00",
      "validity"    : "Valid for 15 day(s)",
      "network"     : "AUTOLOADMAX",
      "description" : "------------",
    },
    {
      "title"       : "Globe Load 20",
      "currency"    : "php",
      "amount"      : "20.00",
      "validity"    : "Valid for 15 day(s)",
      "network"     : "AUTOLOADMAX",
      "description" : "------------",
    }
  ];

  sun = [
    {
      "title"       : "Sun Load 15",
      "currency"    : "php",
      "amount"      : "15.00",
      "validity"    : "Valid for 15 day(s)",
      "network"     : "SUNLOAD",
      "description" : "------------",
    },
    {
      "title"       : "Sun Load 20",
      "currency"    : "php",
      "amount"      : "20.00",
      "validity"    : "Valid for 15 day(s)",
      "network"     : "SUNLOAD",
      "description" : "------------",
    }
  ];


  

  constructor() {

  }

  public _net(network:string,type:string){
    if(network == "smart"){
      if(type == "regular"){
        return this.smart;
      }else if(type == "calltext"){
        return this.smart_calltext;
      }else if(type == "data"){
        return this.smart_data;
      }
     
    }else if(network == "globe"){
      if (type == "regular") {
        return this.globe;
      } else if (type == "calltext") {
        return this.globe;
      } else if (type == "data") {
        return this.globe;
      }
    }else if(network == "sun"){
      if (type == "regular") {
        return this.sun;
      } else if (type == "calltext") {
        return this.sun;
      } else if (type == "data") {
        return this.sun;
      }
    }
  }

}
