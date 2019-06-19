import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from "../constants";

export const logIn = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(logInRequest());
    const firebase = getFirebase();
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch(logInSuccess(user));
  } catch (error) {
    dispatch(logInError(error));
  }
};

const logInRequest = () => ({
  type: LOGIN_REQUEST,
  payload: null
});

const logInSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
});

const logInError = error => ({
  type: LOGIN_ERROR,
  payload: error
});

export const logOut = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(logOutRequest());
    const firebase = getFirebase();
    await firebase.auth().signOut();
    dispatch(logOutSuccess());
  } catch (error) {
    dispatch(logOutError(error));
  }
};

const logOutRequest = () => ({
  type: LOGOUT_REQUEST,
  payload: null
});

const logOutSuccess = user => ({
  type: LOGOUT_SUCCESS,
  payload: null
});

const logOutError = error => ({
  type: LOGOUT_ERROR,
  payload: error
});
