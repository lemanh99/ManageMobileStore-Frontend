import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { isAdminLoggedIn } from "./actions";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Customer from "./containers/Customer/Customer";
import Category from "./containers/Category/Category";
import ErrorPage from "./containers/ErrorPage";
import Home from "./containers/Home";
import ManageAdmin from "./containers/ManageAdmin/manage_admin";
import Settings from "./containers/SettingAccount/settings";
import Signin from "./containers/Signin";
import Signout from "./containers/Signout";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isAdminLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/signout" component={Signout} />
        {/* Manage Admin */}
        <PrivateRoute path="/manage-admin" component={ManageAdmin} />
        {/* Manage Customer */}
        <PrivateRoute path="/manage-customer" component={Customer} />
        {/* Manage Category */}
        <PrivateRoute path="/manage-category" component={Category} />

        {/* setting account */}
        <PrivateRoute path="/settings" component={Settings} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
