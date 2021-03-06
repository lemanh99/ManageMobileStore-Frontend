import { manageCustomerConstants } from "../../actions/constants";

const initState = {
  listCustomer: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case manageCustomerConstants.GET_ALL_CUSTOMER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case manageCustomerConstants.GET_ALL_CUSTOMER_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listCustomer: action.payload.listCustomer,
      };
      break;
    case manageCustomerConstants.GET_ALL_CUSTOMER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
