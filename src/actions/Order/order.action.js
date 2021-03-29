import { orderConstants } from "../constants";
import axios from "../../helpers/axios";

export const getOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDER_REQUEST });
    const res = await axios.get(`/order/all`);
    if (res.status === 200) {
      console.log(res.data);
      const { data } = res.data;
      dispatch({
        type: orderConstants.GET_ALL_ORDER_SUCCESS,
        payload: {
          orders: data,
        },
      });
    } else {
      dispatch({
        type: orderConstants.GET_ALL_ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
