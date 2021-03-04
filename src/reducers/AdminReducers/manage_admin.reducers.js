import { manageAdminConstants } from "../../actions/constants";

const initState = {
  listAdmin: [],
  loading: false,
  error: "",
  messages: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case manageAdminConstants.GET_ALL_ADMIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case manageAdminConstants.GET_ALL_ADMIN_SUCCESS:
      state = {
        ...initState,
        loading: false,
        listAdmin: action.payload.listAdmin,
      };
      break;
    case manageAdminConstants.GET_ALL_ADMIN_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case manageAdminConstants.DELETE_ONE_ADMIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case manageAdminConstants.DELETE_ONE_ADMIN_SUCCESS: {
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
        error: action.payload.error,
      };
      break;
    }
    case manageAdminConstants.DELETE_ONE_ADMIN_FAILURE: {
      state = {
        ...state,
        loading: false,
        messages: action.payload.message,
        error: action.payload.error,
      };
      break;
    }
  }
  return state;
};
