import { O_person } from "../models/javascript_classes/classes_with_all_properties/O_person.module.js";
import {a_o_test_data} from "./a_o_test_data.module.js"
import { O_file_info } from "./O_file_info.module.js";
import { O_media } from "./O_media.module.js";
import {f_o_command} from "./../O_command.module.js";

var s_url_api = "http://127.0.0.1:1337/api"

var f_a_o_response_upload = async function(
    o_media
    ){

    var s_url_read = `${s_url_api}/upload/files`;
    var o_response = await fetch(s_url_read);
    let o_response_object = await o_response.json();
    // console.log(o_response_object);
    var o_file = null; 
    try{
        for(var o of o_response_object){
            if(o.name == o_media.o_file_info.name){
                o_file = o;
                break;
            }
        }
    }catch(o_e){
        console.log(o_e)
    }
    if(o_file){
        var s_url_delete = `${s_url_api}/upload/files/${o_file.id}`;
        var o_response = await fetch(s_url_delete, {method:"DELETE"});
        let o_response_object = await o_response.json();
        // console.log(o_response_object)
    }

    var s_url = `${s_url_api}/upload`; 

    const o_form_data = new FormData();
    var o_stat = await Deno.stat(o_media.s_path_file);
    // console.log(o_stat)
    // Deno.exit(1)
    const a_n_u8__bytes = await Deno.readFile(o_media.s_path_file)
    const o_command_mime = await f_o_command(`file -b --mime-type ${o_media.s_path_file}`.split(' '))
    // console.log(o_command_mime)
    const s_mime = o_command_mime.s_stdout.split("\n").shift();
    const o_blob = new Blob([a_n_u8__bytes], {type: s_mime});
    // console.log(a_n_u8__bytes.buffer);

    var o_form_data_param  = {
        fileInfo: 
            JSON.stringify(
                o_media.o_file_info
            ), 
        files: o_blob, //    files:	The file(s) to upload. The value(s) can be a Buffer or Stream.
        // ref: "o-chatroom",
        // refId: 1, 
        // field: "o_media"  
        // path:        (optional)	The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3).
        // refId:       The ID of the entry which the file(s) will be linked to.
        // ref:         The unique ID (uid) of the model which the file(s) will be linked to (see more below).
        // source:      (optional)	The name of the plugin where the model is located.
        // field:       The field of the entry which the file(s) will be precisely linked to.
    }
    
    for(var s_prop_name in o_form_data_param){
        o_form_data.append(
            s_prop_name, 
            o_form_data_param[s_prop_name]
        )
    }
    
    var o_response = await fetch(
        s_url,
        {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
            body: o_form_data 
        }
    );

    return o_response.json()
}

if(Deno.args[0] == "test"){
    
    var s_path_file = "./files/test.txt"

    var o = await f_o_response_upload(
        new O_media(
            s_path_file, 
            new O_file_info(
                "test_renamed_on_server.txt", 
                "a test txt file", 
                "a txt", 
                null
            )
        )
    );
    console.log(o)
}


var f_a_o_read_or_create = async function(
    o_instance
){
    // console.log(o_test_data.constructor.name)
    var s_model_name = o_instance.constructor.name; 
    var s_model_name_lower_kebabcase = s_model_name.toLowerCase().split("_").join("-");
    // console.log("o_instance")
    // console.log(o_instance)
    if(o_instance.n_id){
        o_instance.id = o_instance.n_id; 
        delete o_instance.n_id
    }

    if(o_instance.n_o_file_n_id){
        if(o_instance.n_o_file_n_id instanceof O_media){
            // Deno.exit(1)
            var o_media = o_instance.n_o_file_n_id;
            var a_o_file = await f_a_o_response_upload(o_media);
            console.log(a_o_file)
            o_instance.n_o_file_n_id = a_o_file[0].id;
        }
    }

    // try to delete
    var s_url_delete = `${s_url_api}/a-${s_model_name_lower_kebabcase}/${o_instance.id}`
    var o_response = await fetch(s_url_delete, {method:"DELETE",headers:{"Content-Type": "application/json"}}); 
    var o_parsed_response = await o_response.json();

    // var s_url_read = `${s_url_api}/a-${s_model_name_lower_kebabcase}/${o_instance.id}`
    // var o_response = await fetch(s_url_read, {method:"GET",headers:{"Content-Type": "application/json"}}); 
    // var o_parsed_response = await o_response.json(); 

    
    console.log(o_parsed_response.data)
    if(
        o_parsed_response.data != undefined 
        &&
        o_parsed_response.data != null){

        if(Array.isArray(o_parsed_response.data)){
            var a_o = o_parsed_response.data
        }else{
            var a_o = [o_parsed_response.data]
        }
        var a_o_instance = f_a_o_instance_by_strapi_response_object(
            a_o, 
            o_instance.constructor
        );
    
        // console.log(a_o_instance)
        if(a_o_instance.length > 0){
            return Promise.resolve(a_o_instance);
        } 

    }

    var s_url = `${s_url_api}/a-${s_model_name_lower_kebabcase}`
    try{
        var o_response = await fetch(
            s_url,
            {
                // method: 'GET', // *GET, POST, PUT, DELETE, etc.
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data:o_instance}) 
            }
        );
        // console.log("o_response")
        // console.log(o_response)
        var o_parsed_response = await o_response.json();
        // console.log("o_parsed_response");
        // console.log(o_parsed_response); 

        if(Array.isArray(o_parsed_response.data)){
            var a_o = o_parsed_response.data
        }else{
            var a_o = [o_parsed_response.data]
        }

        // if(!o_parsed_response.ok){
        //     console.log(o_parsed_response);
        //     return Promise.reject("could not create strapi object");
        // }

        var a_o_instance = f_a_o_instance_by_strapi_response_object( 
            a_o, 
            o_instance.constructor
        );

        return Promise.resolve(a_o_instance)
    }catch(o_e){
        console.log(`make sure the strapi is running with 'npm run develop' or make sure access to the route ${s_url} is not forbidden`)
        console.error(o_e)
        return Promise.reject(o_e)
    }
}
var f_create_test_data = async function(
){
    for(var o_test_data of a_o_test_data){
        var a_o = f_a_o_read_or_create(o_test_data);
        console.log(`object(s) ha(s/ve) been created, input: ${o_test_data}, output:${a_o}`)
    }
}

var f_a_o_instance_by_strapi_response_object = function(
    a_o_strapi_object,
    o_class
    ){
    console.log(a_o_strapi_object)
    var a = []
    for(var o_strapi_object of a_o_strapi_object){
        var o_instance = new o_class();
        console.log(o_strapi_object)
        o_instance.n_id = o_strapi_object.id
        for(var s_prop_name in o_strapi_object.attributes){
            o_instance[s_prop_name] = o_strapi_object.attributes[s_prop_name]
        }
        a.push(o_instance)
    }
    return a
}

export {f_create_test_data}