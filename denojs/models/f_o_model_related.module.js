import {a_o_model} from "./a_o_model.module.js";

var f_o_model_related = function(s_prop_name){
    // n_o_finger_n_id -> 'n_', 'o_finger_', 'n_id'
    var s_start = "n_"; 
    var s_end = "_n_id";
    var n_index_start = s_prop_name.indexOf(s_start);
    if(
        n_index_start == 0
        &&
        s_prop_name.endsWith(s_end)
        ){
            var s_model_name_lowercase = s_prop_name.substring(s_start.length, (s_prop_name.length - s_end.length))
    }else{ 
        return undefined
    }
    var a_o_model_filtered = a_o_model.filter(
        function(obj_model){
            return obj_model.s_name.toLowerCase() == s_model_name_lowercase
        }
    )
    return a_o_model_filtered[0]
}
export {f_o_model_related}