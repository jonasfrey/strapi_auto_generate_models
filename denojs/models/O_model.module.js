class O_model{
    constructor(
        s_name, 
        a_o_model_property, 
        b_strapi_populateCreatorFields = true
    ){
        this.s_name = s_name
        this.a_o_model_property = a_o_model_property, 
        this.b_strapi_populateCreatorFields = b_strapi_populateCreatorFields
    }
}
export {O_model}