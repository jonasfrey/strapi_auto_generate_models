// import { a_o_class } from "./javascript_classes/classes_with_all_properties/a_o_class.module.js"

// var s_url_api_default = `http://localhost:1337/api`

// var s_url_api = prompt(`What is the url of the api ? default: [${s_url_api_default}]`)
// s_url_api = (s_url_api == null ) ? s_url_api_default : s_url_api

// console.log(s_url_api)

// await fetch(s_url_api).then(
//     function(o_resp){
//         // console.log(o_resp)
//     }
// ).catch(
//     function(e){
//         console.log(e)
//         console.log("is strapi running ?")
//     }
// )


// var f_a_o_find_or_create = async function(
//     o_instance, 
//     s_model_name, 
// ){
//     var s_model_name_lowercase = s_model_name.toLowerCase();
//     var s_o_model_s_name_lower_kebabcase = s_model_name_lowercase.split("_").join("-")
    
//     var o_resp = await fetch(`${s_url_api}/a-${s_o_model_s_name_lower_kebabcase}`);
//     var o_data = await o_resp.json()
//     console.log(o_data)


// }

// // get login token 

// var o_response = fetch(
//     `${s_url_api}/`
// )
// // create test data 

// var a_o_person = await f_a_o_find_or_create({}, "O_person");

// console.log(a_o_person)
