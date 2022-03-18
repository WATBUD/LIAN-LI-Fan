import { ColorModule }  from '../Model/ColorModule';
import { LinearGradient } from './LinearGradient';
export class FanSetting {
    fanMode = 0;
    fanRPMValue = 800;
    //isSync=false;
    gradient=new LinearGradient("fanGroupTrapezoid0");
    constructor(LGTarget="") {
        if(LGTarget!=""){
            this.gradient.elementsName=LGTarget;
        }
    }
     
    
    ImportClassData(target){
        var FSADarr = Object.keys(target);
        console.log('FanSetting_ImportClassData:', target);
        for (let index2 = 0; index2 < FSADarr.length; index2++) {
            if (FSADarr[index2] != "gradient") {
                this[FSADarr[index2]] = target[FSADarr[index2]];
            }
            else {
                this.gradient.ImportClassData(target.gradient);
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
        this.gradient.gradientMode=0; 
        }
        
        this.gradient.getMode().setLEDVarDefault();
        //this.isSync=false;
        //this.gradient.setAllVarDefault(); 
    }
    setLEDMode(index){
        this.gradient.gradientMode=index;
        //this.checkisSync();
    }

}










