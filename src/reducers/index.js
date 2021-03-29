import { combineReducers } from "redux";
import authReducer from "./AdminReducers/auth.reducers";
import registerReducer from "./AdminReducers/register.reducers";
import manageAdminReducer from "./AdminReducers/manage_admin.reducers";
import settingAdminReducer from "./AdminReducers/settings.reducers";
import customerReducer from "./CustomerReducers/manage_customer";
import categoryReducer from "./CategoryReducers/manage_category_reducer";
import brandReducer from "./BrandReducers/manage_brand_reducer";
import productReducer from "./ProductReducers/manage_product";
import orderReducer from "./OrderReducers/order.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  manage_admin: manageAdminReducer,
  setting_admin: settingAdminReducer,

  customer: customerReducer,
  category: categoryReducer,
  brand: brandReducer,
  product: productReducer,
  order: orderReducer,
  // page: pageReducer
});

export default rootReducer;
