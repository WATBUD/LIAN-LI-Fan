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
export var stopVar:any = [];
export class ModeParameter {
    LEDConcatenation: any = [true,true,false,false];
    syncConcatenation:any=[0,0,0,0];
    repeatTime = 1000;
    speed: any = 3; // step
    bright: any = 4;//step
    direction: any =2;//左1又2
    name: string;
    chooseGroup: any = 0;
    loopCount=0;
    isSync=false;
    alpha=1;
    colors:any;
    rainbowColors: any = ['#FF0000', '#FF7D00'
    ,'#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
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

}
var effectBlockClass4=["fanGroupTrapezoid0","fanGroupTrapezoid1","fanGroupTrapezoid2","fanGroupTrapezoid3"];  
export class LinearGradient {
        //SPEED BRIGHTNESS DIRECTION
    onPlay: any = false;
    NowGroupNumber: any = 4;
    gradientMode: any = 0;
    NowModeArray: any = [new Rainbow,new StaticColor,new Breathing,new ColorCycle,
        new Runway,new RunwaySync,new Staggered,new Mixing,new Meteor,new MeteorSync,
        new Firework,new Stack,new StackMultiColor,new Neon];
    elementsName: any = "";
    ImportClassData(target) {
        //console.log('LinearGradient_ImportClassData:',JSON.parse(JSON.stringify(target)));
        var target = JSON.parse(JSON.stringify(target));
        var dataArrT1 = Object.keys(target);
        for (let index2 = 0; index2 < dataArrT1.length; index2++) {
            if (dataArrT1[index2] != "NowModeArray") {
                //console.log('LinearGradient_dataArr[index2]:', dataArr[index2]);
                this[dataArrT1[index2]] = target[dataArrT1[index2]];
            }
            else if (dataArrT1[index2] == "NowModeArray") {
                for (let i_NMA_class = 0; i_NMA_class < target.NowModeArray.length; i_NMA_class++) {
                    this.NowModeArray[i_NMA_class].ImportArraysData(target.NowModeArray[i_NMA_class]);
                }
            }
        }
    }
    updateLanguage(arr){
        for (let index = 0; index < this.NowModeArray.length; index++) {
            var element = this.NowModeArray[index];
            element.name=arr[index];
        }
        
    }

    playAnimation(){
        this.stopAnimationAndClear();
        this.switchModeAndRun(this.gradientMode);
    }

    constructor(name = "") {
        this.elementsName = name;         
    }

    setAllVarDefault(){
        for (let index = 0; index < this.NowModeArray.length; index++) {
            const element =this.NowModeArray[index];  
            element.setLEDVarDefault();
        }
    }
    stopAnimation() {
        this.onPlay = false;
        clearInterval(stopVar[this.elementsName]);
    }
    switchModeAndRun(index) {
        this.gradientMode=index;
        this.runNowGradient();
    }
    switchGroupNumber(index) {
        this.NowGroupNumber = index;
        this.runNowGradient();
    }
    stopAnimationAndClear() {
        this.onPlay = false;
        var ElementClass4=[]
        if(this.getMode().isSync){
            ElementClass4=effectBlockClass4;  
        }
        else{
            ElementClass4=[this.elementsName];
        }
        for (let index = 0; index < ElementClass4.length; index++) {
            var FGTArr = document.getElementsByClassName(ElementClass4[index]) as HTMLCollectionOf<HTMLElement>;
            for (let i2 = 0; i2 < FGTArr.length; i2++) {
                const element = FGTArr[i2];
                element.style.background = "Black";
            }
            clearInterval(stopVar[ElementClass4[index]]);
      
        }         
     
    }
    runNowGradient() {//跑現在模式根據風扇數的動畫
        this.onPlay = true;
        this.getMode().repeatTime=300-((this.getMode().speed+1)*50); 
        console.log("runNowGradient",this.getMode().name,"elementsName="+this.elementsName);

        switch (this.NowGroupNumber) {
            case 1:
                this.getMode().startAllFanGradient_1(this.elementsName);
                break;
            case 2:
                this.getMode().startAllFanGradient_2(this.elementsName);
                break;
            case 3:
                this.getMode().startAllFanGradient_3(this.elementsName);
                break;
            case 4:
                this.getMode().startAllFanGradient_4(this.elementsName);

                break;
        }
    }

    getModeName(){
        var T=this.NowModeArray[this.gradientMode].name;
        //console.log("getModeName",T);

        return T;
    }
    getMode() {
        return this.NowModeArray[this.gradientMode];
    }
    getModeSpeed() {
        return this.NowModeArray[this.gradientMode].speed;
    }
    getSBDShowList(){
        var arr=this.NowModeArray[this.gradientMode].showSPBTable;
        //console.log("getSBDShowList",arr);
        return arr;
    }
    getColorUIVisible(){
        var arr=this.NowModeArray[this.gradientMode].colorVisibleNum;
        //console.log("getColorUIVisible",this.arr);
        return arr;
    }

