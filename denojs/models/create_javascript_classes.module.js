import { f_create_javascript_class } from "./f_create_javascript_class.module.js";
import {a_o_model} from "./a_o_model.module.js"

for(let o_model of a_o_model){
    f_create_javascript_class(o_model)
}