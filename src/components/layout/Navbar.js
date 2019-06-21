import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Avatar
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { Mail, Menu, MoveToInbox } from "@material-ui/icons";
import MenuList from "./MenuList";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: 1,
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  profileAvatar: {
    marginLeft: theme.spacing(2)
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = props => {
  const { container, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { auth, profile } = useSelector(state => state.firebase);

  console.log("Navbar", profile);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <MenuList />
    </div>
  );
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            News
          </Typography>
          {profile.isLoaded && (
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              {auth.photoURL ? (
                <Avatar src={auth.photoURL} className={classes.avatar} />
              ) : (
                <Avatar className={classes.avatar}>{`${profile.firstname[0]}${
                  profile.lastname[0]
                }`}</Avatar>
              )}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
    // <div className={classes.root}>
    //   <CssBaseline />
    //   <AppBar position="fixed" className={classes.appBar}>
    //     {/* <AppBar position="fixed"> */}
    //     <Toolbar>
    //       <IconButton
    //         color="inherit"
    //         aria-label="Open drawer"
    //         edge="start"
    //         onClick={() => setMobileOpen(!mobileOpen)}
    //         className={classes.menuButton}
    //       >
    //         <Menu />
    //       </IconButton>
    //       <Typography variant="h5" noWrap>
    //         Blog
    //       </Typography>
    //       {true && (
    //         <div>
    //           <IconButton
    //             aria-label="Account of current user"
    //             aria-controls="menu-appbar"
    //             aria-haspopup="true"
    //             color="inherit"
    //           >
    //             <Avatar className={classes.avatar}>H</Avatar>
    //           </IconButton>
    //         </div>
    //       )}
    //     </Toolbar>
    //   </AppBar>

    // </div>
  );
};

export default Navbar;
