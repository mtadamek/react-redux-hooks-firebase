import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Welcome from "./components/auth/Welcome";
import {
  Container,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  HighlightOff,
  CheckCircle,
  CheckCircleOutline
} from "@material-ui/icons";
import { createItem, deleteItem, updateItem } from "./actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const App = () => {
  // const [taskTitle, setTaskTitle] = useState("");
  const { isEmpty } = useSelector(state => state.firebase.auth);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  // const classes = useStyles();
  console.log(state);
  // const list = todo.map((t, i) => (
  //   <ListItem key={i}>
  //     <ListItemText primary={t.title} />
  //     <ListItemIcon>
  //       {t.done ? (
  //         <CheckCircle
  //           onClick={() =>
  //             dispatch(updateItem({ title: t.title, done: false }))
  //           }
  //         />
  //       ) : (
  //         <CheckCircleOutline
  //           onClick={() => dispatch(updateItem({ title: t.title, done: true }))}
  //         />
  //       )}
  //     </ListItemIcon>
  //     <ListItemIcon>
  //       <HighlightOff onClick={() => dispatch(deleteItem(i))} />
  //     </ListItemIcon>
  //   </ListItem>
  // ));

  const Content = () => (
    <React.Fragment>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </React.Fragment>
  );

  const Home = () => (
    <Navbar>
      <div>Home</div>
    </Navbar>
  );

  const New = () => (
    <Navbar>
      <div>New</div>
    </Navbar>
  );

  return isEmpty ? (
    <Welcome />
  ) : (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={New} />
    </Router>
  );
};

{
  /* <div className={classes.root}>
        <Grid container spacing={3} justify="center" alignItems="stretch">
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <List>{list}</List>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <TextField
                id="title-field"
                label="Title"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  dispatch(createItem({ title: taskTitle, done: false }))
                }
              >
                ADD
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div> */
}

export default App;
