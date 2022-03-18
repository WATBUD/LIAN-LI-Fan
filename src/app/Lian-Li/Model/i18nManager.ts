//1暫定為真值
import { Injectable } from '@angular/core';
declare var System;
//let i18n_File ='./i18n/i18n_Localization';
import { i18n_Localization } from '../../assets/i18n/i18n_Localization'
let i18n_File ={
    'i18n_Localization':i18n_Localization,
}
@Injectable()
export class i18nManager {
    chooseLangindex=0;
    onUsingLangindex=0;
    autoStart=[true,true];//0為狀態假值 1為真值
    recovery=[false,false];//0為狀態假值 1為真值
    //currentLanguagesTxt ='EN' //DE德國
    langList=['EN','CN'];
    constructor(){
        i18nManager.instance=this;
        console.log('i18n_Localization',i18n_File.i18n_Localization);

    }

    static instance=undefined;
    static getInstance() {
        if (this.instance) {
            return this.instance;
		} 
		else{
            this.instance = new i18nManager();
            console.log('%c i18nManager_getInstance_err','background: blue; color: red');
            return this.instance;
		}

		
    }
    // getLangUITxt(){
    //     return this.langList[this.chooseLangindex].name[this.chooseLangindex];
    // }
    setlangList(setLangList){
        if(setLangList){
            this.langList=[];
        }
    }
   
    geti18nType(){
       return this.langList[this.onUsingLangindex];
    }


    getTarget(keyName){
        if(i18n_File.i18n_Localization[keyName]!=undefined){
        var T=i18n_File.i18n_Localization[keyName][this.geti18nType()];
        //console.log('i18n_Localization[keyName]',keyName,this.onUsingLangindex,T,this.langList);
        return T;
        }
        console.log('Lost_i18n_Localization[keyName]',keyName);
        return '';
    }
    getFontFamilyFont(){
        if(this.onUsingLangindex==0){
            return "ENFont";
        }
        {
            return "CNFont";
        }
    }
    // getTempTarget(){

    //     return this.langList[this.chooseLangindex];

    // }
    // update(){
    //     this.onUsingLangindex=this.chooseLangindex;
    //     this.autoStart[1]=this.autoStart[0];
    //     this.recovery[1]=this.recovery[0];
    // }
    // back(){

    //     this.chooseLangindex=this.onUsingLangindex;
    //     this.autoStart[0]=this.autoStart[1];
    //     this.recovery[0]=this.recovery[1];

    // }

}

// Simon:
// 英文版本不显示微信微博

// Simon:
// 中文版本不显示FB,IG,推特
//FB IG Mail 论坛 官网 推特 微信 微博



