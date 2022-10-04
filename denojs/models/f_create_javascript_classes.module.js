import { f_create_javascript_class } from "./f_create_javascript_class.module.js";
import {a_o_model} from "./a_o_model.module.js"

import { f_write_file } from "./f_write_file.module.js"

var f_create_javascript_classes = function(){


    for(let o_model of a_o_model){
        f_create_javascript_class(o_model)
    }

    // create also a single file which exports all the classes for an easy import of all the classes 
    var s_generated_by_line = `// ! this file has been written automatically by ${import.meta.url} at aprox ${new Date().toString()}`

    var s_path_folder = "./javascript_classes"
    var s_path_folder_classes_with_all_properties = `${s_path_folder}/./classes_with_all_properties`
    var s_path_folder_classes_with_only_public_properties = `${s_path_folder}/./classes_with_only_public_properties`

    var s_file_name_all_classes = "a_o_class.module.js";

    var s_file_content = 
`
${s_generated_by_line}
${a_o_model.map(
    function(o){
        var s_class_file_name = `${o.s_name}.module.js`;
        return `import {${o.s_name}} from "./${s_class_file_name}"`
    }
    ).join("\n")}
var a_o_class = [${a_o_model.map(o=>o.s_name).join(",\n")}];
export { 
a_o_class,
${a_o_model.map(o=>o.s_name).join(",\n")}
}
`
    var s_path_file = `${s_path_folder_classes_with_all_properties}/${s_file_name_all_classes}`;

    f_write_file(
        s_path_file, 
        s_file_content
    )

    var s_path_file = `${s_path_folder_classes_with_only_public_properties}/${s_file_name_all_classes}`;

    f_write_file(
        s_path_file, 
        s_file_content
    )

}

export {f_create_javascript_classes}