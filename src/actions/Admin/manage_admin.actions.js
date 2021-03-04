import axios from "../../helpers/axios";
import { manageAdminConstants } from "../constants";

export const getListAdmin = () => {
  return async (dispatch) => {
    dispatch({ type: manageAdminConstants.GET_ALL_ADMIN_REQUEST });
    const res = await axios.get(`admin/getListAdmin`);
    // console.log(res);
    if (res.status === 200) {
      const { admin } = res.data;
      dispatch({
        type: manageAdminConstants.GET_ALL_ADMIN_SUCCESS,
        payload: {
          listAdmin: admin,
        },
      });
    } else {
      dispatch({
        type: manageAdminConstants.GET_ALL_ADMIN_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const deleteAdminById = (id) => {
  return async (dispatch) => {
    dispatch({ type: manageAdminConstants.DELETE_ONE_ADMIN_REQUEST });
    const res = await axios.delete(`admin/deleteAdmin`, { data: { id } });
    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListAdmin());
      dispatch({
        type: manageAdminConstants.DELETE_ONE_ADMIN_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: manageAdminConstants.DELETE_ONE_ADMIN_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};
