import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { postModalOpen } from "../../actions/posts";

const PostModal = () => {
  const isOpen = useSelector(state => state.posts.postModalIsOpen);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(postModalOpen(false))}
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
    </Dialog>
  );
};

export default PostModal;
