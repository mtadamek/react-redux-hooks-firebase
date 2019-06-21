import { POST_MODAL_OPEN } from "../constants";

export const postModalOpen = isOpen => dispatch =>
  dispatch({
    type: POST_MODAL_OPEN,
    payload: isOpen
  });
