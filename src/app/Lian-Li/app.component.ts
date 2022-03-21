declare var System;
// declare var fs;
import { Component, OnInit, Input,ViewChild,ElementRef, ChangeDetectorRef,AfterViewInit  } from '@angular/core';
// declare var $: any;
//const { ipcRenderer } = System._nodeRequire('electron');
import {
    i18nManager,
    ImagePath,
    ColorModule,
    WindowsFn,
    TestGradient,
    SharesFunction,
    DeviceService,
 } from './Model/ModelManager';
 import {
    GlobalManager,
 } from './Model/GlobalManager';
import { DomSanitizer } from '@angular/platform-browser';
import { SL_DevicePageComponent } from './SL_DeviceFolder/SL_DevicePage';
import { AL_DevicePageComponent } from './AL_DeviceFolder/AL_DevicePage';
//import { AppProtocol } from './AppProtocol';

// let evtVar = System._nodeRequire('./backend/others/EventVariable');
// let funcVar = System._nodeRequire('./backend/others/FunctionVariable');
// let env = System._nodeRequire('./backend/others/env');
// let remote = System._nodeRequire('electron').remote;

@Component({
    selector: 'app-selector',
    templateUrl: './app.component.html',
    //template: '<h1>我的第一个 Angular 应用</h1>',
    styleUrls: ['../assets/css/UI.css','../assets/css/Global.css'],
    providers: []

})
export class AppComponent implements OnInit {
    //subscription: Subscription;
    //protocol =new AppProtocol();
    langsMode: number = 0;
    @ViewChild(SL_DevicePageComponent) SL_DevicePage:SL_DevicePageComponent;
    @ViewChild(AL_DevicePageComponent) AL_DevicePage:AL_DevicePageComponent;
    realAppContent = false;
    deviceON = true;
    isMaximizeScreen=false;
    ExportUIEnter=false;
    fanisOnOff=false;//off:軟體 on:主機板
    noticeShow=false;//off:軟體 on:主機板
    settingPage=false;
    GlobalManager=new GlobalManager();
    i18nManager=new i18nManager();
    ImagePath=new ImagePath();
    SharesFN=new SharesFunction();
    DeviceService=new DeviceService();
    fileType='FALSL';
    onAppImportExport=false;
    switchPageBtn: any = [
        { name: 'UNI FAN SL', check:false,imagePath:"url('./image/SL_MenuIcon.png')"},
        { name: 'UNI FAN AL', check:true ,imagePath:"url('./image/AL_MenuIcon.png')"},

    ]
    Notice_Mes={
        title:"default",
        content:"default",
        showType:"default",
    }
    onLoading=false;
    static instance=undefined;

    /*********************/
    moveknobcheck = true;
    GetMouseClickObjData(e) {
        // var objlog={
        // }
        // console.log('GetMouseClickObjData',objlog);
        
        // if (e.clientX > 64 && e.clientX < 251 && this.moveknobcheck == true) {
        //     this.moveknobcheck = false;
        // }
    }

