import {
    Component, OnInit, Output, Input, EventEmitter, SimpleChange, OnChanges
    , ViewEncapsulation, forwardRef, ChangeDetectorRef, ViewChild
    , Injectable
} from '@angular/core';
import { AppComponent } from '../app.component';
import {
    i18nManager,
    ImagePath,
    ColorModule,
    WindowsFn,
    TestGradient,
    SharesFunction,
} from '../Model/ModelManager';

import {
    GlobalManager
} from '../Model/GlobalManager';

import {
    stopVar
} from './AL_CircleEffectManager';
import {
    AL_FanSetting
} from './AL_FanSetting';

import { DomSanitizer } from '@angular/platform-browser';

//var this.MouseBoxSelectionFn=new MouseBoxSelection();AppComponent,
var scaleConfig = {
    scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
    scaleMultiple: 0.2,
}
@Component({
    selector: 'AL_DevicePage',
    templateUrl: './AL_DevicePage.html',
    styleUrls: ['./AL_DevicePage.css', '../../assets/css/Share.css'],
    providers: [],
})
@Injectable()
export class AL_DevicePageComponent implements OnInit {

    FanSetting=new AL_FanSetting(["Inner_Circle0","Outer_Circle0","Overall_Circle0"]);
    FanSettingArrayData= [
        new AL_FanSetting(["Inner_Circle0","Outer_Circle0","Overall_Circle0"]),
        new AL_FanSetting(["Inner_Circle1","Outer_Circle1","Overall_Circle1"]),
        new AL_FanSetting(["Inner_Circle2","Outer_Circle2","Overall_Circle2"]),
        new AL_FanSetting(["Inner_Circle3","Outer_Circle3","Overall_Circle3"]),
    ];
    textCollection= {
        TextLedPartbtn: ['01', '02', '03', '04'],
    }
    motherBoardFanValue = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    device_Controller = [];
    fanGroupIndex = 0;
    colorRecordIndex = 0;
    controller_index = 0;
    fanModeDropDown = false;
    LEDModeDropDown = false;
    LEDIconDropDown = false;
    fanApplyEnable = false;
    fileType="AL_Device_EX";
    onPlugDevice=[];
    //_Global = AppComponent.getInstance();
    _Global=GlobalManager.getInstance();
    i18nManager = i18nManager.getInstance();
    ImagePath = ImagePath.getInstance();
    // DeviceService=DeviceService.getInstance();
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;
    constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
        console.log('%c AL_DevicePageComponentInitial', 'background: red; color: white');

    }
    ngAfterViewInit() {


    }
    ngOnInit() {

    }
    ngOnChanges() {
        //this.Reinit();
    }

    private _polygon = 'polygon(0 0, 70% 0, 70% 100%, 0 100%)';
    returnRPMValuePolygonClip() {
        //console.log("polygon_returnRPMValuePolygonClip",  this._polygon );
        var step = (this.FanSetting.fanRPMValue - 800) / 110;
        this._polygon = "polygon(0 0," + step * 10 + "% 0, " + step * 10 + "% 100%, 0 100%)";
        return this.sanitizer.bypassSecurityTrustStyle(this._polygon);
    }
    getDBData(Data) {
        // let obj = {
        //     Type: funcVar.FuncType.System,
        //     Func: funcVar.FuncName.ReadProfileDB,
        //     Param: null
        // }
        // this.protocol.RunSetFunction(obj).then((data) => {
        //     console.log('getDBData',data);

        //     if (data != null) {
        //         this.device_Controller=data['DeviceController'];
        //         // for (let rank = 0; rank < 4; rank++) {
        //         //     this.FanSettingArrayData[rank].ImportClassData(data["FanSettingArrayData"][rank]);      
        //         // }
        //         this._Global.fanisOnOff=data["fanisOnOff"];
        //         this._Global.SettingData=data["SettingData"];
        //         this.i18nManager.onUsingLangindex=this._Global.SettingData.language;
        //         this.device_ControllerUpdate(this.device_Controller[0]);
        //         if(this._Global.fanisOnOff){
        //             this.stopAllAnimation();
        //         }
        //     }

        //     if(!this._Global.SettingData.notShowAgainExport){
        //         this._Global.showUITip('InitExportTip');
        //     }

        // });
    }
    show_i18n_ModeName(i) {

        return this.i18nManager.getTarget('FAN_MODEF_LIST')[i];
    }
    packaged_Code() {
        for (let index = 0; index < 4; index++) {
            let obj = {
                'FanSettingArrayData': JSON.parse(JSON.stringify(this.FanSettingArrayData)),
                'fanGroupIndex': JSON.parse(JSON.stringify(this.fanGroupIndex)),
            }
            this.device_Controller.push(obj);
        }
    }
    switch_Packaged_Code(i, isinit = false) {
        if (this.controller_index != i) {
            let obj = {
                'FanSettingArrayData': JSON.parse(JSON.stringify(this.FanSettingArrayData)),
                'fanGroupIndex': JSON.parse(JSON.stringify(this.fanGroupIndex)),
            }
            this.device_Controller[this.controller_index] = obj;
            this.controller_index = i;
            var data = this.device_Controller[i];
            this.device_ControllerUpdate(data);
        }
    }
    device_ControllerUpdate(data) {
        for (let rank = 0; rank < this.FanSettingArrayData.length; rank++) {
            this.FanSettingArrayData[rank].ImportClassData(data["FanSettingArrayData"][rank]);
        }
        this.fanGroupIndex = data["fanGroupIndex"];
        var target = this.FanSettingArrayData[this.fanGroupIndex];
        this.FanSetting.ImportClassData(target);
        this.fanGroupOnClick(this.fanGroupIndex);
        this.startAllAnimation();
    }

    stopAllAnimation() {
        var checkData = this.FanSettingArrayData;
        for (let index = 0; index < checkData.length; index++) { 
            checkData[index].stopAnimationAndClear();
        }
    }
    startAllAnimation() {
        var checkData = this.FanSettingArrayData;
        for (let index = 0; index < checkData.length; index++) {
            checkData[index].stopAnimationAndClear();
            if (checkData[index].gradient.getMode().isSync) {
                this.stopAllAnimation();
                this.FanSettingArrayData[index].startAnimationManager();
                return;
            }
        }
        for (let index = 0; index < 4; index++) {
            var T = this.FanSettingArrayData[index];
            this.FanSettingArrayData[index].startAnimationManager();
        }
    }
    applyDataToServer(SetTargetfield = "") {
        console.log('applyDataToServer_SetProfileDB:');

        let tempCallBack = {
            'FanSettingArrayData': JSON.parse(JSON.stringify(this.FanSettingArrayData)),
            'fanGroupIndex': JSON.parse(JSON.stringify(this.fanGroupIndex)),
        }
        this.device_Controller[this.controller_index] = tempCallBack;
        let obj = {
            'DeviceController': this.device_Controller,
            'fanisOnOff': this._Global.fanisOnOff,
            'SettingData': this._Global.SettingData,
            'SetTargetField': SetTargetfield,
            'controller_index': this.controller_index,
            'DeviceName': 'AL',
        }
        //     Func: funcVar.FuncName.SetProfileDB,
        //     Param: obj
        // }
        // this.protocol.RunSetFunction(obj2).then((data) => {
        //     console.log('applyDataToServer_SetProfileDB:', data);
        // });
    }
    updateImportData(data) {
        console.log('updateImportData', data);
        data = JSON.parse(JSON.stringify(data));
        this.FanSetting.ImportClassData(data['FanSetting']);
        this.cdr.detectChanges();
    }

    chooseFanMode(index) {
        console.log('%c chooseFanMode_index:', 'background: blue; color: red', index);
        if (this.FanSetting.fanMode != index) {
            // document.getElementById("FanAreaBtn").style.opacity="1";
            this.fanApplyEnable = true;//
            this.FanSetting.setFanMode(index);
            this.updateFanSliderWidth();
        }

        this.fanModeDropDown = false;
    }

    LEDAreaApplyBtn(Area = "", Type) {
        console.log('apply_this.FanSetting.gradient.stopVar', stopVar)
        console.log('LEDAreaApplyBtn:', 'Type', Type);
        // var checkData = this.FanSettingArrayData[this.fanGroupIndex];
        // if (checkData.gradient.getMode().isSync) {
        //     checkData.stopAnimationAndClear();
        // }
        var checkData = this.FanSettingArrayData;//cancel all sync
        for (let index = 0; index < checkData.length; index++) {
            if (checkData[index].gradient.getMode().isSync) {
                checkData[index].stopAnimationAndClear();
                //this.importGradientAndStart(this.FanSetting.gradient,index)
                //this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
                //this.startAllAnimation();
                //return;
                break;
            }
        }


        var nowTarget=this.FanSetting;//[this.fanGroupIndex]
        if (Type == 'All') {
            for (let index = 0; index < 4; index++) {
                console.log('apply_this.FanSetting.gradient.stopVar', stopVar, index);
                this.importGradientAndStart(this.FanSetting.gradient,index)
            }
        }
        else {
            if(nowTarget.gradient.getMode().isSync){
                this.stopAllAnimation();
                //this.refreshAllAnimation();
                this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
            }
            else{
                var checkData = this.FanSettingArrayData;//cancel all sync
                for (let index = 0; index < checkData.length; index++) {
                    if (checkData[index].gradient.getMode().isSync) {
                        //checkData[index].stopAnimationAndClear();
                        this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
                        //this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
                        this.startAllAnimation();
                        this.applyDataToServer('LEDArea');//by LEDAreaApplyBtn
                        return;
                    }
                }
                this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
            }
        }      
        this.applyDataToServer('LEDArea');//by LEDAreaApplyBtn
    }





    fanGroupOnClick(index) {
        if (!this.FanSetting.gradient.getMode().isSync) {
            this.fanGroupIndex = index;
            var target = this.FanSettingArrayData[this.fanGroupIndex];
            this.FanSetting.ImportClassData(target);
            this.fanApplyEnable = false;
            this.updateFanSliderWidth();//by_fanGroupOnClick
            console.log('fanGroupOnClick:', index, this.FanSetting);
            //console.log("fanGroupOnClick_ColorArray", this.colorArrays);
        }
        if (this.FanSetting.gradient.getMode().isSync) {
            this.FanSetting.gradient.getMode().chooseGroup = index;
            this.FanSetting.fanMode = this.FanSettingArrayData[this.FanSetting.gradient.getMode().chooseGroup].fanMode;
            this.FanSetting.fanRPMValue = this.FanSettingArrayData[this.FanSetting.gradient.getMode().chooseGroup].fanRPMValue;
            this.updateFanSliderWidth();//by_fanGroupOnClick
        }


    }
    updateFanSliderWidth() {
        // var T = get_Windows_Vw_Vh();//vw vh
        // var step = (this.FanSetting.fanRPMValue - 800) / 110;
        // this._polygon = "polygon(0 0," + step * 10 + "% 0, " + step * 10 + "% 100%, 0 100%)";
        // console.log('this._polygon:', this._polygon);
        // console.log('updateFanSliderWidth_value:', this.FanSetting.fanRPMValue);
    }
    chooseLedMode(name) {
        console.log('chooseLedMode_index:');
        //console.log('%c chooseLedMode_index','background: blue; color: red',this._Global.notShowAgainStaticTip);
        if (name == "static" && this._Global.notShowAgainStaticTip == false) {
            this._Global.showUITip("StaticMax48Tip");
        }
        this.FanSetting.gradient.setLEDMode(name);
        this.colorRecordIndex = 0;
        this.LEDModeDropDown = false;

    }

    changeSliderProgerss(currentStep, maxStep, length, assignUIId) {

        var target = document.getElementById(assignUIId);
        var resultwidth = (length / maxStep) * currentStep + "px";
        var arrlog = {
            "currentStep": currentStep,
            "maxStep": maxStep,
            "length": length,
            "assignUIId": assignUIId,
            "resultwidth": resultwidth
        }
        // console.log("changeSliderProgerss",arrlog);

        document.getElementById(assignUIId).style.width = resultwidth;
    }



    



    colorControl() {
        this._Global.getColorTarget().hsv_Rgb_hexSet();
        //this.FanSetting.gradient.getMode().colorArrays[this.colorRecordIndex].hsv_Rgb_hexSet();
        //console.log('colorControl',this.colorArrays[this.colorRecordIndex]);
    }
    connectSBGcolor() {
        let SColorRGBArr = this._Global.getColorTarget().getS_RGBColor();
        //this.FanSetting.gradient.getMode().colorArrays[this.colorRecordIndex].getS_RGBColor();
        var SColor = "-webkit-linear-gradient(left,#FFFFFF," + "rgb(" + SColorRGBArr[0] + "," + SColorRGBArr[1] + "," + SColorRGBArr[2] + ")" +
            ")";
        let styles = {
            //'background':'-webkit-linear-gradient(left,#FFFFFF,red)',
            'background': SColor,
        };
        return styles;
    }
    connectVBGcolor() {
        let VColorRGBArr = this._Global.getColorTarget().getV_RGBColor();
        //this.FanSetting.gradient.getMode().colorArrays[this.colorRecordIndex].getV_RGBColor();
        var VColor = "-webkit-linear-gradient(left,#000000," + "rgb(" + VColorRGBArr[0] + "," + VColorRGBArr[1] + "," + VColorRGBArr[2] + ")" +
            ")";
        let styles = {
            //'background':'-webkit-linear-gradient(left,#FFFFFF,red)',
            'background': VColor,
        };
        return styles;
    }


    LEDAreaDefault() {

        if (this.FanSetting.gradient.getMode().isSync) {
            for (let index = 0; index < 4; index++) {
                this.FanSetting.setLEDVarDefault();
                this.importGradientAndStart(this.FanSetting.gradient,index);
            }
        }
        else {
            this.FanSetting.setLEDVarDefault();
            this.importGradientAndStart(this.FanSetting.gradient,this.fanGroupIndex);
        }
        this.applyDataToServer('LEDArea');//LEDAreaDefault
    }

    importGradientAndStart(data,index){
        var T = this.FanSettingArrayData[index];
        T.gradient.setAssignTypeModuleData(data);
        T.startAnimationManager();
    }


    FanAreaApplyBtn(Area, Type) {
        console.log('FanAreaApplyBtn:', 'Type', Type);

        var max = 1;
        var target;
        Type == "All" ? max = 4 : max = 1;
        for (let index = 0; index < max; index++) {
            if (max == 1) {
                if (this.FanSetting.gradient.getMode().isSync) {
                    target = this.FanSettingArrayData[this.FanSetting.gradient.getMode().chooseGroup];

                }
                else {
                    target = this.FanSettingArrayData[this.fanGroupIndex];

                }
                console.log("FanAreaApplyBtn", target);

            }
            else {
                target = this.FanSettingArrayData[index];
                console.log("FanAreaApplyBtn" + index, this.FanSettingArrayData);

            }
            target.fanMode = this.FanSetting.fanMode;
            target.fanRPMValue = this.FanSetting.fanRPMValue;
            this.fanApplyEnable = false;
        }
        //this.cdr.detectChanges();
        this.applyDataToServer('FanArea');//FanAreaApplyBtn
    }





    onclickColorDefault(index) {
        //styleColor=$event.target.style.backgroundColor
        var t_color=this._Global.getColorTarget().getRGB();   
        if(index=="All"){
            var target=this.FanSetting.gradient.getMode().colorArrays;
            for (let index = 0; index < target.length; index++) {
                var element = target[index];
                element.onclickColorTicket(t_color);
            }
        }
        else{
            this.FanSetting.gradient.getMode().colorArrays[index].onclickColorTicket(t_color);
        }
        //this.FanSetting.gradient.getMode().colorArrays[this.colorRecordIndex].formatRGB(styleColor.style.backgroundColor);
    }

    checkDrop(e) {
        console.log("e.target.id:", e.target.id);
        // console.log("e.target", e.target);
        switch (e.target.id) {
            case "FanModeDrop":
                this.fanModeDropDown = !this.fanModeDropDown;
                this.LEDModeDropDown = false;
                this.LEDIconDropDown = false;
                break;
            case "LedListTitleStyle":
                this.LEDModeDropDown = !this.LEDModeDropDown;
                this.fanModeDropDown = false;
                this.LEDIconDropDown = false;
                break;
            case "LED_Icon_drop":
                this.LEDIconDropDown = !this.LEDIconDropDown;
                this.fanModeDropDown = false;
                this.LEDModeDropDown = false;
                break;
            default:
                this.fanModeDropDown = false;
                this.LEDModeDropDown = false;
                this.LEDIconDropDown = false;
                break;
        }
    }




    ledConcatenation(targetIndex) {
        var target = this.FanSetting.getGradientMode().LEDConcatenation;
        var FourColorMode = ['Static Color','Breathing Color'];
        var SpecificMode = FourColorMode.find((x) => x == this.FanSetting.getGradientMode().name)
        console.log('LedPartb_index:', targetIndex, this.FanSetting.gradient);
        console.log('SpecificMode:', SpecificMode);
        if (SpecificMode != undefined) {
            target[targetIndex] = !target[targetIndex];
            //console.log('find_Data_Exist_fail',field,value);
        }
        else {
            for (let index = 0; index < target.length; index++) {
                if (index <= targetIndex) {
                    target[index] = true;
                }
                else {
                    target[index] = false;
                }
            }
        }
    }

    getNowFanSetting() {
        return this.FanSettingArrayData[this.fanGroupIndex];
    }





}