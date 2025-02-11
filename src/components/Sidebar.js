import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return(
        <Drawer variant = "permanent" className="sidebar">
            <List>
                <ListItem button component={Link} to = "/">
                <ListItemText primary = "Home"/>
                </ListItem>
                <ListItem button component={Link} to = "/dashboard">
                <ListItemText primary = "Dashboard"/>
                </ListItem>
                
            </List>
        </Drawer>
    );
};

export default Sidebar;