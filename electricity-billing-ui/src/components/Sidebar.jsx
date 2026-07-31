import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import {
  LayoutDashboard,
  Gauge,
  Plug2,
  ReceiptText,
  LogOut,
  Zap,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, consumerName, logout } = useAuth();
  const activeUserRole = userRole || "ADMIN";
  const activeConsumerName = consumerName || (activeUserRole === "ADMIN" ? "Admin User" : "Consumer User");

  const allMenuItems = [
    {
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      roles: ["ADMIN", "CONSUMER"],
    },
    {
      text: "Consumers",
      icon: <Users size={20} />,
      path: "/consumers",
      roles: ["ADMIN"],
    },
    {
      text: "Connections",
      icon: <Plug2 size={20} />,
      path: "/connections",
      roles: ["ADMIN"],
    },
    {
      text: "Meter Readings",
      icon: <Gauge size={20} />,
      path: "/meter-readings",
      roles: ["ADMIN"],
    },
    {
      text: "Bills & Invoices",
      icon: <ReceiptText size={20} />,
      path: "/bills",
      roles: ["ADMIN", "CONSUMER"],
    },
    {
      text: "Payments",
      icon: <CreditCard size={20} />,
      path: "/payments",
      roles: ["ADMIN", "CONSUMER"],
    },
  ];

  const menuItems = allMenuItems.filter((item) => item.roles.includes(activeUserRole));

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#FFFDF8",
        color: "#171717",
        borderRight: "1px solid #C9C3B7",
      }}
    >
      <Toolbar sx={{ my: 1.5, px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              background: "#E9E5DB",
              color: "#171717",
              border: "1px solid #C9C3B7",
              p: 1,
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={20} fill="currentColor" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", letterSpacing: "-0.03em", fontSize: "1.05rem", lineHeight: 1.1 }}>
              KNK POWER
            </Typography>
            <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.68rem", display: "block", fontWeight: 700, textTransform: "uppercase" }}>
              Corporation Ltd.
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <Divider sx={{ borderColor: "#C9C3B7", mb: 2 }} />

      <Box sx={{ px: 3, mb: 2 }}>
        <Typography variant="caption" sx={{ fontWeight: 900, color: activeUserRole === "ADMIN" ? "#171717" : "#075BB5", textTransform: "uppercase", display: "block", fontSize: "0.72rem", letterSpacing: "0.05em", mb: 0.2 }}>
          {activeUserRole === "ADMIN" ? "ADMIN PORTAL" : "CONSUMER PORTAL"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.8rem" }}>
          {activeUserRole === "ADMIN" ? "Senior System Operator" : "Self-Service Account"}
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.75 }}>
              <motion.div
                style={{ width: "100%" }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    if (onClose) onClose();
                  }}
                  sx={{
                    borderRadius: "2px",
                    py: 1.2,
                    px: 2,
                    bgcolor: isActive ? "#E9E5DB" : "transparent",
                    color: isActive ? "#075BB5" : "#625F58",
                    borderLeft: isActive ? "3px solid #075BB5" : "3px solid transparent",
                    "&:hover": {
                      bgcolor: isActive ? "#E9E5DB" : "#F3F0E8",
                      color: "#171717",
                    },
                    transition: "all 120ms ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#075BB5" : "#625F58",
                      minWidth: 38,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 800 : 700,
                      fontSize: "0.875rem",
                    }}
                  />
                </ListItemButton>
              </motion.div>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2.5, borderTop: "1px solid #C9C3B7" }}>
        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: "2px",
            color: "#C5382F",
            py: 1,
            px: 2,
            "&:hover": { bgcolor: "#F3F0E8" },
          }}
        >
          <ListItemIcon sx={{ color: "#C5382F", minWidth: 38 }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{ fontWeight: 800, fontSize: "0.875rem" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;