// let remote = window['System']._nodeRequire('electron').remote; 
// let evtVar = window['System']._nodeRequire('./backend/others/EventVariable');
// let funcVar = window['System']._nodeRequire('./backend/others/FunctionVariable');
// let env = window['System']._nodeRequire('./backend/others/env');


// export class AppProtocol {

//     protocol:any;

//     constructor(){
//        this.protocol = remote.getGlobal('AppProtocol');
//     }

//      public RunSetFunction(obj:any,callback:any){
//         //env.log('AppProtocol','RunSetFunction',JSON.stringify(obj));
//         if (obj.Type === funcVar.FuncType.System ){
//             this.RunSetFunctionSystem(obj,callback);           
//         } else if (obj.Type === funcVar.FuncType.Device){
//             this.RunSetFunctionDevice(obj,callback);
//         }
//     }
   
//     public RunGetFunction(obj:any,callback:any){
//         if (obj.Type === funcVar.FuncType.System ){
//            this.RunGetFunctionSystem(obj,callback);
//         } else if (obj.Type === funcVar.FuncType.Device){
//             this.RunGetFunctionDevice(obj,callback);
//         }
//     }  

//     private checkGetSystemFunction(fnName:string){
//         var fnlist =['abctest'];
//         return fnlist.lastIndexOf(fnName) >=0;
//     }

//     private checkSetSystemFunction(fname:string){
//         var fnlist =[
//         'abctest', 
//         'InitDevice',
//          'ChangeWindowSize',
//          'SendKey',
//          'ExportProfile',
//          'ImportProfile',
//          'SetProfileDB',
//          'ReadProfileDB',
         
//          'SetLaunchProgram',
//          'QuitApp',
         
//          'FanPRMCallBack',
//         ];
//         return fnlist.lastIndexOf(fname) >=0;
//     }


//     private RunGetFunctionSystem(obj:any,callback:any){
//        if(this.checkGetSystemFunction(obj.Func))
//        {   
//            var Obj1 = { Type:funcVar.FuncType.System, Func:obj.Func, Param : obj.Param } ;
//            this.protocol.RunFunction(Obj1,(data)=> { callback(data); });
//        }else{
//            callback("functionNameError");
//        }
//     }

//     private RunSetFunctionSystem(obj:any,callback:any) {
//         if(this.checkSetSystemFunction(obj.Func)){
//             var Obj1 = { Type:funcVar.FuncType.System, Func:obj.Func, Param : obj.Param } ;
//             this.protocol.RunFunction(Obj1, (err,data) => { callback(err); });
//         }else{
//              callback("functionNameError");
//         } 
//     }


//     private checkSetDeviceFunction(fname:string){
//         var fnlist =[
//         'SetMacroKey',
//         'GetKeyMatrix',
//         'SetKeyMatrix',
//         'APMode',
//         'RunApplication',
//         'LightBarMode',
//         'GetProfieAndFirmwareVer',
//         'GetDefaultKeyMatrix',
//         'GetProfileInfo',
    
//         'SetProfile',
//         'SetLEDEffect',   
        
//     ];
//         return fnlist.lastIndexOf(fname) >=0;
//     }

//     private checkGetDeviceFunction(fname:string){
//         var fnlist =[''];
//         return fnlist.lastIndexOf(fname) >=0;
//     }
    
//     private RunGetFunctionDevice(obj:any,callback:any){
//         if(this.checkGetDeviceFunction(obj.Func))
//         {   
//             var Obj1 = { Type:funcVar.FuncType.Device, Func:obj.Func, Param : obj.Param } ;
//             this.protocol.RunFunction(Obj1,(data)=> { callback(data); });
//         }else{
//             callback("functionNameError");
//         }
//      }
 
//      private RunSetFunctionDevice(obj:any,callback:any) {
//         //  console.log(JSON.stringify("Robert:"+JSON.stringify(obj)));
//          if(this.checkSetDeviceFunction(obj.Func)){
//              var Obj1 = { Type:funcVar.FuncType.Device, Func:obj.Func, Param : obj.Param } ;
//              this.protocol.RunFunction(Obj1, (err,data) => { callback(err); });
//          }else{
//               callback("functionNameError");
//          } 
//      } 

// }