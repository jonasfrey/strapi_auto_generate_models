import { f_create_strapi_model } from "./f_create_strapi_model.module.js";
import {a_o_model} from "./a_o_model.module.js"

var f_create_strapi_models = function(){
    for(let o_model of a_o_model){
        f_create_strapi_model(o_model)
    }
}
export {f_create_strapi_models}