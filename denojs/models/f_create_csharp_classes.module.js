
import {a_o_model} from "./a_o_model.module.js"


import { f_create_csharp_class } from "./f_create_csharp_class.module.js"

var f_create_csharp_classes = function(
    o_model
){

    for(var o_model of a_o_model){
        f_create_csharp_class(o_model);
    }

}



export { f_create_csharp_classes }