import axios from "../../helpers/axios";
import { settingConstants } from "../constants";

export const ChangeInformation = (data) => {
  return async (dispatch) => {
    dispatch({ type: settingConstants.CHANGE_INFORMATION_REQUEST });
    const res = await axios.put(`admin/change-information`, { data });
    if (res.status === 201) {
      const { message, user } = res.data;
      dispatch({
        type: settingConstants.CHANGE_INFORMATION_SUCCESS,
        payload: {
          message: message,
        },
      });
      dispatch({
        type: settingConstants.UPDATE_INFORMATION_SUCCESS,
        payload: {
          user: user,
        }
      })
    } else {
      const { error } = res.data;
      dispatch({
        type: settingConstants.CHANGE_INFORMATION_FAILURE,
        payload: {
          error: error,
        },
      });
    }
  };
};

export const ChangePassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: settingConstants.CHANGE_PASSWORD_REQUEST });
    const res = await axios.put(`admin/change-password`, { data });
    if (res.status === 201) {
      const { message} = res.data;
      dispatch({
        type: settingConstants.CHANGE_PASSWORD_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: settingConstants.CHANGE_PASSWORD_FAILURE,
        payload: {
          error: error,
        },
      });
    }
  };
};
