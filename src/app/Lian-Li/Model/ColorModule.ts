// HSL即色相、飽和度、亮度（英語：Hue, Saturation, Lightness）。
// HSV即色相、飽和度、明度（英語：Hue, Saturation, Value），又稱HSB其中B即英語：Brightness。
//backup:"-webkit-linear-gradient(left,#FFFFFF,red)";

    //Louis Architecture => Hex=>SET RGB=>SET HSV
    var consolelogFlag=false;
    export class ColorModule{    
        name:any="";
        Hex: string;//色碼
        Hue: number = 0;//0~360
        Saturation: number = 0;//飽和度 0~1
        Value: number = 0;//明度 0~1
        Lightness: number=0;//亮度 0~1
        Red: number = 0;
        Green: number = 0;
        Blue: number = 0;
        SBgColor:any="";
        VBgColor:any="";
        colorTicket=[[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1],[255, 32, 0, 1]];
        preDefineColor: any = ["#FF2000","#ff8000","#80ff00","#00ff00","#00ffff","#0000ff","#8000ff","#ff00ff","#ff0080","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"];//RGB
        currentRecordIndex=0;
        recordColorElement:any;
        savePosition:any={
            "precentS":0,
            "precentL":0,
    
        };
        disX =0;
        disY =0;
        gradientBGcolor:any="#FFFFFF";
        //-webkit-linear-gradient(left,#FFFFFF,rgb(255,255,255)";
        constructor(inputname=""){
            this.SetHex("#66CC33");
            this.name=inputname;
            this.customlog("CurrentColorCustomName",this.name)    
        }
        ImportClassData(InputData) {
            InputData = JSON.parse(JSON.stringify(InputData));
            var arrkeys = Object.keys(InputData);//取得欄位變成陣列
            for (let index = 0; index < arrkeys.length; index++) {
                this[arrkeys[index]] = InputData[arrkeys[index]];
            }
        }
        colorMixing(hex1,hex2) {
            var result1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
            var result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
            var T="#";
    
            for (let index = 1; index < 4; index++) {
                var DEC=Number("0x"+result1[index])+Number("0x"+result2[index]);
                var hex=Math.round((DEC/2)).toString(16);
                this.customlog('colorMixingfor',DEC,hex,hex.length);
                hex=hex.length == 1 ? "0" + hex : hex;
                T+=hex;
            }
            //+(result1[2]+result2[2]).toString(16)+(result1[3]+result2[3]).toString(16);
            this.customlog('colorMixing',T);
            //parseInt("0xF", 16);
            return T;      
    
        }
        mousedown(oEvent: MouseEvent) {
            var parentDiv = document.getElementById(this.name+'PickingArea');
            var circleDiv = document.getElementById(this.name+'Circle');
            var resultleft = oEvent.layerX;
            var resultTop = oEvent.layerY;
            if (resultleft < 0) {
                resultleft = 0;
            } 
            if (resultTop < 0) {
                resultTop = 0;
            } 
            function getStyle(obj, attr) {
                if (obj.currentStyle) {
                    return obj.currentStyle[attr];
                } else {
                    return getComputedStyle(obj, null)[attr];
                }
            }
            circleDiv.style.left = resultleft + 'px';
            circleDiv.style.top = resultTop + 'px';
            let precent1=(parentDiv.clientWidth-circleDiv.offsetWidth)/100;
            let precentL=(parentDiv.clientHeight-circleDiv.offsetHeight)/100;
            this.savePosition.precentS=precent1;
            this.savePosition.precentL=precentL;
            var Lightness=Math.round((resultTop)/precentL);
            var Saturation=Math.round((resultleft)/precent1);
            this.Lightness=100-Lightness;
            this.Saturation=Saturation;
            this.HSL_RGB_HexSet();
            
            this.disX = oEvent.clientX - parseInt(getStyle(circleDiv, 'left'));
            this.disY = oEvent.clientY - parseInt(getStyle(circleDiv, 'top'));



        }
        mousemove(oEvent: MouseEvent) {
            var parentDiv = document.getElementById(this.name+'PickingArea');
            var circleDiv = document.getElementById(this.name+'Circle');
            this.customlog("CurrentColormousemove",circleDiv,parentDiv);

            function getStyle(obj, attr) {
                if (obj.currentStyle) {
                    return obj.currentStyle[attr];
                } else {
                    return getComputedStyle(obj, null)[attr];
                }
            }
            var resultleft = oEvent.clientX - this.disX;
            var resultTop = oEvent.clientY -this.disY;
            if (resultleft < 0) {
                resultleft = 0;
            } else if (resultleft > parentDiv.offsetWidth - /*parseInt(getStyle(circleDiv,'width'))*/circleDiv.offsetWidth) {
                resultleft = parentDiv.offsetWidth - circleDiv.offsetWidth;
            }
            if (resultTop < 0) {
                resultTop = 0;
            } else if (resultTop > parentDiv.offsetHeight - circleDiv.offsetHeight) {
                resultTop = parentDiv.offsetHeight - circleDiv.offsetHeight;
            }
            circleDiv.style.left = resultleft + 'px';
            circleDiv.style.top = resultTop + 'px';

            let precent1 = (parentDiv.clientWidth - circleDiv.offsetWidth) / 100;
            var Saturation = Math.round((resultleft) / precent1);

            let precentV = (parentDiv.clientHeight - circleDiv.offsetHeight) / 100;
            var Lightness = Math.round((resultTop) / precentV);
            this.Lightness = 100 - Lightness;
            this.Saturation = Saturation;
            this.HSL_RGB_HexSet();

        };
        CreateFakeArray(length=0){
            return  Array(length).fill(4);
        }






        setDefault(){
            this.SetHex("#66CC33");
            
        } 
        onclickColorTicket(styleColor){
            this.SetRGB(styleColor);
            //this.customlog('onclickColorTicket',styleColor.style.backgroundColor);
        }

        onclickColorDefault(styleColor,index){
            this.currentRecordIndex=index;
            //styleColor=$event.target.style.backgroundColor
            this.formatRGB(styleColor.style.backgroundColor);
            this.customlog('onclickColorDefault',styleColor.style.backgroundColor);
            this.updateCircleDivPos();
            this.setGradientBGcolor();
    
        }
        updateCircleDivPos(){
            var circleDiv = document.getElementById(this.name+'Circle');
            circleDiv.style.left=this.savePosition.precentS*this.Saturation+"px";
            circleDiv.style.top=this.savePosition.precentL*(100-this.Lightness)+"px";
    
        }

        
        formatRGB(InputData) {
            this.customlog("formatRGB", InputData);
            this.Hex = this.backGroundColorRgbToHex(InputData);
            var rgbArr = this.ColorRgbToArray(InputData);
            this.SetRGB(rgbArr);
        }
        SetRGB(Arr) {
            this.Red=Arr[0];
            this.Green=Arr[1];
            this.Blue=Arr[2];
            var HSL=this.rgbTo_hsl(Arr);
            this.Hue=Math.round(HSL[0]);
            this.Saturation=Math.round(HSL[1]);
            this.Lightness=Math.round(HSL[2]);
            this.Hex= this.rgbToHex(Arr[0],Arr[1],Arr[2]);

            var HSV_B=this.getRgb2HSV();  
            this.Hue=HSV_B[0];
            this.Saturation=HSV_B[1];
            this.Value=HSV_B[2];
            this.setGradientBGcolor();
            this.showColorVarData();
        }

        showColorVarData() {
            var colorlog = {
                Hex: this.Hex,
                Red: this.Red,
                Green: this.Green,
                Blue: this.Blue,
                Hue: this.Hue,
                Saturation: this.Saturation,   
                Value:this.Value,
                Lightness:this.Lightness,
            }
            //this.customlog(colorlog);
            //console.log('%c showColorVarData','background: red; color: white',colorlog);
        }


        SetHex(InputData) {
            this.customlog("SetHex",InputData);
            this.Hex=InputData;
            this.SetRGB(this.hexToRgb(InputData));

        }

        hsv_Rgb_hexSet(){
            this.customlog("Enter_hsv_Rgb_hexSet HSV>rgb>hex");
            var RGBResult =this.HSVtoRGB(this.Hue/360, this.Saturation/100, this.Value/100);
            this.Hex=  this.rgbToHex(RGBResult[0],RGBResult[1],RGBResult[2]);
            this.Red=RGBResult[0];
            this.Green=RGBResult[1];
            this.Blue=RGBResult[2];

            
            // this.SetHex(Hex);
        }

        HSL_RGB_HexSet(){
            this.customlog("Enter_hsL_Rgb_hexSet HSV>rgb>hex");
            var RGBResult =this.hslToRGB(this.Hue, this.Saturation, this.Lightness);
            this.Hex=  this.rgbToHex(RGBResult[0],RGBResult[1],RGBResult[2]);
            this.Red=RGBResult[0];
            this.Green=RGBResult[1];
            this.Blue=RGBResult[2];
            this.setPreDefineColor();
            // this.SetHex(Hex);
        }

        setPreDefineColor(){
            this.preDefineColor[this.currentRecordIndex]=this.Hex;

        }

        getPreDefineColor(){
           return this.preDefineColor[this.currentRecordIndex];
        }
        rgbTo_hsl(rgbArr){
            var r1 = rgbArr[0] / 255;
            var g1 = rgbArr[1] / 255;
            var b1 = rgbArr[2] / 255;
         
            var maxColor = Math.max(r1,g1,b1);
            var minColor = Math.min(r1,g1,b1);
            //Calculate L:
            var L = (maxColor + minColor) / 2 ;
            var S = 0;
            var H = 0;
            if(maxColor != minColor){
                //Calculate S:
                if(L < 0.5){
                    S = (maxColor - minColor) / (maxColor + minColor);
                }else{
                    S = (maxColor - minColor) / (2.0 - maxColor - minColor);
                }
                //Calculate H:
                if(r1 == maxColor){
                    H = (g1-b1) / (maxColor - minColor);
                }else if(g1 == maxColor){
                    H = 2.0 + (b1 - r1) / (maxColor - minColor);
                }else{
                    H = 4.0 + (r1 - g1) / (maxColor - minColor);
                }
            }
         
            L = L * 100;
            S = S * 100;
            H = H * 60;
            if(H<0){
                H += 360;
            }
            var result = [H, S, L];
            return result;
        }


         setGradientBGcolor(){
         const s= this.getHSL_RGBColor(this.Hue,100,50);
         this.gradientBGcolor="rgb(" + s[0] + "," + s[1] + "," + s[2] +")";
         }


        getHSL_RGBColor(H,S,V){

         return  this.hslToRGB(H,S,V);
        }

        getS_RGBColor(){

            return this.HSVtoRGB(this.Hue/360, 1, this.Value/100);
        }
        getV_RGBColor(){
            return this.HSVtoRGB(this.Hue/360, this.Saturation/100, 1);
        }
        getParentDiv(){
            var parentDiv = document.getElementById(this.name+'PickingArea');
            return parentDiv;
        }

        getColorFormat_RGB(){
            return  "rgb(" + this.Red + "," + this.Green + "," + this. Blue + ")";
        }
        getRGB(){
            return [Number(this.Red),Number(this.Green),Number(this.Blue)];
        }

        getRGBA(){
            return [Number(this.Red),Number(this.Green),Number(this.Blue),1];
        }

        getRgb2HSV() {
            let r= this.Red;
            let g= this.Green;
            let b= this.Blue;
            this.customlog("getRgb2HSV",r,g,b);

            return this.rgb2HSV(r,g,b);
        }

   


        //----------------------------------公式轉換-----------------------------//

        hexToRgb(InputData) {
            this.customlog("hexToRgbInputData",InputData);

            try {
        
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(InputData);
                this.customlog("hexToRgbResult", [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ]);

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
                alert("hexToRgbError");
                return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ];
            }
        }
        backGroundColorRgbToHex(col) {
            if (col.charAt(0) == 'r') {
                col = col.replace('rgb(', '').replace(')', '').split(',');
                var r = parseInt(col[0], 10).toString(16);
                var g = parseInt(col[1], 10).toString(16);
                var b = parseInt(col[2], 10).toString(16);
                r = r.length == 1 ? '0' + r : r;
                g = g.length == 1 ? '0' + g : g;
                b = b.length == 1 ? '0' + b : b;
                var colHex = '#' + r + g + b;
                this.customlog('backGroundColorRgbToHex',col);
                return colHex;
            }
        }
        
        ColorRgbToArray(col) {
            if (col.charAt(0) == 'r') {
                var colArr = col.replace('rgb(', '').replace(')', '').split(',');
                return colArr;
            }
        }


        hslToRGB(hue, Saturation, l) {
            if (!isFinite(hue)) hue = 0;
            if (!isFinite(Saturation)) Saturation = 0;
            if (!isFinite(l)) l = 0;
        
            hue /= 60;
            if (hue < 0) hue = 6 - (-hue % 6);
            hue %= 6;
        
            Saturation = Math.max(0, Math.min(1, Saturation / 100));
            l = Math.max(0, Math.min(1, l / 100));
        
            var c = (1 - Math.abs((2 * l) - 1)) * Saturation;
            var x = c * (1 - Math.abs((hue % 2) - 1));
        
            if      (hue < 1) {r = c; g = x; b = 0;}
            else if (hue < 2) {r = x; g = c; b = 0;}
            else if (hue < 3) {r = 0; g = c; b = x;}
            else if (hue < 4) {r = 0; g = x; b = c;}
            else if (hue < 5) {r = x; g = 0; b = c;}
            else            {r = c; g = 0; b = x;}
        
            var m = l - c / 2;
            var r = Math.round((r + m) * 255);
            var g = Math.round((g + m) * 255);
            var b = Math.round((b + m) * 255);
            this.customlog('hslToRGB', [r, g, b]);
            return [r, g, b];
        }

        rgbToHex(r, g, b) {
            var red = this.NumTo16Decimal(r);
            var green = this.NumTo16Decimal(g);
            var blue = this.NumTo16Decimal(b);
            this.customlog('rgbToHex', "#"+red + green + blue);
            return "#"+red + green + blue;
        
        };
        NumTo16Decimal(rgb) {//HEX色碼
            var hex = Number(rgb).toString(16);
            if (hex.length < 2) {
                hex = "0" + hex;
            }
            return hex;
        };
        //hsv =hsb  轉換為0~360度 ,0~1 ,0~1
        rgb2HSV(rInput, gInput, bInput) {
            this.customlog("rgb2HSVInput",rInput,gInput,bInput);
            var computedH = 0;
            var computedS = 0;
            var computedV = 0;

            //remove spaces from input RGB values, convert to int
            // var r = parseInt(('' + rInput).replace(/\s/g, ''), 10);
            // var g = parseInt(('' + gInput).replace(/\s/g, ''), 10);
            // var b = parseInt(('' + bInput).replace(/\s/g, ''), 10);
            var r = rInput;
            var g = gInput;
            var b = bInput;

            if (r == null || g == null || b == null ||
                isNaN(r) || isNaN(g) || isNaN(b)) {
                alert('Please enter numeric RGB values!');
                return;
            }
            if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
                alert('RGB values must be in the range 0 to 255.');
                return;
            }
            r = r / 255; g = g / 255; b = b / 255;
            var minRGB = Math.min(r, Math.min(g, b));
            var maxRGB = Math.max(r, Math.max(g, b));

            // Black-gray-white
            if (minRGB == maxRGB) {
                computedV = minRGB;
                return [0, 0, computedV*100];
            }

            // Colors other than black-gray-white:
            var d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
            var h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);
            computedH = 60 * (h - d / (maxRGB - minRGB));
            computedS = (maxRGB - minRGB) / maxRGB;
            computedV = maxRGB;
            var result=[Math.round(computedH),Math.round(computedS*100),Math.round(computedV*100)];
            this.customlog("rgb2HSVResult",[computedH,computedS,computedV]);
            return result;
        }
        HSVtoRGB(h, s, v) {
           let s1=h;
           let s2=s;
           let s3=v;
            var r, g, b, i, f, p, q, t;
            if (arguments.length === 1) {
                s = h.s, v = h.v, h = h.h;
            }
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
    
            let result = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            //this.customlog("HSVtoRGBResult",result,'Input:h',s1,'s',s2,'v',s3);
            return result;
            // return {
            //     r: Math.round(r * 255),
            //     g: Math.round(g * 255),
            //     b: Math.round(b * 255)
            // };
        }
        customlog(message?: any, ...optionalParams: any[]){
            if(consolelogFlag){
                this.customlog(message,optionalParams);
            }
        }
    }



    




