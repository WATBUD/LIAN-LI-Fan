import { ColorModule } from '../Model/ColorModule';
import { JsonPipe } from '@angular/common';
//export var stopVar: any = [];
export class ModeParameter {
    LEDConcatenation: any = [true, true, false, false];
    syncConcatenation: any = [0, 0, 0, 0];
    speed: any = 3; // step
    bright: any = 4;//step
    direction: any = 1;//左1又2
    name: string;
    chooseGroup: any = 0;
    loopCount = 0;
    isSync = false;
    alpha = 1;
    colors: any;
    rainbowColors: any = ['#FF0000', '#FF7D00', '#FFFF00', '#00FF00', '#0000FF', '#00FFFF', '#FF00FF', '#FFFFFF'];//2種 第1種3顆跑步狀態 第2種地板顏色 [16 32]=3 [48 64 ]
    rainbow7Color() {
        return [[255, 0, 0, 1], [255, 165, 0, 1], [255, 255, 0, 1], [0, 255, 0, 1], [0, 127, 255, 1], [0, 0, 255, 1], [139, 0, 255, 1]];
    }
    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    };

    constructor() {
    }
    
}
var i_SyncBlock_4_Class_Id = ["Inner_Circle0", "Inner_Circle1", "Inner_Circle2", "Inner_Circle3"];
var o_SyncBlock_4_Class_Id = ["Outer_Circle0", "Outer_Circle1", "Outer_Circle2", "Outer_Circle3"];

export class AL_EffectModule extends ModeParameter {
    // effectBlockClass4 = ["Inner_Circle0", "Inner_Circle1", "Inner_Circle2", "Inner_Circle3"];
    // new AL_FanSetting(["Inner_Circle0","Outer_Circle0","Overall_Circle0"]),

