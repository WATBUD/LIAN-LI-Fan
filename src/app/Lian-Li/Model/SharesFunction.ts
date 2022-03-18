// export class {

import { constructDependencies } from "@angular/core/src/di/reflective_provider";


export class SharesFunction{
    constructor(){


    }

    logCustom(Message,data){
        console.log("SharesFunction_log",Message,data);

    }

}


// }

export function count_boolean (inputArr=[],type=false) {
    var count=0;
    inputArr.forEach(element => {
        if (element == type) {
            count += 1;
        }
    });
     return count;
}


export function CreateFakeArray(length=0){
    return  Array(length).fill(4);
}



//檢查目標是否在陣列內
function checkExist(array,findTarget){
    //console.log("checkExistArr",ary,findTarget);
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element==findTarget){
            console.log("存在值",element,findTarget);
            return true;
        }
    }
    return false;    
}