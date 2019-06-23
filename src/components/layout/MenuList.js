import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExitToApp, Dashboard, AddBox } from "@material-ui/icons";
import { logOut } from "../../actions/auth";
import { postModalOpen } from "../../actions/posts";

const SignedInMenu = () => {
  const dispatch = useDispatch();

  const linksList = [
    { name: "Strona główna", to: "/", icon: <Dashboard /> },
    {
      name: "Nowy post",
      icon: <AddBox />,
      click: () => dispatch(postModalOpen(true))
    },
    {
      name: "Wyloguj",
      to: "/",
      icon: <ExitToApp />,
      click: () => dispatch(logOut())
    }
  ];

  const list = linksList.map(link => {
    const props = link.to ? { component: Link, to: link.to } : {};
    return (
      <ListItem button key={link.name} onClick={link.click} {...props}>
        <ListItemIcon>{link.icon}</ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItem>
    );
  });

  return <List>{list}</List>;
};

export default SignedInMenu;
