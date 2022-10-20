import {a_o_test_data} from "./a_o_test_data.module.js"

var f_create_test_data = async function(
    s_url_api = "http://127.0.0.1:1337/api"
){
    for(var o_test_data of a_o_test_data){
        // console.log(o_test_data.constructor.name)
        var s_model_name = o_test_data.constructor.name; 
        var s_model_name_lower_kebabcase = s_model_name.toLowerCase().split("_").join("-");
        console.log("o_test_data")
        console.log(o_test_data)
        // console.log(s_model_name_lower_kebabcase)
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
                    body: JSON.stringify({data:o_test_data}) 
                }
            );
            console.log("o_response")
            console.log(o_response)
            var o_parsed_response = await o_response.json();
            console.log("o_parsed_response");
            console.log(o_parsed_response);
    
            if(!o_parsed_response.ok){
                return Promise.reject("could not create strapi object");
            }

            return Promise.resolve(o_response)

        }catch(o_e){
            console.log(`make sure the strapi is running with 'npm run develop' or make sure access to the route ${s_url} is not forbidden`)
            console.error(o_e)
            return Promise.reject(o_e)
        }

        
    }
}

export {f_create_test_data}