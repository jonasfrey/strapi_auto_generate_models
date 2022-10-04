import {O_person} from "./javascript_classes/classes_with_all_properties/a_o_class.module.js";

import {f_a_o_validation_error} from "./f_a_o_validation_error.module.js"

// var a_o_validation_error = f_a_o_validation_error(
//     {a:2}
// )
// console.log(a_o_validation_error)
// if(a_o_validation_error.length > 0){
//     a_o_validation_error.forEach(o=>console.log(o.s_message))
// }
var o_person = new O_person(2);
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    // 'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}
var o_person = new O_person(2);
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_personasdf'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}

var o_person = new O_person(2);
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}

var o_person = new O_person();
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}
var o_person = new O_person(-100);
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}

var o_person = new O_person(null);
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}

var o_person = new O_person("hans");
var a_o_validation_error = f_a_o_validation_error(
    o_person, 
    'O_person'
)
if(a_o_validation_error.length > 0){
    a_o_validation_error.forEach(o=>console.log(o.s_message))
}