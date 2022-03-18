import { Injectable } from '@angular/core';
//let electron_Instance = window['System']._nodeRequire('electron').remote; 
@Injectable()
export class DeviceService{
    NoDeviceindex=0;
    pluginDeviceData=[];
    //dbService = electron_Instance.getGlobal('AppProtocol').deviceService.nedbObj;
    currentDevice;
    static instance=undefined;
    constructor(
    ) {
        DeviceService.instance=this;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            console.log('%c DeviceService_Instance_err','background: red; color: white');
        }
    }


    getTarget(){
        if(this.currentDevice!=undefined){
            return this.currentDevice;
        }
        else{
            console.log('%c DeviceService_getTarget()_Error','background: red; color: white',this.currentDevice);

        }

        
    }

    switchDeviceData(Devicename = '') {
        let TTTT = this.pluginDeviceData.find(
            (x) => x.check == true
        )
        if (TTTT != undefined) {
            this.currentDevice = TTTT;
        }

    }






}
