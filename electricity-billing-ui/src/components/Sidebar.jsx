import { Drawer, Toolbar, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import BoltIcon from "@mui/icons-material/Bolt";

import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>

        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={Link} to="/consumers">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Consumers" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><BoltIcon /></ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="Bills" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon><PaymentIcon /></ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItemButton>

      </List>
    </Drawer>
  );
};

export default Sidebar;