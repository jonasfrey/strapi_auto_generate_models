import * as fs from "https://deno.land/std@0.154.0/fs/mod.ts";
import { a_o_model } from "./a_o_model.module.js";
import { f_o_model_related } from "./f_o_model_related.module.js";
import { f_write_file } from "./f_write_file.module.js";
// exmaple O_person has multiple O_fingerprint
// console.log(Deno.args[0])
const b_overwrite_everything = (prompt('if existing, overwrite everything (content-types / controllers / routes / services ): [y/n]').toLowerCase() == "y");
if(!b_overwrite_everything){

    var b_overwrite_schema =       (prompt('if existing, overwrite content-types/[s_model_name]/schema.json ?: [y/n]').toLowerCase() == "y");
    var b_overwrite_controllers =  (prompt('if existing, overwrite controllers/[s_model_name].js            ?: [y/n]').toLowerCase() == "y");
    var b_overwrite_routes =       (prompt('if existing, overwrite routes/[s_model_name].js                 ?: [y/n]').toLowerCase() == "y");
    var b_overwrite_services =     (prompt('if existing, overwrite services/[s_model_name].js               ?: [y/n]').toLowerCase() == "y");

}

var f_compare_files_prompt_user_and_maybe_ovewrite = async function(
    s_path_file, 
    s_file_content
){
    var b_file_existing = true;
    try{
        var o_stat = await Deno.stat(s_path_file)
    }catch(o_e){
        console.log(o_e);
        b_file_existing = false;
        b_really_overwrite = true;
        //file not existing
    }
    if(b_file_existing){
            var s_text = await Deno.readTextFile(s_path_file)
            var s_text_without_firstline = s_text.split("\n").slice(1).join("\n");
            var s_filecontent_without_firstline = s_file_content.split("\n").slice(1).join("\n");
            
            var b_really_overwrite = true;
        
            if(s_text_without_firstline != s_filecontent_without_firstline){
                var s_msg = `
        ${s_path_file}:
        
        ${Array.apply(null, Array(40)).map(n=>{return "o"}).join("_")}
        
        ${s_text}
        ${Array.apply(null, Array(40)).map(n=>{return "o"}).join("^")}        
        ${Array.apply(null, Array(40)).map(n=>{return "n"}).join("_")}
        
        ${s_file_content}
        
        ${Array.apply(null, Array(40)).map(n=>{return "n"}).join("^")}        
        `
                console.log(s_msg)
                var b_really_overwrite = (prompt(
                    `the ${Array.apply(null, Array(5)).map(n=>{return "o"}).join("_")} (old content) differs from ${Array.apply(null, Array(5)).map(n=>{return "n"}).join("_")} (new content), do you really want to override it? [y/n]`
                    ).toLowerCase() == "y");            
            }
    }
    if(b_really_overwrite){
        await f_write_file(s_path_file, s_file_content);
    }

}

// O_person
// o-person
// ├── content-types
// │   └── o-person
// │       └── schema.json




