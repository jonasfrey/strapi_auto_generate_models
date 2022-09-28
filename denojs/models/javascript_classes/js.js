import {a_o_model} from "./a_o_model.module.js"

var O_person = a_o_model.filter(
    function(o){
        return o.s_name = "O_person"
    }
)[0]

var o_model_property_s_password = O_person.a_o_model.filter(
    function(o){
        return o.s_name == "s_password"
    }
)[0]

console.log(o_model_property_s_password.b_private)