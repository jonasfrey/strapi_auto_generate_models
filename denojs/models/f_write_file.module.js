import * as fs from "https://deno.land/std@0.154.0/fs/mod.ts";

var f_write_file = async function(
    s_path_file, 
    s_file_content,
){
    // try{
    //     var  o_stat = await Deno.stat(s_path_file)
    // }catch(e){
    //     console.log(e)
    // }
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

export {f_write_file}

