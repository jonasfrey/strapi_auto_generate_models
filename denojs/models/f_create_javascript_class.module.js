
import {a_o_model} from "./a_o_model.module.js"
import * as fs from "https://deno.land/std@0.154.0/fs/mod.ts";

var s_path_folder = "./javascript_classes"
var s_path_folder_classes_with_all_properties = `${s_path_folder}/./classes_with_all_properties`
var s_path_folder_classes_with_only_public_properties = `${s_path_folder}/./classes_with_only_public_properties`

var s_generated_by_line = `// ! this file has been written automatically by ${import.meta.url.split("/").pop()} at aprox ${new Date().toString()}`
var s_path_relative_strapi_root = './../..'
var f_create_javascript_class = function(
    o_model
){

    var s_indentation = '       ';
var s_file_content = 
`
// ${s_generated_by_line}
class ${o_model.s_name}{
    constructor(
${o_model.a_o_model_property.map(o=>`${s_indentation}${o.s_name}`).join(",\n")}
    ){
${o_model.a_o_model_property.map(o=>`${s_indentation}this.${o.s_name} = ${o.s_name};`).join("\n")}
    }
}
`
    var s_path_file = `${s_path_folder_classes_with_all_properties}/${o_model.s_name}.module.js`;

    f_write_file(
        s_path_file, 
        s_file_content
    )
    
    var a_o_model_property_filtered_public_only = o_model.a_o_model_property.filter(o=>!o.b_private);
    
    console.log(a_o_model_property_filtered_public_only)

var s_file_content = 
`
// ${s_generated_by_line}
class ${o_model.s_name}{
    constructor(
${a_o_model_property_filtered_public_only.map(o=>`${s_indentation}${o.s_name}`).join(",\n")}
    ){
${a_o_model_property_filtered_public_only.map(o=>`${s_indentation}this.${o.s_name} = ${o.s_name};`).join("\n")}
    }
}
`
        var s_path_file = `${s_path_folder_classes_with_only_public_properties}/${o_model.s_name}.module.js`;
    
        f_write_file(
            s_path_file, 
            s_file_content
        )

}


var f_write_file = async function(
    s_path_file, 
    s_file_content,
){
    try{
        var  o_stat = await Deno.stat(s_path_file)
    }catch(e){
        console.log(e)
    }
    // console.log(
    //     s_path_file, 
    //     s_file_content
    // )
    fs.ensureDirSync(s_path_file.split("/").slice(0, -1).join("/")); 
    fs.ensureFileSync(s_path_file); 
    Deno.writeTextFileSync(s_path_file, s_file_content);
    console.log(`${s_path_file}: file has been written automatically`);
    return true
}

export { f_create_javascript_class }