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
        bgcolor: "rgba(13, 27, 42, 0.65)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        color: "#FFFFFF",
        borderRight: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      
      <Toolbar sx={{ my: 1.5, px: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              background: "rgba(6, 182, 212, 0.1)",
              color: "#06B6D4",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              p: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={20} fill="currentColor" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em", fontSize: "1.05rem", lineHeight: 1.1 }}>
              KNK POWER
            </Typography>
            <Typography variant="caption" sx={{ color: "#06B6D4", fontSize: "0.68rem", display: "block", fontWeight: 700, textTransform: "uppercase" }}>
              Corporation Ltd.
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)", mb: 2 }} />

      
      <Box sx={{ px: 3, mb: 2 }}>
        <Chip
          size="small"
          label={userRole === "ADMIN" ? "Scope: Senior Grid Operator" : "Scope: Consumer Self-Service"}
          sx={{
            width: "100%",
            bgcolor: userRole === "ADMIN" ? "rgba(37, 99, 235, 0.15)" : "rgba(34, 197, 94, 0.15)",
            color: userRole === "ADMIN" ? "#60A5FA" : "#22C55E",
            fontWeight: 700,
            fontSize: "0.72rem",
            border: `1px solid ${userRole === "ADMIN" ? "rgba(96, 165, 250, 0.25)" : "rgba(34, 197, 94, 0.25)"}`,
          }}
        />
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
                    borderRadius: "12px",
                    py: 1.2,
                    px: 2,
                    bgcolor: isActive ? "rgba(6, 182, 212, 0.1)" : "transparent",
                    color: isActive ? "#06B6D4" : "#94A3B8",
                    borderLeft: isActive ? "3px solid #06B6D4" : "3px solid transparent",
                    "&:hover": {
                      bgcolor: isActive ? "rgba(6, 182, 212, 0.15)" : "rgba(255, 255, 255, 0.03)",
                      color: "#FFFFFF",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#06B6D4" : "#64748B",
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

      
      <Box sx={{ p: 2.5, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <ListItemButton
          onClick={handleSignOut}
          sx={{
            borderRadius: "10px",
            color: "#EF4444",
            py: 1,
            px: 2,
            "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" },
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