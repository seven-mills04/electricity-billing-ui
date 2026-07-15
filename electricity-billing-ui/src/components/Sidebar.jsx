import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BoltIcon from "@mui/icons-material/Bolt";
import ElectricMeterIcon from "@mui/icons-material/ElectricMeter";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";

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
        {/* Dashboard */}
        <ListItemButton component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Consumers */}
        <ListItemButton component={Link} to="/consumers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Consumers" />
        </ListItemButton>

        {/* Connections */}
        <ListItemButton component={Link} to="/connections">
          <ListItemIcon>
            <BoltIcon />
          </ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItemButton>

        {/* Meter Readings */}
        <ListItemButton component={Link} to="/meter-readings">
          <ListItemIcon>
            <ElectricMeterIcon />
          </ListItemIcon>
          <ListItemText primary="Meter Readings" />
        </ListItemButton>

        {/* Bills */}
        <ListItemButton component={Link} to="/bills">
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Bills" />
        </ListItemButton>

        {/* Payments */}
        <ListItemButton component={Link} to="/payments">
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;