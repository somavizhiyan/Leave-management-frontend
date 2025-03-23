import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  LocalFlorist as LocalFloristIcon,
  EmojiNature as EmojiNatureIcon,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { employeSelector, getemployebyid } from "../Reducer/reducer/employe.redu";
import { useDispatch, useSelector } from "react-redux";
import { getadmindetails, signSelector } from "../Reducer/reducer/signin.redu";

const Sidebar = () => {
  const dispatch = useDispatch();
  const {getEmployeById} = useSelector(employeSelector);
  const {ADMIN_DATA} = useSelector(signSelector);
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem("role");
  const ids = localStorage.getItem("ids");
  const name = localStorage.getItem("name")
  //useeffects
  
  useEffect(()=>{
    role == 0 ? dispatch(getemployebyid(ids)) : dispatch(getadmindetails(ids))
  },[ids,role])

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="Sidebar-container">
      <div>
        <Drawer variant="permanent" className="sidebar-drawer">
          {role == 0 ? (
            <List>
              <Box component={Link} to={"profile"} className="userprofile">
                <Avatar
                className="userimage"
                  src="../assests/user.logo"
                  alt="Admin"
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Typography variant="h6">{name}</Typography>
              </Box>
              <ListItem component={Link} to={"dash"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem component={Link} to={"department"}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Department" />
              </ListItem>

              <ListItem component={Link} to={"employe"}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Employe" />
              </ListItem>

              <ListItem onClick={handleClick}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Leave" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem component={Link} to={"leave"}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leave Type" />
                  </ListItem>

                  <ListItem component={Link} to={"leavemanage"}>
                    <ListItemIcon>
                      <LocalFloristIcon />
                    </ListItemIcon>
                    <ListItemText primary="Leave Manage" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem component={Link} to={"/"}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          ) : (
            <List>
              <Box  component={Link} to={"profile"} className="userprofile">
                <Avatar
                  src="../assests/user.logo"
                  alt="Employe"
                  sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Typography variant="h6">{name}</Typography>
              </Box>
              <ListItem component={Link} to={"leaveapply"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Leave apply" />
              </ListItem>

              {/* <ListItem component={Link} to={"leavehistory"}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Leave History" />
              </ListItem> */}

              <ListItem component={Link} to={"/ "}>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>

            </List>
          )}
        </Drawer>
      </div>
      <div className="Outlet-render">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
