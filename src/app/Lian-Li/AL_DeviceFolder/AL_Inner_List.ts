import { ModeParameter } from './ModeParameter';
var modeDefaultColor = [
    [0, 0, 255],[255, 0, 0], [0, 255, 0], [255, 255, 0]
];     
export class AL_Inner_List {
    modeindex=0;
    modeindexTranslate="Rainbow";
    modeType='Inner';
    modeArray = [new Rainbow,new Static_Color,new Breathing_Color,new Color_Cycle,
        new Runway,new Mop_up,new Pac_Man,new Meteor,new Meteor_Rainbow,
        new Lottery,new Wave,new Spring,new Tail_Chasing,new Warning,
        new Voice,new Mixing,new Stack,new Tide,new Scan];
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
        var max = 250;
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
        var max = 100;
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
export class Runway extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Runway";
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
export class Mop_up extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Mop up";
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
}
export class Pac_Man extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Pac-Man";
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
}
export class Meteor extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor(){
        super();
        this.name="Meteor";
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
}
export class Meteor_Rainbow extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=0;
    constructor(){
        super();
        this.name="Meteor Rainbow";
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
}
export class Lottery extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=2;
    constructor(){
        super();
        this.name="Lottery";
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
}
export class Wave extends ModeParameter{

    showSPBTable:any=[true, true, false];
    colorVisibleNum=1;
    constructor()
    {                                                                
        super();
        this.name="Wave";
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
                this.repeatTime = max;
                break;
            case 1:
                this.repeatTime = max*0.8;
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
export class Spring extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor()
    {                                                                
        super();
        this.name="Spring";
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
                this.repeatTime = max;
                break;
            case 1:
                this.repeatTime = max*0.8;
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
export class Tail_Chasing extends ModeParameter{

    showSPBTable:any=[true, true, true];
    colorVisibleNum=4;
    constructor()
    {                                                                
        super();
        this.name="Tail Chasing";
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
                this.repeatTime = max;
                break;
            case 1:
                this.repeatTime = max*0.8;
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
    colorVisibleNum=1;
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