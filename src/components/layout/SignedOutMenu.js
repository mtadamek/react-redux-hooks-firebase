import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Mail, Dashboard } from "@material-ui/icons";

const linksList = [
  { name: "Strona główna", to: "/", icon: <Dashboard /> },
  { name: "Zaloguj", to: "/login", icon: <Mail /> },
  { name: "Zarejestruj", to: "/signin", icon: <Mail /> }
];

const SignedOutMenu = () => {
  const list = linksList.map(link => (
    <ListItem button key={link.name} component={Link} to={link.to}>
      <ListItemIcon>{link.icon}</ListItemIcon>
      <ListItemText primary={link.name} />
    </ListItem>
  ));
  return <List>{list}</List>;
};

export default SignedOutMenu;
