# generate models
1. goto ./denojs/models

2. create some instances in the file `a_o_model.module.js`


# create strapi models

1. run `deno run -A .denojs/models/create_strapi_models.module.js`


# create javascript classes 

1. run `deno run -A .denojs/models/create_javascript_classes.module.js`
## public and private properties
foreach model there will be a class with all the properties and one with only the public properties for example

class
```javascript
class O_person{
    constructor(
        s_name, 
        s_password // this is a private property
    ){
        this.s_name = s_name
        this.s_password = s_password // this is a private property
    }
}
```

public class
```javascript
class O_person{
    constructor(
        s_name, 
    ){
        this.s_name = s_name
    }
}
```


# `a_o_model.module.js` model relations 

there is only one relation which is a one-to-many

strapi has many-to-many relations but doesnt allow to have pivot columns on many-to-many tables so the solution is to have no many-to-many tables but have own models which have multiple one-to-many relations, this way custom pivot properties can be added


## one-to-many relations 
lets say a O_person has multiple 0_message , in the best case the tables would look like this 


### O_person
|column |       comment         |
|---    |           ---         |
|n_id   |the id number          |
|s_name |name of person         |


### O_message
|column             |                           |
|---                |---                        |
|n_id               |the id number              |
|n_o_person_n_id    |the id number of o_person  |
|s_markdown          |the content of the message |

### strapi does not allow to customize the id 
so we just have to imagine on the existance of the `o_person.n_id` property

### `a_o_model.module.js`
```javascript
//...
    new O_model(
        "O_person", 
        [
            // note we do not have to create a `new O_model_property('n_id', 'number')` because strapi has built-in `id` properties
            new O_model_property(
                "s_name", 
                "string",
            ),
        ]
    ),
    new O_model(
        "O_message", 
        [
            // note we do not have to create a `new O_model_property('n_id', 'number')` because strapi has built-in `id` properties
            new O_model_property(
                "n_o_person_n_id",  // this is the 'one-to-many' relation of the O_person model , on e O_person can have many O_message
                "number",
            ),
            new O_model_property(
                "s_markdown", 
                "string",
            ),
        ]
    ),
//...