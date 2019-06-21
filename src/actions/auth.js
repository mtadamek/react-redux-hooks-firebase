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

export const logIn = ({ email, password }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(logInRequest());
    const firebase = getFirebase();
    const firestore = getFirestore();

    const auth = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const doc = await firestore
      .collection("users")
      .doc(auth.user.uid)
      .get();

    if (!doc.exists) throw new Error("User data do not exist!");

    const user = doc.data();

    dispatch(logInSuccess({ ...user, id: auth.user.uid }));
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

export const signUp = ({ email, password, firstname, lastname }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(signUpRequest());
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await firestore
      .collection("users")
      .doc(user.uid)
      .set({ firstname, lastname });

    dispatch(signUpSuccess({ id: user.uid, firstname, lastname }));
  } catch (error) {
    dispatch(signUpError(error));
  }
};

const signUpRequest = () => ({
  type: SIGNUP_REQUEST,
  payload: null
});

const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

const signUpError = error => ({
  type: SIGNUP_ERROR,
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
