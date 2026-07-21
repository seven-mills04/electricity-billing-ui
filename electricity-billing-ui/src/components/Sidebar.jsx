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

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const consumerName = localStorage.getItem("consumerName") || "Admin User";

  const allMenuItems = [
    {
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      roles: ["ADMIN", "CONSUMER"],
    },
    {
      text: "Consumers Directory",
      icon: <Users size={20} />,
      path: "/consumers",
      roles: ["ADMIN"],
    },
    {
      text: "Grid Connections",
      icon: <Plug2 size={20} />,
      path: "/connections",
      roles: ["ADMIN"],
    },
    {
      text: "Meter Readings Ledger",
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
      text: "Payments & Settlements",
      icon: <CreditCard size={20} />,
      path: "/payments",
      roles: ["ADMIN", "CONSUMER"],
    },
  ];

  const menuItems = allMenuItems.filter((item) => item.roles.includes(userRole));

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0F172A",
        color: "#FFFFFF",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Brand Header */}
      <Toolbar sx={{ my: 1.5, px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
              color: "#FFFFFF",
              p: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(2, 132, 199, 0.4)",
            }}
          >
            <Zap size={20} fill="currentColor" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", fontSize: "1.05rem" }}>
              GRIDPULSE <span style={{ color: "#38BDF8" }}>UTILITY</span>
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.68rem", display: "block" }}>
              National Electricity Operations
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 2 }} />

      {/* Role Badge Pill */}
      <Box sx={{ px: 3, mb: 2 }}>
        <Chip
          size="small"
          label={userRole === "ADMIN" ? "Scope: Senior Grid Operator" : "Scope: Consumer Self-Service"}
          sx={{
            width: "100%",
            bgcolor: userRole === "ADMIN" ? "rgba(2, 132, 199, 0.15)" : "rgba(16, 185, 129, 0.15)",
            color: userRole === "ADMIN" ? "#38BDF8" : "#34D399",
            fontWeight: 700,
            fontSize: "0.72rem",
            border: `1px solid ${userRole === "ADMIN" ? "rgba(56, 189, 248, 0.3)" : "rgba(52, 211, 153, 0.3)"}`,
          }}
        />
      </Box>

      {/* Navigation List */}
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
                    borderRadius: "10px",
                    py: 1.2,
                    px: 2,
                    bgcolor: isActive ? "rgba(2, 132, 199, 0.15)" : "transparent",
                    color: isActive ? "#38BDF8" : "#94A3B8",
                    borderLeft: isActive ? "3px solid #38BDF8" : "3px solid transparent",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(2, 132, 199, 0.25)" : "rgba(255, 255, 255, 0.04)",
                      color: "#FFFFFF",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#38BDF8" : "#64748B",
                      minWidth: 38,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.875rem",
                    }}
                  />
                </ListItemButton>
              </motion.div>
            </ListItem>
          );
        })}
      </List>

      {/* Footer / Logout */}
      <Box sx={{ p: 2.5, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: "10px",
            color: "#EF4444",
            py: 1,
            px: 2,
            "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" },
          }}
        >
          <ListItemIcon sx={{ color: "#EF4444", minWidth: 38 }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{ fontWeight: 700, fontSize: "0.875rem" }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;