   // setColorUIVisible() {
        //console.log('setColorUIVisible',this.colorVisibleNum;
        //this.cdr.detectChanges();//Invoke chang)e detection explicitly then Angular will update the DOM immediately.
    

}


export class Firework extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    max=0;
    rainbowCounts=0;
    counts: any = [0,0,0,0];
    step=0;
    colorMixingHex:any="";
    constructor(){
        super();
        this.colors=['#FF0000','#0000FF'];
        this.name="Firework";
        this.setLEDVarDefault();
    }


    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.direction = 1;
        this.colorArrays[1].SetHex('#FF0000');
        this.colorArrays[0].SetHex('#0000FF');
        
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
        this.colorMixingHex=this.colorArrays[0].colorMixing(this.colors[0],this.colors[1]);
        //var max = 0;

        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64;
                break;
        }
        var T = [];
        for (let index = 0; index < this.max; index++) {
            T.push("#000000");
        }

        this.schedule[GroupNumber-1] = T;
        this.countReset();

    }


    countReset(){
        this.rainbowCounts=0;
        this.counts[0]=0;
        this.counts[1]=this.max-1;
        this.counts[2]=this.max/2-1;
        this.counts[3]=this.max/2;

    }
    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.modeDisplacement(this.schedule[0]);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);

        }, this.repeatTime);
        //let t=randArr(colorarray);
        // function randArr(arr) {
        //     for (var i = 0; i < arr.length; i++) {
        //         var iRand = parseInt(arr.length * Math.random());
        //         var temp = arr[i];
        //         arr[i] = arr[iRand];
        //         arr[iRand] = temp;
        //     }
        //     //console.log('randArr',arr);
        //     return arr;
        // }
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[1] = this.modeDisplacement(this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.modeDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.modeDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    modeDisplacement(Arr) {

        if (this.step == 0) {
            if (this.counts[0] < (Arr.length / 2) + 3) {
                if (this.counts[0] < 31) {
                    Arr[this.counts[0]] = this.colors[0];
                    Arr[this.counts[1]] = this.colors[1];
                }
                if (this.counts[0] > 3) {
                    Arr[this.counts[0] - 4] = "#000000";
                    Arr[this.counts[1] + 4] = "#000000";
                }
                console.log('modeDisplacement', "this.counts[0]=" + this.counts);
                this.counts[0] += 1;
                this.counts[1] -= 1;
            }
            else {
                this.countReset();
                this.step = 1;
            }
        }
        else if (this.step == 1) {
            if (this.counts[2] >= 2) {
                Arr[this.counts[2] - 2] = this.colorMixingHex;
                Arr[this.counts[2] - 1] = this.colorMixingHex;
                Arr[this.counts[2]] = this.colorMixingHex;
                Arr[this.counts[3]] = this.colorMixingHex;
                Arr[this.counts[3] + 1] = this.colorMixingHex;
                Arr[this.counts[3] + 2] = this.colorMixingHex;           
                var tempcolor =  Arr[this.counts[2]];
                Arr[this.counts[2]] = Arr[this.counts[3]];
                Arr[this.counts[3]] = tempcolor;
                this.counts[2] -= 2;
                this.counts[3] += 2;
            }
            else {
                this.countReset();
                this.step = 2;
            }
        }
        else if (this.step == 2) {
            if (this.counts[2] >= 2) {
                Arr[this.counts[2] - 2] = "#000000";
                Arr[this.counts[2] - 1] = "#000000";
                Arr[this.counts[2]] = "#000000";
                Arr[this.counts[3]] = "#000000";
                Arr[this.counts[3] + 1] = "#000000";
                Arr[this.counts[3] + 2] = "#000000";
                this.counts[2] -= 2;
                this.counts[3] += 2;
            }
            else {
                this.countReset();
                this.step = 0;
                // var tempcolor = this.colors[0];
                // this.colors[0] = this.colors[1];
                // this.colors[1] = tempcolor;
            }
        }

        return Arr;
    }



    


}



export class Neon  extends ModeParameter{
       
