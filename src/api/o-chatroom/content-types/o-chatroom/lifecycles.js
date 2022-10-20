// ./src/api/[api-name]/content-types/[api-name]/lifecycles.js

var a_s_function_name = [
  "beforeCreate",
  "beforeCreateMany",
  "afterCreate",
  "afterCreateMany",
  "beforeUpdate",
  "beforeUpdateMany",
  "afterUpdate",
  "afterUpdateMany",
  "beforeDelete",
  "beforeDeleteMany",
  "afterDelete",
  "afterDeleteMany",
  "beforeCount",
  "afterCount",
  "beforeFindOne",
  "afterFindOne",
  "beforeFindMany",
  "afterFindMany",
  
]
var o = {}
for(var s_function_name of a_s_function_name){
  o[s_function_name] = function(o_event){
      const { data, where, select, populate } = o_event.params;
      console.log(`${arguments.callee.name}:`)
      console.log(o_event);
  }
}
module.exports = o;
