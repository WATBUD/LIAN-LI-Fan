
export class ImagePath {
    static instance=undefined;
    constructor(
    ) {
        ImagePath.instance=this;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            //console.log("new ImgPathList Class");
            this.instance = new ImagePath();
            console.log('%c ImgPathList_getInstance_err','background: blue; color: red');
            return this.instance;
        }
    }

    
    dirBgNormalR: any = [
        "url('./image/FanMode/dirBgNormalRHover.png')",
        "url('./image/FanMode/dirBgNormalR.png')",
    ];
    dirBgNormalL: any = [
        "url('./image/FanMode/dirBgNormalLHover.png')",
        "url('./image/FanMode/dirBgNormalL.png')",
    ];
    //中上
    //中下
    FANModeDropPng: any = [
        "url('./image/FanMode/Off/FANModeDrop.png')",
        "url('./image/FanMode/On/FANModeDrop.png')",

    ];


    SL_LedModeDropPng: any = [
        "url('./image/SL_Img/Off/LedListTitle.png')",
        "url('./image/SL_Img/On/LedListTitle.png')",
    ];

    btnBrightFrame: any = [
        "url('./image/FanMode/btn01_normal.png')",
        "url('./image/FanMode/btn01_over.png')",
    ];

    //左邊列
    pageBtnPng: any = [
        "url('./image/FanMode/BtnLeftSide_normal.png')",
        "url('./image/FanMode/BtnLeftSide_over.png')",
    ];

    LedPartbtnPng: any = [
        "url('./image/FanMode/BtnLedPart_normal.png')",
        "url('./image/FanMode/BtnLedPart_over.png')",
    ];
    LedPartbtnColor: any = [
        "#FFFFFF",
        "#B0C3EA",
    ];
    onOffUI: any = [
        "url('./image/Share/OnOffUI_0.png')",
        "url('./image/Share/OnOffUI_1.png')",
    ];
    ImportIcon: any = [
        "url('./image/Share/On/ImportIcon.png')",
        "url('./image/Share/Off/ImportIcon.png')",
    ];
    ExportIcon: any = [
        "url('./image/Share/On/ExportIcon.png')",
        "url('./image/Share/Off/ExportIcon.png')",
    ];
    ColorSelectAll: any = [
        "url('./image/Share/On/ColorSelectAll.png')",
        "url('./image/Share/Off/ColorSelectAll.png')",
    ];
    ReSetDefault: any = [
        "url('./image/Share/On/ReSetDefault.png')",
        "url('./image/Share/Off/ReSetDefault.png')",
    ];
    
    // NoticeMessage=[
    //     "url(./image/FanMode/NoticeMessageEN.png)",
    //     "url(./image/FanMode/NoticeMessageCN.png)",
    // ]


    Inner_Icon= [
        "./image/SL_Img/On/Inner_Icon.png",
        "./image/SL_Img/Off/Inner_Icon.png",
    ];
    Outer_Icon= [
        "./image/SL_Img/On/Outer_Icon.png",
        "./image/SL_Img/Off/Outer_Icon.png",
    ];
    OverAll_Icon: any=[
        "./image/SL_Img/On/OverAll_Icon.png",
        "./image/SL_Img/Off/OverAll_Icon.png",
    ];


    getAssignTarget(name){
        if(this[name]!=undefined){
           return this[name];
        }
        else{
            console.log('%c ImgPath_getAssignTarget','background: blue; color: red',name,this);
        }

    }
}