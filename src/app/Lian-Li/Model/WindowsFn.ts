

export class WindowsFn{    

    get_Windows_Vw_Vh(){

        let _1vw = Math.round(window.innerWidth / 100);
        let _1vh= Math.round(window.innerHeight / 100);
        
        var arr=[_1vw,_1vh];
        return arr;
    }


}

// export function get_Windows_Vw_Vh(){

//     let _1vw = Math.round(window.innerWidth / 100);
//     let _1vh= Math.round(window.innerHeight / 100);
    
//     var arr=[_1vw,_1vh];
//     return arr;

// }