import axios from "../../helpers/axios";
import { categoryConstants } from "../constants";

export const getListCatergory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axios.get(`/category/all`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          listCategory: data,
        },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCatgeory = (form) => {
  return async (dispatch) => {
    dispatch({
      type: categoryConstants.ADD_CATEGORY_REQUEST,
    });
    const res = await axios.post(`/category/create`, form);

    if (res.status === 201) {
      dispatch(getListCatergory());
      const { message } = res.data;
      dispatch({
        type: categoryConstants.ADD_CATEGORY_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.ADD_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axios.delete(`/category/delete`, { data: { id } });
    if (res.status === 202) {
      const { message } = res.data;
      dispatch(getListCatergory());
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
        payload: { message: message, error: "" },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: { message: "", error: error },
      });
    }
  };
};
