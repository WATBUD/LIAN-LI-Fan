//declare var System;
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
    LinearGradient,
    stopVar
} from './LinearGradient';
import {
    FanSetting
} from './FanSetting';
import { DomSanitizer } from '@angular/platform-browser';


// let funcVar = System._nodeRequire('./backend/others/FunctionVariable');
// let remote = System._nodeRequire('electron').remote;
//var this.MouseBoxSelectionFn=new MouseBoxSelection();AppComponent,
var scaleConfig = {
    scaleMultipleConfig: [0.25, 0.5, 1, 2, 4],
    scaleMultiple: 0.2,
}
@Component({
    selector: 'SL_DevicePage',
    templateUrl: './SL_DevicePage.html',
    styleUrls: ['./SL_DevicePage.css', '../../assets/css/Share.css'],
    providers: [],
})
@Injectable()
export class SL_DevicePageComponent implements OnInit {

    FanSetting: any = new FanSetting("fanGroupTrapezoid0");
    FanSettingArrayData: any = [
        new FanSetting("fanGroupTrapezoid0"),
        new FanSetting("fanGroupTrapezoid1"),
        new FanSetting("fanGroupTrapezoid2"),
        new FanSetting("fanGroupTrapezoid3"),
    ];
    textCollection: any = {
        TextLedPartbtn: ['01', '02', '03', '04'],
    }
    motherBoardFanValue = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    device_Controller = [];
    fanGroupIndex = 0;
    colorRecordIndex = 0;
    controller_index = 0;
    fanModeDropDown = false;
    LEDModeDropDown = false;
    fanApplyEnable = false;
    onPlugDevice=[];
    //_Global = AppComponent.getInstance();
    _Global=GlobalManager.getInstance();
    i18nManager = i18nManager.getInstance();
    ImagePath = ImagePath.getInstance();
    // DeviceService=DeviceService.getInstance();
    private onChangeCallback: (_: any) => void;
    private onTouchedCallback: () => void;
    constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
        //this.MouseMoveObjectFn.addMoveObject('KeyBoardUI2')
        console.log('%c SL_DevicePageComponentInitial', 'background: red; color: white');

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
    getDBData(data) {
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
        this.refreshAllAnimation();
    }


    refreshAllAnimation() {
        var checkData = this.FanSettingArrayData;
        for (let index = 0; index < checkData.length; index++) {
            checkData[index].gradient.stopAnimationAndClear();
            if (checkData[index].gradient.getMode().isSync) {
                this.stopAllAnimation();
                var T = this.FanSettingArrayData[index];
                T.gradient.playAnimation();
                return;
            }
        }
        for (let index = 0; index < 4; index++) {
            var T = this.FanSettingArrayData[index];
            T.gradient.playAnimation();
        }
    }

    stopAllAnimation() {
        var checkData = this.FanSettingArrayData;
        for (let index = 0; index < checkData.length; index++) {
            checkData[index].gradient.stopAnimationAndClear();
        }
    }
    startAllAnimation() {
        this.refreshAllAnimation();
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
            'DeviceName': 'SL',
        }
        // let obj2 = {
        //     Type: funcVar.FuncType.System,
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
        this.FanSetting.gradient.elementsName = ["fanGroupTrapezoid" + this.fanGroupIndex];
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
        var checkData = this.FanSettingArrayData;


        for (let index = 0; index < checkData.length; index++) {
            if (checkData[index].gradient.getMode().isSync) {
                checkData[index].gradient.stopAnimationAndClear();
                break;
            }
        }

        if (Type == 'All') {
            for (let index = 0; index < 4; index++) {
                console.log('apply_this.FanSetting.gradient.stopVar', stopVar, index);
                var T = this.FanSettingArrayData[index];
                T.gradient.ImportClassData(this.FanSetting.gradient);
                T.gradient.elementsName = "fanGroupTrapezoid" + index;
                T.gradient.playAnimation();
            }

        }
        else {
            var T = this.FanSettingArrayData[this.fanGroupIndex];
            T.gradient.ImportClassData(this.FanSetting.gradient);
            T.gradient.playAnimation();
            for (let index = 0; index < 4; index++) {
                console.log('FanSettingArrayData,isSync', this.FanSettingArrayData[index].gradient.getMode().isSync);
                if (index != this.fanGroupIndex && this.FanSettingArrayData[index].gradient.getMode().isSync) {
                    this.FanSettingArrayData[index].gradient.gradientMode = 0;
                    //this.FanSettingArrayData[index].setLEDVarDefault();
                    this.FanSettingArrayData[index].gradient.playAnimation();
                }
            }
        }
        this.refreshAllAnimation();
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
    chooseLedMode(index) {
        console.log('chooseLedMode_index:', index);
        //console.log('%c chooseLedMode_index','background: blue; color: red',this._Global.notShowAgainStaticTip);
        if (index == 1 && this._Global.notShowAgainStaticTip == false) {
            this._Global.showUITip("StaticMax48Tip");
        }
        this.FanSetting.setLEDMode(index);
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
        let SColorRGBArr =  this._Global.getColorTarget().getS_RGBColor();
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
                var T = this.FanSettingArrayData[index];
                T.gradient.ImportClassData(this.FanSetting.gradient);
                T.gradient.elementsName = "fanGroupTrapezoid" + index;
                T.gradient.playAnimation();
            }
        }
        else {
            this.FanSetting.setLEDVarDefault();
            var T = this.FanSettingArrayData[this.fanGroupIndex];
            T.gradient.ImportClassData(this.FanSetting.gradient);
            T.gradient.playAnimation();
        }

        this.applyDataToServer('LEDArea');//LEDAreaDefault
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
        // console.log("e.target.id:", e.target.id);
        // console.log("e.target", e.target);
        if (e.target.id == " ") {
            this.fanModeDropDown = false;
            this.LEDModeDropDown = false;
        }
        else if (e.target.id == "FanModeDrop") {
            this.LEDModeDropDown = false;
        }
        else if (e.target.id == "LedModeDrop") {
            this.fanModeDropDown = false;
        }
        else {
            this.fanModeDropDown = false;
            this.LEDModeDropDown = false;
        }
    }
    ledConcatenation(targetIndex) {
        var target = this.FanSetting.gradient.getMode().LEDConcatenation;
        var FourColorMode = [1, 2];
        var SpecificMode = FourColorMode.find((x) => x == this.FanSetting.gradient.gradientMode)

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