    showSPBTable:any=[true, true, false];
    colorVisibleNum=0;
    targetMax=64;
    graduallyArr=[[2,3,4,5,6,7,8,9,10,11,12,13,14,15],[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],[49,50,51,52,53,54,55,56,57,58,59,60,61]];
    rainbowColors123: any =
        [['#FF0000', '#FF7D00', '#FFFF00', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF', '#FFFFFF'],
            ['#FF7D00', '#FFFF00', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF', '#FFFFFF', '#FF0000'],
            ['#FFFF00', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF', '#FFFFFF', '#FF0000', '#FF7D00']
        ]
    max: any = 0;
    directionSwitch=false;
    constructor() {
        super();
        this.name = "Neon";
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.direction = 1;
        this.loopCount=0;
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        switch (this.speed) {
            case 0:
                this.repeatTime = 700;//by Neon
                break;
            case 1:
                this.repeatTime = 420;
                break;
            case 2:
                this.repeatTime = 336;
                break; 
            case 3:
                this.repeatTime = 252;
                break;
            case 4:
                this.repeatTime = 168;
                    break;   
         
        }
        var T = [];
        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64;
                break;
        }

        for (let index = 0; index < this.max; index++) {
            T.push("#000000");////第2種地板顏色
        }
        this.targetMax=this.max;
        this.schedule[GroupNumber - 1] = T;
    }

    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.loopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.loopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.loopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {

        //var start = Arr[Arr.length - 1];//24
        for (let index = 0; index < this.graduallyArr.length; index++) {
            const element = this.graduallyArr[index];
            for (let i2 = 0; i2 < element.length; i2++) {
                Arr[element[i2]]= this.rainbowColors123[index][this.loopCount];          
            }
        }
        this.loopCount < 7 ? this.loopCount += 1 : this.loopCount = 0;
        return Arr;
    }



}
export class Meteor extends ModeParameter{   
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    targetMax=64;
    max: any = 0;
    directionSwitch=false;
    constructor() {
        super();
        this.colors=["#FF0000", "#0000FF"];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.name = "Meteor";
        this.setLEDVarDefault();   
    } 
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.colorArrays[1].SetHex("#FF0000");
        this.colorArrays[0].SetHex("#0000FF");
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }    
    scheduleCreateData(GroupNumber) {
        this.groupAnimationBlock=GroupNumber-1;
        this.directionSwitch=false;
        this.loopCount=0;
        switch (this.speed) {
            case 0:
                this.repeatTime = 120;//by Meteor
                break;
            case 1:
                this.repeatTime = 80;
                break;
            case 2:
                this.repeatTime = 40;
                break; 
            case 3:
                this.repeatTime = 20;
                break;
            case 4:
                this.repeatTime = 9.6;
                    break;   
         
        }
        //this.repeatTime=200-((this.speed+1)*30); 
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;
        }
 
        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64;
                break;
        }
        var T = [];
        for (let index = 0; index < this.max; index++) {
            T.push("#000000");//第2種地板顏色
        }
        for (let index = 0; index < 5; index++) {
            T.push(this.colors[0]);//第2種地板顏色
        }
        for (let index = 0; index < 5; index++) {
            T.push("#000000");//第2種地板顏色
        }
        this.targetMax=this.max;
        this.schedule[this.groupAnimationBlock] = T;
    }

    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.loopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.loopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.loopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {
        //console.log("Meteor轉向紀錄位置",this.loopCount)
        //this.directionSwitch?finalTimes=74:finalTimes=79;
        if (this.directionSwitch==false) {
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                //console.log("Runway_index",index)
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                    
                }
                else {
                    //console.log("Meteor_正最後", Arr[0], start)
                    Arr[0] = start;
                }
            }
        }
        else if (this.directionSwitch==true) {//反向陣列
            var Oringin = Arr[0];
            for (let index = 0; index < Arr.length; index++) {
                if (index < Arr.length - 1) {
                    var Temp = Arr[index + 1];
                    Arr[index] = Temp;
                }
                else {
                    Arr[index] = Oringin;
                }
            }
        }
        this.loopCount+=1;
        //var finalTimes=79;
        if (this.loopCount >78) {
            this.directionSwitch = !this.directionSwitch;
            this.loopCount = 0;
            for (let index = 0; index < Arr.length; index++) {
                console.log("Meteor轉向後",Arr ,this.colors);
                if (Arr[index] == this.colors[0]) {
                    Arr[index]= this.colors[1].toString();
                }
                else if (Arr[index] == this.colors[1]) {
                    Arr[index] = this.colors[0].toString();
                }
            }

        }

 
        return Arr;
    }



}
export class MeteorSync extends ModeParameter{   
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    targetMax=64;
    max: any = 0;
    directionSwitch=false;
    constructor() {
        super();
        this.name = "MeteorSync";
        this.colors= ["#FF0000", "#0000FF"];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.setLEDVarDefault();   
    } 
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.isSync=true;
        this.colorArrays[1].SetHex("#FF0000");
        this.colorArrays[0].SetHex("#0000FF");
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] =2;
        }
    }    
    scheduleCreateData(GroupNumber) {
        this.groupAnimationBlock=GroupNumber-1;
        this.directionSwitch=false;
        this.loopCount=0;
        switch (this.speed) {
            case 0:
                this.repeatTime = 120;//by MeteorSync
                break;
            case 1:
                this.repeatTime = 80;
                break;
            case 2:
                this.repeatTime = 40;
                break; 
            case 3:
                this.repeatTime = 20;
                break;
            case 4:
                this.repeatTime = 9.6;
                    break;   
         
        }
        //this.repeatTime=200-((this.speed+1)*30); 
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;
        }
 
        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64*4;
                break;
        }
        var T = [];
        for (let index = 0; index < this.max; index++) {
            T.push("#000000");//第2種地板顏色
        }
        for (let index = 0; index < 5; index++) {
            T.push(this.colors[0]);//第2種地板顏色
        }
        for (let index = 0; index < 5*4; index++) {
            T.push("#000000");//第2種地板顏色
        }
        this.targetMax=this.max;
        this.schedule[this.groupAnimationBlock] = T;
    }

    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        var FGTArr4Sync=[];
            var ElementClass4=effectBlockClass4;
            for (let index = 0; index < ElementClass4.length; index++) {
                var FGTArr = document.getElementsByClassName(ElementClass4[index]) as HTMLCollectionOf<HTMLElement>;
                for (let index = 0; index < FGTArr.length; index++) {
                    if (index<4) {
                    FGTArr4Sync=FGTArr4Sync.concat(FGTArr[index]);
                    FGTArr4Sync=FGTArr4Sync.concat(FGTArr[index+4]);
                    }
                }     
            }
        console.log('%cMeteorSync_FGTArr4Sync','background: blue; color: red',FGTArr4Sync);

        stopVar[ElementClass] = setInterval(() => {
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);  
            for (let index = 0; index < FGTArr4Sync.length; index++) {  
                //const element = FGTArr[index];
                //FGTArr4Sync=FGTArr4Sync.concat(element);
                if (index % 2 ==0) {
                    //console.log('%cMeteorSync_FGTArr4Sync','background: blue; color: red',index * 16,(index + 1) * 16);
                    FGTArr4Sync[index].style.background = this.getLinearGradientText(this.schedule[3], index/2 * 16, (index/2 + 1) * 16);
                    FGTArr4Sync[index + 1].style.background = this.getLinearGradientText(this.schedule[3], index/2 * 16, (index/2 + 1) * 16);
                }
            }
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {
        //console.log("Meteor轉向紀錄位置",this.loopCount)
 

        if (this.directionSwitch==false) {
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                //console.log("Runway_index",index)
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                    
                }
                else {
                    //console.log("Meteor_正最後", Arr[0], start)
                    Arr[0] = start;
                }
            }
        }
        else if (this.directionSwitch==true) {//反向陣列
            var Oringin = Arr[0];
            for (let index = 0; index < Arr.length; index++) {
                if (index < Arr.length - 1) {
                    var Temp = Arr[index + 1];
                    Arr[index] = Temp;
                }
                else {
                    Arr[index] = Oringin;
                }
            }
        }
        this.loopCount+=1;
        var finalTimes=256+29;
        if (this.loopCount >finalTimes) {
            this.directionSwitch = !this.directionSwitch;
            this.loopCount = 0;
            for (let index = 0; index < Arr.length; index++) {
                console.log("Meteor轉向後",Arr ,this.colors);
                if (Arr[index] == this.colors[0]) {
                    Arr[index]= this.colors[1].toString();
                }
                else if (Arr[index] == this.colors[1]) {
                    Arr[index] = this.colors[0].toString();
                }
            }

        }

 
        return Arr;
    }



}

function toCssRGB(RGBA = [0, 0, 0, 0]) {
    return 'rgb(' + RGBA[0] + ',' + RGBA[1] + ',' + RGBA[2] + ',' + RGBA[3] + ')';
}
var modeDefaultColor = [
    [0, 0, 255,1],[255, 0, 0,1], [0, 255, 0,1],[255, 255, 0,1]
];     
export class StaticColor extends ModeParameter{
    showSPBTable:any=[false, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Static Color";
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction = 1;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }  

