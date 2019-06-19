import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExitToApp, Dashboard, AddBox } from "@material-ui/icons";
import { logOut } from "../../actions/auth";

const SignedInMenu = () => {
  const dispatch = useDispatch();

  const linksList = [
    { name: "Strona główna", to: "/", icon: <Dashboard /> },
    { name: "Nowy post", to: "/new", icon: <AddBox /> },
    {
      name: "Wyloguj",
      to: "/",
      icon: <ExitToApp />,
      click: () => dispatch(logOut())
    }
  ];

  const list = linksList.map(link => (
    <ListItem
      button
      key={link.name}
      component={Link}
      to={link.to}
      onClick={link.click}
    >
      <ListItemIcon>{link.icon}</ListItemIcon>
      <ListItemText primary={link.name} />
    </ListItem>
  ));

  return <List>{list}</List>;
};

export default SignedInMenu;
