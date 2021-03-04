import { registerContants } from "../../actions/constants";

const initState = {
  error: "",
  message: "",
  loading: false,
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case registerContants.ADMIN_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case registerContants.ADMIN_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: "Admin Created Successfully",
        error: "",
        
      };
      break;
    case registerContants.ADMIN_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: "",
        error: action.payload.error,
      };
      break;
  }
  return state;
};
