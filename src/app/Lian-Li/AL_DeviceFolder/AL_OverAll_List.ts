import { ModeParameter } from './ModeParameter';
var modeDefaultColor = [
    [0, 0, 255],[255, 0, 0], [0, 255, 0], [255, 255, 0]
];     
export class AL_OverAll_List {
    modeindex=0;
    modeindexTranslate="Rainbow";
    modeType='OverAll';
    modeArray = [new Rainbow,new Static_Color,new Breathing_Color,new Taichi,new Color_Cycle,new Warning,
        new Voice,new Spinning_Teacups,new tornado,new Mixing,new Stack,
        new Staggered,new Tide,new Scan,new Scan_Sync,new Contest,new Contest_Sync];
    //modeArray = [new Static_Color,new Rainbow,new Breathing_Color];

    getMode(){
        var target=this.modeArray.find((x)=>x.name==this.modeindexTranslate);
        if(target!=undefined){
            //console.log('%c AL_OverAll_List_getMode', 'color:rgb(255,75,255,1)', target);
            return target;
        }
        else{
            alert('%c AL_OverAll_List_undefined'+this.modeindexTranslate);
            //console.log('%c AL_OverAll_List_undefined', 'color:rgb(255,75,255,1)', target);
            return this.modeArray[0]
        }
    }
    setMode(name){
        var target=this.modeArray.find((x)=>x.name==name);
        if(target!=undefined){
            //console.log('%c AL_OverAll_List_setMode', 'color:rgb(255,75,255,1)', target);
            this.modeindexTranslate=target.name;
        }
        else{
            alert('%c AL_OverAll_List_setMode_undefined'+this.modeindexTranslate);
            //console.log('%c AL_OverAll_List_undefined', 'color:rgb(255,75,255,1)', target);
            return this.modeArray[0]
        }
    }
    ImportClassData(target) {
        
        var target = JSON.parse(JSON.stringify(target));
        var dataArrT1 = Object.keys(target);
        for (let index2 = 0; index2 < dataArrT1.length; index2++) {
            var compareName=dataArrT1[index2];
            if (compareName.indexOf('modeArray')== -1) {
                //console.log('LinearGradient_dataArr[index2]:', dataArr[index2]);
                this[compareName] = target[compareName];
            }
            else if(compareName == "modeArray"){
                let tempData=target[compareName];
                for (let i_NMA_class = 0; i_NMA_class < tempData.length; i_NMA_class++) {
                    this.modeArray[i_NMA_class].ImportArraysData(tempData[i_NMA_class]);
                }
            }                
        }
    }
}
export class Rainbow extends ModeParameter{
    showSPBTable:any=[true, true, true];
    colorVisibleNum=0;
    constructor(){
        super();
        this.name="Rainbow";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
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
      
        this.schedule[GroupNumber-1] = T;
    }
    visiblePositionEffect(){

        //getLinearGradientText
    }
}
export class Breathing_Color extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Breathing Color";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
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
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Taichi extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Taichi";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 100;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.8;
                break;
            case 1:
                this.repeatTime = max*0.7;
                break;
            case 2:
                this.repeatTime = max*0.6;
                break; 
            case 3:
                this.repeatTime = max*0.5;
                break;
            case 4:
                this.repeatTime = max*0.4;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Static_Color  extends ModeParameter{

    showSPBTable:any=[false, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Static Color";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
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
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}

export class Color_Cycle extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Color Cycle";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 200;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.6;
                break;
            case 1:
                this.repeatTime = max*0.5;
                break;
            case 2:
                this.repeatTime = max*0.4;
                break; 
            case 3:
                this.repeatTime = max*0.3;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}

export class Voice extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Voice";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 200;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Warning extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Warning";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 1000;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Stack extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Stack";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 100;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



}
export class Tide extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Tide";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 300;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



}
export class Scan extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Scan";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 500;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



}
export class tornado extends ModeParameter{
    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="tornado";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 500;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.2;//by Rainbow
                break;
            case 1:
                this.repeatTime = max*0.15;
                break;
            case 2:
                this.repeatTime = max*0.1;
                break; 
            case 3:
                this.repeatTime = max*0.075;
                break;
            case 4:
                this.repeatTime = max*0.05;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }
}
export class Mixing extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Mixing";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 250;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }
}

export class Staggered extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Staggered";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 1000;
        switch (this.speed) {
            case 0:
                this.repeatTime = max;//by Rainbow
                break;
            case 1:
                this.repeatTime = max*0.8;
                break;
            case 2:
                this.repeatTime = max*0.6;
                break; 
            case 3:
                this.repeatTime = max*0.4;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Spinning_Teacups extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Spinning Teacups";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 500;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Contest extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=3;
    constructor(){
        super();
        this.name="Contest";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 250;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}

export class Contest_Sync extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=3;
    constructor(){
        super();
        this.isSync=true;
        this.name="Contest Sync";
        this.colors=this.rainbow7Color();
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 250;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}
export class Scan_Sync extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Scan Sync";
        this.colors=this.rainbow7Color();
        this.isSync=true;
        //this.colors= ['#FF0000', '#FF7D00','#FFFF00','#00FF00','#0000FF','#00FFFF','#FF00FF','#FFFFFF'];
        this.setLEDVarDefault();
    }
    setLEDVarDefault() {
        this.bright = 4;
        this.speed = 3;
        this.direction=2;
        for (let index = 0; index < this.colorArrays.length; index++) {
            this.colorArrays[index].SetRGB(modeDefaultColor[index]);
        }
        for (let index = 0; index <  this.syncConcatenation.length; index++) {
            this.syncConcatenation[index]=2;
        }
    }  


    scheduleCreateData(GroupNumber) {
        this.loopCount=0;
        var T = [];
        var max = 500;
        switch (this.speed) {
            case 0:
                this.repeatTime = max*0.4;
                break;
            case 1:
                this.repeatTime = max*0.35;
                break;
            case 2:
                this.repeatTime = max*0.3;
                break; 
            case 3:
                this.repeatTime = max*0.25;
                break;
            case 4:
                this.repeatTime = max*0.2;
                    break;   
         
        }
      
        this.schedule[GroupNumber-1] = T;
    }



    visiblePositionEffect(){

        //getLinearGradientText
    }



}