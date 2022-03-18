import { AL_CircleEffectManager } from './AL_CircleEffectManager';
import { AL_EffectModule } from './AL_EffectModule';

import { ColorModule }  from '../Model/ColorModule';
export class AL_FanSetting {
    fanMode = 0;
    fanRPMValue = 800;
    gradient=new AL_CircleEffectManager();
    finalSetMode=['Rainbow','Rainbow','Rainbow'];
    AL_EffectModule=new AL_EffectModule();  
    constructor(LGTarget=[]) {
        if(LGTarget.length>=1){
            this.AL_EffectModule.elementsName=LGTarget;
        }
    }
    getGradientMode(){
       return this.gradient.getMode();
    }
    //backup=['Inner','Outer','OverAll'];

    startAnimationManager(){
        this.gradient.setAnimationData();
        var now_effect_Data=this.gradient.getMode();
        var modeType=this.gradient.nowEffectListModule;
        var effectDataArray =this.gradient.effectModuleArray;
        this.AL_EffectModule.stopAnimationAndClear(now_effect_Data);
        if (modeType != 'OverAll') {
            for (let index = 0; index < 2; index++) {
                var effect_Data = effectDataArray[index].getMode();
                var Type = effectDataArray[index].modeType;
                this.showAnimation(effect_Data,Type);      
                console.log('%c showAnimationI+O', 'color:rgb(255,77,255)', effect_Data);
            }
        }
        else{
            var effect_Data = effectDataArray[2].getMode();
            var Type = effectDataArray[2].modeType;
            this.showAnimation(effect_Data,Type);      
            console.log('%c showAnimation', 'color:rgb(255,77,255)', effect_Data);
        }
    }

    showAnimation(effect_Data, Type) {
        switch (effect_Data.name) {
            case 'Static Color':
                this.AL_EffectModule.mode_Static_Color(effect_Data, Type);
                break;
            case 'Rainbow':
                //this.AL_EffectModule.mode_Rainbow(effect_Data, Type);
                this.AL_EffectModule.mode_Rainbow2(effect_Data, Type);
                break;
            case 'Breathing Color':
                this.AL_EffectModule.mode_Breath_Overall(effect_Data, Type);
                break;
            case 'Breathing Rainbow':
                this.AL_EffectModule.mode_Breathing_Rainbow(effect_Data, Type);
                break;
            case 'Static Colorful':
                this.AL_EffectModule.mode_Static_Colorful(effect_Data, Type);
                break;
            case 'Breathing Colorful':
                this.AL_EffectModule.mode_Breath_Colorful(effect_Data, Type);
                break;
            case 'Wave':
                this.AL_EffectModule.mode_Wave(effect_Data, Type);
                    break;
            case 'Spring':
                this.AL_EffectModule.mode_Spring(effect_Data, Type);
                break;       
            case 'Tail Chasing':
                this.AL_EffectModule.mode_Tail_Chasing(effect_Data, Type);
                break;
            case 'Color Cycle':
                this.AL_EffectModule.mode_Color_Cycle2(effect_Data, Type);
                break;
            case 'Runway':
                this.AL_EffectModule.mode_Runway(effect_Data, Type);
                break;
            case 'Mop up':
                this.AL_EffectModule.mode_Mop_up(effect_Data, Type);
                break;
            case 'Meteor':
                this.AL_EffectModule.mode_Meteor(effect_Data, Type);
                break;
            case 'Meteor Rainbow':
                this.AL_EffectModule.mode_Meteor_Rainbow(effect_Data, Type);
                break;  
            case 'Lottery':
                this.AL_EffectModule.mode_Lottery(effect_Data, Type);
                break;
            case 'Stack':
                this.AL_EffectModule.mode_Stack2(effect_Data, Type);
                break; 
            case 'Pac-Man':
                this.AL_EffectModule.mode_Pac_Man(effect_Data, Type);
                break;   
            case 'tornado':
                this.AL_EffectModule.mode_tornado(effect_Data, Type);
                break;
            case 'Tide':
                this.AL_EffectModule.mode_Tide2(effect_Data, Type);
                break;       
            case 'Taichi':
                this.AL_EffectModule.mode_Taichi(effect_Data, Type);
                break;
            case 'Staggered':
                this.AL_EffectModule.mode_Staggered(effect_Data, Type);
                break;
            case 'Scan': 
                this.AL_EffectModule.mode_Scan2(effect_Data, Type);
                break;
            case 'Scan Sync':
                this.AL_EffectModule.mode_Scan_Sync(effect_Data, Type);
                break;    
            case 'Contest':
                this.AL_EffectModule.mode_Contest(effect_Data, Type);
                break;
            case 'Contest Sync':
                this.AL_EffectModule.mode_Contest_Sync(effect_Data, Type);
                break;
            case 'Spinning Teacups':
                this.AL_EffectModule.mode_Spinning_Teacups(effect_Data, Type);
                break;
            case 'Voice':
                this.AL_EffectModule.mode_Voice2(effect_Data, Type);
                break;
            case 'Mixing':
                this.AL_EffectModule.mode_Mixing2(effect_Data, Type);
                break;
            case 'Warning':
                this.AL_EffectModule.mode_Warning(effect_Data, Type);
                break;
            default:
                console.log('%c startAnimationManager_lost', 'color:rgb(255,0,0);background:blue', effect_Data.name);
                break;
        }
    }
    getNowTypeModeList(){
        return this.gradient.getNowTypeData().modeArray;       
    }
    checkSettingType(){
        return this.gradient.nowEffectListModule;
    }
    stopAnimationAndClear(){
        var effectData=this.gradient.getMode();
        this.AL_EffectModule.stopAnimationAndClear(effectData);
        
    }
    ImportClassData(target){
        var FSADarr = Object.keys(target);
        console.log('FanSetting_ImportClassData:', target);
        for (let index2 = 0; index2 < FSADarr.length; index2++) {
            var fieldString=FSADarr[index2];
            if (fieldString != "gradient" && fieldString!="AL_EffectModule") {
                this[FSADarr[index2]] = target[FSADarr[index2]];
            }
            else {
                switch (fieldString) {
                    case 'gradient':
                        this.gradient.ImportClassData(target.gradient);
                        break;
                    case 'AL_EffectModule':
                        this.AL_EffectModule.ImportClassData(target.AL_EffectModule);
                        break;
                    default:
                        break;
                }
            }
        }
        //this.checkisSync();
    } 
    setFanMode(index) {
        this.fanMode=index;
        switch (index) {
            case 0:
                this.fanRPMValue=800;
                break;
            case 1:
                this.fanRPMValue=800;
                break;
            case 2:
                this.fanRPMValue = 1570;
                break;
            case 3:
                this.fanRPMValue=1900;
                break;
            case 4:
                this.fanRPMValue=800;
                break;
        }
    }
    // DEFAULT解釋:
    // ※燈效亮度預設:100%
    // ※燈效速度預設:50%
    // ※所有燈效預設顏色，均參考AI檔案配色以及作動方式
    // ※燈效方向預設:左
    // ※風扇速度不做更動
    setLEDVarDefault() {
        if(this.gradient.getMode().isSync){
        this.gradient.setLEDMode('Rainbow'); 
        }
        this.gradient.getMode().setLEDVarDefault();
        //this.isSync=false;
        //this.gradient.setAllVarDefault(); 
    }
    




}










