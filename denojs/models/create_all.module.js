import { f_create_strapi_models } from "./f_create_strapi_models.module.js";
import { f_create_javascript_classes } from "./f_create_javascript_classes.module.js";
import { f_create_test_data } from "./f_create_test_data.module.js";

f_create_strapi_models();

f_create_javascript_classes();

// await f_create_test_data();