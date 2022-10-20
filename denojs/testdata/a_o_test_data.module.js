import {o_o_class} from "./../models/javascript_classes/classes_with_all_properties/a_o_class.module.js"
import { O_media } from "./O_media.module.js"
import { O_file_info } from "./O_file_info.module.js"
var a_o_test_data = [

    new o_o_class.O_chatroom(
        1,
        "Testroom",
        new O_media(
            "./files/castle_in_clouds.jpg", 
            new O_file_info(
                "castle_in_the_clouds.jpg", 
                "a castle in some misty clouds",
                "castle in clouds", 
                null
            )
        ),
        new O_media(
            "./files/ice_bear_in_desert.jpg", 
            new O_file_info(
                "ice_bear_in_desert.jpg", 
                "an ice bear roaming the desert",
                "ice bear in desert", 
                null
            )
        ),
        new O_media(
            "./files/snake_on_north_pole.jpg", 
            new O_file_info(
                "snake_on_north_pole.jpg", 
                "a snake on the north pole",
                "snake on north pole", 
                null
            )
        ),
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
        2,
        1, 
        "Hallo Hans"
    )

]
export {a_o_test_data}