import { f_create_strapi_models } from "./f_create_strapi_models.module.js";
import { f_create_javascript_classes } from "./f_create_javascript_classes.module.js";
import { f_create_csharp_classes } from "./f_create_csharp_classes.module.js";

f_create_strapi_models();

f_create_javascript_classes();
f_create_csharp_classes();
