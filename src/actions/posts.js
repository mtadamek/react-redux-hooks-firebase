import {
  POST_MODAL_OPEN,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  UPDATE_STARS_REQUEST,
  UPDATE_STARS_SUCCESS,
  UPDATE_STARS_ERROR
} from "../constants";

export const getPosts = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(getPostsRequest());
    const firestore = getFirestore();
    const snapshot = await firestore.collection("posts").get();
    console.log(snapshot);

    const posts = snapshot.docs.map(post => ({ id: post.id, ...post.data() }));
    dispatch(getPostsSuccess(posts));
  } catch (error) {
    dispatch(getPostsError(error));
  }
};

const getPostsRequest = () => ({
  type: GET_POST_REQUEST,
  payload: null
});

const getPostsSuccess = posts => ({
  type: GET_POST_SUCCESS,
  payload: posts
});

const getPostsError = error => ({
  type: GET_POST_ERROR,
  payload: error
});

export const createPost = content => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(createPostRequest());

    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    const { displayName } = getState().firebase.auth;
    const { firstname, lastname } = getState().firebase.profile;
    const author = displayName || `${firstname} ${lastname}`;

    const snapshot = await firestore.collection("posts").add({
      content,
      authorId,
      author,
      stars: [],
      comments: [],
      createdAt: new Date()
    });

    const post = await firestore
      .collection("posts")
      .doc(snapshot.id)
      .get();

    dispatch(createPostSuccess({ id: post.id, ...post.data() }));
    dispatch(postModalOpen(false));
  } catch (error) {
    dispatch(createPostError(error));
  }
};

const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
  payload: null
});

const createPostSuccess = post => ({
  type: CREATE_POST_SUCCESS,
  payload: post
});

const createPostError = error => ({
  type: CREATE_POST_ERROR,
  payload: error
});

export const updateStars = ({ postId, stars }) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    dispatch(updateStarsRequest());

    const firestore = getFirestore();
    await firestore
      .collection("posts")
      .doc(postId)
      .update({
        stars
      });

    dispatch(updateStarsSuccess({ id: postId, stars }));
  } catch (error) {
    dispatch(updateStarsError(error));
  }
};

const updateStarsRequest = () => ({
  type: UPDATE_STARS_REQUEST,
  payload: null
});

const updateStarsSuccess = data => ({
  type: UPDATE_STARS_SUCCESS,
  payload: data
});

const updateStarsError = error => ({
  type: UPDATE_STARS_ERROR,
  payload: error
});

export const postModalOpen = isOpen => dispatch =>
  dispatch({
    type: POST_MODAL_OPEN,
    payload: isOpen
  });
