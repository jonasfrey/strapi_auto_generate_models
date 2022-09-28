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