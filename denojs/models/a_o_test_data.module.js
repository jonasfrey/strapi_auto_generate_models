import {o_o_class} from "./javascript_classes/classes_with_all_properties/a_o_class.module.js"

var a_o_test_data = [

    new o_o_class.O_chatroom(
        1,
        "Testroom", 
        {
            "s_path_file": "./testimage.jpg"
        }
    ),
    new o_o_class.O_person(
        1, 
        "Hans"
    ),
    new o_o_class.O_message(
        1,
        1,
        1, 
        "Hallo Peter!"
    ),
    new o_o_class.O_person(
        2, 
        "Peter"
    ),
    new o_o_class.O_message(
        2,
        1,
        2, 
        "Hallo Hans"
    )

]
export {a_o_test_data}