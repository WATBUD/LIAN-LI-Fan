// 2.	燈光模式(下拉式選單) 
// -純色(單色) Static=Static =>Complete
// -呼吸(單色) Breathing=Breathing =>Complete
// -彩虹(預設) Rainbow=Rainbow =>Complete
// -漸變彩虹 Color_cycle=Color_cycle =>Complete
// -跑道燈(雙色) Runway=Track   =>Complete //Note-Sync
// -交錯(雙色) Staggered=Staggered  =>Complete
// -混色 Mixing=Mixing   =>Complete //Note-Sync
// -流星(雙色) Meteor=Comet  56 
// -煙火(雙色) Firework=Firework
// 堆疊 STACKED=STACKED =>Complete
// 多色堆疊 Stack Multi Color=StackMultiColor 
// Neon 霓虹色 
import { ColorModule } from '../Model/ColorModule';
import { ModeParameter } from './ModeParameter';
import { AL_OverAll_List } from './AL_OverAll_List';
import { AL_Outer_List } from './AL_Outer_List';
import { AL_Inner_List } from './AL_Inner_List';
export var stopVar:any = [];
var effectBlockClass4=["fanEffectBlock0","fanEffectBlock1","fanEffectBlock2","fanEffectBlock3"];  
export class AL_CircleEffectManager {
        //SPEED BRIGHTNESS DIRECTION
    onPlay: any = false;
    nowEffectListModule="OverAll";
    //backup=['Inner','Outer','OverAll'];
    effectModuleArray=[new AL_Inner_List(),new AL_Outer_List(),new AL_OverAll_List()];
    constructor(name = "") {
    }
    ImportClassData(target) {
        //console.log('LinearGradient_ImportClassData:',JSON.parse(JSON.stringify(target)));
        var target = JSON.parse(JSON.stringify(target));
        var dataArrT1 = Object.keys(target);
        for (let index2 = 0; index2 < dataArrT1.length; index2++) {
            if (dataArrT1[index2].indexOf('effectModuleArray')== -1) {
                //console.log('LinearGradient_dataArr[index2]:', dataArr[index2]);
                this[dataArrT1[index2]] = target[dataArrT1[index2]];
            }
            else {
                for (let i_NMA_class = 0; i_NMA_class < target.effectModuleArray.length; i_NMA_class++) {
                    this.effectModuleArray[i_NMA_class].ImportClassData(target.effectModuleArray[i_NMA_class]);
                }
            }
        }
    }
    ApplyModuleSetting(i){
        var target = JSON.parse(JSON.stringify(target));
        var dataArrT1 = Object.keys(target);
        for (let index2 = 0; index2 < dataArrT1.length; index2++) {
            if (dataArrT1[index2].indexOf('effectModuleArray')== -1) {
                //console.log('LinearGradient_dataArr[index2]:', dataArr[index2]);
                this[dataArrT1[index2]] = target[dataArrT1[index2]];
            }
            else {
                for (let i_NMA_class = 0; i_NMA_class < target.effectModuleArray.length; i_NMA_class++) {
                    this.effectModuleArray[i_NMA_class].ImportClassData(target.effectModuleArray[i_NMA_class]);
                }
            }
        }
    }



    setAnimationData(){
        this.onPlay = true;
        //this.getMode().repeatTime=300-((this.getMode().speed+1)*50); 
        this.getMode().scheduleCreateData();
        //console.log("setAnimationData_getMode",this.getMode());
    }
    setAllVarDefault(){
        for (let index = 0; index < this.effectModuleArray.length; index++) {
            const element =this.effectModuleArray[index];  
            element.getMode().setLEDVarDefault();
        }
    }

    setLEDMode(name){
        this.getNowTypeData().setMode(name);
        //this.checkisSync();
    }

    getMode() {
        return this.getNowTypeData().getMode();
    }
    getNowTypeData() {
        var returnData;
        switch (this.nowEffectListModule) {
            case 'Inner':
                returnData = this.effectModuleArray[0];
                break;
            case 'Outer':
                returnData = this.effectModuleArray[1];                
                break;
            case 'OverAll':
                returnData = this.effectModuleArray[2];
                    break;    
            default:
                returnData = this.effectModuleArray[2];
                break;
        }
        return returnData;
    }

    setAssignTypeModuleData(data) {
        var returnData;
        switch (data.nowEffectListModule) {
            case 'Inner':
                returnData = this.effectModuleArray[0];
                break;
            case 'Outer':
                returnData = this.effectModuleArray[1];                
                break;
            case 'OverAll':
                returnData = this.effectModuleArray[2];
                    break;    
            default:
                returnData = this.effectModuleArray[2];
                break;
        }
        this.nowEffectListModule=data.nowEffectListModule;
        returnData.ImportClassData(data.getNowTypeData());

        //return returnData;
    }



    getAllTypeName(){
        var temp=[];
        for (let index = 0; index < 3; index++) {
            temp.push(this.effectModuleArray[index].modeindexTranslate);
        }
        return temp;
    }



}
