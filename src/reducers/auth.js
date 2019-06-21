import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from "../constants";

const defaultState = { user: null, loading: false, error: null };

const authReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loading: false, user: payload };
    }
    case LOGIN_ERROR: {
      return { ...state, loading: false, error: payload };
    }
    case SIGNUP_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, loading: false };
    }
    case SIGNUP_ERROR: {
      return { ...state, loading: false, error: payload };
    }
    case LOGOUT_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOGOUT_SUCCESS: {
      return { ...state, loading: false, user: null };
    }
    case LOGOUT_ERROR: {
      return { ...state, loading: false, error: payload };
    }
    default:
      return state;
  }
};

export default authReducer;