var f_create_strapi_model = async function(o_model){
    var o_date_now = new Date(); 
    var o_comment = { s_msg: `this file has been written by ${import.meta.url}`, s_ts: o_date_now.toString(), n_ts_ms: o_date_now.getTime()}
    var s_generated_by_line = `//${JSON.stringify(o_comment)}`;

    var s_o_model_s_name_lower = o_model.s_name.toLocaleLowerCase()
    var s_o_model_s_name_lower_kebabcase = s_o_model_s_name_lower.split('_').join('-')
    var s_path_folder_root = './../..'
    var s_path_folder_model_root = s_path_folder_root + "/src/api/" +  s_o_model_s_name_lower_kebabcase
    // console.log(s_path_folder_model_root)
    
    
    // // [o-model]
    // //      content-types
    // //          schema.js
    var o_obj = 
    {
        "kind": "collectionType",
        "collectionName": s_o_model_s_name_lower_kebabcase,
        "info": {
            "singularName": s_o_model_s_name_lower_kebabcase,
            "pluralName": "a-"+s_o_model_s_name_lower_kebabcase,
            "displayName": o_model.s_name,
            "description": ""
        },
        "options": {
            "draftAndPublish": o_model.b_strapi_draftAndPublish,
            "populateCreatorFields": o_model.b_strapi_populateCreatorFields, 
        },
        "pluginOptions": {},
        "attributes": {
        }
    }
    for(var n_index in o_model.a_o_model_property){
        var o_model_property = o_model.a_o_model_property[n_index];
        
        if(o_model_property.s_name == "n_id"){
            // console.log(o_model_property)
            console.log(`i have to skip this o_model_property ${o_model_property}, s_name:'${o_model_property.s_name}' is not allowed because strapi is bad and does not allow a custom id name and its default id name is bad`)
            continue;
        }

        var s_type = o_model_property.s_type;
        if(o_model_property.s_strapi_type != null){
            s_type = o_model_property.s_strapi_type
        }

        var o_model_related = f_o_model_related(o_model_property.s_name);


        var o_strapi_attribute = {
            private: o_model_property.b_private == true,
        }
        
        var s_prop_name_strapi_attributes_object = o_model_property.s_name
        o_strapi_attribute.type = s_type

        if(s_type == 'media'){
            o_strapi_attribute.allowedTypes = o_model_property.a_s_strapi_type_media_allowedTypes
            o_strapi_attribute.multiple = o_model_property.a_s_strapi_type_multiple
        }else{
            if(o_model_related){
                s_prop_name_strapi_attributes_object = o_model_related.s_name.toLowerCase();
                var s_o_model_related_s_name_lower_kebabcase = o_model_related.s_name.toLowerCase().split('_').join('-')
                o_strapi_attribute.type = "relation"
                o_strapi_attribute.relation = "oneToOne"
                o_strapi_attribute.target = `api::${s_o_model_related_s_name_lower_kebabcase}.${s_o_model_related_s_name_lower_kebabcase}`
                
            }
        }

        if(o_model.n_minimum_number != null){ o_strapi_attribute.min = o_model.n_minimum_number }
        if(o_model.n_maximum_number != null){ o_strapi_attribute.max = o_model.n_maximum_number }
        if(o_model.n_minimum_string_length != null){ o_strapi_attribute.minLength = o_model.n_minimum_string_length }
        if(o_model.n_maximum_string_length != null){ o_strapi_attribute.maxLength = o_model.n_maximum_string_length }

        // if(o_model.s_strapi_relation != null){ o_strapi_attribute.maxLength = o_model.n_maximum_string_length }
        // if(o_model.s_strapi_target != null){ o_strapi_attribute.maxLength = o_model.n_maximum_string_length }
        // if(o_model.s_strapi_mappedBy != null){ o_strapi_attribute.maxLength = o_model.n_maximum_string_length }

        o_obj.attributes[s_prop_name_strapi_attributes_object] = o_strapi_attribute 

    }
    var s_file_content = JSON.stringify(o_obj,null, 4)
    var s_path_folder = s_path_folder_model_root + "/" + "content-types"
    var s_path_file = s_path_folder + `/${s_o_model_s_name_lower_kebabcase}/` + "schema" + ".json"

    if(b_overwrite_everything || b_overwrite_schema){
        await f_compare_files_prompt_user_and_maybe_ovewrite(s_path_file, s_file_content);
    }


    // ├── controllers
    // │   └── o-person.js
    var s_file_content = 
`${s_generated_by_line}
'use strict';
/**
 * ${s_o_model_s_name_lower_kebabcase} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${s_o_model_s_name_lower_kebabcase}.${s_o_model_s_name_lower_kebabcase}');
`
var s_path_folder = s_path_folder_model_root + "/" + "controllers"
var s_path_file = s_path_folder + "/" + s_o_model_s_name_lower_kebabcase + ".js"


if(b_overwrite_everything || b_overwrite_controllers){
    await f_compare_files_prompt_user_and_maybe_ovewrite(s_path_file, s_file_content);
}

// ├── routes
// │   └── o-person.js
var s_file_content = 
`${s_generated_by_line}
'use strict';
/**
 * ${s_o_model_s_name_lower_kebabcase} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${s_o_model_s_name_lower_kebabcase}.${s_o_model_s_name_lower_kebabcase}');
`
var s_path_folder = s_path_folder_model_root + "/" + "routes"
var s_path_file = s_path_folder + "/" + s_o_model_s_name_lower_kebabcase + ".js"


if(b_overwrite_everything || b_overwrite_routes){
    await f_compare_files_prompt_user_and_maybe_ovewrite(s_path_file, s_file_content);
}



// 
// └── services
//     └── o-person.js
// 'use strict';
// 
// /**
//  * o-person service
//  */
// 
// const { createCoreService } = require('@strapi/strapi').factories;
// 
// module.exports = createCoreService('api::o-person.o-person');
// 
var s_file_content = 
`${s_generated_by_line}
'use strict';
/**
 * ${s_o_model_s_name_lower_kebabcase} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${s_o_model_s_name_lower_kebabcase}.${s_o_model_s_name_lower_kebabcase}');
`
var s_path_folder = s_path_folder_model_root + "/" + "services"
var s_path_file = s_path_folder + "/" + s_o_model_s_name_lower_kebabcase + ".js"

if(b_overwrite_everything || b_overwrite_routes){
    await f_compare_files_prompt_user_and_maybe_ovewrite(s_path_file, s_file_content);
}




}

export {f_create_strapi_model}

