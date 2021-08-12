import {
  LOGIN_USER,
  LOGOUT_SUCCESS,
  USER_ADDED,
  AUTH_FAILED,
} from "../actions/types";

import { createBrowserHistory } from "history";

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  if (password.length < 8) {
    return false;
  } else if (password.length > 50) {
    return false;
  } else if (password.search(/\d/) === -1) {
    return false;
  } else if (password.search(/[a-zA-Z]/) === -1) {
    return false;
  } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
    return false;
  }
  return true;
};

const history = createBrowserHistory({
  forceRefresh: true,
});

export const addUser = (userData) => async (dispatch) => {
  localStorage.setItem("loggedIn", "false");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (
    userData.name === "" ||
    userData.email === "" ||
    userData.password === "" ||
    userData.mobile === ""
  ) {
    dispatch({
      type: AUTH_FAILED,
    });
    localStorage.setItem("loggedIn", "false");

    return { error: "Enter all required fields" };
  }

  if (!validateEmail(userData.email)) {
    dispatch({
      type: AUTH_FAILED,
    });
    localStorage.setItem("loggedIn", "false");

    return { error: "Enter valid email" };
  }

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === userData.email) {
      dispatch({
        type: AUTH_FAILED,
      });
      localStorage.setItem("loggedIn", "false");

      return {
        error: "User Exists! Click forgot password to rest your password",
      };
    }
  }

  if (!validatePassword(userData.password)) {
    dispatch({
      type: AUTH_FAILED,
    });
    localStorage.setItem("loggedIn", "false");

    return {
      error:
        "Enter a Password with letter, number and special character. Minimum 8 characters.",
    };
  }

  if (userData.mobile.length !== 10) {
    dispatch({
      type: AUTH_FAILED,
    });
    localStorage.setItem("loggedIn", "false");

    return { error: "Enter a 10 digit number" };
  }

  users.push(userData);

  localStorage.setItem("users", JSON.stringify(users));

  dispatch({
    type: USER_ADDED,
    payload: JSON.parse(localStorage.getItem("users")),
  });

  localStorage.setItem("loggedIn", "true");
  history.push("/");
};

export const loginUser = (userData) => async (dispatch) => {
  dispatch({
    type: LOGIN_USER,
  });

  const users = JSON.parse(localStorage.getItem("users")) || [];

  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email === userData.email &&
      users[i].password === userData.password
    ) {
      dispatch({
        type: LOGIN_USER,
        payload: users,
      });
      localStorage.setItem("loggedIn", "true");
      return history.push("/");
    }
  }

  dispatch({
    type: AUTH_FAILED,
  });
  localStorage.setItem("loggedIn", "false");

  return { error: "Invalid credentials" };
};

export const logoutUser = () => async (dispatch) => {
  localStorage.setItem("loggedIn", "false");
  dispatch({
    type: LOGOUT_SUCCESS,
  });
};
