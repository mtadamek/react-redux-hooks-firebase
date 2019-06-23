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
import moment from "moment";

const defaultState = {
  items: [],
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
    case GET_POST_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case GET_POST_SUCCESS: {
      const items = payload.sort(
        (a, b) => moment(b.createdAt.toDate()) - moment(a.createdAt.toDate())
      );
      return { ...state, loading: false, items };
    }
    case GET_POST_ERROR: {
      return { ...state, loading: false, error: payload };
    }
    case CREATE_POST_REQUEST: {
      return { ...state, error: null };
    }
    case CREATE_POST_SUCCESS: {
      const { items } = state;
      items.unshift(payload);
      return { ...state, items };
    }
    case CREATE_POST_ERROR: {
      return { ...state, error: payload };
    }
    case UPDATE_STARS_REQUEST: {
      return { ...state, error: null };
    }
    case UPDATE_STARS_SUCCESS: {
      const { items } = state;
      const item = items.find(i => i.id === payload.id);
      item.stars = payload.stars;
      return { ...state, items };
    }
    case UPDATE_STARS_ERROR: {
      return { ...state, error: payload };
    }
    default:
      return state;
  }
};

export default postsReducer;
