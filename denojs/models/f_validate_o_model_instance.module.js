import {a_o_model} from "./a_o_model.module.js"
import {O_person} from "./javascript_classes/classes_with_all_properties/O_person.module.js"
import { O_model_property } from "./O_model_property.module.js";

class O_validation_error{
    constructor(
        s_message 
    ){
        this.s_message = s_message
    }
}
var f_a_o_validation_error = function(
    o_model_instance,
    s_model_name
){
    var a_o_validation_error = [];
    var s_model_name = o_model_instance.constructor.name
    if(s_model_name == "Object"){
        if(s_model_name == undefined || s_model_name == null){
            a_o_validation_error.push(new O_validation_error(`cannot validate object ${o_model_instance} because it is not an instance of a class, please provide class name as second argument`))
            return a_o_validation_error
        }
    }
    var o_model = a_o_model.filter(
    function(o){
        return o.s_name = s_model_name
    }
    )[0]
    
    if(!o_model){
        a_o_validation_error.push(new O_validation_error(`cannot find model with name ${s_model_name}`))
        return a_o_validation_error
    }
        

    // console.log(o_model)
    o_model.a_o_model_property.forEach(
        function(
            o_model_property
            ){
                var val_o_model_instance_prop = o_model_instance[o_model_property.s_name];
                console.log(val_o_model_instance_prop)
                if(o_model_property.b_required){
                    if(
                        val_o_model_instance_prop == undefined
                        ||
                        val_o_model_instance_prop == null
                    ){
                        a_o_validation_error.push(
                            new O_validation_error(
                                `'${o_model_property.s_name}': is 'required' and cannot be 'undefined' or 'null'`
                            )
                        )
                        return; //continue
                    }
                }
                if(typeof val_o_model_instance_prop != o_model_property.s_type){
                    a_o_validation_error.push(
                        new O_validation_error(
                            `'${o_model_property.s_name}': has type "${typeof val_o_model_instance_prop}" but requires type "${o_model_property.s_type}"`
                        )
                    )
                    return;
                }
                if(o_model_property.s_type == "number"){
                    if(o_model_property.n_minimum_number != null){
                        if(val_o_model_instance_prop < o_model_property.n_minimum_number){
                            a_o_validation_error.push(new O_validation_error(
                                `'${o_model_property.s_name}': number (${val_o_model_instance_prop}) is smaller than allowed minimum (${o_model_property.n_minimum_number})`
                            ))
                        }
                    }
                    if(o_model_property.n_maximum_number != null){
                        if(val_o_model_instance_prop > o_model_property.n_maximum_number){
                            a_o_validation_error.push(new O_validation_error(
                                `'${o_model_property.s_name}': number (${val_o_model_instance_prop}) is bigger than allowed maximum (${o_model_property.n_maximum_number})`
                            ))
                        }
                    }
                }
                if(o_model_property.s_type == "string"){
                    var n_truncated_length = 10;
                    var s_val_o_model_instance_prop_truncated = val_o_model_instance_prop.substring(0, Math.min(val_o_model_instance_prop.length, n_truncated_length))+(".".repeat((val_o_model_instance_prop.length>3) * 3))
                    if(o_model_property.n_minimum_string_length != null){
                        if(val_o_model_instance_prop.length < o_model_property.n_minimum_string_length){
                            a_o_validation_error.push(new O_validation_error(
                                `'${o_model_property.s_name}': stringlength (${s_val_o_model_instance_prop_truncated}) is smaller than allowed minimum length (${o_model_property.n_minimum_string_length})`
                            ))
                        }
                    }
                    if(o_model_property.n_maximum_string_length != null){
                        if(val_o_model_instance_prop.length < o_model_property.n_maximum_string_length){
                            a_o_validation_error.push(new O_validation_error(
                                `'${o_model_property.s_name}': stringlength (${s_val_o_model_instance_prop_truncated}) is bigger than allowed minimum length (${o_model_property.n_maximum_string_length})`
                            ))
                        }
                    }
                    if(o_model_property.s_regex != null){
                        var o_regex = new RegExp(o_model_property.s_regex);

                        var b_match = o_regex.test(val_o_model_instance_prop);
                        if(!b_match){
                            a_o_validation_error.push(new O_validation_error(
                                `'${o_model_property.s_name}': regex (${o_model_property.s_regex}) does not match (${s_val_o_model_instance_prop_truncated})`
                            ))
                        }
                    }
                }
        }

    )
    return a_o_validation_error
}

// var a_o_validation_error = f_a_o_validation_error(
//     {a:2}
// )
// console.log(a_o_validation_error)
// if(a_o_validation_error.length > 0){
//     a_o_validation_error.forEach(o=>console.log(o.s_message))
// }
var o_person = new O_person(2);
var a_o_validation_error = f_a_o_validation_error(
    o_person
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}


export { f_a_o_validation_error }