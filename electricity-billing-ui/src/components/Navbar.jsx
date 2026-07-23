import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Box,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Bell, Menu, Activity, ShieldCheck, User } from "lucide-react";

const Navbar = ({ onMobileToggle, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      primary: "Monthly Billing Cycle Completed",
      secondary: "Grid Sector-4 invoices compiled and generated.",
      read: false,
    },
    {
      id: 2,
      primary: "AI Load Prediction Updated",
      secondary: "Consumption forecast calculated with 96% accuracy.",
      read: false,
    },
  ]);

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const consumerName = localStorage.getItem("consumerName") || "Admin User";
  const consumerNumber = localStorage.getItem("consumerNumber") || "N/A";

  const userInitials = consumerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleNotifClick = (e) => {
    setAnchorEl(e.currentTarget);
    // Mark all as read when opened
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotifClose = () => {
    setAnchorEl(null);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const notifOpen = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - 260px)` },
        ml: { sm: `260px` },
        bgcolor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #E2E8F0",
        color: "#0F172A",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2.5, sm: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={onMobileToggle}
            sx={{ color: "#0F172A", display: { sm: "none" } }}
          >
            <Menu size={20} />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
            {title || "Overview"}
          </Typography>

          {/* Grid Live Status Pill */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.8,
              ml: 2,
              px: 1.5,
              py: 0.5,
              bgcolor: "#ECFDF5",
              border: "1px solid #A7F3D0",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#10B981",
                boxShadow: "0 0 8px #10B981",
              }}
            />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#065F46" }}>
              GRID OPERATIONAL 99.98%
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* Consumer Account Badge */}
          {userRole === "CONSUMER" && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                bgcolor: "#F8FAFC",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#475569" }}>
                Consumer No: <span style={{ color: "#0284C7", fontWeight: 700 }}>{consumerNumber}</span>
              </Typography>
            </Box>
          )}

          {/* Notifications button */}
          <IconButton
            onClick={handleNotifClick}
            sx={{
              border: "1px solid #E2E8F0",
              color: "#64748B",
              "&:hover": { color: "#0284C7", borderColor: "#0284C7", bgcolor: "rgba(2, 132, 199, 0.04)" },
            }}
          >
            <Badge badgeContent={unreadCount} color="primary">
              <Bell size={18} />
            </Badge>
          </IconButton>

          {/* Notifications Popover */}
          <Popover
            open={notifOpen}
            anchorEl={anchorEl}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: { 
                width: 340, 
                p: 2.5, 
                borderRadius: "16px", 
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.08)"
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "0.95rem" }}>
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Typography 
                  variant="caption" 
                  sx={{ color: "primary.main", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                >
                  Mark all as read
                </Typography>
              )}
            </Stack>
            <Divider sx={{ mb: 1.5 }} />
            {notifications.length === 0 ? (
              <Box sx={{ py: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No notifications yet.
                </Typography>
              </Box>
            ) : (
              <List disablePadding>
                {notifications.map((notif, index) => (
                  <React.Fragment key={notif.id}>
                    <ListItem 
                      disablePadding 
                      sx={{ 
                        py: 1.25, 
                        px: 1.5, 
                        borderRadius: "8px", 
                        transition: "background-color 0.2s",
                        "&:hover": { bgcolor: "#F8FAFC" },
                        mb: index !== notifications.length - 1 ? 1 : 0
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ width: "100%" }}>
                        {/* Dot indicator for unread */}
                        <Box sx={{ display: "flex", alignItems: "center", pt: 0.5 }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: "50%", 
                              bgcolor: notif.read ? "transparent" : "#0284C7", 
                              border: notif.read ? "none" : "2px solid #FFFFFF",
                              boxShadow: notif.read ? "none" : "0 0 4px #0284C7"
                            }} 
                          />
                        </Box>
                        <ListItemText
                          primary={notif.primary}
                          secondary={notif.secondary}
                          primaryTypographyProps={{ 
                            fontWeight: notif.read ? 600 : 700, 
                            fontSize: "0.85rem", 
                            color: notif.read ? "#475569" : "#0F172A",
                            lineHeight: 1.3
                          }}
                          secondaryTypographyProps={{ 
                            fontSize: "0.75rem", 
                            color: "#64748B",
                            sx: { mt: 0.25, lineHeight: 1.4 }
                          }}
                        />
                      </Stack>
                    </ListItem>
                    {index !== notifications.length - 1 && <Divider sx={{ my: 0.5, borderColor: "#F1F5F9" }} />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Popover>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "#E2E8F0" }} />

          {/* Profile User Info */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={700} variant="body2" sx={{ color: "#0F172A" }}>
                {consumerName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>
                {userRole === "ADMIN" ? "Senior Grid Operator" : "Consumer Portal"}
              </Typography>
            </Box>

            <Avatar
              sx={{
                background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.8rem",
                width: 38,
                height: 38,
                boxShadow: "0 2px 8px rgba(2, 132, 199, 0.3)",
              }}
            >
              {userInitials || "U"}
            </Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;