import { f_create_strapi_model } from "./f_create_strapi_model.module.js";
import {a_o_model} from "./a_o_model.module.js"

for(let o_model of a_o_model){
    f_create_strapi_model(o_model)
}