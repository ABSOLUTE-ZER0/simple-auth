import {
  LOGIN_USER,
  LOGOUT_SUCCESS,
  USER_ADDED,
  AUTH_FAILED,
} from "../actions/types";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")),
  loggedIn: localStorage.getItem("loggedIn"),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDED:
    case LOGIN_USER:
      return {
        ...state,
        users: action.payload,
        loggedIn: localStorage.getItem("loggedIn"),
      };
    case LOGOUT_SUCCESS:
    case AUTH_FAILED:
      return {
        ...state,
        users: null,
        loggedIn: localStorage.getItem("loggedIn"),
      };
    default:
      return state;
  }
};
