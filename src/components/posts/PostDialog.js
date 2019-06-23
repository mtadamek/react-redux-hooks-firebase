import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { postModalOpen } from "../../actions/posts";
import { blue } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { createPost } from "../../actions/posts";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    width: "100%"
  },
  buttonProgress: {
    color: blue[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -8,
    marginLeft: -8
  }
}));

const PostDialog = () => {
  const isOpen = useSelector(state => state.posts.postModalIsOpen);
  const { loading } = useSelector(state => state.posts);
  const [postText, setPostText] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(postModalOpen(false))}
      aria-labelledby="simple-dialog-title"
    >
      <form noValidate autoComplete="off">
        <Grid container component="main">
          <DialogTitle id="simple-dialog-title">New post</DialogTitle>
          <TextField
            id="outlined-dense-multiline"
            label="What are you thinking?"
            className={classes.textField}
            margin="dense"
            variant="outlined"
            fullWidth
            multiline
            rowsMax="10"
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
              onClick={() => dispatch(createPost(postText))}
            >
              Create
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </form>
    </Dialog>
  );
};

export default PostDialog;
