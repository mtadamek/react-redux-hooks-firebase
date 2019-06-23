import React, { useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import Navbar from "../layout/Navbar";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red, blue, yellow } from "@material-ui/core/colors";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getPosts, updateStars } from "../../actions/posts";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardHeader: { paddingBottom: 0, paddingTop: 0 },
  loadingContener: { display: "flex", justifyContent: "center" },
  loading: {
    color: blue[500]
  }
}));

const Posts = () => {
  const { items, loading, error } = useSelector(state => state.posts);
  const { uid } = useSelector(state => state.firebase.auth);
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log("POSTS", items);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const postList = items.map(post => (
    <Card key={post.id} className={classes.card}>
      <CardHeader
        // avatar={
        //   <Avatar aria-label="Recipe" className={classes.avatar}>
        //     R
        //   </Avatar>
        // }
        className={classes.cardHeader}
        action={
          <IconButton aria-label="Settings">
            <MoreVertIcon />
          </IconButton>
        }
        component="h6"
        title={post.author}
        subheader={moment(post.createdAt.toDate()).calendar()}
      />
      <CardContent>
        <Typography variant="body2" component="p" style={{ fontSize: "1rem" }}>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {post.stars.includes(uid) ? (
          <IconButton
            aria-label="Give a star"
            onClick={() =>
              dispatch(
                updateStars({
                  postId: post.id,
                  stars: post.stars.filter(s => s !== uid)
                })
              )
            }
          >
            <Star style={{ color: yellow[800] }} />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Give a star"
            onClick={() =>
              dispatch(
                updateStars({
                  postId: post.id,
                  stars: post.stars.concat(uid)
                })
              )
            }
          >
            <StarBorder />
          </IconButton>
        )}
      </CardActions>
    </Card>
  ));

  return (
    <Navbar>
      {loading ? (
        <div className={classes.loadingContener}>
          <CircularProgress size={40} className={classes.buttonProgress} />
        </div>
      ) : (
        postList
      )}
      {/* <div className={classes.root}>
        <div className={classes.cardsContener}></div>
      </div> */}
    </Navbar>
  );
};

export default Posts;