    onPlay: any = false;
    elementsName: any = "";
    stopVar: any = [];
    constructor(name = "") {
        super();
        this.elementsName = name;
    }
    ImportClassData(target) {
        // var FSADarr = Object.keys(target);
        // for (let index2 = 0; index2 < FSADarr.length; index2++) {
        //     var fieldString = FSADarr[index2];
        //     if (fieldString != "elementsName") {
        //         this[FSADarr[index2]] = target[FSADarr[index2]];
        //     }
        // } 
    }
    stopAnimationAndClear(effectData) {
        var TempName=this.elementsName;
        clearInterval(this.stopVar[TempName[0]]);
        clearInterval(this.stopVar[TempName[1]]);
        clearInterval(this.stopVar[TempName[2]]);
        this.onPlay = false;
        var ElementClass4=[]
        if(effectData.isSync){
            for (let index = 0; index < i_SyncBlock_4_Class_Id.length; index++) {
                var FGTArr = document.getElementsByClassName(i_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;
                for (let i2 = 0; i2 < FGTArr.length; i2++) {
                    const element = FGTArr[i2];
                    element.style.background = this.getColorEffectValue([0,0,0,0], 1);
                }
            }
            for (let index = 0; index < o_SyncBlock_4_Class_Id.length; index++) {
                var FGTArr = document.getElementsByClassName(o_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;
                for (let i2 = 0; i2 < FGTArr.length; i2++) {
                    const element = FGTArr[i2];
                    element.style.background = this.getColorEffectValue([0,0,0,0], 1);
                }
            }
        }
        else{
            var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
            var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
            for (let index = 0; index < innerArr.length; index++) {
                innerArr[index].style.background = this.getColorEffectValue([0,0,0,0], 1);
            }
            for (let index = 0; index < outerArr.length ; index++) {
                outerArr[index].style.background = this.getColorEffectValue([0,0,0,0], 1);
            }
        }
                
     
    }
    toCssRGB(RGBA = [0, 0, 0, 0]) {
        return 'rgb(' + RGBA[0] + ',' + RGBA[1] + ',' + RGBA[2] + ',' + RGBA[3] + ')';
    }
    toRadial_gradient(rgba,gradientValue){
        return 'radial-gradient('+this.toCssRGB(rgba)+' 10%,'+gradientValue+' 70%)';
        //return 'radial-gradient('+this.toCssRGB(rgba)+' 1%,'+this.toCssRGB(rgba)+' 50%)';
    }
    mode_Breath_Overall(effectData,rangeMode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var innerRainbowIndex = 0;
        var outerRainbowIndex = 0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < innerArr.length+1; index++) {

            reInnerTempData.push({
                colors:colorArrays[innerIndex].getRGBA(),
                recordIndex: innerRainbowIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                innerIndex+=1;
            }
            
        }
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[outerIndex].getRGBA(),
                recordIndex: outerRainbowIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: outerArr[index - 1],
            });
            if (index % 12 == 0) {
                outerIndex += 1;
            }
        }
        if (rangeMode != "Outer") {
            var nowColor=[];
            var newColor=[];
            var repeatCount=0;
            var totalStep=255;
            var nowStep=0;
            this.stopVar[TempName[0]] = setInterval(() => {
                if(nowStep<totalStep){
                    nowStep+=5;
                }
                else{
                    nowStep=0;
                    repeatCount+=1;
                }
                for (let index = 0; index < reInnerTempData.length; index++) {
                    var data = reInnerTempData[index];
                    //var setRgba = this.rainbow7Color()[data.recordIndex];
                    if(repeatCount%2==1){
                        nowColor=[0,0,0,0];
                        newColor=JSON.parse(JSON.stringify(data.colors));
                    }
                    else{
                        nowColor=JSON.parse(JSON.stringify(data.colors));
                        newColor=[0,0,0,0];
                    }
                    var t_data = [0,0,0,1];
                    for (let i_Step = 0; i_Step < 4; i_Step++) {
                        t_data[i_Step] =(nowColor[i_Step] * (totalStep - nowStep) + newColor[i_Step] * nowStep) / totalStep;
                    }
                    
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,0)
                    

                }

            }, effectData.repeatTime);
        }
        if (rangeMode != "Inner") {
            var nowColor=[];
            var newColor=[];
            var repeatCount=0;
            var totalStep=255;
            var nowStep=0;
            this.stopVar[TempName[1]] = setInterval(() => {
                if(nowStep<totalStep){
                    nowStep+=5;
                }
                else{
                    nowStep=0;
                    repeatCount+=1;
                }
                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    var setRgba = this.rainbow7Color()[data.recordIndex];
                    if(repeatCount%2==1){
                        nowColor=[0,0,0,0];
                        newColor=JSON.parse(JSON.stringify(data.colors));
                    }
                    else{
                        nowColor=JSON.parse(JSON.stringify(data.colors));
                        newColor=[0,0,0,0];
                    }
                    var t_data = [0,0,0,1];
                    for (let i_Step = 0; i_Step < 4; i_Step++) {
                        t_data[i_Step] =(nowColor[i_Step] * (totalStep - nowStep) + newColor[i_Step] * nowStep) / totalStep;
                    }
                    
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,1)
                    

                }

            }, effectData.repeatTime);
        }
        console.log('%c mode_Breath_Overall','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName,rangeMode);
    }
    mode_Breath_Colorful(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var rainbowColorIndex = 0;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            reOuterTempData.push({
                colors:colorArrays[outerIndex].getRGBA(),
                recordIndex: rainbowColorIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: outerArr[index-1],
            });
            if (index % 3 == 0) {
                if (outerIndex < 3) {
                    outerIndex += 1;
                }
                else {
                    outerIndex = 0;
                }
            }

        }
        var nowColor=[];
        var newColor=[];
        var repeatCount=0;
        var totalStep=255;
        var nowStep=0;
            this.stopVar[TempName[1]] = setInterval(() => {
                if(nowStep<totalStep){
                    nowStep+=5;
                }
                else{
                    nowStep=0;
                    repeatCount+=1;
                }
                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    var setRgba = this.rainbow7Color()[data.recordIndex];
                    if(repeatCount%2==1){
                        nowColor=[0,0,0,0];
                        newColor=JSON.parse(JSON.stringify(data.colors));
                    }
                    else{
                        nowColor=JSON.parse(JSON.stringify(data.colors));
                        newColor=[0,0,0,0];
                    }
                    var t_data = [0,0,0,1];
                    for (let i_Step = 0; i_Step < 4; i_Step++) {
                        t_data[i_Step] =(nowColor[i_Step] * (totalStep - nowStep) + newColor[i_Step] * nowStep) / totalStep;
                    }
                    
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,1)
                    

                }


            }, effectData.repeatTime);
        
        console.log('%c mode_Breath_Colorful','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Breathing_Rainbow(effectData,rangeMode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var innerRainbowIndex = 0;
        var outerRainbowIndex = 0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < innerArr.length+1; index++) {

            reInnerTempData.push({
                colors:colorArrays[innerIndex].getRGBA(),
                recordIndex: innerRainbowIndex,
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                //innerIndex+=1;
            }
            
        }
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[outerIndex].getRGBA(),
                recordIndex: outerRainbowIndex,
                HTML_target: outerArr[index - 1],
            });
            if (index % 12 == 0) {
               // outerIndex += 1;
            }
        }
        var setRgba = this.rainbow7Color();

        if (rangeMode != "Inner") {
            var outer_repeatCount=0;
            var outer_addCount=0;
            var totalStep=100;
            var outer_StartStep=0;
            var outer_SetColorindex=0;
            var o_nowColor;
            var o_newColor;
            this.stopVar[TempName[1]] = setInterval(() => {
                if(outer_repeatCount%2==0){
                    o_nowColor=JSON.parse(JSON.stringify(setRgba[outer_SetColorindex]));
                    o_newColor=[0,0,0,0];
                }
                else{
                    o_nowColor=[0,0,0,0];
                    o_newColor=JSON.parse(JSON.stringify(setRgba[outer_SetColorindex]));
                }
                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    var t_data = [0,0,0,1];
                    //console.log('%c outer_StartStep','color:rgb(255,255,0)',t_data,outer_StartStep,totalStep);
                    for (let i_Step = 0; i_Step < 3; i_Step++) {
                        t_data[i_Step] =(o_nowColor[i_Step] * (totalStep - outer_StartStep) + o_newColor[i_Step] * outer_StartStep) / totalStep;
                    }
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,1)         
                }
                if(outer_StartStep<totalStep){
                    outer_StartStep+=5;
                }
                else{
                    outer_StartStep=0;
                    outer_repeatCount+=1;
                    if(outer_SetColorindex<setRgba.length-1){
                        outer_SetColorindex+=1;
                    }
                    else{
                        outer_SetColorindex=0;
                    }
                }
            }, effectData.repeatTime);
        }
        //console.log('%c mode_Breathing_Rainbow','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName,rangeMode);
    }
    mode_Color_Cycle(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArrGroupNum=8;
        var outerArrGroupNum=12;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        var innerColorsArray = [];
        var outerColorsArray = [];

        for (let c_2 = 0; c_2 < innerArrGroupNum; c_2++) {
            innerColorsArray.push(colorArrays[3].getRGBA());
        }
        if(effectData.direction==1){
            for (let index = 0; index < colorArrays.length-1; index++) {
                for (let c_2 = 0; c_2 < innerArrGroupNum; c_2++) {
                    innerColorsArray.push(colorArrays[index].getRGBA());
                }
            }
        }
        else{
            for (let index = colorArrays.length-1; index > -1; index--) {
                for (let c_2 = 0; c_2 < innerArrGroupNum; c_2++) {
                    innerColorsArray.push(colorArrays[index].getRGBA());
                }
            }
        }
        for (let c_2 = 0; c_2 < outerArrGroupNum; c_2++) {
            outerColorsArray.push(colorArrays[3].getRGBA());
        }
        if(effectData.direction==1){
            for (let index = 0; index < colorArrays.length-1; index++) {
                for (let c_2 = 0; c_2 < outerArrGroupNum; c_2++) {
                    outerColorsArray.push(colorArrays[index].getRGBA());
                }
            }
        }
        else{
            for (let index = colorArrays.length-1; index > -1; index--) {
                for (let c_2 = 0; c_2 < outerArrGroupNum; c_2++) {
                    outerColorsArray.push(colorArrays[index].getRGBA());
                }
            }
        }

        console.log('%c showColosArray','color:rgb(255,77,255)',innerColorsArray);

        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }


        if (Mode != "Outer") {
            // for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
            //     var data = reInnerTempData[dindex];
            //     for (let i_index = 0; i_index < data.length; i_index++) {
            //         var HtmLdiv = data[i_index];
            //         HtmLdiv.HTML_target.style.background =this.getColorEffectValue(colorArrays[3].getRGBA(),0)
            //     }
            // }
            this.stopVar[TempName[0]] = setInterval(() => {               
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data = reInnerTempData[dindex];
                    for (let i_index = 0; i_index < data.length; i_index++) {
                        var HtmLdiv = data[i_index];
                        HtmLdiv.HTML_target.style.background =this.getColorEffectValue(innerColorsArray[i_index],0)
                    }
                }
                innerColorsArray=this.loopArrDisplacement(effectData.direction,innerColorsArray);
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {               
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data = reOuterTempData[dindex];
                    for (let i_index = 0; i_index < data.length; i_index++) {
                        var HtmLdiv = data[i_index];
                        HtmLdiv.HTML_target.style.background =this.getColorEffectValue(outerColorsArray[i_index],1)
                    }
                }
                outerColorsArray=this.loopArrDisplacement(effectData.direction,outerColorsArray);
            }, effectData.repeatTime);
        }

        console.log('%c mode_Color_Cycle','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Color_Cycle2(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var fanUpNumber=4;
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:8,
            tempUpArray: [],
            part:4,
            maxArrlen:12,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:3,
        }
        // for (let index = 0; index < o_Step.maxArrlen; index++) {
        //     o_Step.tempUpArray.push([0, 0, 0, 0]);
        // }
        // var part = 6;
        // for (let index = 1; index <= part; index++) {
        //     o_Step.tempUpArray.push(this.gerRGB_Alpha(o_Step.setColor, index * 1 / part));
        // }
        // o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));

        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:8,
            tempUpArray: [],
            part:4,
            maxArrlen:8,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:0,
        }
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }

        for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
            var data_4 = reInnerTempData[dindex];
            data_4=effectData.direction==1?data_4.reverse():data_4;
        }
        for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
            var data_4 = reOuterTempData[dindex];
            data_4=effectData.direction==1?data_4.reverse():data_4;
        }
        this.stopVar[setTempName] = setInterval(() => {
                                //i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);

            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    var setColor=colorArrays[i_Step.setColorindex].getRGBA();
                    for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                        var data_4 = reInnerTempData[dindex];
                        for (let index = 0; index <  data_4.length; index++) {
                            if(index<setRange){
                                data_4[index].HTML_target.style.background =this.getColorEffectValue(setColor, 1);
                            }
                        }
                    }
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                        
                    }
                    else{
                        i_Step.nowFrames =0;
                        if(i_Step.setColorindex<colorArrays.length-1){
                            i_Step.setColorindex+=1;
                        }
                        else{
                            i_Step.setColorindex=0;
                        }

                    }
                }

              
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                    console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    var setColor=colorArrays[o_Step.setColorindex].getRGBA();
                    for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                        var data_4 = reOuterTempData[dindex];
                        for (let index = 0; index <  data_4.length; index++) {
                            if(index<setRange){
                                data_4[index].HTML_target.style.background =this.getColorEffectValue(setColor, 1);
                            }
                        }
                    }
                    if (o_Step.nowFrames <  o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                        
                    }
                    else{
                        o_Step.nowFrames =0;
                        if(o_Step.setColorindex<colorArrays.length-1){
                            o_Step.setColorindex+=1;
                        }
                        else{
                            o_Step.setColorindex=0;
                        }

                    }
                }
              
            }
        }, effectData.repeatTime);
        console.log('%c mode_Color_Cycle','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Runway(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var innerColorsArray = [];
        var outerColorsArray = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            reInnerTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
                innerColorsArray.push(colorArrays[1].getRGBA())
        }
        for (let index = 0; index < 6; index++) {
            innerColorsArray.push(colorArrays[0].getRGBA());
        }
        for (let index = 0; index < 6; index++) {
            innerColorsArray.push(colorArrays[1].getRGBA());
        }
        for (let index = 0; index < 6; index++) {
            innerColorsArray.push(colorArrays[1].getRGBA());
        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData);
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
                outerColorsArray.push(colorArrays[1].getRGBA())        
        }
        for (let index = 0; index < 6; index++) {
            outerColorsArray.push(colorArrays[0].getRGBA());
        }
        for (let index = 0; index < 6; index++) {
            outerColorsArray.push(colorArrays[1].getRGBA());
        }
        var inner={
            loopDirection:0,
            innerCount:0,
            backupArray:JSON.parse(JSON.stringify(innerColorsArray)),
        }
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                //var showArray=effectData.direction==2?JSON.parse(JSON.stringify(innerColorsArray)).reverse():innerColorsArray;
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data = reInnerTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(innerColorsArray[dindex], 0)
                } 
                if(inner.innerCount==innerColorsArray.length){
                    inner.loopDirection+=1;
                    inner.innerCount=0;
                    reInnerTempData=reInnerTempData.reverse();
                    innerColorsArray=JSON.parse(JSON.stringify(inner.backupArray))
                    //innerColorsArray=inner.loopDirection%2==0?JSON.parse(JSON.stringify(innerColorsArray)).reverse():innerColorsArray;
                    //reOuterTempData=effectData.direction==1?reOuterTempData.reverse():reOuterTempData;
                    //var showArray=inner.loopDirection%2==1?JSON.parse(JSON.stringify(innerColorsArray)).reverse():innerColorsArray;
                    //clearInterval(this.stopVar[TempName[0]]);
                }
                innerColorsArray=this.loopArrDisplacementAssignSpacing(effectData.direction,innerColorsArray,1);

                inner.innerCount+=1;

            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                outerColorsArray=this.loopArrDisplacement(effectData.direction,outerColorsArray);
                //var showArray=effectData.direction==1?JSON.parse(JSON.stringify(outerColorsArray)).reverse():outerColorsArray;
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data = reOuterTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(outerColorsArray[dindex], 1)
                } 
            }, effectData.repeatTime);
        }
        console.log('%c mode_Runway','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Stack(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArrGroupNum=4;
        var outerArrGroupNum=6;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var innerColorsArray = [];
        var outerColorsArray = [];
        //combination=innerColorsArray.concat(innerColorsArray2);
        for (let index = 1; index < innerArr.length+1; index++) {
            reInnerTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            innerColorsArray.push(colorArrays[0].getRGBA());
        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData);
      
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            outerColorsArray.push(colorArrays[0].getRGBA());
        }
        //console.log('%c showColosArray','color:rgb(255,77,255)',combination,outer_combination);
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                innerColorsArray = inner_loopArrDisplacement(innerColorsArray);
                var showArray=effectData.direction==1?JSON.parse(JSON.stringify(innerColorsArray)).reverse():innerColorsArray;
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data = reInnerTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(showArray[dindex], 0)
                } 
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                outerColorsArray = outer_loopArrDisplacement(outerColorsArray);
                var showArray=effectData.direction==1?JSON.parse(JSON.stringify(outerColorsArray)).reverse():outerColorsArray;
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data = reOuterTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(showArray[dindex], 1)
                } 
            }, effectData.repeatTime);
        }
        var nowIndex = -1;
        var inner_TargetMax=32;
        function inner_loopArrDisplacement(Arr) {
            console.log('%c _this','color:rgb(255,77,255)',Arr);
            if (nowIndex == -1) {
                for (let index = 0; index <inner_TargetMax; index++) {
                    Arr[index] = colorArrays[0].getRGBA();
                }
                Arr[0] = colorArrays[1].getRGBA();
                nowIndex =0;
                console.log("repeat____==-1", nowIndex, inner_TargetMax,"colors[0]"+colorArrays[0].getRGBA());
            }
            if (nowIndex < inner_TargetMax-1) {
                var Temp = Arr[nowIndex + 1];
                Arr[nowIndex + 1] = Arr[nowIndex];
                Arr[nowIndex] = Temp;
                nowIndex += 1;
                console.log("repeat>>>>", nowIndex, inner_TargetMax);
            }
            else {
                inner_TargetMax<=0?inner_TargetMax=32:inner_TargetMax-= 1;
                nowIndex = -1;
                console.log("repeat<<<<", nowIndex, inner_TargetMax);
            }
            return Arr;
        }
        var outer_nowIndex = -1;
        var outer_TargetMax=48;
        function outer_loopArrDisplacement(Arr) {
            console.log('%c _this','color:rgb(255,77,255)',Arr);
            if (outer_nowIndex == -1) {
                for (let index = 0; index <outer_TargetMax; index++) {
                    Arr[index] = colorArrays[0].getRGBA();
                }
                Arr[0] = colorArrays[1].getRGBA();
                outer_nowIndex =0;
                console.log("repeat____==-1", outer_nowIndex, outer_TargetMax,"colors[0]"+colorArrays[0].getRGBA());
            }
            if (outer_nowIndex < outer_TargetMax-1) {
                var Temp = Arr[outer_nowIndex + 1];
                Arr[outer_nowIndex + 1] = Arr[outer_nowIndex];
                Arr[outer_nowIndex] = Temp;
                outer_nowIndex += 1;
                //console.log("repeat>>>>", outer_nowIndex, targetMax);
            }
            else {
                outer_TargetMax<=0?outer_TargetMax=48:outer_TargetMax-= 1;
                outer_nowIndex = -1;
                //console.log("repeat<<<<", outer_nowIndex, targetMax);
            }
            return Arr;
        }
        console.log('%c mode_Stack','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Stack2(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var fanUpNumber=4;
        var reInnerTempData = [];
        for (let index = 1; index < innerArr.length + 1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:48,
            tempUpArray: [],
            part:4,
            maxArrlen:(12*fanUpNumber)-1,
            nowUpArray: [],
            setColor: colorArrays[1].getRGBA(),
            animationStep: 8888,
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:32,
            tempUpArray: [],
            part:4,
            nowArrlen:0,
            maxArrlen:31,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }

        var setTempName;
        if(Mode!='OverAll'){
            this.mode_Stack(effectData,Mode);
            return;
        }
        else{
            i_Step.animationStep=0;
            o_Step.animationStep=0;
            setTempName=TempName[2];
        }
        // switch (Mode) {
        //     case 'Inner':
        //         this.mode_Stack(effectData,Mode);
        //         i_Step.animationStep=0;
        //         setTempName=TempName[0];
        //         break;
        //     case 'Outer':
        //         o_Step.animationStep=0;
        //         setTempName=TempName[1];
        //         break;
        //     case 'OverAll':
        //         i_Step.animationStep=0;
        //         o_Step.animationStep=0;
        //         setTempName=TempName[2];
        //         break;
        //     default:
        //         break;
        // }
        var setColor1 = colorArrays[0].getRGBA();
        var setColor2 = colorArrays[1].getRGBA();
        reInnerTempData=effectData.direction==1?reInnerTempData.reverse():reInnerTempData;
        reOuterTempData=effectData.direction==1?reOuterTempData.reverse():reOuterTempData;
        for (let index = 0; index < reInnerTempData.length; index++) {
            reInnerTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1) 
        }
        this.stopVar[setTempName] = setInterval(() => {
            var rate = i_Step.nowFrames / 32;
            var outer_setRange = Math.round(rate * 48);
            console.log('%c rate', 'color:rgb(255,77,255)', rate);
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    //var setRange=Math.round (i_Step.nowFrames*i_Step.maxArrlen/i_Step.maxframes);
                    //console.log('%c setRange','color:rgb(255,77,255)',setRange,i_Step.nowFrames);
                    reInnerTempData[i_Step.nowFrames].HTML_target.style.background = this.getColorEffectValue(setColor2, 1)
                    for (let index = 0; index < reInnerTempData.length; index++) {
                        if (index < i_Step.nowFrames) {
                            reInnerTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1)
                        }
                        else {

                        }
                    }
                    if (i_Step.nowFrames < i_Step.maxArrlen) {
                        i_Step.nowFrames += 1;
                    }
                    else {
                        i_Step.nowFrames = 0;
                        if (i_Step.maxArrlen > 0) {
                            i_Step.maxArrlen -= 1;
                            var setRange = Math.round(rate * 48);
                            for (let index = 0; index < reOuterTempData.length; index++) {
                                if (index >= setRange) {
                                    reOuterTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor2, 1)
                                }
                            }
                        }
                        else {
                            for (let index = 0; index < reInnerTempData.length; index++) {
                                reInnerTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1)
                            }
                            for (let index = 0; index < reOuterTempData.length; index++) {
                                reOuterTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1)
                            }
                            i_Step.maxArrlen = 31;
                        }
                    }

                }
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    console.log('%c o_Step_setRange', 'color:rgb(255,77,255)', outer_setRange, o_Step.nowFrames);
                    reOuterTempData[outer_setRange].HTML_target.style.background = this.getColorEffectValue(setColor2, 1)
                    for (let index = 0; index < reOuterTempData.length; index++) {
                        if (index < outer_setRange) {
                            reOuterTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1)
                        }
                    }
                    // if (o_Step.nowFrames <  o_Step.maxframes) {
                    //     o_Step.nowFrames += 1;
                    // }
                    // else{
                    //     o_Step.nowFrames=0;
                    //     if(o_Step.maxArrlen>0){
                    //         o_Step.maxArrlen-=1;
                    //     }
                    //     else{
                    //         for (let index = 0; index < reOuterTempData.length; index++) {
                    //             reOuterTempData[index].HTML_target.style.background = this.getColorEffectValue(setColor1, 1) 
                    //         }
                    //         o_Step.maxArrlen=12*fanUpNumber-1;
                    //     }
                    // }
                }
            }
        }, effectData.repeatTime);

        console.log('%c mode_Stack','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }

    mode_Wave(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArrGroupNum=4;
        var outerArrGroupNum=6;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        var innerColorsArray = [];
        var outerColorsArray = [];
        for (let c_2 = 0; c_2 < 32; c_2++) {
            if(c_2<5){
                innerColorsArray.push(colorArrays[0].getRGBA());
            }
            else{
                innerColorsArray.push([0,0,0,0])
            }
        }
        //var T_2Check=[12,16,28,32];
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 4 == 0) {
                if(index==12||index==16||index==28||index==32){
                    InnerTempData4=InnerTempData4.reverse();
                }            
                // for (let T_2 = 0; T_2 < T_2Check.length; index++) {
                //     if(index==T_2Check[T_2]){
                //         InnerTempData4=InnerTempData4.reverse();
                //     }                    
                // }
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var inner_Reorganization = [];
        var reorganizationSort=[0,3,4,7,6,5,2,1];
        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            inner_Reorganization=inner_Reorganization.concat(reInnerTempData[t_index]);
        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData,inner_Reorganization);


        for (let c_2 = 0; c_2 < 48; c_2++) {
            if(c_2<5){
                outerColorsArray.push(colorArrays[0].getRGBA());
            }
            else{
                outerColorsArray.push([0,0,0,0])
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 6 == 0) {
                if(index==18||index==24||index==42||index==48){
                    outerTempData4=outerTempData4.reverse();
                }  
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var outer_Reorganization = [];
        var reorganizationSort=[0,3,4,7,6,5,2,1];
        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            outer_Reorganization=outer_Reorganization.concat(reOuterTempData[t_index]);

        }
        effectData.direction=2;
        //console.log('%c reOuterTempData','color:rgb(255,77,255)',reOuterTempData,outer_Reorganization);
        console.log('%c showColosArray','color:rgb(255,77,255)',innerColorsArray,outerColorsArray);
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                for (let dindex = 0; dindex < inner_Reorganization.length; dindex++) {
                    var data = inner_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(innerColorsArray[dindex], 0)
                }

                innerColorsArray = this.loopArrDisplacement(effectData.direction, innerColorsArray);
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                for (let dindex = 0; dindex < outer_Reorganization.length; dindex++) {
                    var data = outer_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(outerColorsArray[dindex], 1)
                }
                outerColorsArray = this.loopArrDisplacement(effectData.direction, outerColorsArray);
    
            }, effectData.repeatTime);
        }
       

        console.log('%c mode_Wave','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Pac_Man(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray = this.totalOuterDownArray(fanUpNumber);
        for (let index = 1; index < innerArr.length + 1; index++) {
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:4,
            tempUpArray: [],
            part:4,
            maxArrlen:4,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push(colorArrays[0].getRGBA());
        }
        // for (let index = 1; index <= i_Step.part; index++) {
        //     i_Step_2.tempUpArray.push(colorArrays[0].getRGBA());
        // }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));




        var i_Step_2 = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:8,
            loopType:0,
            pushCount:0,
            biteCount:0,
            biteCount_2:3,
            Count:0,
            tempUpArray: [],
            part:4,
            maxArrlen:4*fanUpNumber+4,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        // for (let index = 0; index < i_Step_2.maxArrlen; index++) {
        //     i_Step_2.tempUpArray.push([0, 0, 0, 0]);
        // }
        // // for (let index = 1; index <= i_Step_2.part; index++) {
        // //     i_Step_2.tempUpArray.push(this.gerRGB_Alpha(i_Step_2.setColor, index * 1 / i_Step_2.part));
        // // }
        for (let index = 0; index < 4*fanUpNumber; index++) {
            i_Step_2.tempUpArray.push(colorArrays[0].getRGBA());

        }
        for (let index = 0; index < 4*fanUpNumber; index++) {
            i_Step_2.tempUpArray.push([0, 0, 0, 0]);

        }
        for (let index = 0; index < i_Step_2.part; index++) {
            i_Step_2.tempUpArray.push(colorArrays[1].getRGBA());
        }
        
        i_Step_2.nowUpArray = JSON.parse(JSON.stringify(i_Step_2.tempUpArray));
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            default:
                alert('Mode_Error'+Mode);
                break;
        }
        var color_0=colorArrays[0].getRGBA();
        var color_1=colorArrays[1].getRGBA();
        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    //var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    var i_Step_setRange = i_Step.nowFrames;
                    //console.log('%c i_Step_setRange', 'color:rgb(255,77,255)', i_Step_setRange);
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2, i_Step.nowUpArray,i_Step_setRange);

                    if (i_Step.nowFrames < i_Step.maxframes) {
                        for (let index = 0; index < fanUpNumber; index++) {
                            var setPos=i_Step.nowFrames+(index*fanUpNumber);
                            //console.log('%c setPos', 'color:rgb(255,77,255)', setPos);
                            var data = reInnerTempData[totalInnerUpArray[setPos]];
                            data.HTML_target.style.background = this.getColorEffectValue(color_0, 1)
                            var data = reInnerTempData[totalInnerDownArray[setPos]];
                            data.HTML_target.style.background = this.getColorEffectValue(color_0, 1)
                        }
                        i_Step.nowFrames += 1;
                    }
                    else {
                        // totalInnerUpArray=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                        // totalInnerDownArray=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                        i_Step.nowFrames = 0;
                        i_Step.animationStep = 1;
                        //i_Step_2.tempUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray));
                    }
                }
            }
            else if (i_Step.animationStep == 1) {
                var i_Step_2_setRange = i_Step_2.nowFrames;
                //console.log('%c i_Step_2_setRange', 'color:rgb(255,77,255)', i_Step_2_setRange);
                console.log('%c i_Step_2.nowUpArray', 'color:rgb(255,77,255)',  i_Step_2.nowUpArray);
                i_Step_2.tempUpArray = this.loopArrDisplacementAssignSpacing(2, i_Step_2.nowUpArray, i_Step_2_setRange);
                if (i_Step_2.nowFrames < 4 * fanUpNumber + 5) {
                    if (i_Step_2.loopType == 0) {
                        if (i_Step_2.pushCount < 4) {
                            i_Step_2.pushCount += 1;
                            i_Step_2.nowFrames += 1;
                        }
                        else {
                            i_Step_2.loopType = 1;
                        }
                        for (let index = 0; index < totalInnerUpArray.length; index++) {
                            var data = reInnerTempData[totalInnerUpArray[index]];
                            data.HTML_target.style.background = this.getColorEffectValue(i_Step_2.tempUpArray[index], 1)
                            var data = reInnerTempData[totalInnerDownArray[index]];
                            data.HTML_target.style.background = this.getColorEffectValue(i_Step_2.tempUpArray[index], 1)
                        }
                    }
                    else if (i_Step_2.loopType == 1) {
                        if (i_Step_2.biteCount < 2) {
                            i_Step_2.biteCount += 1;
                        }
                        else {
                            i_Step_2.loopType = 2;
                        }
                        var data = reInnerTempData[totalInnerUpArray[i_Step_2.nowFrames-i_Step_2.biteCount]];
                        data.HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1)
                        var data = reInnerTempData[totalInnerDownArray[i_Step_2.nowFrames-i_Step_2.biteCount]];
                        data.HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1)
                    }
                    else if (i_Step_2.loopType == 2) {
                        if (i_Step_2.biteCount_2 >1) {
                            i_Step_2.biteCount_2 -= 1;

                        }
                        else {
                            i_Step_2.pushCount = 0;
                            i_Step_2.biteCount = 0;
                            i_Step_2.biteCount_2 = 3;
                            i_Step_2.loopType = 0;
                        }
                        var data = reInnerTempData[totalInnerUpArray[i_Step_2.nowFrames-i_Step_2.biteCount_2]];
                        data.HTML_target.style.background = this.getColorEffectValue(color_1, 1)
                        var data = reInnerTempData[totalInnerDownArray[i_Step_2.nowFrames-i_Step_2.biteCount_2]];
                        data.HTML_target.style.background = this.getColorEffectValue(color_1, 1)

                    }
                }
                else {
                    //i_Step_2.nowUpArray=JSON.parse(JSON.stringify(i_Step_2.nowUpArray)).reverse();
                    i_Step_2.nowFrames = 0;
                    i_Step.animationStep=0;
                    i_Step_2.pushCount = 0;
                    i_Step_2.biteCount = 0;
                    i_Step_2.biteCount_2 = 3;
                    i_Step_2.loopType = 0;
                }
                // if(i_Step_2.nowFrames>=9)
                // clearInterval(this.stopVar[setTempName]);

            }

           
        }, effectData.repeatTime);
        console.log('%c mode_Pac_Man','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName);
    }
    
    mode_Tide(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var animationStep=0;
        var posindex = 0;
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            })
        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
        }
        var totalInnerUpArray=this.totalInnerUpArray(4);
        var totalInnerDownArray=this.totalInnerDownArray(4);
        var totalOuterUpArray=this.totalOuterUpArray(4);
        var totalOuterDownArray=this.totalOuterDownArray(4);
        if (Mode != "Outer") {
            var step2={
                upValue:[-1,totalInnerUpArray.length],
                downValue:[-1,totalInnerUpArray.length],
                loopCount:0,
            }
            this.stopVar[TempName[0]] = setInterval(() => {
                if (animationStep == 0) {
                    if (step2.upValue[0] < totalInnerUpArray.length / 2 - 1) {
                        step2.upValue[0] += 1;
                        step2.upValue[1] -= 1;
                        step2.downValue[0] += 1;
                        step2.downValue[1] -= 1;
                        //console.log('%c mode_Tide', 'color:rgb(255,77,255)', step2.upValue[0]);  
                        var setcolor =colorArrays[step2.loopCount].getRGBA();
                        var data = reInnerTempData[totalInnerUpArray[step2.upValue[0]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reInnerTempData[totalInnerUpArray[step2.upValue[1]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reInnerTempData[totalInnerDownArray[step2.downValue[0]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reInnerTempData[totalInnerDownArray[step2.downValue[1]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                    }
                    else {
                        step2.upValue = [-1, totalInnerUpArray.length];
                        step2.downValue = [-1, totalInnerDownArray.length];
                        if (step2.loopCount < 3) {
                            step2.loopCount += 1;
                        }
                        else {
                            step2.loopCount = 0;
                        }
                    }
                }
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            var I_step2={
                upValue:[-1,totalOuterUpArray.length],
                downValue:[-1,totalOuterDownArray.length],
                loopCount:0,
            }
            this.stopVar[TempName[1]] = setInterval(() => {
                if (animationStep == 0) {
                    if (I_step2.upValue[0] < totalOuterUpArray.length / 2 - 1) {
                        I_step2.upValue[0] += 1;
                        I_step2.upValue[1] -= 1;
                        I_step2.downValue[0] += 1;
                        I_step2.downValue[1] -= 1;
                        //console.log('%c mode_Tide', 'color:rgb(255,77,255)', I_step2.upValue[0]);  
                        var setcolor =colorArrays[I_step2.loopCount].getRGBA();
                        var data = reOuterTempData[totalOuterUpArray[I_step2.upValue[0]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reOuterTempData[totalOuterUpArray[I_step2.upValue[1]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reOuterTempData[totalOuterDownArray[I_step2.downValue[0]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                        var data = reOuterTempData[totalOuterDownArray[I_step2.downValue[1]]];
                        data.HTML_target.style.background = this.getColorEffectValue(setcolor, 1)
                    }
                    else {
                        I_step2.upValue = [-1, totalOuterUpArray.length];
                        I_step2.downValue = [-1, totalOuterDownArray.length];
                        if (I_step2.loopCount < 3) {
                            I_step2.loopCount += 1;
                        }
                        else {
                            I_step2.loopCount = 0;
                        }
                    }
                }
            }, effectData.repeatTime);
        }
        console.log('%c mode_Tide','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
    }
    mode_Tide2(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        for (let index = 1; index < innerArr.length + 1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray = this.totalOuterDownArray(fanUpNumber);
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
        }

        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:12,
            tempUpArray: [],
            part:4,
            maxArrlen:6*fanUpNumber/2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
        }
        // for (let index = 0; index < 12*fanUpNumber/2; index++) {
        //     o_Step.tempUpArray.push([0, 0, 0, 0]);
        // }
        // for (let c_index = 0; c_index < colorArrays.length; c_index++) {
        //     for (let index = 0; index < 12*fanUpNumber/2; index++) {
        //         o_Step.tempUpArray.push(colorArrays[c_index].getRGBA());
        //     }
        // }

        // o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));

        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:12,
            tempUpArray: [],
            part:4,
            maxArrlen:4*fanUpNumber/2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
        }
        // for (let index = 0; index < 4*fanUpNumber/2; index++) {
        //     i_Step.tempUpArray.push([0, 0, 0, 0]);
        // }
        // for (let c_index = 0; c_index < colorArrays.length; c_index++) {
        //     for (let index = 0; index < 4*fanUpNumber/2; index++) {
        //         i_Step.tempUpArray.push(colorArrays[c_index].getRGBA());
        //     }
        // }
        // i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }
        // console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray)
        // console.log('%c  i_Step.tempUpArray', 'color:rgb(255,77,255)', i_Step.tempUpArray)
        //console.log('%c i_step2.nowUpArray', 'color:rgb(255,77,255)', i_Step.nowUpArray
        //console.log('%c  loopArrDisplacementAssignSpacing', 'color:rgb(255,77,255)', this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,2));
        this.stopVar[setTempName] = setInterval(() => {
            var setRange=Math.ceil (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
            if (i_Step.animationStep == 0) {
                var set_C=colorArrays[i_Step.setColorindex].getRGBA();
                var rightUpArr = JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                for (let index = 0; index < totalInnerUpArray.length / 2; index++) {
                    if(index<setRange){
                        var data = reInnerTempData[totalInnerUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                        var data = reInnerTempData[totalInnerDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                        var data = reInnerTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                        var data = reInnerTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                    }
                }
                if (i_Step.loopDirection % 2 == 0) {
                    //i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else{
                        i_Step.nowFrames=0;
                        if(i_Step.setColorindex<colorArrays.length-1){
                            i_Step.setColorindex+=1;
                        }
                        else{
                            i_Step.setColorindex=0;
                        }
                        //i_Step.tempUpArray = JSON.parse(JSON.stringify(i_Step.nowUpArray));
                        //i_Step.loopDirection +=1;
                    }
                }
                else {
                    //i_Step.animationStep = 1;
                    //i_Step.loopDirection =0;
                }
               
            }
            var setRange2=Math.ceil(o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);

            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                var set_C2=colorArrays[o_Step.setColorindex].getRGBA();
                //console.log('%c  setRange2', 'color:rgb(255,77,255)', setRange2)
                console.log('%c  setRange', 'color:rgb(255,77,255)', setRange,setRange2)
                var rightUpArr = JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                for (let index = 0; index < totalOuterUpArray.length / 2; index++) {
                    if(index<setRange2){
                        var data = reOuterTempData[totalOuterUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C2, 1)
                        var data = reOuterTempData[totalOuterDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C2, 1)
                        var data = reOuterTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C2, 1)
                        var data = reOuterTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C2, 1)
                    }
                }
                if (o_Step.nowFrames < o_Step.maxframes) {
                    o_Step.nowFrames += 1;
                }
                else{
                    o_Step.nowFrames=0;
                    if(o_Step.setColorindex<colorArrays.length-1){
                        o_Step.setColorindex+=1;
                    }
                    else{
                        o_Step.setColorindex=0;
                    }
                    //o_Step.tempUpArray = JSON.parse(JSON.stringify(o_Step.nowUpArray));
                    //o_Step.loopDirection +=1;
                }     
            }
        }, effectData.repeatTime);
        //console.log('%c mode_Mixing','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);
    }
    mode_Staggered(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var posindex = 0;
        var fanUpNumber = 4;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:12,
            tempUpArray: [],
            part:4,
            maxArrlen:6*fanUpNumber/2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:[[1,2],[0,3]],
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:12,
            tempUpArray: [],
            part:4,
            maxArrlen:4*fanUpNumber/2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:[[0,3],[1,2]],
        }
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }
        // console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray)
        // console.log('%c  i_Step.tempUpArray', 'color:rgb(255,77,255)', i_Step.tempUpArray)
        this.stopVar[setTempName] = setInterval(() => {
            var setRange=Math.ceil (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
            if (i_Step.animationStep == 0) {
                var set_C=colorArrays[i_Step.setColorindex].getRGBA();
                var nowModSetp=i_Step.loopDirection % 2;  
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data_4_List = reInnerTempData[dindex];
                    //console.log('%c compareArr','color:rgb(255,77,255)',compareArr);
                    for (let c_index = 0; c_index < data_4_List.length; c_index++) {
                        var data_4 = data_4_List[c_index];    
                        data_4.HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1);
                    }    
                    var o_data_4_List = reOuterTempData[dindex];
                    //console.log('%c compareArr','color:rgb(255,77,255)',compareArr);
                    for (let c_index = 0; c_index < o_data_4_List.length; c_index++) {
                        var data_4 = o_data_4_List[c_index];    
                        data_4.HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1);
                    }    

                }

                var compareArr=i_Step.loopPos[nowModSetp];

                console.log('%c compareArr','color:rgb(255,77,255)',compareArr);
                for (let index = 0; index < compareArr.length; index++) {
                    var comparePos = compareArr[index];
                    var setList = reInnerTempData[comparePos];
                    for (let dindex = 0; dindex < setList.length; dindex++) {
                        var data_4 = setList[dindex];
                        data_4.HTML_target.style.background = this.getColorEffectValue(set_C, 1);
                    }
                  

                }
                var o_compareArr=o_Step.loopPos[nowModSetp];

                console.log('%c o_compareArr','color:rgb(255,77,255)',o_compareArr);
                for (let index = 0; index < o_compareArr.length; index++) {
                    var comparePos = o_compareArr[index];
                    var setList = reOuterTempData[comparePos];
                    for (let dindex = 0; dindex < setList.length; dindex++) {
                        var data_4 = setList[dindex];
                        data_4.HTML_target.style.background = this.getColorEffectValue(set_C, 1);
                    }
                } 
                i_Step.loopDirection+=1;
                if (i_Step.loopDirection%2==0) {
                    if(i_Step.setColorindex<colorArrays.length-1){
                        i_Step.setColorindex+=1;
                    }
                    else{
                        i_Step.setColorindex=0;
                    }
                }
               
            }
            //var setRange2=Math.ceil(o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);

        }, effectData.repeatTime);
        //console.log('%c mode_Staggered','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);
    }
    mode_Mixing(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber=4;
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            })
        }

        var totalInnerUpArray=this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray=this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray=this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray=this.totalOuterDownArray(fanUpNumber);
        if (Mode != "Outer") {
            var i_Step={
                loopCount:0,
                loopDirection:0,
                tempUpArray:[],
                nowUpArray:[],
                setColor:colorArrays[0].getRGBA(),
                animationStep:0,
            }
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            for (let index = 0; index < fanUpNumber*4/2; index++) {
                i_Step.tempUpArray.push([0,0,0,0]);
            }
            var part=4;
            for (let index = 1; index <=part; index++) {
                i_Step.tempUpArray.push(this.gerRGB_Alpha(i_Step.setColor,index*1/part));
            }
            i_Step.tempUpArray.push([0, 0, 0, 0]);
            i_Step.tempUpArray.push([0, 0, 0, 0]);
            i_Step.tempUpArray.push([0, 0, 0, 0]);
            i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.tempUpArray));
            //i_Step.tempUpArray=[];
            var i_step2 = {
                loopCount: 0,
                loopDirection: 0,
                tempUpArray: [],
                nowUpArray: [],
            }
            //var addColorindex=0;
            for (let index = 0; index < totalInnerUpArray.length/2; index++) {
                i_step2.tempUpArray.push([0, 0, 0, 0]);
            }
            var getColorMixing = this.getColorMixing([colorArrays[0].getRGBA(), colorArrays[1].getRGBA()]);
            for (let index = 0; index < totalInnerUpArray.length/2; index++) {
                i_step2.tempUpArray.push(getColorMixing);
            }
            i_step2.tempUpArray.push([0, 0, 0, 0]);
            i_step2.tempUpArray.push([0, 0, 0, 0]);
            i_step2.tempUpArray.push([0, 0, 0, 0]);
            i_step2.nowUpArray=JSON.parse(JSON.stringify(i_step2.tempUpArray));
            console.log('%c   i_step2.nowUpArray','color:rgb(255,77,255)',  i_step2.nowUpArray);

            //var _this=this;
            this.stopVar[TempName[0]] = setInterval(() => {
                if (i_Step.animationStep == 0) {
                    if(i_Step.loopDirection%2==0){
                        i_Step.tempUpArray = this.loopArrDisplacement(2, i_Step.tempUpArray);
                        if(i_Step.loopCount>totalInnerUpArray.length/2+6){
                            i_Step.loopCount=0;
                            i_Step.loopDirection+=1;
                        }
                    }
                    else{
                        i_Step.loopDirection=0;
                        i_Step.tempUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray));
                        i_Step.animationStep=1;
                    }
                    for (let index = 0; index < totalInnerUpArray.length/2; index++) {
                        var data = reInnerTempData[totalInnerUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                        var data = reInnerTempData[totalInnerDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    }
                    var rightUpArr=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                    var rightDownArr=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                    for (let index = 0; index < totalInnerUpArray.length/2; index++) {
                        var set_C=colorArrays[1].getRGBA();
                        if(i_Step.tempUpArray[index]!=[0,0,0,0]){
                            set_C[3]=i_Step.tempUpArray[index][3];
                        }
                        else{
                            set_C=[0,0,0,0];
                        }
                        var data = reInnerTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                        var data = reInnerTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                    }
                    i_Step.loopCount+=1;
                    // if( i_Step.loopCount>5)
                    // clearInterval(this.stopVar[TempName[0]]);

                }
                else{
                    if(i_step2.loopDirection%2==0){
                        i_step2.tempUpArray = this.loopArrDisplacement(1, i_step2.tempUpArray);
                        //i_step2.tempUpArray = this.loopArrDisplacement(1, i_step2.tempUpArray);
                        if(i_step2.loopCount>totalInnerUpArray.length){
                            i_step2.loopCount=0;
                            i_step2.loopDirection+=1;
                        }
                    }
                    else{
                        i_step2.loopDirection=0;
                        i_step2.tempUpArray=JSON.parse(JSON.stringify(i_step2.nowUpArray));
                        i_Step.animationStep=0;
                    }
                    var rightUpArr=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                    var rightDownArr=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                    for (let index = 0; index < totalInnerUpArray.length/2; index++) {
                        var data = reInnerTempData[totalInnerUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                        var data = reInnerTempData[totalInnerDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                        var data = reInnerTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                        var data = reInnerTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                    }
                    i_step2.loopCount+=1;
                }
                console.log('%c mode_Mixing','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);
            }, effectData.repeatTime);

        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
        }
        if (Mode != "Inner") {
            var o_Step={
                loopCount:0,
                loopDirection:0,
                tempUpArray:[],
                nowUpArray:[],
                setColor:colorArrays[0].getRGBA(),
                animationStep:0,
            }
            o_Step.tempUpArray.push([0,0,0,0]);
            o_Step.tempUpArray.push([0,0,0,0]);
            o_Step.tempUpArray.push([0,0,0,0]);
            for (let index = 0; index < fanUpNumber*12/2; index++) {
                o_Step.tempUpArray.push([0,0,0,0]);
            }
            var part=6;
            for (let index = 1; index <= part; index++) {
                o_Step.tempUpArray.push(this.gerRGB_Alpha(o_Step.setColor,index*1/part));
            }
            o_Step.tempUpArray.push([0, 0, 0, 0]);
            o_Step.tempUpArray.push([0, 0, 0, 0]);
            o_Step.tempUpArray.push([0, 0, 0, 0]);
            o_Step.nowUpArray=JSON.parse(JSON.stringify(o_Step.tempUpArray));
            //o_Step.tempUpArray=[];
            var o_Step2 = {
                loopCount: 0,
                loopDirection: 0,
                tempUpArray: [],
                nowUpArray: [],
            }
            //var addColorindex=0;       
            for (let index = 0; index < fanUpNumber * 12 / 4; index++) {
                o_Step2.tempUpArray.push([0, 0, 0, 0]);
            }
            var getColorMixing = this.getColorMixing([colorArrays[0].getRGBA(), colorArrays[1].getRGBA()]);
            for (let index = 0; index < fanUpNumber * 12 / 4; index++) {
                o_Step2.tempUpArray.push(getColorMixing);
            }
            o_Step2.tempUpArray.push([0, 0, 0, 0]);
            o_Step2.tempUpArray.push([0, 0, 0, 0]);
            o_Step2.tempUpArray.push([0, 0, 0, 0]);
            // for (let index = 0; index < fanUpNumber * 12 / 2; index++) {
            //     o_Step2.tempUpArray.push([0, 0, 0, 0]);
            // }
            o_Step2.nowUpArray=JSON.parse(JSON.stringify(o_Step2.tempUpArray));
            this.stopVar[TempName[1]] = setInterval(() => {
                if (o_Step.animationStep == 0) {
                    if(o_Step.loopDirection%2==0){
                        o_Step.tempUpArray = this.loopArrDisplacement(2, o_Step.tempUpArray);
                        if(o_Step.loopCount>totalOuterUpArray.length/2+6){
                            o_Step.loopCount=0;
                            o_Step.loopDirection+=1;
                        }
                    }
                    else{
                        o_Step.loopDirection=0;
                        o_Step.tempUpArray=JSON.parse(JSON.stringify(o_Step.nowUpArray));
                        o_Step.animationStep=1;
                    }
                    for (let index = 0; index < totalOuterUpArray.length/2; index++) {
                        console.log('%c  o_Step.tempUpArray','color:rgb(255,77,255)', o_Step.tempUpArray[index]);

                        var data = reOuterTempData[totalOuterUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                        var data = reOuterTempData[totalOuterDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    }
                    var rightUpArr=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                    var rightDownArr=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                    for (let index = 0; index < totalOuterUpArray.length/2; index++) {
                        var set_C=colorArrays[1].getRGBA();
                        if(o_Step.tempUpArray[index]!=[0,0,0,0]){
                            set_C[3]=o_Step.tempUpArray[index][3];
                        }
                        else{
                            set_C=[0,0,0,0];
                        }
                        var data = reOuterTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                        var data = reOuterTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                    }
                    o_Step.loopCount+=1;
                }
                else{
                    if(o_Step2.loopDirection%2==0){
                        o_Step2.tempUpArray = this.loopArrDisplacement(1, o_Step2.tempUpArray);
                        //o_Step2.tempUpArray = this.loopArrDisplacement(1, o_Step2.tempUpArray);
                        if(o_Step2.loopCount>totalOuterUpArray.length){
                            o_Step2.loopCount=0;
                            o_Step2.loopDirection+=1;
                        }
                    }
                    else{
                        o_Step2.loopDirection=0;
                        o_Step2.tempUpArray=JSON.parse(JSON.stringify(o_Step2.nowUpArray));
                        o_Step.animationStep=0;
                    }
                    var rightUpArr=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                    var rightDownArr=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                    for (let index = 0; index < totalOuterUpArray.length/2; index++) {
                        var data = reOuterTempData[totalOuterUpArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                        var data = reOuterTempData[totalOuterDownArray[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                        var data = reOuterTempData[rightUpArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                        var data = reOuterTempData[rightDownArr[index]];
                        data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                    }

                    o_Step2.loopCount+=1;
                }
            }, effectData.repeatTime);
        }
        //console.log('%c mode_Mixing','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);
    }
    mode_Mixing2(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        for (let index = 1; index < innerArr.length + 1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
         

        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray = this.totalOuterDownArray(fanUpNumber);
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
        }



        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:(6*fanUpNumber/2)+3,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < 12*fanUpNumber/2; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        var part = 3;
        for (let index = 1; index <= part; index++) {
            o_Step.tempUpArray.push(this.gerRGB_Alpha(o_Step.setColor, index * 1 / part));
        }
        o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));


        var o_Step2 = {
            nowFrames: 2,
            loopDirection: 0,
            maxframes:10,
            tempUpArray: [],
            part:4,
            maxArrlen:(fanUpNumber*6)+3,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < fanUpNumber * 6/2 ; index++) {
            o_Step2.tempUpArray.push([0, 0, 0, 0]);
        }
        var getColorMixing = this.getColorMixing([colorArrays[0].getRGBA(), colorArrays[1].getRGBA()]);
        for (let index = 0; index < fanUpNumber*6/2; index++) {
            o_Step2.tempUpArray.push(getColorMixing);
        }
        o_Step2.nowUpArray = JSON.parse(JSON.stringify(o_Step2.tempUpArray));
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:(4*fanUpNumber/2),
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < 4*fanUpNumber/2; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 1; index <= i_Step.part; index++) {
            i_Step.tempUpArray.push(this.gerRGB_Alpha(i_Step.setColor, index * 1 / i_Step.part));
        }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));



        var i_step2 = {
            nowFrames: 2,
            loopDirection: 0,
            maxframes:10,
            tempUpArray: [],
            part:4,
            maxArrlen:(4*fanUpNumber),            
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep:8888,
        }
        for (let index = 0; index < 4*fanUpNumber/2; index++) {
            i_step2.tempUpArray.push([0, 0, 0, 0]);
        }

        var getColorMixing = this.getColorMixing([colorArrays[0].getRGBA(), colorArrays[1].getRGBA()]);
        for (let index = 0; index < 4*fanUpNumber/2; index++) {
            i_step2.tempUpArray.push(getColorMixing);
        }
        i_step2.nowUpArray = JSON.parse(JSON.stringify(i_step2.tempUpArray));
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }
        //o_Step.animationStep = 1;
        this.stopVar[setTempName] = setInterval(() => {
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange = Math.round(o_Step.nowFrames * (o_Step.maxArrlen) / o_Step.maxframes);
                    //console.log('%c  o_Step.setRange', 'color:rgb(255,77,255)', setRange);
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2, o_Step.nowUpArray, setRange);
                    if (o_Step.nowFrames < o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else {
                        o_Step.nowFrames = 0;
                        o_Step.loopDirection += 1;
                        o_Step.tempUpArray = JSON.parse(JSON.stringify(o_Step.nowUpArray));
                    }
                }
                else {
                    o_Step.animationStep = 1;
                    o_Step.loopDirection = 0;
                }
                for (let index = 0; index < totalOuterUpArray.length / 2; index++) {
                    var data = reOuterTempData[totalOuterUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    var data = reOuterTempData[totalOuterDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                }
                var rightUpArr = JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                for (let index = 0; index < totalOuterUpArray.length / 2; index++) {
                    var set_C = colorArrays[1].getRGBA();
                    if (o_Step.tempUpArray[index] != [0, 0, 0, 0]) {
                        set_C[3] = o_Step.tempUpArray[index][3];
                    }
                    else {
                        set_C = [0, 0, 0, 0];
                    }
                    var data = reOuterTempData[rightUpArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                    var data = reOuterTempData[rightDownArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                }
            }
            if (o_Step.animationStep == 1) {
                if (o_Step2.loopDirection % 2 == 0) {
                    var setRange = Math.round(o_Step2.nowFrames * (o_Step2.maxArrlen) / o_Step2.maxframes);
                    o_Step2.tempUpArray = this.loopArrDisplacementAssignSpacing(1, o_Step2.nowUpArray, setRange);
                    //console.log('%c  o_Step.setRange', 'color:rgb(255,77,255)', setRange);

                    if (o_Step2.nowFrames < o_Step2.maxframes) {
                        o_Step2.nowFrames += 1;
                    }
                    else {
                        o_Step2.nowFrames = 0;
                        o_Step2.loopDirection += 1;
                        o_Step2.tempUpArray = JSON.parse(JSON.stringify(o_Step2.nowUpArray));
                    }
                }
                else {
                    o_Step.animationStep = 0;
                    o_Step2.loopDirection = 0;
                }
                var rightUpArr = JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                for (let index = 0; index < totalOuterUpArray.length / 2; index++) {
                    var data = reOuterTempData[totalOuterUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                    var data = reOuterTempData[totalOuterDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                    var data = reOuterTempData[rightUpArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                    var data = reOuterTempData[rightDownArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step2.tempUpArray[index], 1)
                }
            }
            //------------i_Step--------/////////////
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange = Math.round(i_Step.nowFrames * (i_Step.maxArrlen) / i_Step.maxframes);
                    // if(isNaN(setRange)){
                    // console.log('%c i_step_isNaN', 'color:rgb(255,77,255)',i_Step);
                    //   clearInterval(this.stopVar[TempName[2]]); 
                    // }
                    // console.log('%c  setRange', 'color:rgb(255,77,255)',setRange,i_Step);
                    // console.log('%c i_step_setRange', 'color:rgb(255,77,255)',setRange,i_Step);

                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2, i_Step.nowUpArray, setRange);
                    if (i_Step.nowFrames < i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else {
                        i_Step.nowFrames = 0;
                        //i_Step.tempUpArray = JSON.parse(JSON.stringify(i_Step.nowUpArray));
                        i_Step.loopDirection += 1;
                    }
                }
                else {
                    i_Step.animationStep = 1;
                    i_Step.loopDirection = 0;
                }
                for (let index = 0; index < totalInnerUpArray.length / 2; index++) {
                    var data = reInnerTempData[totalInnerUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    var data = reInnerTempData[totalInnerDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
                var rightUpArr = JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                for (let index = 0; index < totalInnerUpArray.length / 2; index++) {
                    var set_C = colorArrays[1].getRGBA();
                    if (i_Step.tempUpArray[index] != [0, 0, 0, 0]) {
                        set_C[3] = i_Step.tempUpArray[index][3];
                    }
                    else {
                        set_C = [0, 0, 0, 0];
                    }
                    var data = reInnerTempData[rightUpArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                    var data = reInnerTempData[rightDownArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(set_C, 1)
                }
                // if( i_Step.loopCount>5)
                // clearInterval(this.stopVar[TempName[0]]);
            }
            if (i_Step.animationStep == 1) {
                if (i_step2.loopDirection % 2 == 0) {
                    var setRange = Math.round(i_step2.nowFrames * (i_step2.maxArrlen) / i_step2.maxframes);
                    //   clearInterval(this.stopVar[TempName[2]]); 
                    //console.log('%c i_step2_setRange', 'color:rgb(255,77,255)', setRange, i_step2);
                    i_step2.tempUpArray = this.loopArrDisplacementAssignSpacing(1, i_step2.nowUpArray, setRange);
                    if (i_step2.nowFrames < i_step2.maxframes) {
                        i_step2.nowFrames += 1;
                    }
                    else {
                        i_step2.nowFrames = 0;
                        i_step2.tempUpArray = JSON.parse(JSON.stringify(i_step2.nowUpArray));
                        i_step2.loopDirection += 1;
                    }
                }
                else {
                    i_Step.animationStep = 0;
                    i_step2.loopDirection = 0;
                }
                var rightUpArr = JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                var rightDownArr = JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                for (let index = 0; index < totalInnerUpArray.length / 2; index++) {
                    var data = reInnerTempData[totalInnerUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                    var data = reInnerTempData[totalInnerDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                    var data = reInnerTempData[rightUpArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                    var data = reInnerTempData[rightDownArr[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_step2.tempUpArray[index], 1)
                }
            }


        }, effectData.repeatTime);
        //console.log('%c mode_Mixing','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);
    }

    getColorMixing(RGBAList=[]){

        var RGBAMixing=[0,0,0,1];
        for (let index = 0; index < RGBAList.length; index++) {
            const element = RGBAList[index];
            RGBAMixing[0]+=element[0];
            RGBAMixing[1]+=element[1];
            RGBAMixing[2]+=element[2];
        }
        console.log('%c RGBAMixing','color:rgb(255,77,255)',RGBAMixing,RGBAList);

        for (let index = 0; index < RGBAMixing.length-1; index++) {
            const element = RGBAMixing[index];
            RGBAMixing[index]=RGBAMixing[index]/RGBAMixing.length;
        }
        return RGBAMixing;
    }
    mode_Contest(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        // var total_CrossOut_UPArr = this.total_CrossOut_UPArr(fanUpNumber);
        // var total_CrossOut_DownArr = this.total_CrossOut_DownArr(fanUpNumber);
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.total_CrossOut_UPArr(0);
        var totalOuterDownArray = this.total_CrossOut_DownArr(0);
        for (let index = 1; index < innerArr.length + 1; index++) {
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:24,
            tempUpArray: [],
            tempDownArray:[],
            part:4,
            maxArrlen:6*fanUpNumber+6,
            nowUpArray: [],
            nowDownArray: [],
            setColor: colorArrays[1].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            o_Step.tempUpArray.push(this.gerRGB_Alpha(colorArrays[1].getRGBA(), index * 1 / part));
        }
        for (let index = 0; index < 6; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }

        o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));

        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempDownArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            o_Step.tempDownArray.push(this.gerRGB_Alpha(colorArrays[2].getRGBA(), index * 1 / part));
        }
        for (let index = 0; index < 6; index++) {
            o_Step.tempDownArray.push([0, 0, 0, 0]);
        }
        o_Step.nowDownArray = JSON.parse(JSON.stringify(o_Step.tempDownArray));





        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:24,
            tempUpArray: [],
            tempDownArray: [],
            part:4,
            maxArrlen:4*fanUpNumber+4,
            nowUpArray: [],
            nowDownArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 1; index <= i_Step.part; index++) {
            i_Step.tempUpArray.push(this.gerRGB_Alpha(colorArrays[0].getRGBA(), index * 1 / i_Step.part));
        }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));


        // for (let index = 0; index < i_Step.maxArrlen; index++) {
        //     i_Step.tempDownArray.push([0, 0, 0, 0]);
        // }
        // for (let index = 1; index <= i_Step.part; index++) {
        //     i_Step.tempDownArray.push(this.gerRGB_Alpha(colorArrays[2].getRGBA(), index * 1 / i_Step.part));
        // }
        // i_Step.nowDownArray = JSON.parse(JSON.stringify(i_Step.tempDownArray));



        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }

            if(effectData.direction==1){
                totalInnerUpArray=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                totalInnerDownArray=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                totalOuterUpArray=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                totalOuterDownArray=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
            }
            else{

            }
            

        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else{
                        //i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray)).reverse();

                        i_Step.nowFrames=0;
                    }
                }
                for (let index = 0; index < totalInnerUpArray.length; index++) {
                    var data = reInnerTempData[totalInnerUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    var data = reInnerTempData[totalInnerDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
              
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange2=Math.round (o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowUpArray,setRange2);
                    o_Step.tempDownArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowDownArray,setRange2);
                    if (o_Step.nowFrames <  o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else{
                        o_Step.nowFrames=0;
                        //o_Step.nowUpArray=JSON.parse(JSON.stringify(o_Step.nowUpArray)).reverse();

                        // o_Step.loopDirection +=1;
                        // o_Step.tempUpArray = JSON.parse(JSON.stringify(o_Step.nowUpArray));
                    }
                }
                else {
                    // o_Step.animationStep = 1;
                    // o_Step.loopDirection =0;
                }
                for (let index = 0; index < totalOuterUpArray.length; index++) {
                    //console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray[index]);
                    var data = reOuterTempData[totalOuterUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    var data = reOuterTempData[totalOuterDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempDownArray[index], 1)
                }
              
            }
        }, effectData.repeatTime);
        
        console.log('%c mode_Contest','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
    }
    mode_Contest_Sync(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 16;
        // var total_CrossOut_UPArr = this.total_CrossOut_UPArr(fanUpNumber);
        // var total_CrossOut_DownArr = this.total_CrossOut_DownArr(fanUpNumber);
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.total_CrossOut_UPArr(4);
        var totalOuterDownArray = this.total_CrossOut_DownArr(4);


        var i_Sync_ReorganizationData=[];
        for (let index = 0; index < i_SyncBlock_4_Class_Id.length; index++) {
            var i_HTML_4 = document.getElementsByClassName(i_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;

            for (let index_HTML = 0; index_HTML < i_HTML_4.length; index_HTML++) {
                i_Sync_ReorganizationData.push(i_HTML_4[index_HTML]);
            }
            //i_Sync_ReorganizationData= i_HTML_4.concat(i_HTML_4);
        }
        var o_Sync_ReorganizationData=[];
        for (let index = 0; index < o_SyncBlock_4_Class_Id.length; index++) {
            var i_HTML_4 = document.getElementsByClassName(o_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;
            //o_Sync_ReorganizationData= o_Sync_ReorganizationData.concat(i_HTML_4);
            for (let index_HTML = 0; index_HTML < i_HTML_4.length; index_HTML++) {
                o_Sync_ReorganizationData.push(i_HTML_4[index_HTML]);
            }
        }
        console.log('%c i_Sync_ReorganizationData','color:rgb(255,77,255)',i_Sync_ReorganizationData);
        console.log('%c o_Sync_ReorganizationData','color:rgb(255,77,255)',o_Sync_ReorganizationData);
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:24*4,
            tempUpArray: [],
            tempDownArray:[],
            part:4,
            maxArrlen:6*fanUpNumber+6,
            nowUpArray: [],
            nowDownArray: [],
            setColor: colorArrays[1].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            o_Step.tempUpArray.push(this.gerRGB_Alpha(colorArrays[1].getRGBA(), index * 1 / part));
        }
        for (let index = 0; index < 6; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }

        o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));

        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempDownArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            o_Step.tempDownArray.push(this.gerRGB_Alpha(colorArrays[2].getRGBA(), index * 1 / part));
        }
        for (let index = 0; index < 6; index++) {
            o_Step.tempDownArray.push([0, 0, 0, 0]);
        }
        o_Step.nowDownArray = JSON.parse(JSON.stringify(o_Step.tempDownArray));





        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:24*4,
            tempUpArray: [],
            tempDownArray: [],
            part:4,
            maxArrlen:4*fanUpNumber+4,
            nowUpArray: [],
            nowDownArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 1; index <= i_Step.part; index++) {
            i_Step.tempUpArray.push(this.gerRGB_Alpha(colorArrays[0].getRGBA(), index * 1 / i_Step.part));
        }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }

            if(effectData.direction==1){
                totalInnerUpArray=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                totalInnerDownArray=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                totalOuterUpArray=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                totalOuterDownArray=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
            }
            else{

            }
            

        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    //console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else{
                        //i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray)).reverse();

                        i_Step.nowFrames=0;
                    }
                }
                for (let index = 0; index < totalInnerUpArray.length; index++) {
                    var data = i_Sync_ReorganizationData[totalInnerUpArray[index]];
                    data.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    var data = i_Sync_ReorganizationData[totalInnerDownArray[index]];
                    data.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
              
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange2=Math.round (o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowUpArray,setRange2);
                    o_Step.tempDownArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowDownArray,setRange2);
                    if (o_Step.nowFrames <  o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else{
                        o_Step.nowFrames=0;
                    }
                }
                else {
                    // o_Step.animationStep = 1;
                    // o_Step.loopDirection =0;
                }
                for (let index = 0; index < totalOuterUpArray.length; index++) {
                    //console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray[index]);
                    var data = o_Sync_ReorganizationData[totalOuterUpArray[index]];
                    data.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    var data = o_Sync_ReorganizationData[totalOuterDownArray[index]];
                    data.style.background = this.getColorEffectValue(o_Step.tempDownArray[index], 1)
                }
              
            }
        }, effectData.repeatTime);
        
        console.log('%c mode_Contest','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
    }
    mode_Scan(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var animationStep=0;
        var posindex = 0;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: innerArr[index-1],
            })
        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
        }
        var fanUpNumber=4;
        var totalInnerUpArray=this.totalInnerUpArray(4);
        var totalInnerDownArray=this.totalInnerDownArray(4);
        var totalOuterUpArray=this.totalOuterUpArray(4);
        var totalOuterDownArray=this.totalOuterDownArray(4);

        for (let index = 1; index < totalInnerUpArray.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: innerArr[index-1],
            })
        }
        var loopCount=0;
        var loopDirection=0;
        if (Mode != "Outer") {
            var i_Step={
                loopCount:0,
                loopDirection:0,
                tempUpArray:[],
            }
            var setColor=colorArrays[0].getRGBA();
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            for (let index = 0; index < fanUpNumber*8/2; index++) {
                i_Step.tempUpArray.push([0,0,0,0]);
            }
            i_Step.tempUpArray.push(this.gerRGB_Alpha(setColor,0.25));
            i_Step.tempUpArray.push(this.gerRGB_Alpha(setColor,0.5));
            i_Step.tempUpArray.push(this.gerRGB_Alpha(setColor,0.75));
            i_Step.tempUpArray.push(this.gerRGB_Alpha(setColor,1));
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            i_Step.tempUpArray.push([0,0,0,0]);
            this.stopVar[TempName[0]] = setInterval(() => {
                if(i_Step.loopDirection%2==0){
                    i_Step.tempUpArray = this.loopArrDisplacement(2, i_Step.tempUpArray);
                    if(i_Step.loopCount>totalInnerUpArray.length+6){
                        i_Step.loopCount=0;
                        i_Step.loopDirection+=1;
                    }
                }
                else{
                    i_Step.tempUpArray = this.loopArrDisplacement(1, i_Step.tempUpArray);
                    if(i_Step.loopCount>totalInnerUpArray.length+6){
                        i_Step.loopCount=0;
                        i_Step.loopDirection+=1;
                    }
                }

                for (let index = 0; index < totalInnerUpArray.length; index++) {
                    var data = reInnerTempData[totalInnerUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
                for (let index = 0; index < totalInnerDownArray.length; index++) {
                    var data = reInnerTempData[totalInnerDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
                i_Step.loopCount+=1;
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            var o_step={
                loopCount:0,
                loopDirection:0,
                tempUpArray:[],
            }
            var setColor=colorArrays[0].getRGBA();
            o_step.tempUpArray.push([0,0,0,0]);
            o_step.tempUpArray.push([0,0,0,0]);
            o_step.tempUpArray.push([0,0,0,0]);
            for (let index = 0; index < fanUpNumber*12/2; index++) {
                o_step.tempUpArray.push([0,0,0,0]);
            }
            for (let index = 1; index < 6; index++) {
                o_step.tempUpArray.push(setColor);
                //o_step.tempUpArray.push(this.gerRGB_Alpha(setColor,index*1/6));
            }
            o_step.tempUpArray.push([0,0,0,0]);
            o_step.tempUpArray.push([0,0,0,0]);
            o_step.tempUpArray.push([0,0,0,0]);
            this.stopVar[TempName[1]] = setInterval(() => {
                if(o_step.loopDirection%2==0){
                    o_step.tempUpArray = this.loopArrDisplacement(2, o_step.tempUpArray);
                    if(o_step.loopCount>totalOuterUpArray.length+6){
                        o_step.loopCount=0;
                        o_step.loopDirection+=1;
                    }
                }
                else{
                    o_step.tempUpArray = this.loopArrDisplacement(1, o_step.tempUpArray);
                    if(o_step.loopCount>totalOuterUpArray.length+6){
                        o_step.loopCount=0;
                        o_step.loopDirection+=1;
                    }
                }

                for (let index = 0; index < totalOuterUpArray.length; index++) {
                    var data = reOuterTempData[totalOuterUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_step.tempUpArray[index], 1)
                }
                for (let index = 0; index < totalOuterDownArray.length; index++) {
                    var data = reOuterTempData[totalOuterDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_step.tempUpArray[index], 1)
                }
                o_step.loopCount+=1;
            }, effectData.repeatTime);
        }
        console.log('%c mode_Scan','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
    }
    mode_Scan2(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var posindex = 0;
        var fanUpNumber = 4;
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray = this.totalOuterDownArray(fanUpNumber);
        for (let index = 1; index < innerArr.length + 1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            })
        }
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
        }



        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:6*fanUpNumber+6,
            nowUpArray: [],
            setColor: colorArrays[1].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            //o_Step.tempUpArray.push(this.gerRGB_Alpha(o_Step.setColor, index * 1 / part));
            o_Step.tempUpArray.push(o_Step.setColor);
        }
        o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));


        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:4*fanUpNumber+4,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 1; index <= i_Step.part; index++) {
            i_Step.tempUpArray.push(this.gerRGB_Alpha(i_Step.setColor, index * 1 / i_Step.part));
        }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));

        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }


        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else{
                        //i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray)).reverse();
                        totalInnerUpArray=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                        totalInnerDownArray=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                        i_Step.nowFrames=0;
                    }
                }
                for (let index = 0; index < totalInnerUpArray.length; index++) {
                    var data = reInnerTempData[totalInnerUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    var data = reInnerTempData[totalInnerDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
              
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange2=Math.round (o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowUpArray,setRange2);
                    if (o_Step.nowFrames <  o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else{
                        o_Step.nowFrames=0;
                        //o_Step.nowUpArray=JSON.parse(JSON.stringify(o_Step.nowUpArray)).reverse();
                        totalOuterUpArray=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                        totalOuterDownArray=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                        // o_Step.loopDirection +=1;
                        // o_Step.tempUpArray = JSON.parse(JSON.stringify(o_Step.nowUpArray));
                    }
                }
                else {
                    // o_Step.animationStep = 1;
                    // o_Step.loopDirection =0;
                }
                for (let index = 0; index < totalOuterUpArray.length; index++) {
                    //console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray[index]);
                    var data = reOuterTempData[totalOuterUpArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    var data = reOuterTempData[totalOuterDownArray[index]];
                    data.HTML_target.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                }
              
            }
        }, effectData.repeatTime);
        console.log('%c mode_Scan2','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
    }

    mode_Scan_Sync(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var i_Sync_ReorganizationData=[];
        for (let index = 0; index < i_SyncBlock_4_Class_Id.length; index++) {
            var i_HTML_4 = document.getElementsByClassName(i_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;

            for (let index_HTML = 0; index_HTML < i_HTML_4.length; index_HTML++) {
                i_Sync_ReorganizationData.push(i_HTML_4[index_HTML]);
            }
            //i_Sync_ReorganizationData= i_HTML_4.concat(i_HTML_4);
        }
        var o_Sync_ReorganizationData=[];
        for (let index = 0; index < o_SyncBlock_4_Class_Id.length; index++) {
            var i_HTML_4 = document.getElementsByClassName(o_SyncBlock_4_Class_Id[index]) as HTMLCollectionOf<HTMLElement>;
            //o_Sync_ReorganizationData= o_Sync_ReorganizationData.concat(i_HTML_4);
            for (let index_HTML = 0; index_HTML < i_HTML_4.length; index_HTML++) {
                o_Sync_ReorganizationData.push(i_HTML_4[index_HTML]);
            }
        }
        console.log('%c i_Sync_ReorganizationData','color:rgb(255,77,255)',i_Sync_ReorganizationData);
        console.log('%c o_Sync_ReorganizationData','color:rgb(255,77,255)',o_Sync_ReorganizationData);
        var colorArrays = effectData.colorArrays;
        var fanUpNumber = 16;
        var totalInnerUpArray = this.totalInnerUpArray(fanUpNumber);
        var totalInnerDownArray = this.totalInnerDownArray(fanUpNumber);
        var totalOuterUpArray = this.totalOuterUpArray(fanUpNumber);
        var totalOuterDownArray = this.totalOuterDownArray(fanUpNumber);
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:32,
            tempUpArray: [],
            part:4,
            maxArrlen:6*fanUpNumber+6,
            nowUpArray: [],
            setColor: colorArrays[1].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < o_Step.maxArrlen; index++) {
            o_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        var part = 6;
        for (let index = 1; index <= part; index++) {
            o_Step.tempUpArray.push(this.gerRGB_Alpha(o_Step.setColor, index * 1 / part));
        }
        o_Step.nowUpArray = JSON.parse(JSON.stringify(o_Step.tempUpArray));
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:32,
            tempUpArray: [],
            part:4,
            maxArrlen:4*fanUpNumber+4,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        for (let index = 0; index < i_Step.maxArrlen; index++) {
            i_Step.tempUpArray.push([0, 0, 0, 0]);
        }
        for (let index = 1; index <= i_Step.part; index++) {
            i_Step.tempUpArray.push(this.gerRGB_Alpha(i_Step.setColor, index * 1 / i_Step.part));
        }
        i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));

        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }
        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                if (i_Step.loopDirection % 2 == 0) {
                    var setRange=Math.round (i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                    console.log('%c setRange','color:rgb(255,77,255)',setRange);
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    if (i_Step.nowFrames <  i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else{
                        //i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.nowUpArray)).reverse();
                        totalInnerUpArray=JSON.parse(JSON.stringify(totalInnerUpArray)).reverse();
                        totalInnerDownArray=JSON.parse(JSON.stringify(totalInnerDownArray)).reverse();
                        i_Step.nowFrames=0;
                    }
                }
                for (let index = 0; index < totalInnerUpArray.length; index++) {

                    //i_Sync_ReorganizationData
                    var data = i_Sync_ReorganizationData[totalInnerUpArray[index]];
                    data.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                    var data = i_Sync_ReorganizationData[totalInnerDownArray[index]];
                    data.style.background = this.getColorEffectValue(i_Step.tempUpArray[index], 1)
                }
              
            }
            //------------o_Step--------/////////////
            if (o_Step.animationStep == 0) {
                if (o_Step.loopDirection % 2 == 0) {
                    var setRange2=Math.round (o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowUpArray,setRange2);
                    if (o_Step.nowFrames <  o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else{
                        o_Step.nowFrames=0;
                        totalOuterUpArray=JSON.parse(JSON.stringify(totalOuterUpArray)).reverse();
                        totalOuterDownArray=JSON.parse(JSON.stringify(totalOuterDownArray)).reverse();
                    }
                }
                else {
                    // o_Step.animationStep = 1;
                    // o_Step.loopDirection =0;
                }
                for (let index = 0; index < totalOuterUpArray.length; index++) {
                    //console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray[index]);
                    //o_Sync_ReorganizationData
                    var data = o_Sync_ReorganizationData[totalOuterUpArray[index]];
                    data.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                    var data = o_Sync_ReorganizationData[totalOuterDownArray[index]];
                    data.style.background = this.getColorEffectValue(o_Step.tempUpArray[index], 1)
                }
              
            }
        }, effectData.repeatTime);
        //console.log('%c mode_Scan2','color:rgb(255,77,255)',reInnerTempData,innerArr.length,outerArr.length,TempName,effectData.repeatTime);
        console.log('%c mode_Scan_Sync','color:rgb(255,77,255)');

    }



    mode_tornado(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var mixingTempData=[];
        for (let index = 0; index < reInnerTempData.length; index++) {
            var reorganizationData= reInnerTempData[index].concat(reOuterTempData[index]);
            reorganizationData=effectData.direction==1?reorganizationData.reverse():reorganizationData;
            mixingTempData.push(reorganizationData);
        }
        console.log('%c mode_tornado_mixingTempData','color:rgb(255,77,255)',mixingTempData);
        var innerNowindex=0;
        var min_maxValue=[0,7];  
        var colorLength = colorArrays.length;
        var maxValue = 5;
        var nowColorConunt = 0;
        var nowRangeConunt = 0;
        //mixingTempData=effectData.direction==1?mixingTempData.reverse():mixingTempData;
        console.log('%c mixingTempData', 'color:rgb(255,77,255)', mixingTempData);

        this.stopVar[TempName[2]] = setInterval(() => {
            var setPos;
            if (nowRangeConunt % 2 == 0) {
                maxValue = 5;
                setPos = Math.round(innerNowindex * 8 / maxValue);
            }
            else {
                maxValue = 5;
                setPos = Math.round((innerNowindex) * 12 / maxValue) + 8;
                //setPos+=8;
            }
            var setColor = colorArrays[nowColorConunt % colorLength].getRGBA();
            //console.log('%c data_4', 'color:rgb(255,77,255)', nowColorConunt % colorLength, setPos, setColor);
            for (let dindex = 0; dindex < mixingTempData.length; dindex++) {
                var data_4 = mixingTempData[dindex];
                for (let index_20 = 0; index_20 < data_4.length; index_20++) {
                    var data_4_20 = data_4[index_20];
                    if (nowRangeConunt % 2 == 0) {
                        if (index_20 <= setPos) {
                            data_4_20.HTML_target.style.background = this.getColorEffectValue(setColor, 1)
                        }
                    }
                    else {
                        if (index_20 <= setPos && index_20 > 7) {
                            data_4_20.HTML_target.style.background = this.getColorEffectValue(setColor, 1)
                        }
                    }
                }
            }
            if (innerNowindex < maxValue) {
                innerNowindex += 1;
            }
            else {
                innerNowindex = 0;
                nowRangeConunt += 1;
                if (nowRangeConunt % 2 == 0) {
                    nowColorConunt += 1;
                }

            }

        }, effectData.repeatTime);

        console.log('%c mode_tornado','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Spinning_Teacups(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var fanUpNumber=4;
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 8888,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:24,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:3,
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:16,
            tempUpArray: [],
            part:4,
            maxArrlen:16,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex:0,
            animationStep: 8888,
            loopPos:0,
        }
        // var mixingTempData=[];
        // for (let index = 0; index < reInnerTempData.length; index++) {
        //     var reorganizationData= reInnerTempData[index].concat(reOuterTempData[index]);
        //     reorganizationData=effectData.direction==1?reorganizationData.reverse():reorganizationData;
        //     mixingTempData.push(reorganizationData);
        // }
        var innerNowindex=0;
        var min_maxValue=[0,7];  
        var colorLength = colorArrays.length;
        var maxValue = 5;
        var nowColorConunt = 0;
        var nowRangeConunt = 0;
        for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
            var data_4 = reInnerTempData[dindex];
            data_4=effectData.direction==1?data_4.reverse():data_4;
        }
        for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
            var data_4 = reOuterTempData[dindex];
            data_4=effectData.direction==1?data_4.reverse():data_4;
        }


        this.stopVar[TempName[2]] = setInterval(() => {
            if(i_Step.loopDirection==0){
                if(i_Step.nowFrames<=3){
                    var setColor = colorArrays[i_Step.nowFrames].getRGBA();
    
                    for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                        var data_4 = reInnerTempData[dindex];
                        data_4[i_Step.loopPos].HTML_target.style.background = this.getColorEffectValue(setColor, 1)
                    }
                    i_Step.tempUpArray.push(this.getColorEffectValue(setColor, 1));
                    i_Step.tempUpArray.push(this.getColorEffectValue([0,0,0,0], 1));
                    i_Step.loopPos+=2;
                    i_Step.nowFrames+=1;
                    //console.log('%c mode_Spinning_Teacups','color:rgb(255,77,255)',i_Step.tempUpArray);
                }
                else{
                    //i_Step.tempUpArray=i_Step.tempUpArray
                    i_Step.loopDirection+=1;
                    i_Step.nowFrames=0;
                    i_Step.loopPos=0;
                    i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.tempUpArray));
                    //i_Step.tempUpArray = JSON.parse(JSON.stringify(i_Step.nowUpArray));

                }
            }
            else if(i_Step.loopDirection==1){
                
                var setRange=Math.round(i_Step.nowFrames*(i_Step.maxArrlen)/i_Step.maxframes);
                if(i_Step.nowFrames<=16){
                    i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,setRange);
                    for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                        var data_4 = reInnerTempData[dindex];
                        for (let index = 0; index <  i_Step.tempUpArray.length; index++) {
                            
                            data_4[index].HTML_target.style.background =i_Step.tempUpArray[index];
                        }
                    }
                    i_Step.nowFrames+=1;
                }
                else{
                    i_Step.loopDirection+=1;
                    i_Step.nowFrames=0;
                    i_Step.tempUpArray = [];
                }
            }
            else if(i_Step.loopDirection==2){
                if(i_Step.nowFrames<=3){    
                    if(i_Step.nowFrames<1 ){
                        o_Step.loopDirection=0;
                    }
                    for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                        var data_4 = reInnerTempData[dindex];
                        data_4[i_Step.loopPos].HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1)
                    }
                    i_Step.loopPos+=2;
                    i_Step.nowFrames+=1; 
                }
                else{
                    //i_Step.tempUpArray=i_Step.tempUpArray
                    i_Step.loopDirection=8888;
                    i_Step.nowFrames=0;
                    i_Step.loopPos=0;
                    //i_Step.nowUpArray=JSON.parse(JSON.stringify(i_Step.tempUpArray));
                    //i_Step.tempUpArray = JSON.parse(JSON.stringify(i_Step.nowUpArray));

                }
            }

            if(o_Step.loopDirection==0){

                if(o_Step.nowFrames<=3){
                    var setColor = colorArrays[o_Step.nowFrames].getRGBA();
                    for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                        var data_4 = reOuterTempData[dindex];
                        data_4[o_Step.loopPos-1].HTML_target.style.background = this.getColorEffectValue(setColor, 1);
                        data_4[o_Step.loopPos-2].HTML_target.style.background = this.getColorEffectValue(setColor, 1);
                        data_4[o_Step.loopPos-3].HTML_target.style.background = this.getColorEffectValue(setColor, 1);

                    }
                    o_Step.tempUpArray.push(this.getColorEffectValue(setColor, 1));
                    o_Step.tempUpArray.push(this.getColorEffectValue(setColor, 1));
                    o_Step.tempUpArray.push(this.getColorEffectValue(setColor, 1));
                    o_Step.loopPos+=3;
                    o_Step.nowFrames+=1;
                }
                else{
                    o_Step.nowUpArray=JSON.parse(JSON.stringify(o_Step.tempUpArray));
                    o_Step.loopDirection+=1;
                    o_Step.nowFrames=0;
                    o_Step.loopPos=3;
                }
            }
            else if(o_Step.loopDirection==1){
                
                var setRange_o_Step=Math.round(o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);
                if(o_Step.nowFrames<=o_Step.maxframes){
                    o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.nowUpArray,setRange_o_Step);
                    for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                        var data_4 = reOuterTempData[dindex];
                        for (let index = 0; index <  o_Step.tempUpArray.length; index++) {
                            data_4[index].HTML_target.style.background =o_Step.tempUpArray[index];
                        }
                    }
                    o_Step.nowFrames+=1;
                }
                else{
                    o_Step.loopDirection+=1;
                    i_Step.loopDirection=0;
                    o_Step.nowFrames=0;
                }
            }
            else if(o_Step.loopDirection==2){
                if(o_Step.nowFrames<=3){
                    var setColor2 = [0,0,0,0];
                    for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                        var data_4 = reOuterTempData[dindex];
                        data_4[o_Step.loopPos-1].HTML_target.style.background = this.getColorEffectValue(setColor2, 1);
                        data_4[o_Step.loopPos-2].HTML_target.style.background = this.getColorEffectValue(setColor2, 1);
                        data_4[o_Step.loopPos-3].HTML_target.style.background = this.getColorEffectValue(setColor2, 1);

                    }
                    o_Step.loopPos+=3;
                    o_Step.nowFrames+=1;
                }
                else{
                    o_Step.loopDirection=8888;
                    o_Step.nowFrames=0;
                    o_Step.loopPos=3;
                    o_Step.tempUpArray=[];
                }
            }
            //console.log('%c loopDirection','color:rgb(255,77,255)',i_Step.loopDirection,o_Step.loopDirection);
        }, effectData.repeatTime);

        console.log('%c mode_Spinning_Teacups','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName);
    }
    totalOuterUpArray(fanNnmber=1){
        var totalOuterUpArray;
        totalOuterUpArray =[];
        var fanCountValue=0;
        for (let f_index = 0; f_index < fanNnmber; f_index++) {           
            for (let index = 0; index < 6; index++) {
                totalOuterUpArray.push(index + f_index * 12);
            }
        }
        console.log('%c totalOuterUpArray','color:rgb(255,77,255)',totalOuterUpArray);
        return totalOuterUpArray;
    }
    totalOuterDownArray(fanNnmber=1){
        var totalOuterDownArray =[];
        var fanCountValue=0;
        for (let f_index = 0; f_index < fanNnmber; f_index++) {           
            for (let index = 11; index > 5; index--) {
                totalOuterDownArray.push(index + f_index * 12);
            }
        }
        console.log('%c totalOuterDownArray','color:rgb(255,77,255)',totalOuterDownArray);
        return totalOuterDownArray;
    }
    totalInnerUpArray(fanNnmber=1){
        var totalInnerUpArray;
        totalInnerUpArray =[];
        var fanCountValue=0;
        for (let f_index = 0; f_index < fanNnmber; f_index++) {           
            for (let index = 0; index < 4; index++) {
                totalInnerUpArray.push(index + f_index * 8);
            }
        }
        console.log('%c totalUPArray','color:rgb(255,77,255)',totalInnerUpArray);
        return totalInnerUpArray;
    }

    total_CrossOut_UPArr(fanNnmber=4){
        var total_CrossOut_UPArr=[0,1,2,3,4,5,23,22,21,20,19,18,24,25,26,27,28,29,47,46,45,44,43,42];
        var u_returnTempData=[];   
        if(fanNnmber>0){
            for (let f_index = 0; f_index < fanNnmber; f_index++) {        
                for (let index = 0; index < total_CrossOut_UPArr.length; index++) {
                    u_returnTempData.push(total_CrossOut_UPArr[index]+f_index*48);
                }
            }
        }
        else{
            u_returnTempData=total_CrossOut_UPArr;
        }

        console.log('%c total_CrossOut_UPArr','color:rgb(255,77,255)',u_returnTempData);
        return u_returnTempData;
    }

    total_CrossOut_DownArr(fanNnmber=4){
          var total_CrossOut_DownArr=[11,10,9,8,7,6,12,13,14,15,16,17,35,34,33,32,31,30,36,37,38,39,40,41];
          var returnTempData=[];   
          if(fanNnmber>0){
              for (let f_index = 0; f_index < fanNnmber; f_index++) {        
                  for (let index = 0; index < total_CrossOut_DownArr.length; index++) {
                      returnTempData.push(total_CrossOut_DownArr[index]+f_index*48);
                      console.log('%c index+f_index*48','color:rgb(255,77,255)',index+f_index*48);

                  }
              }
          }
          else{
              returnTempData=total_CrossOut_DownArr;
          }
          console.log('%c total_CrossOut_DownArr','color:rgb(255,77,255)',returnTempData);
          return returnTempData;
    }
    totalInnerDownArray(fanNnmber=1){
        var totalInnerDownArray =[];
        var fanCountValue=0;
        for (let f_index = 0; f_index < fanNnmber; f_index++) {           
            for (let index = 7; index > 3; index--) {
                totalInnerDownArray.push(index + f_index * 8);
            }
        }
        console.log('%c totalDownArray','color:rgb(255,77,255)',totalInnerDownArray);
        return totalInnerDownArray;
    }
    gerRGB_Alpha(RGBA=[0,0,0,1],magnification=0.5){
        var tempRGBA=JSON.parse(JSON.stringify(RGBA));
        tempRGBA[3]=magnification;
        return tempRGBA;
    }
    mode_Spring(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        var innerColorsArray = [];
        var innerColorsArray2 = [];
        var outerColorsArray = [];
        var outerColorsArray2 = [];

       var combination=[];
       var outer_combination=[];
       for (let index = 0; index <colorArrays.length; index++) {
           for (let c_2 = 0; c_2 < 32; c_2++) {
            if(c_2<5){
                innerColorsArray.push(colorArrays[index].getRGBA());
            }
            else{
                innerColorsArray.push([0,0,0,0])
            }
        }
       }
        combination=innerColorsArray.concat(innerColorsArray2);
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 4 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var inner_Reorganization = [];
        var reorganizationSort=[0,2,4,6,7,5,3,1];

        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            inner_Reorganization=inner_Reorganization.concat(reInnerTempData[t_index]);

        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData,inner_Reorganization);
        for (let index = 0; index <colorArrays.length; index++) {
            for (let c_2 = 0; c_2 < 48; c_2++) {
             if(c_2<5){
                outerColorsArray.push(colorArrays[index].getRGBA());
             }
             else{
                outerColorsArray.push([0,0,0,0])
             }
         }
        }



        outer_combination=outerColorsArray.concat(outerColorsArray2);
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 6 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var outer_Reorganization = [];
        var reorganizationSort=[0,2,4,6,7,5,3,1];
        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            outer_Reorganization=outer_Reorganization.concat(reOuterTempData[t_index]);

        }
        //console.log('%c reOuterTempData','color:rgb(255,77,255)',reOuterTempData,outer_Reorganization);

        console.log('%c showColosArray','color:rgb(255,77,255)',combination,outer_combination);
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                for (let dindex = 0; dindex < inner_Reorganization.length; dindex++) {
                    var data = inner_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(combination[dindex], 0)
                }
                innerColorsArray = this.loopArrDisplacement(effectData.direction, combination);
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                for (let dindex = 0; dindex < outer_Reorganization.length; dindex++) {
                    var data = outer_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(outer_combination[dindex], 1)
                }
                outerColorsArray = this.loopArrDisplacement(effectData.direction, outer_combination);
    
            }, effectData.repeatTime);
        }
       

        console.log('%c mode_Spring','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Meteor(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var innerNowindex=-1;
        var innerNowCount=0;
        // var outerColorsArray=[];
        // outerColorsArray.push(colorArrays[index].getRGBA())

        // for (let index = 0; index <12; index++) {
        //     outerColorsArray.push([0,0,0,0])
        //     outerColorsArray.push(colorArrays[index].getRGBA());    
        // }
        if (Mode != "Outer") {
            if(effectData.direction==2){
                innerNowindex=-1;
            }
            else{
                innerNowindex=9;
            }
            this.stopVar[TempName[0]] = setInterval(() => {
                if(effectData.direction==2){
                    if(innerNowindex<9){
                        innerNowindex+=1;    
                    }
                    else{
                        innerNowindex=-1;
                    }
                }
                else{
                    if(innerNowindex>-1){
                        innerNowindex-=1;    
                    }
                    else{
                        innerNowindex=9;
                    }
                }

                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data_4=reInnerTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        //var setTarget = data_4[index];
                        if(index==innerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[dindex].getRGBA(), 0)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 0)
                        }
                    }
                }
            }, effectData.repeatTime);
        }
        var outerNowindex=-1;
        var outerNowCount=0;
        if (Mode != "Inner") {
            if(effectData.direction==2){
                outerNowindex=-1;
            }
            else{
                outerNowindex=11;
            }
            this.stopVar[TempName[1]] = setInterval(() => {
                if(effectData.direction==2){
                    if(outerNowindex<12){
                        outerNowindex+=1;    
                    }
                    else{
                        outerNowindex=-1;
                    }
                }
                else{
                    if(outerNowindex>-1){
                        outerNowindex-=1;    
                    }
                    else{
                        outerNowindex=11;
                    }
                }        
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data_4=reOuterTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        //var setTarget = data_4[index];
                        if(index==outerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[dindex].getRGBA(), 1)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1)
                        }
                    }
                }
    
            }, effectData.repeatTime);
        }
        console.log('%c mode_Meteor','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Meteor_Rainbow(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var innerNowindex=-1;
        var innerNowCount=0;

        var innerRainbowIndex=0;
        if (Mode != "Outer") {
            if(effectData.direction==2){
                innerNowindex=-1;
            }
            else{
                innerNowindex=9;
            }
            this.stopVar[TempName[0]] = setInterval(() => {
                if(effectData.direction==2){
                    if(innerNowindex<9){
                        innerNowindex+=1;    
                    }
                    else{
                        innerNowindex=-1;
                        if(innerRainbowIndex<this.rainbow7Color().length-1){
                            innerRainbowIndex+=1;
                        }
                        else{
                            innerRainbowIndex=0;
                        }
                    }
                }
                else{
                    if(innerNowindex>-1){
                        innerNowindex-=1;    
                    }
                    else{
                        innerNowindex=9;
                        if(innerRainbowIndex<this.rainbow7Color().length-1){
                            innerRainbowIndex+=1;
                        }
                        else{
                            innerRainbowIndex=0;
                        }
                    }
                }


                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data_4=reInnerTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        //var setTarget = data_4[index];
                        if(index==innerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(this.rainbow7Color()[innerRainbowIndex], 0)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 0)
                        }
                    }
                }
            }, effectData.repeatTime);
        }
        var outerNowindex=-1;
        var outerNowCount=0;
        if (Mode != "Inner") {
            if(effectData.direction==2){
                outerNowindex=-1;
            }
            else{
                outerNowindex=9;
            }
            this.stopVar[TempName[1]] = setInterval(() => {
                if(effectData.direction==2){
                    if(outerNowindex<9){
                        outerNowindex+=1;    
                    }
                    else{
                        outerNowindex=-1;
                    }
                }
                else{
                    if(outerNowindex>-1){
                        outerNowindex-=1;    
                    }
                    else{
                        outerNowindex=9;
                    }
                }        
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data_4=reOuterTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        //var setTarget = data_4[index];
                        if(index==outerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[dindex].getRGBA(), 1)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue([0,0,0,0], 1)
                        }
                    }
                }
    
            }, effectData.repeatTime);
        }
        console.log('%c mode_Meteor','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Lottery(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var innerNowindex=0;
        //var innerNowCount=0;
        var min_maxValue=[0,7];
        
        if (Mode != "Outer") {
            if(effectData.direction==2){
                innerNowindex=min_maxValue[0];
            }
            else{
                innerNowindex=min_maxValue[1];
            }
            this.stopVar[TempName[0]] = setInterval(() => {
                if(effectData.direction==2){
                    if(innerNowindex<min_maxValue[1]){
                        innerNowindex+=1;    
                    }
                    else{
                        innerNowindex=-1;
                    }
                }
                else{
                    if(innerNowindex>min_maxValue[0]){
                        innerNowindex-=1;    
                    }
                    else{
                        innerNowindex=min_maxValue[1];
                    }
                }
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data_4=reInnerTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        if(index==innerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[0].getRGBA(), 0)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[1].getRGBA(), 0)
                        }
                    }
                }
               

            }, effectData.repeatTime);
        }
        var outerNowindex=0;
        var min_maxValue=[0,11];
        if (Mode != "Inner") {
            if(effectData.direction==2){
                outerNowindex=min_maxValue[0];
            }
            else{
                outerNowindex=min_maxValue[1];
            }
            this.stopVar[TempName[1]] = setInterval(() => {
                if(effectData.direction==2){
                    if(outerNowindex<min_maxValue[1]){
                        outerNowindex+=1;    
                    }
                    else{
                        outerNowindex=-1;
                    }
                }
                else{
                    if(outerNowindex>min_maxValue[0]){
                        outerNowindex-=1;    
                    }
                    else{
                        outerNowindex=min_maxValue[1];
                    }
                }
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data_4=reOuterTempData[dindex];
                    for (let index = 0; index < data_4.length; index++) {
                        //var setTarget = data_4[index];
                        if(index==outerNowindex){
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[0].getRGBA(), 1)
                        }
                        else{
                            data_4[index].HTML_target.style.background = this.getColorEffectValue(colorArrays[1].getRGBA(), 1)
                        }
                    }
                }
    
            }, effectData.repeatTime);
        }
        console.log('%c mode_Lottery','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);

    }
    mode_Mop_up(effectData,Mode='Inner') {
        var TempName = this.elementsName;
        var innerArrGroupNum = 4;
        var outerArrGroupNum = 6;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var reInnerTempData = [];
        var innerColorsArray = [];
        var outerColorsArray = [];
        //combination=innerColorsArray.concat(innerColorsArray2);
        for (let index = 1; index < innerArr.length+1; index++) {
            reInnerTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if(index-1<1){
                innerColorsArray.push(colorArrays[0].getRGBA());
            }
            else{
                innerColorsArray.push([0,0,0,0])
            }
        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData);
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            reOuterTempData.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if(index-1<1){
                outerColorsArray.push(colorArrays[0].getRGBA());
            }
            else{
                outerColorsArray.push([0,0,0,0])
            }
        }
        effectData.direction=2;
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                innerColorsArray=inner_loopArrDisplacement(innerColorsArray);
                //var showArray=effectData.direction==1?JSON.parse(JSON.stringify(innerColorsArray)).reverse():innerColorsArray;
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data = reInnerTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(innerColorsArray[dindex], 0)
                } 
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                outerColorsArray=outer_loopArrDisplacement(outerColorsArray);
                //var showArray=effectData.direction==1?JSON.parse(JSON.stringify(outerColorsArray)).reverse():outerColorsArray;
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data = reOuterTempData[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(outerColorsArray[dindex],1)
                } 
            }, effectData.repeatTime);
        }
        var nowIndex = -1;
        var inner_TargetMax=32;
        var animatiomStep=0;
        //var _this=this;
        function inner_loopArrDisplacement(Arr) {
            //console.log('%c inner_loopArrDisplacement','color:rgb(255,77,255)',Arr,nowIndex);
            if(animatiomStep%2==0){
                for (let index = 0; index < Arr.length; index++) {
                    var target = Arr[index];
                    if(index==nowIndex){
                        Arr[index]=colorArrays[0].getRGBA();
                    }
                    else{
                        Arr[index]=[0,0,0,0];
                    }
                }
                if (nowIndex < inner_TargetMax) {
                    nowIndex+=1;
                    //Arr=_this.loopArrDisplacement(2,Arr);
                }
                else {
                    animatiomStep+=1;
                }
            }
            else{
                for (let index = 0; index < Arr.length; index++) {
                    var target = Arr[index];
                    if(index==nowIndex){
                        Arr[index]=colorArrays[1].getRGBA();
                    }
                    else{
                        Arr[index]=[0,0,0,0];
                    }
                }
                //Arr[nowIndex]=colorArrays[1].getRGBA();
                if (nowIndex > -1) {
                    //Arr=_this.loopArrDisplacement(1,Arr);
                    nowIndex-=1;
                }
                else {
                    animatiomStep+=1;
                }
            }
            return Arr;

          

        }
        var outer_nowIndex = -1;
        var outer_TargetMax=48;
        var outer_animatiomStep=0;
        function outer_loopArrDisplacement(Arr) {
            console.log('%c outer_loopArrDisplacement','color:rgb(255,77,255)',Arr,outer_nowIndex);
            if(outer_animatiomStep%2==0){
                for (let index = 0; index < Arr.length; index++) {
                    if(index==outer_nowIndex){
                        Arr[index]=colorArrays[0].getRGBA();
                    }
                    else{
                        Arr[index]=[0,0,0,0];
                    }
                }
                if (outer_nowIndex < outer_TargetMax) {
                    outer_nowIndex+=1;
                }
                else {
                    outer_animatiomStep+=1;
                }
            }
            else{
                for (let index = 0; index < Arr.length; index++) {
                    if(index==outer_nowIndex){
                        Arr[index]=colorArrays[1].getRGBA();
                    }
                    else{
                        Arr[index]=[0,0,0,0];
                    }
                }
                if (outer_nowIndex > -1) {
                    outer_nowIndex-=1;
                }
                else {
                    outer_animatiomStep+=1;
                }
            }
            return Arr;
        }
        console.log('%c mode_Mop_up','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Tail_Chasing(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArrGroupNum=4;
        var outerArrGroupNum=6;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        var innerColorsArray = [];
        var innerColorsArray2 = [];
        var outerColorsArray = [];
        var outerColorsArray2 = [];

       var combination=[];
       var outer_combination=[];
        for (let c_2 = 0; c_2 < 32; c_2++) {
            if(c_2<6){
                innerColorsArray.push(colorArrays[0].getRGBA());
            }
            else if(c_2>12&&c_2<21){
                    innerColorsArray.push(colorArrays[1].getRGBA());
            }
            else{
                innerColorsArray.push([0,0,0,0])
            }
        }
        
        for (let c_2 = 0; c_2 < 32; c_2++) {
            if(c_2<6){
                innerColorsArray2.push(colorArrays[2].getRGBA());
            }
            else if(c_2>16&&c_2<23){
                innerColorsArray2.push(colorArrays[3].getRGBA());
            }
            else{
                innerColorsArray2.push([0,0,0,0])
            }
        }
        combination=innerColorsArray.concat(innerColorsArray2);
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 4 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var inner_Reorganization = [];
        var reorganizationSort=[0,2,4,6,7,5,3,1];

        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            inner_Reorganization=inner_Reorganization.concat(reInnerTempData[t_index]);

        }
        console.log('%c reInnerTempData','color:rgb(255,77,255)',reInnerTempData,inner_Reorganization);


        for (let c_2 = 0; c_2 < 48; c_2++) {
            if(c_2<6){
                outerColorsArray.push(colorArrays[0].getRGBA());
            }
            else if(c_2>24&&c_2<31){
                outerColorsArray.push(colorArrays[1].getRGBA());
            }
            else{
                outerColorsArray.push([0,0,0,0])
            }
        }
        for (let c_2 = 0; c_2 < 48; c_2++) {
            if(c_2<6){
                outerColorsArray2.push(colorArrays[2].getRGBA());
            }
            else if(c_2>24&&c_2<31){
                outerColorsArray2.push(colorArrays[3].getRGBA());
            }
            else{
                outerColorsArray2.push([0,0,0,0])
            }
        }
        outer_combination=outerColorsArray.concat(outerColorsArray2);
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            outerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 6 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var outer_Reorganization = [];
        var reorganizationSort=[0,2,4,6,7,5,3,1];
        for (let index = 0; index < reorganizationSort.length; index++) {
            var t_index=reorganizationSort[index];
            outer_Reorganization=outer_Reorganization.concat(reOuterTempData[t_index]);

        }
        //console.log('%c reOuterTempData','color:rgb(255,77,255)',reOuterTempData,outer_Reorganization);

        console.log('%c showColosArray','color:rgb(255,77,255)',combination,outer_combination);
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                for (let dindex = 0; dindex < inner_Reorganization.length; dindex++) {
                    var data = inner_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(combination[dindex], 0)
                }
                innerColorsArray = this.loopArrDisplacement(effectData.direction, combination);
            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                for (let dindex = 0; dindex < outer_Reorganization.length; dindex++) {
                    var data = outer_Reorganization[dindex];
                    data.HTML_target.style.background = this.getColorEffectValue(outer_combination[dindex], 1)
                }
                outerColorsArray = this.loopArrDisplacement(effectData.direction, outer_combination);
    
            }, effectData.repeatTime);
        }
       

        console.log('%c mode_Tail_Chasing','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Taichi(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArrGroupNum=4;
        var outerArrGroupNum=6;

        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        var innerColorsArray = [];
        var outerColorsArray = [];

        for (let c_2 = 0; c_2 < outerArrGroupNum; c_2++) {
            outerColorsArray.push(colorArrays[1].getRGBA());
        }
        for (let c_2 = 0; c_2 < outerArrGroupNum; c_2++) {
            outerColorsArray.push(colorArrays[0].getRGBA());
        }


        for (let c_2 = 0; c_2 < innerArrGroupNum; c_2++) {
            innerColorsArray.push(colorArrays[0].getRGBA());
        }
        for (let c_2 = 0; c_2 < innerArrGroupNum; c_2++) {
            innerColorsArray.push(colorArrays[1].getRGBA());
        }
        console.log('%c showColosArray','color:rgb(255,77,255)',innerColorsArray);

        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[3].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            outerTempData4.push({
                colors:colorArrays[0].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }


        this.stopVar[TempName[0]] = setInterval(() => {
            for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                var data = reInnerTempData[dindex];
                for (let i_index = 0; i_index < data.length; i_index++) {
                    var HtmLdiv = data[i_index];
                    HtmLdiv.HTML_target.style.background = this.getColorEffectValue(innerColorsArray[i_index], 0)
                }
            }
            innerColorsArray = this.loopArrDisplacement(effectData.direction, innerColorsArray);
        }, effectData.repeatTime);

        this.stopVar[TempName[1]] = setInterval(() => {
            for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                var data = reOuterTempData[dindex];
                for (let i_index = 0; i_index < data.length; i_index++) {
                    var HtmLdiv = data[i_index];
                    HtmLdiv.HTML_target.style.background = this.getColorEffectValue(outerColorsArray[i_index],1)
                }
            }
            var setdircetion;
            if(effectData.direction==1){
                setdircetion=2;
            }
            else{
                setdircetion=1;
            }
            outerColorsArray = this.loopArrDisplacement(setdircetion, outerColorsArray);
        }, effectData.repeatTime);
        

        console.log('%c mode_Color_Cycle','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Voice(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var rainbowColorIndex = 0;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var reInnerTempData = [];
        var direction = 0;//0左1右
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[innerIndex].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        var outerIndex=0;
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            outerTempData4.push({
                colors:colorArrays[outerIndex].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }


        if (Mode != "Outer") {
            var inner_startIndex=[[1,2],[0,3],[7,4],[6,5]];
            inner_startIndex=effectData.direction==1?JSON.parse(JSON.stringify(inner_startIndex)).reverse():inner_startIndex;

            var inner_StartStep=0;  
            var inner_SetColorindex=0;
            var inner_repeatTimes=0;
            var inner_SetRGBA=colorArrays[0].getRGBA();
            this.stopVar[TempName[0]] = setInterval(() => {
                if(inner_StartStep>inner_startIndex.length-1){
                    inner_StartStep=inner_startIndex.length-1;
                    inner_repeatTimes+=1;
                    inner_SetRGBA=[0,0,0,0]; 
                }
                else if(inner_StartStep<0){
                    if(inner_SetColorindex<3){
                        inner_SetColorindex+=1;
                    }
                    else{
                        inner_SetColorindex=0;
                    }
                    inner_StartStep=0;
                    inner_repeatTimes+=1;
                    inner_SetRGBA=colorArrays[inner_SetColorindex].getRGBA();   
                }                  
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    var data = reInnerTempData[dindex];
                    for (let i_index = 0; i_index < inner_startIndex[inner_StartStep].length; i_index++) {
                        var target2 = inner_startIndex[inner_StartStep][i_index];
                        var HtmLdiv = data[target2];
                        HtmLdiv.HTML_target.style.background =this.getColorEffectValue(inner_SetRGBA,0)

                    }
                }
        
                if(inner_repeatTimes%2==0){ 
                    inner_StartStep+=1;
                }
                else{
                    inner_StartStep-=1;    
                }
                


            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            var outer_startIndex=[[2,3],[1,4],[0,5],[11,6],[10,7],[9,8]];
            //var outer_startIndex=[[2,3],[1,4],[0,5],[11,6],[10,7],[9,8]];
            outer_startIndex=effectData.direction==1?JSON.parse(JSON.stringify(outer_startIndex)).reverse():outer_startIndex;
            //var outer_startIndex=[[2,3,1,4],[0,5,11,6],[10,7,9,8]];
            var outer_StartStep=0;  
            var outer_SetColorindex=0;
            var outer_repeatTimes=0;
            var outer_nowSetRGBA=colorArrays[0].getRGBA();
            this.stopVar[TempName[1]] = setInterval(() => {
                if(outer_StartStep>outer_startIndex.length-1){
                    outer_StartStep=outer_startIndex.length-1;
                    outer_repeatTimes+=1;
                    outer_nowSetRGBA=[0,0,0,0]; 
                }
                else if(outer_StartStep<0){
                    if(outer_SetColorindex<3){
                        outer_SetColorindex+=1;
                    }
                    else{
                        outer_SetColorindex=0;
                    }
                    outer_StartStep=0;
                    outer_repeatTimes+=1;
                    outer_nowSetRGBA=colorArrays[outer_SetColorindex].getRGBA();   
                }                  
                for (let dindex = 0; dindex < reOuterTempData.length; dindex++) {
                    var data = reOuterTempData[dindex];
                    for (let i_index = 0; i_index < outer_startIndex[outer_StartStep].length; i_index++) {
                        var target2 = outer_startIndex[outer_StartStep][i_index];
                        var HtmLdiv = data[target2];
                        HtmLdiv.HTML_target.style.background =this.getColorEffectValue(outer_nowSetRGBA,1)

                    }
                }
        
                if(outer_repeatTimes%2==0){ 
                    outer_StartStep+=1;
                }
                else{
                    outer_StartStep-=1;    
                }
                


            }, effectData.repeatTime*0.5);
        }

        console.log('%c mode_Voice','color:rgb(255,77,255)',reOuterTempData,innerArr.length,outerArr.length,TempName);
    }
    mode_Voice2(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var rainbowColorIndex = 0;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[innerIndex].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        var outerIndex=0;
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            outerTempData4.push({
                colors:colorArrays[outerIndex].getRGBA(),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4=[];
            }
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:4,
            tempUpArray: [],
            setColorindex:0,
            part:4,
            maxArrlen:4,
            nowUpArray: [],
            setRGBA: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes:4,
            tempUpArray: [],
            setColorindex:0,
            part:4,
            maxArrlen:6,
            nowUpArray: [],
            setRGBA: colorArrays[0].getRGBA(),
            animationStep: 8888,
        }
        var setTempName;
        switch (Mode) {
            case 'Inner':
                i_Step.animationStep=0;
                setTempName=TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep=0;
                setTempName=TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep=0;
                o_Step.animationStep=0;
                setTempName=TempName[2];
                break;
            default:
                break;
        }
        var totalInner_L_Array = [1,0,7,6];
        var totalInner_R_Array = [2,3,4,5];
        var totalOuter_L_Array = [2,1,0,11,10,9];
        var totalOuter_R_Array = [3,4,5,6,7,8];
        totalInner_L_Array=effectData.direction == 2 ? JSON.parse(JSON.stringify(totalInner_L_Array)).reverse() : totalInner_L_Array;
        totalInner_R_Array=effectData.direction == 2 ? JSON.parse(JSON.stringify(totalInner_R_Array)).reverse() : totalInner_R_Array;
        totalOuter_L_Array=effectData.direction == 2 ? JSON.parse(JSON.stringify(totalOuter_L_Array)).reverse() : totalOuter_L_Array;
        totalOuter_R_Array=effectData.direction == 2 ? JSON.parse(JSON.stringify(totalOuter_R_Array)).reverse() : totalOuter_R_Array;
        //console.log('%c i_step2.nowUpArray', 'color:rgb(255,77,255)', i_Step.nowUpArray
        //console.log('%c  loopArrDisplacementAssignSpacing', 'color:rgb(255,77,255)', this.loopArrDisplacementAssignSpacing(2,i_Step.nowUpArray,2));
        this.stopVar[setTempName] = setInterval(() => {
            if (i_Step.animationStep == 0) {
                i_Step.setRGBA = colorArrays[i_Step.setColorindex].getRGBA();
                var setRange = Math.round(i_Step.nowFrames * (i_Step.maxArrlen) / i_Step.maxframes);
                //i_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,i_Step.tempUpArray,setRange);
                for (let i_L_Array = 0; i_L_Array < totalInner_L_Array.length; i_L_Array++) {
                    for (let index = 0; index < reInnerTempData.length; index++) {
                        var data_4 = reInnerTempData[index];
                        if (i_Step.loopDirection % 2 == 0) {
                            if (i_L_Array < setRange) {
                                //console.log('%c i_L_Array', 'color:rgb(255,77,255)', i_L_Array,data_4,totalInner_L_Array[i_L_Array]);
                                var data = data_4[totalInner_L_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue(i_Step.setRGBA, 1)
                                var data = data_4[totalInner_R_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue(i_Step.setRGBA, 1)
                            }
                        }
                        else {
                            if (i_L_Array >= setRange) {
                                //console.log('%c i_L_Array', 'color:rgb(255,77,255)', i_L_Array,data_4,totalInner_L_Array[i_L_Array]);
                                var data = data_4[totalInner_L_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue([0, 0, 0, 0], 1)
                                var data = data_4[totalInner_R_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue([0, 0, 0, 0], 1)
                            }
                        }

                    }

                }
                if (i_Step.loopDirection % 2 == 0) {
                    i_Step.setRGBA = colorArrays[i_Step.setColorindex].getRGBA();
                    if (i_Step.nowFrames < i_Step.maxframes) {
                        i_Step.nowFrames += 1;
                    }
                    else {
                        i_Step.loopDirection += 1;
                    }
                }
                else {
                    i_Step.setRGBA = [0, 0, 0, 1];
                    if (i_Step.nowFrames > 0) {
                        i_Step.nowFrames -= 1;
                    }
                    else {
                        i_Step.loopDirection += 1;
                        if (i_Step.setColorindex < 3) {
                            i_Step.setColorindex += 1;
                        }
                        else {
                            i_Step.setColorindex = 0;
                        }
                    }
                }
            }
            //console.log('%c setRange', 'color:rgb(255,77,255)', setRange)
            if (o_Step.animationStep == 0) {
                o_Step.setRGBA = colorArrays[o_Step.setColorindex].getRGBA();
                var setRange = Math.round(o_Step.nowFrames * (o_Step.maxArrlen) / o_Step.maxframes);
                //o_Step.tempUpArray = this.loopArrDisplacementAssignSpacing(2,o_Step.tempUpArray,setRange);
                for (let i_L_Array = 0; i_L_Array < totalOuter_L_Array.length; i_L_Array++) {
                    for (let index = 0; index < reOuterTempData.length; index++) {
                        var data_4 = reOuterTempData[index];
                        if (o_Step.loopDirection % 2 == 0) {
                            if (i_L_Array < setRange) {
                                //console.log('%c i_L_Array', 'color:rgb(255,77,255)', i_L_Array,data_4,totalInner_L_Array[i_L_Array]);
                                var data = data_4[totalOuter_L_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue(o_Step.setRGBA, 1)
                                var data = data_4[totalOuter_R_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue(o_Step.setRGBA, 1)
                            }
                        }
                        else {
                            if (i_L_Array >= setRange) {
                                //console.log('%c i_L_Array', 'color:rgb(255,77,255)', i_L_Array,data_4,totalInner_L_Array[i_L_Array]);
                                var data = data_4[totalOuter_L_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue([0, 0, 0, 0], 1)
                                var data = data_4[totalOuter_R_Array[i_L_Array]];
                                data.HTML_target.style.background = this.getColorEffectValue([0, 0, 0, 0], 1)
                            }
                        }

                    }

                }
                if (o_Step.loopDirection % 2 == 0) {
                    o_Step.setRGBA = colorArrays[o_Step.setColorindex].getRGBA();
                    if (o_Step.nowFrames < o_Step.maxframes) {
                        o_Step.nowFrames += 1;
                    }
                    else {
                        o_Step.loopDirection += 1;
                    }
                }
                else {
                    o_Step.setRGBA = [0, 0, 0, 1];
                    if (o_Step.nowFrames > 0) {
                        o_Step.nowFrames -= 1;
                    }
                    else {
                        o_Step.loopDirection += 1;
                        if (o_Step.setColorindex < 3) {
                            o_Step.setColorindex += 1;
                        }
                        else {
                            o_Step.setColorindex = 0;
                        }
                    }
                }
            }
        }, effectData.repeatTime);
        console.log('%c mode_Voice', 'color:rgb(255,77,255)', reOuterTempData, innerArr.length, outerArr.length, TempName);
    }

    
    mode_Static_Color(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var rainbowColorIndex = 0;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            reInnerTempData.push({
                colors:colorArrays[innerIndex].getRGBA(),
                recordIndex: rainbowColorIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                //if(innerIndex<3){
                    innerIndex+=1;
            }
        }
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            reOuterTempData.push({
                colors:colorArrays[outerIndex].getRGBA(),
                recordIndex: rainbowColorIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: outerArr[index-1],
            });
            if (index % 12 == 0) {
                    outerIndex+=1;
                
            }
        }
        if (Mode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                for (let index = 0; index < reInnerTempData.length; index++) {
                    var data = reInnerTempData[index];
                    data.HTML_target.style.background =this.getColorEffectValue(data.colors,0)

                }

            }, effectData.repeatTime);
        }
        if (Mode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {

                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    data.HTML_target.style.background =this.getColorEffectValue(data.colors,1)

                }


            }, effectData.repeatTime);
        }
        console.log('%c mode_Static_Color','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName);
    }
    mode_Static_Colorful(effectData,Mode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var rainbowColorIndex = 0;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < outerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex);
            reOuterTempData.push({
                colors:colorArrays[outerIndex].getRGBA(),
                recordIndex: rainbowColorIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: outerArr[index-1],
            });
            if (index % 3 == 0) {
                if (outerIndex < 3) {
                    outerIndex += 1;


                }
                else {
                    outerIndex = 0;
                }
            }

        }
            this.stopVar[TempName[1]] = setInterval(() => {

                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    data.HTML_target.style.background =this.getColorEffectValue(data.colors,1)

                }


            }, effectData.repeatTime);
        
        console.log('%c mode_Static_Colorful','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName);
    }
    mode_Rainbow2(effectData,rangeMode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        var innerIndex=0;
        var outerIndex=0;
        var innerRainbowIndex = 0;
        var outerRainbowIndex = 0;
        var reOuterTempData = [];
        var direction = 0;//0左1右
        var repeatCountList=[];
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length+1; index++) {
            //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
            InnerTempData4.push({
                colors:colorArrays[innerIndex].getRGBA(),
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4=[];
                //innerIndex+=1;
            }
        }
        for (let index = 1; index <= 8; index++) {
            repeatCountList.push({
                color: [0,0,0,1],
                colorIndex:Math.ceil(index/2),
                nowStep: index,
                maxStep:8,
            });

        }
        // repeatCountList[0].colorIndex=1;
        // repeatCountList[1].colorIndex=2;
        // repeatCountList[2].colorIndex=3;
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[outerIndex].getRGBA(),
                recordIndex: outerRainbowIndex,
                repeatTime: this.getRandom(5, 25),
                HTML_target: outerArr[index - 1],
            });
            if (outerRainbowIndex < this.rainbow7Color().length - 1) {
                outerRainbowIndex += 1;
            }
            else {
                outerRainbowIndex = 0;
            }
            if (index % 12 == 0) {
                outerIndex += 1;
                outerRainbowIndex = 0;
            }
        }
        repeatCountList=effectData.direction==2?repeatCountList.reverse():repeatCountList;
        if (rangeMode != "Outer") {
            this.stopVar[TempName[0]] = setInterval(() => {
                for (let index = 0; index < repeatCountList.length; index++) {
                    var temp_colorData = [0, 0, 0, 1];
                    var item = repeatCountList[index];
                    if (item.nowStep < item.maxStep) {
                        item.nowStep += 1;
                    }
                    else {
                        item.nowStep=0;
                        if(item.colorIndex<this.rainbow7Color().length-1){
                            item.colorIndex+=1;

                        }
                        else{
                            item.colorIndex=0;
                        }
                    }
                    //var setPos = [0, 0];
                    var nowColor;
                    var nextColor;
                    var temp_Color=[0,0,0,1];
                    if (item.colorIndex >= this.rainbow7Color().length - 1) {
                        nowColor = this.rainbow7Color()[item.colorIndex];
                        nextColor = this.rainbow7Color()[0];
                    }
                    else {
                        nowColor = this.rainbow7Color()[item.colorIndex];
                        nextColor = this.rainbow7Color()[item.colorIndex + 1];
                    }

                    for (let index2 = 0; index2 < 3; index2++) {
                    temp_Color[index2]= (nowColor[index2]*(item.maxStep-item.nowStep)+nextColor[index2]*item.nowStep)/item.maxStep;
                    }
                    item.color=temp_Color;
                }
                //console.log('%c repeatCountList','color:rgb(255,77,255)',repeatCountList);


                for (let index = 0; index < reInnerTempData.length; index++) {
                    var data = reInnerTempData[index];
                    for (let index_4 = 0; index_4 < data.length; index_4++) {
                        var child=data[index_4];
                        //console.log('%c innerIndex','color:rgb(255,77,255)',innerIndex,colorArrays[innerIndex].getRGBA());
                        child.HTML_target.style.background =this.getColorEffectValue(repeatCountList[index_4].color,0)
                    }
                }
                //     var setRgba = this.rainbow7Color()[data.recordIndex];
            }, effectData.repeatTime*0.1);
        }
        if (rangeMode != "Inner") {
            this.stopVar[TempName[1]] = setInterval(() => {
                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    var setRgba = this.rainbow7Color()[data.recordIndex];
                    data.HTML_target.style.background =this.getColorEffectValue(setRgba,1)
                    if (effectData.direction == 1) {
                        if (data.recordIndex < this.rainbow7Color().length - 1) {
                            data.recordIndex += 1;

                        }
                        else {
                            data.recordIndex = 0;
                        }
                    }
                    else {
                        if (data.recordIndex > 0) {
                            data.recordIndex -= 1;
                        }
                        else {
                            data.recordIndex = this.rainbow7Color().length - 1;
                        }
                    }
                }

            }, effectData.repeatTime);
        }
        console.log('%c mode_Rainbow','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName,rangeMode);
}
    mode_Warning(effectData,rangeMode='Inner') {
        var TempName=this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays=effectData.colorArrays;
        if(rangeMode=='OverAll'){
            this.mode_Warning_M(effectData,rangeMode);
            return;
        }
        var innerIndex=0;
        var outerIndex=0;
        var innerRainbowIndex = 0;
        var outerRainbowIndex = 0;
        var reInnerTempData = [];
        var reOuterTempData = [];
        var direction = 0;//0左1右
        for (let index = 1; index < innerArr.length+1; index++) {

            reInnerTempData.push({
                colors:colorArrays[innerIndex].getRGBA(),
                recordIndex: innerRainbowIndex,
                HTML_target: innerArr[index-1],
            });
            if (index % 8 == 0) {
                //innerIndex+=1;
            }
            
        }
        for (let index = 1; index < outerArr.length + 1; index++) {
            reOuterTempData.push({
                colors: colorArrays[outerIndex].getRGBA(),
                recordIndex: outerRainbowIndex,
                HTML_target: outerArr[index - 1],
            });
            if (index % 12 == 0) {
               // outerIndex += 1;
            }
        }
        if (rangeMode != "Outer") {
            var repeatCount=0;
            var addCount=0;

            var inner_totalStep=5;
            var inner_StartStep=0;
            var inner_SetColorindex=0;
            var nowColor;
            var newColor;
            this.stopVar[TempName[0]] = setInterval(() => {
                if(repeatCount%2==0){
                    nowColor=JSON.parse(JSON.stringify(colorArrays[inner_SetColorindex].getRGBA()));
                    newColor=[0,0,0,0];
                }
                else{
                    nowColor=[0,0,0,0];
                    newColor=JSON.parse(JSON.stringify(colorArrays[inner_SetColorindex].getRGBA()));

                }
                for (let index = 0; index < reInnerTempData.length; index++) {
                    var data = reInnerTempData[index];
                    var t_data = [0,0,0,1];
                    for (let i_Step = 0; i_Step < 3; i_Step++) {
                        t_data[i_Step] =(nowColor[i_Step] * (inner_totalStep - inner_StartStep) + newColor[i_Step] * inner_StartStep) / inner_totalStep;
                    }
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,0)   
                }
                repeatCount+=1;
                addCount+=1;
                if(addCount%2==0){
                    if(inner_SetColorindex<3){
                        inner_SetColorindex+=1;
                    }
                    else{
                        inner_SetColorindex=0;
                    }
                }
            }, effectData.repeatTime);
            console.log('%c mode_Warning_reInnerTempData','color:rgb(255,77,255)',reInnerTempData);

        }
        if (rangeMode != "Inner") {
            var outer_repeatCount=0;
            var outer_addCount=0;
            var totalStep=5;
            var outer_StartStep=0;
            var outer_SetColorindex=0;
            var o_nowColor;
            var o_newColor;
            this.stopVar[TempName[1]] = setInterval(() => {
                if(outer_repeatCount%2==0){
                    o_nowColor=JSON.parse(JSON.stringify(colorArrays[outer_SetColorindex].getRGBA()));
                    o_newColor=[0,0,0,0];
                }
                else{
                    o_nowColor=[0,0,0,0];
                    o_newColor=JSON.parse(JSON.stringify(colorArrays[outer_SetColorindex].getRGBA()));
                }
                for (let index = 0; index < reOuterTempData.length; index++) {
                    var data = reOuterTempData[index];
                    var setRgba = this.rainbow7Color()[data.recordIndex];
                    var t_data = [0,0,0,1];
                    //console.log('%c outer_StartStep','color:rgb(255,255,0)',t_data,outer_StartStep,totalStep);
                    for (let i_Step = 0; i_Step < 3; i_Step++) {
                        t_data[i_Step] =(o_nowColor[i_Step] * (totalStep - outer_StartStep) + o_newColor[i_Step] * outer_StartStep) / totalStep;
                    }
                    data.HTML_target.style.background =this.getColorEffectValue(t_data,1)         
                }
                outer_repeatCount+=1;
                outer_addCount+=1;
                if(outer_addCount%2==0){
                    if(outer_SetColorindex<3){
                        outer_SetColorindex+=1;
                    }
                    else{
                        outer_SetColorindex=0;
                    }
                }

            }, effectData.repeatTime);
        }
        console.log('%c mode_Warning','color:rgb(255,77,255)',innerArr.length,outerArr.length,TempName,rangeMode);
    }
    mode_Warning_M(effectData, rangeMode = 'Inner') {
        var TempName = this.elementsName;
        var innerArr = document.getElementsByClassName(TempName[0]) as HTMLCollectionOf<HTMLElement>;
        var outerArr = document.getElementsByClassName(TempName[1]) as HTMLCollectionOf<HTMLElement>;
        var colorArrays = effectData.colorArrays;
        var posindex = 0;
        var fanUpNumber = 4;
        var reInnerTempData = [];
        var InnerTempData4 = [];
        for (let index = 1; index < innerArr.length + 1; index++) {
            InnerTempData4.push({
                colors: colorArrays[3].getRGBA(),
                HTML_target: innerArr[index - 1],
            });
            if (index % 8 == 0) {
                reInnerTempData.push(InnerTempData4);
                InnerTempData4 = [];
            }
        }
        var outerTempData4 = [];
        var reOuterTempData = [];
        for (let index = 1; index < outerArr.length + 1; index++) {
            outerTempData4.push({
                colors: colorArrays[0].getRGBA(),
                HTML_target: outerArr[index - 1],
            });
            if (index % 12 == 0) {
                reOuterTempData.push(outerTempData4);
                outerTempData4 = [];
            }
        }
        // var mixingTempData1=[];
        // var reorganizationData= reInnerTempData[0].concat(reOuterTempData[1]);

        // // var mixingTempData=[];
        // for (let index = 0; index < reInnerTempData.length; index++) {
        //     var reorganizationData= reInnerTempData[index].concat(reOuterTempData[index]);
        //     reorganizationData=effectData.direction==1?reorganizationData.reverse():reorganizationData;
        //     mixingTempData.push(reorganizationData);
        // }



        var o_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes: 12,
            tempUpArray: [],
            part: 4,
            maxArrlen: 6 * fanUpNumber / 2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex: 0,
            animationStep: 8888,
            loopPos: [[0,1,2,3], [0,1,2,3]],
        }
        var i_Step = {
            nowFrames: 0,
            loopDirection: 0,
            maxframes: 12,
            tempUpArray: [],
            part: 4,
            maxArrlen: 4 * fanUpNumber / 2,
            nowUpArray: [],
            setColor: colorArrays[0].getRGBA(),
            setColorindex: 0,
            animationStep: 8888,
            loopPos: [[0,1,2,3], [0,1,2,3]],
        }

        // for (let index = 0; index < 4*fanUpNumber/2; index++) {
        //     i_Step.tempUpArray.push([0, 0, 0, 0]);
        // }
        // for (let c_index = 0; c_index < colorArrays.length; c_index++) {
        //     for (let index = 0; index < 4*fanUpNumber/2; index++) {
        //         i_Step.tempUpArray.push(colorArrays[c_index].getRGBA());
        //     }
        // }
        // i_Step.nowUpArray = JSON.parse(JSON.stringify(i_Step.tempUpArray));
        var setTempName;
        switch (rangeMode) {
            case 'Inner':
                i_Step.animationStep = 0;
                setTempName = TempName[0];
                break;
            case 'Outer':
                o_Step.animationStep = 0;
                setTempName = TempName[1];
                break;
            case 'OverAll':
                i_Step.animationStep = 0;
                o_Step.animationStep = 0;
                setTempName = TempName[2];
                break;
            default:
                break;
        }
        // console.log('%c  o_Step.tempUpArray', 'color:rgb(255,77,255)', o_Step.tempUpArray)
        // console.log('%c  i_Step.tempUpArray', 'color:rgb(255,77,255)', i_Step.tempUpArray)
        this.stopVar[setTempName] = setInterval(() => {
            var setRange = Math.ceil(i_Step.nowFrames * (i_Step.maxArrlen) / i_Step.maxframes);
            if (i_Step.animationStep == 0) {
                var i_set_C = colorArrays[i_Step.setColorindex].getRGBA();
                var o_set_C = colorArrays[i_Step.setColorindex].getRGBA();

                var nowModSetp = i_Step.loopDirection % 2;
                for (let dindex = 0; dindex < reInnerTempData.length; dindex++) {
                    //console.log('%c compareArr','color:rgb(255,77,255)',compareArr);
                    if(nowModSetp==1){
                        i_set_C=[0,0,0,0];
                    }
                    if(nowModSetp==0){
                        o_set_C=[0,0,0,0];
                    }

                    var data_4_List = reInnerTempData[dindex];

                    for (let c_index = 0; c_index < data_4_List.length; c_index++) {
                        var data_4 = data_4_List[c_index];
                        data_4.HTML_target.style.background = this.getColorEffectValue(i_set_C, 1);
                    }
                    var o_data_4_List = reOuterTempData[dindex];
                    //console.log('%c compareArr','color:rgb(255,77,255)',compareArr);
                    for (let c_index = 0; c_index < o_data_4_List.length; c_index++) {
                        var data_4 = o_data_4_List[c_index];
                        data_4.HTML_target.style.background = this.getColorEffectValue(o_set_C, 1);
                    }

                }

                // var compareArr = i_Step.loopPos[nowModSetp];

                // console.log('%c compareArr', 'color:rgb(255,77,255)', compareArr);
                // for (let index = 0; index < compareArr.length; index++) {
                //     var comparePos = compareArr[index];
                //     var setList = reInnerTempData[comparePos];
                //     for (let dindex = 0; dindex < setList.length; dindex++) {
                //         var data_4 = setList[dindex];
                //         data_4.HTML_target.style.background = this.getColorEffectValue(set_C, 1);
                //     }


                // }
                // var o_compareArr = o_Step.loopPos[nowModSetp];

                // console.log('%c o_compareArr', 'color:rgb(255,77,255)', o_compareArr);
                // for (let index = 0; index < o_compareArr.length; index++) {
                //     var comparePos = o_compareArr[index];
                //     var setList = reOuterTempData[comparePos];
                //     for (let dindex = 0; dindex < setList.length; dindex++) {
                //         var data_4 = setList[dindex];
                //         data_4.HTML_target.style.background = this.getColorEffectValue(set_C, 1);
                //     }
                // }
                i_Step.loopDirection += 1;
                if (i_Step.loopDirection % 2 == 0) {
                    if (i_Step.setColorindex < colorArrays.length - 1) {
                        i_Step.setColorindex += 1;
                    }
                    else {
                        i_Step.setColorindex = 0;
                    }
                }

            }
            //var setRange2=Math.ceil(o_Step.nowFrames*(o_Step.maxArrlen)/o_Step.maxframes);

        }, effectData.repeatTime);
        //console.log('%c mode_Mixing','color:rgb(255,77,255)',i_Step,TempName,effectData.repeatTime);

        console.log('%c mode_Warning_M', 'color:rgb(255,77,255)', innerArr.length, outerArr.length, TempName, rangeMode);
    }
    loopArrDisplacement(directionSwitch=1,Arr) {
        if (directionSwitch==2) {
            var start = Arr[Arr.length - 1];//24
            for (let index = Arr.length - 1; index >= 0; index--) {
                if (index > 0) {
                    var Temp = Arr[index - 1];//23
                    Arr[index] = Temp;//24
                    
                }
                else {
                    Arr[0] = start;
                }
            }
        }
        else if (directionSwitch==1) {//反向陣列
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
    loopArrDisplacementAssignSpacing(directionSwitch=1,Arr,Spacing=1) {

        var handleArr=JSON.parse(JSON.stringify(Arr));
        if (directionSwitch == 2) {
            handleArr=(handleArr.splice(handleArr.length-Spacing,handleArr.length)).concat(handleArr);
        }
        else if (directionSwitch == 1) {//反向陣列
            handleArr = handleArr.concat(handleArr.splice(0, Spacing));
        }
        return handleArr;
    }
    getColorEffectValue(t_data, type = 0) {
        switch (type) {
            case 0:
                return this.toRadial_gradient(t_data, '#0000');
            case 1:
                return this.toCssRGB(t_data);
            default:
                break;
        }
    }
}

