import { O_model } from "./O_model.module.js"
import { O_model_property } from "./O_model_property.module.js"

var a_o_model = [
    new O_model(
        "O_person", 
        [
            new O_model_property(
                "s_name", 
                "string",
            ),
        ]
    ),
    new O_model(
        "O_message", 
        [
            new O_model_property(
                "s_markdown", 
                "string",
            ),
        ]
    ),
    new O_model(
        "O_chatroom", 
        [
            new O_model_property(
                "s_name", 
                "string",
            ),
        ]
    ),
    new O_model(
        "O_person_o_chatroom_o_message", 
        [
            new O_model_property(
                "n_o_person_n_id", 
                "number",
            ), 
            new O_model_property(
                "n_o_chatroom_n_id", 
                "number",
            ),
            new O_model_property(
                "n_o_message_n_id", 
                "number",
            ),
        ]
    ),

]

export {a_o_model}

