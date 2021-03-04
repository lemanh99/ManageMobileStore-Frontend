import {
  loginConstants,
  logoutConstants,
  settingConstants,
} from "../../actions/constants";

const initState = {
  token: null,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    role: "",
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  message: "",
};

export default (state = initState, action) => {
  console.log(action.type);
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case loginConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        authenticate: true,
        authenticating: false,
      };
      break;
    case loginConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case settingConstants.UPDATE_INFORMATION_SUCCESS:
      state = {
        ...state,
        message: "",
        error: "",
        user: action.payload.user,
        loading: false,
      };
      break;

    case logoutConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case logoutConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
        message: "Logout Success",
      };

      break;
    case logoutConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
