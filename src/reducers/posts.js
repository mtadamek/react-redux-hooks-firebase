import { POST_MODAL_OPEN } from "../constants";

const defaultState = {
  posts: [],
  loading: false,
  error: null,
  postModalIsOpen: false
};

const postsReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_MODAL_OPEN: {
      return { ...state, postModalIsOpen: payload };
    }
    default:
      return state;
  }
};

export default postsReducer;