    scheduleCreateData(GroupNumber) {
        var T=[];
        for (let index = 0; index < 64; index++) {
            var compareValue=Math.trunc(index/16);
            T.push(toCssRGB(this.colorArrays[compareValue].getRGBA()));
        }
        this.schedule[0] = T;
        this.schedule[1] = T;
        this.schedule[2] = T;
        this.schedule[3] = T;
    }
    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
        }, this.repeatTime);
        //let t=randArr(colorarray);
        // function randArr(arr) {
        //     for (var i = 0; i < arr.length; i++) {
        //         var iRand = parseInt(arr.length * Math.random());
        //         var temp = arr[i];
        //         arr[i] = arr[iRand];
        //         arr[iRand] = temp;
        //     }
        //     //console.log('randArr',arr);
        //     return arr;
        // }
        
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);
    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        console.log("startAllFanGradient4", ElementClass);

        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
        console.log('this.schedule[3]', this.schedule[3]);

    }
    

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
}
export class ColorCycle extends ModeParameter{
    showSPBTable:any=[true, true, true];
    colorVisibleNum=3;
    constructor(){
        super();
        this.name="Color Cycle";
        this.colors= ['#FF0000', '#00FF00', '#0000FF'];// 16,32,48,64
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.colorArrays[0].SetHex("#FF0000");
        this.colorArrays[1].SetHex("#00FF00");
        this.colorArrays[2].SetHex("#0000FF");
        this.bright = 3;
        this.speed = 2;
        this.direction = 1;
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
        
    }

    scheduleCreateData(GroupNumber) {
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;
        }
        var gap = 0;
        switch (GroupNumber) {
            case 1:
                gap = 4;
                break;
            case 2:
                gap = 8;
                break;
            case 3:
                gap = 12;
                break;
            case 4:
                gap = 16;
                break;
        }
        var T = [];
        for (let total = 0; total < 3; total++) {
            for (let index = 0; index < gap; index++) {
                T.push(this.colors[total]);
            }

            for (let index = 0; index < gap; index++) {
                T.push('#000000');
            }

        }
        switch (gap) {
            case 4:
                this.schedule[0] = T;
                break;
            case 8:
                this.schedule[1] = T;

                break;
            case 12:
                this.schedule[2] = T;

                break;
            case 16:
                this.schedule[3] = T;
                break;
        }
        console.log('LinearGradient_schedule', "gap=" + gap, T);
        

    }


    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.LoopArrDisplacement(this.schedule[0]);


            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);
            console.log("getLinearGradientText", this.getLinearGradientText(this.schedule[0], 0, 16));

        }, this.repeatTime);
        //let t=randArr(colorarray);
        // function randArr(arr) {
        //     for (var i = 0; i < arr.length; i++) {
        //         var iRand = parseInt(arr.length * Math.random());
        //         var temp = arr[i];
        //         arr[i] = arr[iRand];
        //         arr[iRand] = temp;
        //     }
        //     //console.log('randArr',arr);
        //     return arr;
        // }
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[1] = this.LoopArrDisplacement(this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.LoopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        this.schedule[3]=this.direction==2?this.schedule[3]:this.schedule[3].reverse();
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.LoopArrDisplacement(this.schedule[3]);
            if(this.direction==2){
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            } 
            else if(this.direction==1){
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 80, 96);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 80, 96);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 64, 80);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 64, 80);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            }
        }, this.repeatTime);
    }

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient("+"left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    LoopArrDisplacement(Arr) {

        if (this.direction == 2) {
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                //console.log("Runway_index",index)
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                }
                else {
                    //console.log("Runway_正最後", Arr[0], start)
                    Arr[0] = start;
                }
            }
        }
        else if (this.direction == 1) {//反向陣列
            var Oringin = Arr[0];
            for (let index = 0; index < Arr.length; index++) {
                if (index < Arr.length - 1) {
                    var Temp = Arr[index + 1];
                    Arr[index] = Temp;
                }
                else {
                    Arr[index] = Oringin;
                }
            }
        }
        return Arr;
    }



}
export class Breathing extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=4;
    nowAlpga=1;
    BreathSwitch=false;
    tempColors=[]
    constructor(){
        super();
        this.name="Breathing";
        this.colors=['#FF0000','#FF0000','#FF0000','#FF0000'];// 16,32,48,64
        this.setLEDVarDefault();
    }

    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.nowAlpga=1;
        this.direction = 1;
        this.BreathSwitch=false;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
    }
    scheduleCreateData(GroupNumber) {
        this.tempColors=[];
        switch (this.speed) {
            case 0:
                this.repeatTime = 65;//by Breathing
                break;
            case 1:
                this.repeatTime = 45;
                break;
            case 2:
                this.repeatTime = 35;
                break; 
            case 3:
                this.repeatTime = 25;
                break;
            case 4:
                this.repeatTime = 10;
                    break;   
         
        }
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;        
            this.tempColors.push(this.hexToRgb(this.colors[index]));   
        }
        var T=[];
        for (let index = 0; index < 64; index++) {
            var compareValue=Math.trunc(index/16);
            T.push(toCssRGB(this.colorArrays[compareValue].getRGBA()));
        }
        this.schedule[0] = T;
        this.schedule[1] = T;
        this.schedule[2] = T;
        this.schedule[3] = T;
        console.log('%c this.colors','background: yellow; color: red',this.tempColors);  
    }
    hexToRgb(InputData) {
        //console.log("hexToRgbInputData",InputData);
        try {
    
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(InputData);
            //console.log("hexToRgbResult", [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ]);
            return result ?              
            // {
            //     r: parseInt(result[1], 16),
            //     g: parseInt(result[2], 16),
            //     b: parseInt(result[3], 16)
            // } 
            [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ]
            : null;
        }
        catch{
            return 1;
        }
    }


    CalculationAlpha(){

        if (this.BreathSwitch==false) {
            this.nowAlpga-=0.01;
            if(this.nowAlpga<=0){
                this.BreathSwitch=true;
            }

        }   
        else if (this.BreathSwitch) {
            this.nowAlpga += 0.01;
            if (this.nowAlpga >= 1) {
                this.BreathSwitch = false;
            }
        }
        //console.log('%c this.colors','background: yellow; color: red',this.schedule[3]);  
        var tempArr=[];
        for (let index = 0; index < 64; index++) {
            var compareValue=Math.trunc(index/16);
            var T_color=this.colorArrays[compareValue].getRGBA();
            T_color[3]=this.nowAlpga;
            tempArr.push(toCssRGB(T_color));
        }
        this.schedule[3]=tempArr;
        // for (let index = 0; index < 64; index++) {
        //     var compareValue=Math.trunc(index/16);
        //     var colors=this.tempColors[compareValue];
        //     this.schedule[3][index] = "rgba(" + colors[0] + "," + colors[1] + "," + colors[2] + "," + this.nowAlpga + ")";
        // }      
       

    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            this.CalculationAlpha();
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
}
export class Runway extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    directionSwitch=false;
    constructor(){
        super();
        this.name="Runway";
        this.colors= ['#ff0000', 'blue'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.direction = 1;
        this.colorArrays[0].SetHex("#ff0000");
        this.colorArrays[1].SetHex("#0000FF");//blue
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
        this.loopCount=0;
        var T = [];
        var max = 0;

        switch (this.speed) {
            case 0:
                this.repeatTime = 150;
                break;
            case 1:
                this.repeatTime = 120;
                break;
            case 2:
                this.repeatTime = 105;
                break; 
            case 3:
                this.repeatTime = 80;
                break;
            case 4:
                this.repeatTime = 40;
                    break;   
        }
        switch (GroupNumber) {
            case 1:
                max = 16;
                break;
            case 2:
                max = 32;
                break;
            case 3:
                max = 48;
                break;
            case 4:
                max = 64;
                break;
        }
        if (GroupNumber <= 2) {
            for (let index = 0; index < max; index++) {
                T.push(this.colors[0]);////第2種地板顏色
            }
            for (let index = 0; index < 3; index++) {
                T.push(this.colors[1]);//地板顏色
            }
            for (let index = 0; index < 5; index++) {
                T.push(this.colors[0]);////第2種地板顏色
            }
        }
        if (GroupNumber > 2) {
            for (let index = 0; index < max; index++) {
                T.push(this.colors[1]);////第2種地板顏色
            }
            for (let index = 0; index < 5; index++) {
                T.push(this.colors[0]);//地板顏色
            }
            for (let index = 0; index < 3; index++) {
                T.push(this.colors[1]);////第2種地板顏色
            }
        }
        
        this.schedule[GroupNumber-1] = T;
    }
    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.LoopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            //console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.LoopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.LoopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.LoopArrDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            console.log(this.repeatTime);
        }, this.repeatTime);
     
    }

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    LoopArrDisplacement(Arr) {
        //console.log("Runway_LoopArrDisplacement", this.loopCount);
        if(this.loopCount==Arr.length){
            this.loopCount=0;
            this.directionSwitch=!this.directionSwitch;

        }
        else if(this.loopCount < Arr.length){
            this.loopCount+=1;
        }
        
        if (this.directionSwitch == false) {//正向陣列
            //console.log("Runway_正",Arr)
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                //console.log("Runway_index",index)
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                }
                else {
                    //console.log("Runway_正最後",Arr[0] ,start)
                    Arr[0] = start;
                }
            }
        }
        else if (this.directionSwitch == true) {//反向陣列
            //console.log("Runway_final",Arr);
            var Oringin = Arr[0];
            for (let index = 0; index < Arr.length; index++) {
                if (index < Arr.length - 1) {
                    var Temp = Arr[index + 1];
                    Arr[index] = Temp;
                }
                else {
                    Arr[index] = Oringin;
                }
            }
            //var Arr=$.extend(true, {}, Arr);


        }
        return Arr;
    }



}


