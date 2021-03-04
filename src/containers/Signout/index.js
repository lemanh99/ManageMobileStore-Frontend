import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../actions";

const Signout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  dispatch(logout());
  return <Redirect to={`/signin`} />;
};

export default Signout;
