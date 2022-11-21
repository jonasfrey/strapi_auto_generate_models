
import {a_o_model} from "./a_o_model.module.js"
import { f_write_file } from "./f_write_file.module.js"
import { O_model_property } from "./O_model_property.module.js"

var s_path_folder = "./csharp_classes"
var s_path_folder_classes_with_all_properties = `${s_path_folder}/./classes_with_all_properties`
var s_path_folder_classes_with_only_public_properties = `${s_path_folder}/./classes_with_only_public_properties`

var s_generated_by_line = `// ! this file has been written automatically by ${import.meta.url.split("/").pop()} at aprox ${new Date().toString()}`
var s_path_relative_strapi_root = './../..'
var f_s_cs_type = function(o_model_property){
    // int      4 bytes	    Stores whole numbers from -2,147,483,648 to 2,147,483,647
    // long	    8 bytes	    Stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
    // float	4 bytes	    Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits
    // double	8 bytes	    Stores fractional numbers. Sufficient for storing 15 decimal digits
    // bool	    1 bit	    Stores true or false values
    // char	    2 bytes	    Stores a single character/letter, surrounded by single quotes
    // string	2 bytes     per character	Stores a sequence of characters, surrounded by double quotes
    if(o_model_property.s_type.includes("string")){
        return "string"
    }
    if(
        o_model_property.s_type.includes("int")
        ||
        o_model_property.s_type.includes("media")
        ){
        return "int"
    }
    if(o_model_property.s_type.includes("float")){
        return "float"
    }

}
var f_create_csharp_class = function(
    o_model
){

// ```csharp
// class Car
// {
//   public string model;

//   // Create a class constructor with a parameter
//   public Car(string modelName)
//   {
//     model = modelName;
//   }
// }
// ```
    var s_indentation = '       ';
var s_file_content = 
`
// ${s_generated_by_line}
public class ${o_model.s_name}{
    ${o_model.a_o_model_property.map(o=>`${s_indentation} ${(o.b_private)?'private':'public'} ${f_s_cs_type(o)} ${s_indentation}${o.s_name}`).join(";\n")};

    public ${o_model.s_name}(
${o_model.a_o_model_property.map(o=>`${s_indentation}${f_s_cs_type(o)} ${s_indentation}${o.s_name}__constructor`).join(",\n")}
    ){
${o_model.a_o_model_property.map(o=>`${s_indentation}${o.s_name} = ${o.s_name}__constructor;`).join("\n")}
    }
}
`
    var s_path_file = `${s_path_folder_classes_with_all_properties}/${o_model.s_name}.cs`;

    f_write_file(
        s_path_file, 
        s_file_content
    )
    

}



export { f_create_csharp_class }