export class RunwaySync extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="RunwaySync";
        this.colors= ['#ff0000', 'blue'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.isSync=true;
        this.direction = 2;
        this.loopCount=0;
        this.colorArrays[0].SetHex("#ff0000");
        this.colorArrays[1].SetHex("#0000FF");//blue
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        this.direction=2;
        switch (this.speed) {
            case 0:
                this.repeatTime = 100;//by RunwaySync
                break;
            case 1:
                this.repeatTime = 75;
                break;
            case 2:
                this.repeatTime = 50;
                break; 
            case 3:
                this.repeatTime = 40;
                break;
            case 4:
                this.repeatTime = 25;
                    break;   
         
        }
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
        var T = [];
        var max = 0;
        switch (GroupNumber) {
            case 1:
                max = 16;
                break;
            case 2:
                max = 32;
                break;
            case 3:
                max = 48;
                break;
            case 4:
                max = 64*4;
                break;
        }
        if (GroupNumber <= 2) {
            for (let index = 0; index < max; index++) {
                T.push(this.colors[0]);////第2種地板顏色
            }
            for (let index = 0; index < 3; index++) {
                T.push(this.colors[1]);//地板顏色
            }
            for (let index = 0; index < 5; index++) {
                T.push(this.colors[0]);////第2種地板顏色
            }
        }
        if (GroupNumber > 2) {
            for (let index = 0; index < max; index++) {
                T.push(this.colors[1]);////第2種地板顏色
            }
            for (let index = 0; index < 5; index++) {
                T.push(this.colors[0]);//地板顏色
            }
            for (let index = 0; index < 3; index++) {
                T.push(this.colors[1]);////第2種地板顏色
            }
        }
        
        this.schedule[GroupNumber-1] = T;
    }

    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        var FGTArr4Sync=[];
            var ElementClass4=effectBlockClass4
            ;
            for (let index = 0; index < ElementClass4.length; index++) {
                var FGTArr = document.getElementsByClassName(ElementClass4[index]) as HTMLCollectionOf<HTMLElement>;
                for (let index = 0; index < FGTArr.length; index++) {
                    if (index<4) {
                    FGTArr4Sync=FGTArr4Sync.concat(FGTArr[index]);
                    FGTArr4Sync=FGTArr4Sync.concat(FGTArr[index+4]);
                    }
                }     
            }
        console.log('%cMeteorSync_FGTArr4Sync','background: blue; color: red',FGTArr4Sync);

        stopVar[ElementClass] = setInterval(() => {
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);  
            for (let index = 0; index < FGTArr4Sync.length; index++) {  
                //const element = FGTArr[index];
                //FGTArr4Sync=FGTArr4Sync.concat(element);
                if (index % 2 ==0) {
                    //console.log('%cMeteorSync_FGTArr4Sync','background: blue; color: red',index * 16,(index + 1) * 16);
                    FGTArr4Sync[index].style.background = this.getLinearGradientText(this.schedule[3], index/2 * 16, (index/2 + 1) * 16);
                    FGTArr4Sync[index + 1].style.background = this.getLinearGradientText(this.schedule[3], index/2 * 16, (index/2 + 1) * 16);
                }
            }
        }, this.repeatTime);
    }

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {
        //console.log("Runway_LoopArrDisplacement", this.loopCount);
        if(this.loopCount==Arr.length){
            this.loopCount=0;
            this.direction=this.direction==1?2:1;

        }
        else if(this.loopCount < Arr.length){
            this.loopCount+=1;
        }
        
        if (this.direction == 2) {//正向陣列
            //console.log("Runway_正",Arr)
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                //console.log("Runway_index",index)
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                }
                else {
                    console.log("Runway_正最後",Arr[0] ,start)
                    Arr[0] = start;
                }
            }
        }
        else if (this.direction == 1) {//反向陣列
            //console.log("Runway_final",Arr);
            var Oringin = Arr[0];
            for (let index = 0; index < Arr.length; index++) {
                if (index < Arr.length - 1) {
                    var Temp = Arr[index + 1];
                    Arr[index] = Temp;
                }
                else {
                    Arr[index] = Oringin;
                }
            }
            //var Arr=$.extend(true, {}, Arr);


        }
        return Arr;
    }



}


