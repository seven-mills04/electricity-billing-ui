import React, { useState, useEffect } from "react";
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
import api from "../api/axiosConfig";

const Navbar = ({ onMobileToggle, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const [consumerNum, setConsumerNum] = useState(localStorage.getItem("consumerNumber") || "");

  useEffect(() => {
    if (userRole === "CONSUMER" && !consumerNum) {
      api.get("/api/consumer/profile")
        .then((res) => {
          if (res.data?.consumerNumber) {
            localStorage.setItem("consumerNumber", res.data.consumerNumber);
            setConsumerNum(res.data.consumerNumber);
          }
        })
        .catch((err) => console.error("Error loading profile number", err));
    }
  }, [userRole, consumerNum]);
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

  const consumerName = localStorage.getItem("consumerName") || "Admin User";
  const consumerNumber = consumerNum || "Loading...";

  const userInitials = consumerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleNotifClick = (e) => {
    setAnchorEl(e.currentTarget);
    
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
        bgcolor: "#FFFDF8",
        borderBottom: "1px solid #C9C3B7",
        color: "#171717",
      }}
    >
      <Toolbar sx={{ justifySelf: "stretch", justifyContent: "space-between", px: { xs: 2.5, sm: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={onMobileToggle}
            sx={{ color: "#171717", display: { sm: "none" } }}
          >
            <Menu size={20} />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", letterSpacing: "-0.02em" }}>
            {title || "Overview"}
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 0.8,
              ml: 2,
              px: 1.5,
              py: 0.5,
              bgcolor: "#FFFDF8",
              border: "1px solid #087A5A",
              borderRadius: "2px",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#087A5A",
              }}
            />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#087A5A" }}>
              GRID OPERATIONAL 99.98%
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          {userRole === "CONSUMER" && (
            <Box
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: "2px",
                border: "1px solid #C9C3B7",
                bgcolor: "#F3F0E8",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#625F58" }}>
                Consumer No: <span style={{ color: "#075BB5", fontWeight: 800, fontFamily: "monospace" }}>{consumerNumber}</span>
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={handleNotifClick}
            sx={{
              border: "1px solid #C9C3B7",
              color: "#625F58",
              borderRadius: "2px",
              "&:hover": { color: "#075BB5", borderColor: "#171717", bgcolor: "rgba(7, 91, 181, 0.04)" },
            }}
          >
            <Badge badgeContent={unreadCount} color="primary">
              <Bell size={18} />
            </Badge>
          </IconButton>

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
                borderRadius: "2px", 
                border: "1px solid #C9C3B7",
                bgcolor: "#FFFDF8",
                boxShadow: "none",
                color: "#171717",
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.95rem" }}>
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Typography 
                  variant="caption" 
                  sx={{ color: "#075BB5", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                >
                  Mark all as read
                </Typography>
              )}
            </Stack>
            <Divider sx={{ mb: 1.5, borderColor: "#C9C3B7" }} />
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
                        borderRadius: "2px", 
                        transition: "background-color 0.2s",
                        "&:hover": { bgcolor: "#F3F0E8" },
                        mb: index !== notifications.length - 1 ? 1 : 0
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", alignItems: "center", pt: 0.5 }}>
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: "50%", 
                              bgcolor: notif.read ? "transparent" : "#075BB5", 
                              border: notif.read ? "none" : "2px solid #FFFDF8",
                            }} 
                          />
                        </Box>
                        <ListItemText
                          primary={notif.primary}
                          secondary={notif.secondary}
                          primaryTypographyProps={{ 
                            fontWeight: notif.read ? 600 : 800, 
                            fontSize: "0.85rem", 
                            color: notif.read ? "#625F58" : "#171717",
                            lineHeight: 1.3
                          }}
                          secondaryTypographyProps={{ 
                            fontSize: "0.75rem", 
                            color: "#625F58",
                            sx: { mt: 0.25, lineHeight: 1.4 }
                          }}
                        />
                      </Stack>
                    </ListItem>
                    {index !== notifications.length - 1 && <Divider sx={{ my: 0.5, borderColor: "#C9C3B7" }} />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Popover>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "#C9C3B7", mx: 1 }} />

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={800} variant="body2" sx={{ color: "#171717" }}>
                {consumerName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                {userRole === "ADMIN" ? "Senior Grid Operator" : "Consumer Portal"}
              </Typography>
            </Box>

            <Avatar
              sx={{
                bgcolor: "#075BB5",
                color: "#FFFDF8",
                fontWeight: 800,
                fontSize: "0.8rem",
                width: 36,
                height: 36,
                borderRadius: "2px",
                border: "1px solid #171717",
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