class O_model_property{
    constructor(
        s_name,
        s_type,  
        s_strapi_type,
        b_private = false,
        n_minimum_number = null, 
        n_maximum_number = null, 
        n_minimum_string_length = null, 
        n_maximum_string_length = null, 
        s_regex = null,
        default_value = null, 
        b_required = null, 
        b_unique = null,
        a_s_strapi_type_media_allowedTypes = null,
        a_s_strapi_type_multiple = null,
        b_strapi_draftAndPublish = true,
    ){
        this.s_name = s_name
        this.s_type = s_type
        this.s_strapi_type = s_strapi_type
        this.b_private = b_private
        this.n_minimum_number = n_minimum_number
        this.n_maximum_number = n_maximum_number
        this.n_minimum_string_length = n_minimum_string_length
        this.n_maximum_string_length = n_maximum_string_length
        this.s_regex = s_regex
        this.default_value = default_value
        this.b_required = b_required
        this.b_unique = b_unique
        this.a_s_strapi_type_media_allowedTypes = a_s_strapi_type_media_allowedTypes
        this.a_s_strapi_type_multiple = a_s_strapi_type_multiple
        this.b_strapi_draftAndPublish = b_strapi_draftAndPublish
    }
}

export {O_model_property}