export class Rainbow extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=0;
    constructor(){
        super();
        this.name="Rainbow";
        this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=1;
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 0;
        switch (this.speed) {
            case 0:
                this.repeatTime = 1000;//by Rainbow
                break;
            case 1:
                this.repeatTime = 600;
                break;
            case 2:
                this.repeatTime = 480;
                break; 
            case 3:
                this.repeatTime = 360;
                break;
            case 4:
                this.repeatTime = 240;
                    break;   
         
        }
        for (let index = 0; index < GroupNumber; index++) {
            for (let index = 0; index < this.colors.length; index++) {
                T.push(this.colors[index]);//7彩顏色各站2位
                T.push(this.colors[index]);//
            }
            
        }
      
        this.schedule[GroupNumber-1] = T;
    }


    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.loopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            //console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.loopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.loopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }




    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var T_d=this.direction==1?"right":"left";
        var text = "-webkit-linear-gradient("+T_d;
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {
        //console.log("Runway_正", Arr)
        var start = Arr[Arr.length - 1];//24
        for (let index = Arr.length - 1; index >= 0; index--) {
            if (index > 0) {
                var Temp = Arr[index - 1];//23
                Arr[index] = Temp;//24
            }
            else {
                //console.log("Runway_正最後", Arr[0], start)
                Arr[0] = start;
            }
        }
        return Arr;
    }



}
export class Mixing extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    counts: any = [0, 0];
    constructor(){
        super();
        this.name="Mixing";
        this.colors= ['#FF0000','#0000FF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction = 1;
        this.colorArrays[0].SetHex('#0000FF');
        this.colorArrays[1].SetHex('#FF0000');
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
    
        var max = 0;

        switch (GroupNumber) {
            case 1:
                max = 16;
                break;
            case 2:
                max = 32;
                break;
            case 3:
                max = 48;
                break;
            case 4:
                max = 64;
                break;
        }
        var T = [];
        for (let index = 0; index < max; index++) {
            T.push(this.colors[0]);
        }

        this.schedule[GroupNumber-1] = T;
        this.counts[0]=0;
        this.counts[1]=max-1;
    }


    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.modeDisplacement(this.schedule[0]);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);

        }, this.repeatTime);
        //let t=randArr(colorarray);
        // function randArr(arr) {
        //     for (var i = 0; i < arr.length; i++) {
        //         var iRand = parseInt(arr.length * Math.random());
        //         var temp = arr[i];
        //         arr[i] = arr[iRand];
        //         arr[iRand] = temp;
        //     }
        //     //console.log('randArr',arr);
        //     return arr;
        // }
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[1] = this.modeDisplacement(this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.modeDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.modeDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }

    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    modeDisplacement(Arr) {
        if (this.counts[0] < (Arr.length/2)) {
            Arr[this.counts[0]] = this.colors[1];
            Arr[this.counts[1]] = this.colors[1];
            console.log('modeDisplacement', "this.counts[0]=" +this.counts);
            //console.log('modeDisplacement', "this.counts[0]=" +this.schedule[0]);        
            this.counts[0] += 1;
            this.counts[1] -= 1;
        }
        else{
            this.counts[1] = Arr.length-1;
            this.counts[0] = 0;
            var tempcolor = this.colors[0];
            this.colors[0] = this.colors[1];
            this.colors[1] = tempcolor;
        }
        return Arr;
    }



}

