import { ColorModule } from '../Model/ColorModule';
export class ModeParameter {

    LEDConcatenation: any = [true,true,false,false];
    syncConcatenation:any=[0,0,0,0];
    repeatTime = 1000;
    speed: any = 3; // step
    bright: any = 4;//step
    direction: any = 1;//左1又2
    name: string;
    chooseGroup: any = 0;
    loopCount=0;
    isSync=false;
    alpha=1;
    colors:any;
    rainbowColors: any = ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
    rainbow7Color(){
        return [[255,0,0,1],[255, 165, 0,1],[255, 255, 0,1],[0, 255, 0 ,1],[0, 127, 255,1],[0, 0, 255,1],[139, 0, 255,1]];
    }
    
    groupAnimationBlock: any = 0;
    colorArrays:any=[
        new ColorModule(),
        new ColorModule(),
        new ColorModule(),
        new ColorModule(),
    ]
    schedule: any = {
        0: [],
        1: [],
        2: [],
        3: [],
    };
    constructor(){
    }
    setConcatenation(index,num){
        if(num==0){
            if(this.syncConcatenation[index]==0){
                this.syncConcatenation[index]=-1;

            }
            else{
                this.syncConcatenation[index]=0;
            }
            return;
        }
        this.syncConcatenation[index]=num;
    }
    ImportArraysData(target) {
        //console.log("ModeParameter_ImportArraysData",target);
        var target = JSON.parse(JSON.stringify(target));
        var dataArrT1 = Object.keys(target);
        for (let i_keys = 0; i_keys < dataArrT1.length; i_keys++) {
            if (dataArrT1[i_keys] != "colorArrays") {
                this[dataArrT1[i_keys]] = target[dataArrT1[i_keys]];
            }
            else{
                this.ImportColorArraysData(target[dataArrT1[i_keys]]);
            }
        }
        
    }




    ImportColorArraysData(target) {
    //console.log("ImportColorArraysData",target);
    var target = JSON.parse(JSON.stringify(target));
    var dataArrT1 = Object.keys(target);

        for (let i_ca = 0; i_ca < this.colorArrays.length; i_ca++) {

            this.colorArrays[i_ca].ImportClassData(target[i_ca]);
        }
    }
    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    };

}
