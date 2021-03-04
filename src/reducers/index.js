import { combineReducers } from "redux";
import authReducer from "./AdminReducers/auth.reducers";
import registerReducer from "./AdminReducers/register.reducers";
import manageAdminReducer from "./AdminReducers/manage_admin.reducers";
import settingAdminReducer from "./AdminReducers/settings.reducers"

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  manage_admin: manageAdminReducer,
  setting_admin : settingAdminReducer,
  // category: categoryReducer,
  // product: productReducer,
  // order: orderReducer,
  // page: pageReducer
});

export default rootReducer;