export class Staggered extends ModeParameter{
    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    threePosition: any = [0, 0,0];// 16,32,48,64
    effectNowStep: any = 0;
    constructor(){
        super();
        this.name="Staggered";
        this.colors = ['#0000FF', '#FF0000'];// 16,32,48,64
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.alpha=40;
        this.direction = 1;
        this.colorArrays[0].SetHex("#0000FF");
        this.colorArrays[1].SetHex("#FF0000");//blue
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
        
    }
    scheduleCreateData(GroupNumber) {
        this.alpha=40;
        this.effectNowStep=0;
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
        var multiple = 0;
        switch (this.speed) {
            case 0:
                this.repeatTime = 60;//by Staggered
                break;
            case 1:
                this.repeatTime = 40;
                break;
            case 2:
                this.repeatTime = 20;
                break; 
            case 3:
                this.repeatTime = 4;
                break;
            case 4:
                this.repeatTime = 0.8;
                    break;   
         
        }
        switch (GroupNumber) {
            case 1:
                multiple = 1;
                break;
            case 2:
                multiple = 2;
                break;
            case 3:
                multiple = 3;
                break;
            case 4:
                multiple = 4;
                break;
        }
        var T = [];

        for (let index = 0; index < 5*multiple; index++) {
            T.push(this.colors[0]);
        }
        for (let index = 0; index < 6*multiple; index++) {
            T.push('#000000');
        }
        for (let index = 0; index < 5*multiple; index++) {
            T.push(this.colors[0]);
        }   
       
        this.threePosition[0]=5*multiple;
        this.threePosition[1]=this.threePosition[0]+6*multiple;
        this.threePosition[2]=this.threePosition[1]+5*multiple;
        this.schedule[GroupNumber - 1] = T;
   
    }
    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);

        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.modeDisplacement(this.schedule[0]);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);

        }, this.repeatTime);
      
    }
    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[1] = this.modeDisplacement(this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.modeDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.modeDisplacement(this.schedule[3]);
            FGTArr[7].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[3], 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[3], 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[3], 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[3], 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    getNowStep(step) {
        switch (step) {
            case 0:
                return [this.colors[0]+Math.round(this.alpha).toString(16),toCssRGB([0,0,0,0]),this.colors[0]+Math.round(this.alpha).toString(16)];
            case 1:
                return [this.colors[0]+Math.round(this.alpha).toString(16),toCssRGB([0,0,0,0]),this.colors[0]+Math.round(this.alpha).toString(16)];
            case 2 :
                return [toCssRGB([0,0,0,0]),this.colors[0]+Math.round(this.alpha).toString(16),toCssRGB([0,0,0,0])];
            case 3 :  
                return [toCssRGB([0,0,0,0]),this.colors[0]+Math.round(this.alpha).toString(16),toCssRGB([0,0,0,0])];
            case 4 :
                return [toCssRGB([0,0,0,0]),toCssRGB([0,0,0,0]),toCssRGB([0,0,0,0])];
        }

    }
    previous:any=[]; 
    modeDisplacement(Arr) {
        console.log("effectNowStep_modeDisplacement",this.effectNowStep);
        for (let index = 0; index < this.threePosition[0]; index++) {
            Arr[index] = this.getNowStep(this.effectNowStep)[0];
        }
        for (let index = this.threePosition[0]; index < this.threePosition[1]; index++) {
            Arr[index] = this.getNowStep(this.effectNowStep)[1];
        }
        for (let index = this.threePosition[1]; index < this.threePosition[2]; index++) {
            Arr[index] = this.getNowStep(this.effectNowStep)[2];
        }
        if (this.effectNowStep==0&&this.alpha<255||this.effectNowStep==2&&this.alpha<255) {
            //console.log("effectNowStep_03",this.effectNowStep);
            this.alpha += 5;
            if(this.alpha>=255){
                this.alpha=255;
                this.effectNowStep += 1;
            }
            
        }
        else if(this.effectNowStep==1 ||this.effectNowStep==3||this.effectNowStep==4){
            console.log("effectNowStep_124",Arr);
            if (this.alpha > 40) {
                this.alpha -= 5;
            }
            else {
                this.alpha = 40;
                this.effectNowStep += 1;
                if (this.effectNowStep == 4) {
                    this.effectNowStep = 0;
                    var tempcolor = this.colors[0];
                    this.colors[0] = this.colors[1];
                    this.colors[1] = tempcolor;
                }
            }
        }
        return Arr;
    }



}
export class Stack extends ModeParameter{   
    showSPBTable:any=[true, true, true];
    colorVisibleNum=1;
    targetMax=64;
    nowIndex=0;
    max: any = 0;
    constructor(){
        super();
        this.name="Stack";
        this.colors= ['#FF0000'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.direction = 1;
        this.colorArrays[0].SetHex('#FF0000');
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }




    scheduleCreateData(GroupNumber) {
        for (let index = 0; index < this.colors.length; index++) {
            this.colors[index]=this.colorArrays[index].Hex;           
        }
        var T = [];
        switch (this.speed) {
            case 0:
                this.repeatTime = 60;//by Stack
                break;
            case 1:
                this.repeatTime = 40;
                break;
            case 2:
                this.repeatTime = 20;
                break; 
            case 3:
                this.repeatTime = 4;
                break;
            case 4:
                this.repeatTime = 0.8;
                    break;   
         
        }





        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64;
                break;
        }

        for (let index = 0; index < this.max; index++) {
            T.push("#000000");////第2種地板顏色
        }
        this.targetMax=this.max;
        this.nowIndex=-1;
        this.schedule[GroupNumber - 1] = T;
        this.schedule[3]=this.schedule[3].reverse();
    }

    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.loopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.loopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.loopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);



    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);
            var showArray=this.direction==1?JSON.parse(JSON.stringify(this.schedule[3])).reverse():this.schedule[3];
            FGTArr[7].style.background = this.getLinearGradientText(showArray, 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(showArray, 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(showArray, 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(showArray, 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(showArray, 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(showArray, 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(showArray, 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(showArray, 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var T_d=this.direction==1?"right":"left";

        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }





    loopArrDisplacement(Arr) {
        if (this.nowIndex == -1) {
            for (let index = 0; index < this.targetMax; index++) {
                Arr[index] = "black";
            }
            Arr[0] = this.colors[0];
            this.nowIndex =0;
            console.log("repeat____==-1", this.nowIndex, this.targetMax,"this.colors[0]"+this.colors[0]);
        }
        if (this.nowIndex < this.targetMax-1) {
            var Temp = Arr[this.nowIndex + 1];
            Arr[this.nowIndex + 1] = Arr[this.nowIndex];
            Arr[this.nowIndex] = Temp;
            this.nowIndex += 1;
            console.log("repeat>>>>", this.nowIndex, this.targetMax);
        }
        else {
            this.targetMax<=0?this.targetMax=this.max:this.targetMax-= 1;
            this.nowIndex = -1;
            console.log("repeat<<<<", this.nowIndex, this.targetMax);
        }
        return Arr;
    }



}
export class StackMultiColor extends ModeParameter{
    showSPBTable:any=[true, true, true];
    colorVisibleNum=0;
    targetMax=64;
    nowIndex=0;
    nowUseColor=0;
    max: any = 0;
    directionSwitch=false;
    constructor(){
        super();
        this.name="StackMultiColor";
        this.colors= ['#FF0000', '#FFA500','#FFFF00','#008000','#00FFFF','#0000FF','#4B0082','#800880'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 2;
        this.direction = 1;
        for (let index = 0; index < this.syncConcatenation.length; index++) {
            this.syncConcatenation[index] = 2;
        }
    }
    scheduleCreateData(GroupNumber) {
        var T = [];
        //this.repeatTime=50-((this.speed+1)*10); //by StackMultiColor
        switch (this.speed) {
            case 0:
                this.repeatTime = 60;//by StackMultiColor
                break;
            case 1:
                this.repeatTime = 40;
                break;
            case 2:
                this.repeatTime = 20;
                break; 
            case 3:
                this.repeatTime = 4;
                break;
            case 4:
                this.repeatTime = 0.8;
                    break;   
         
        }
        switch (GroupNumber) {
            case 1:
                this.max = 16;
                break;
            case 2:
                this.max = 32;
                break;
            case 3:
                this.max = 48;
                break;
            case 4:
                this.max = 64;
                break;
        }

        for (let index = 0; index < this.max; index++) {
            T.push("black");////第2種地板顏色
        }
        this.targetMax=this.max;
        this.nowIndex=-1;
        this.schedule[GroupNumber - 1] = T;
    }

    startAllFanGradient_1(ElementClass) {
        this.scheduleCreateData(1);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[0] = this.loopArrDisplacement(this.schedule[0]);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[0], 0, 16);
            //console.log("startAllFanGradient", this.schedule[0], FGTArr);
        }, this.repeatTime);
 
    }

    startAllFanGradient_2(ElementClass) {
        this.scheduleCreateData(2);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
 
            this.schedule[1] = this.loopArrDisplacement(this.schedule[1]);
            console.log("runway=2",this.schedule[1]);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[1], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[1], 0, 16);
        }, this.repeatTime);



    }

    startAllFanGradient_3(ElementClass) {
        this.scheduleCreateData(3);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[2] = this.loopArrDisplacement(this.schedule[2]);
            FGTArr[5].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[4].style.background = this.getLinearGradientText(this.schedule[2], 32, 48);
            FGTArr[3].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[2].style.background = this.getLinearGradientText(this.schedule[2], 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(this.schedule[2], 0, 16);
        }, this.repeatTime);
    }
    startAllFanGradient_4(ElementClass) {
        this.scheduleCreateData(4);
        stopVar[ElementClass] = setInterval(() => {
            var FGTArr = document.getElementsByClassName(ElementClass) as HTMLCollectionOf<HTMLElement>;
            this.schedule[3] = this.loopArrDisplacement(this.schedule[3]);
            var showArray=this.direction==1?JSON.parse(JSON.stringify(this.schedule[3])).reverse():this.schedule[3];
            FGTArr[7].style.background = this.getLinearGradientText(showArray, 48, 64);
            FGTArr[3].style.background = this.getLinearGradientText(showArray, 48, 64);
            FGTArr[6].style.background = this.getLinearGradientText(showArray, 32, 48);
            FGTArr[2].style.background = this.getLinearGradientText(showArray, 32, 48);
            FGTArr[5].style.background = this.getLinearGradientText(showArray, 16, 32);
            FGTArr[1].style.background = this.getLinearGradientText(showArray, 16, 32);
            FGTArr[4].style.background = this.getLinearGradientText(showArray, 0, 16);
            FGTArr[0].style.background = this.getLinearGradientText(showArray, 0, 16);
        }, this.repeatTime);
    }
    getLinearGradientText(arr = [], startpos, finalpos) {
        var text = "-webkit-linear-gradient(left"
        for (let index = startpos; index < finalpos; index++) {
            text += ',' + arr[index];
        }
        text += ")";
        return text;
    }
    loopArrDisplacement(Arr) {
        if (this.nowIndex == -1) {
            for (let index = 0; index < this.targetMax; index++) {
                Arr[index] = "black";
            }
            Arr[0] = this.colors[this.loopCount];
            this.loopCount<6? this.loopCount+=1: this.loopCount=0;           
            this.nowIndex =0;
            console.log("repeat____==-1", this.nowIndex, this.targetMax,"this.colors[0]"+this.colors[0]);
        }
        if (this.nowIndex < this.targetMax-1) {
            var Temp = Arr[this.nowIndex + 1];
            Arr[this.nowIndex + 1] = Arr[this.nowIndex];
            Arr[this.nowIndex] = Temp;
            this.nowIndex += 1;

            //console.log("repeat>>>>", this.nowIndex, this.targetMax);
        }
        else {
            this.targetMax<=0?this.targetMax=this.max:this.targetMax-= 1;
            for (let index = 0; index < this.max; index++) {
                console.log("Check target", "Arr[index]"+Arr[index],"this.targetMax"+this.targetMax);

                if(index>=this.targetMax){
                    Arr[index] = this.colors[this.loopCount];
                }
            }
            this.nowIndex = -1;
            //console.log("repeat<<<<", this.nowIndex, this.targetMax);
        }


        return Arr;
    }



}