    constructor(private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef) {
        //開啟App時通知Electron 將系統icon load起來
        let langObj = []; langObj.push('OPEN L-Connect'); langObj.push('EXIT L-Connect');
        
        AppComponent.instance=this;

    }


    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            //console.log("new ImgPathList Class");
            //this.instance = new GlobalManager();
            console.log('%c ImgPathList_getInstance_err', 'background: blue; color: red');
            return this.instance;
        }
    }
    QuitApp(){
        // let obj = {
        //     Type: funcVar.FuncType.QuitApp,
        //     Func: funcVar.FuncName.QuitApp,
        //     Param: null
        // }
        // this.protocol.RunSetFunction(obj).then((data) => {
            
        // });
    }
    ngOnInit() {
        //System
        console.log('%c System', 'background: blue; color: red',System);
        //console.log('%c window[System],evtVar', 'background: blue; color: red',window['System'],evtVar);
        //console.log('%c System_nodeRequire','color:rgb(255,77,255)',System._nodeRequire);

                //this.changeWinSystemTaskBar();//by ngOnInit 
        // //-----------------ScreenSize取螢幕解析度-----------------
        // let windowsMenu = this;
        // ElectronEventService.on('icpEvent').subscribe((e: any) => { //硬體被動傳值
        //     var obj = JSON.parse(e.detail);
        //     var objlog = {
        //         "obj": obj,       
        //     };
        //     //console.log('ElectronEventService.on_icpEvent:', objlog); 
        //     if (obj.Func == evtVar.EventTypes.FanPRMCallBack)
        //     {
        //         var data = obj.Param;
        //         //this.DeviceService.getTarget().motherBoardFanValue=data;
        //         this.AL_DevicePage.motherBoardFanValue=data.ALFanValue;
        //         this.SL_DevicePage.motherBoardFanValue=data.SLFanValue;
        //         //console.log('FanPRMCallBack被動回值:', data);
        //     }
        //     if (obj.Func === evtVar.EventTypes.RefreshDevice) {
        //         var data = obj.Param;
        //         console.log('EventTypes.RefreshDevice被動回值:', data);
        //         if(data.ALFanValue.length<1 ||data.SLFanValue.length<1){
        //             this._Global.showUITip('ConnectError');
        //         }
        //         else{
        //             this.AL_DevicePage.onPlugDevice=data.ALFanValue;
        //             this.SL_DevicePage.onPlugDevice=data.SLFanValue;
        //         }
        //     };
        //     //console.log('ElectronEventService.on_icpEvent:', objlog);

        // });
        
        // let obj = {
        //     Type: funcVar.FuncType.System,
        //     Func: funcVar.FuncName.InitDevice,
        //     Param: null
        // }
        // this.protocol.RunSetFunction(obj).then((data) => {
            
        // });
        console.log('%c ngOnInit','color:rgb(255,77,255)');
        this.onLoading=true;
        let TTTTindex = this.switchPageBtn.findIndex(
            (x) => x.check == true
        )
        //var TTTT=this.switchPageBtn.find((x) => x.check == true);
        //this.DeviceService.switchDeviceData('');
        if(TTTTindex!=-1){
            switch (TTTTindex) {
                case 0:
                    this.DeviceService.currentDevice=this.SL_DevicePage;
                    break;
                case 1:
                    this.DeviceService.currentDevice=this.AL_DevicePage;
                    break;

                default:
                    break;
            }
        }
        else{
            console.log('%c switchPageBtn.find_error','color:rgb(255,77,255)',TTTTindex);

        }
    }

    ngAfterViewInit(){
        //var TTTTindex=this.switchPageBtn.findindex((x) => x.check == true);
        console.log('ngAfterViewInit:~~~~~~~~~~~~~~~~~~~~~~',this.DeviceService.currentDevice);  
        // console.log('obj:', obj);
        //this.ImportProfile(); 
        //this.ExportProfile();
        this.DeviceService.getTarget().packaged_Code();
        // let obj = {
        //     Type: funcVar.FuncType.System,
        //     Func: funcVar.FuncName.ReadProfileDB,
        //     Param: null
        // }
        // this.protocol.RunSetFunction(obj).then((data) => {
        //     console.log('getDBData',data);

        //     if (data['AL'] !=false) {
        //         this.AL_DevicePage.getDBData(data['AL']);
        //         //this.DeviceService.getTarget().getDBData();//全新架構資料
        //     }
        //     if (data['SL'] !=false) {
        //         this.SL_DevicePage.getDBData(data['SL']);
        //     }

        //     // if(!this._Global.SettingData.notShowAgainExport){
        //     //     this._Global.showUITip('InitExportTip');
        //     // }

        // });
        // setTimeout(() => {
        //    this.fanGroupOnClick(0); //因為有延遲 
        // }, 2000);
        this.cdr.detectChanges();//Invoke change detection explicitly then Angular will update the DOM immediately.
        this.onLoading=false;

    }



    closeUITip(Type=""){
        switch (Type) {
            case "StaticMax48Tip":
                this.GlobalManager.Notice_Mes.StaticMax48Tip = false;
                break;
            case "InitExportTip":
                this.GlobalManager.Notice_Mes.InitExportTip = false;
                break;
            case "SyncTipMessage":
                this.GlobalManager.Notice_Mes.SyncTipMessage = false;
                break;
            default:
                console.log('%c this.Notice_Mes_error', 'background: black; color: red', this.Notice_Mes);
                break;
        }
        this.DeviceService.getTarget().applyDataToServer('SettingData');

    }

    switchFanisOnOff(){
        this.fanisOnOff=!this.fanisOnOff;
        if(this.fanisOnOff){
            this.GlobalManager.Notice_Mes.SyncTipMessage=true;
            this.DeviceService.getTarget().stopAllAnimation();
        }
        else{
            this.closeUITip('SyncTipMessage');
            this.DeviceService.getTarget().startAllAnimation();
        }
        this.DeviceService.getTarget().applyDataToServer('fanisOnOff');//by switchFanisOnOff

    }
    

    // HyperLinkGO(index){
    //     console.log("Enter_customHyper_Link",ipcRenderer.cp,ipcRenderer,ipcRenderer.remote);
    //     switch (index) {
    //         case 0:
    //             ipcRenderer.send("customHyper_Link","https://lian-li.com/faq/");
    //             break;
    //         case 1:
    //             ipcRenderer.send("customHyper_Link","https://www.instagram.com/kemovedirect/");
    //             break;
    //     }
    // }
 
    ImportProfile() {
        if (this.fanisOnOff ||this.onAppImportExport) {
            return;
        }
        this.noticeShow=false;
        this.onAppImportExport=true;
        // dialog.showOpenDialog(null, { defaultPath: '', filters: [{ name: 'Json File', extensions: ['EF'] }] }, (fns) => {
           
        //     if (fns != undefined) {

        //         console.log('讀取路徑fns',fns);
        //         let obj = {                   
        //             Path: fns,
        //         }
                
        //         let obj2 = {
        //             Type: funcVar.FuncType.System,
        //             Func: funcVar.FuncName.ImportProfile,
        //             Param: obj
        //         }
        //         this.protocol.RunSetFunction(obj2).then((data) => {
        //             if(data!=null&&data['fileType']==this.fileType){
        //             console.log('ImportProfile:', data);
        //             //this.updateImportData(data);//by ImportProfile
        //             //this.fanApplyEnable=true;
        //             }
        //             else{
        //                alert("檔案有誤 請重新輸入");
        //             }
        //         });
        //     }

        //         this.onAppImportExport=false;
        //         this.cdr.detectChanges();

            
        
        // })


    }
    ExportProfile() {    
        // if (this.fanisOnOff ||this.onAppImportExport) {
        //     return;
        // }    
        // this.noticeShow=false;
        // this.onAppImportExport=true;

        // dialog.showSaveDialog(null, { defaultPath: 'Profile1', filters: [{ name: 'Json File', extensions: ['EF'] }] }, (fns) => {
        //     if (fns != undefined) {
        //         let data = {
        //             FanSetting: this.DeviceService.getTarget().getNowFanSetting(),
        //             f_Identifier: String(new Date().getTime()),
        //             fileType: this.fileType,
        //         }
        //         let obj = {
        //             Path: fns,   
        //             Data:data, 
        //         }
           
        //         let obj2 = {
        //             Type: funcVar.FuncType.System,
        //             Func: funcVar.FuncName.ExportProfile,
        //             Param: obj
        //         }
        //         this.protocol.RunSetFunction(obj2).then((data) => {
        //             console.log('ExportProfile:', data);
        //         });
        //     }
        //         this.onAppImportExport=false;
        //         this.cdr.detectChanges();

            
        // })
    }


    switchSettingPage(defaultValue){
        if(defaultValue==undefined){
            this.settingPage= this.settingPage;
        }
        else{
            this.settingPage=defaultValue;
            this.DeviceService.getTarget().applyDataToServer('SettingData');
        }

    }


    checkDrop(e){
        this.DeviceService.getTarget().checkDrop(e);
    }
    
    

    changeWinSystemTaskBar(ordertype="") {
        var host:any  =<HTMLElement>document.querySelector(':host');
        var appSelector :any =<HTMLElement>document.querySelector('app-selector');
        var root:any =document.querySelector('root');
        this.isMaximizeScreen=!this.isMaximizeScreen;
        if(!this.isMaximizeScreen){
            appSelector.style.setProperty('--CustomWidth', '9.6Px');
            appSelector.style.setProperty('--CustomHeight', '5.4Px');
        }
        else if(this.isMaximizeScreen){
            appSelector.style.setProperty('--CustomWidth', '19.2Px');
            appSelector.style.setProperty('--CustomHeight', '10.8Px');
        }


        console.log('%c rrr', 'background: blue; color: red',host,appSelector,root);

    }

    onClickPageBtn(index) {
        console.log('index:', index);
        this.switchPageBtn.forEach((element, i) => { //開啟指定按鈕 關閉其他所有按鈕
            if (index == i) {
                this.switchPageBtn[i].check = true;
            }
            else {
                this.switchPageBtn[i].check = false;
            }
        });
    }


    


}



