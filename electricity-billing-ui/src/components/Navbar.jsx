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
import { Bell, Menu, Activity, ShieldCheck, User, Volume2, VolumeX } from "lucide-react";
import audioService from "../services/audioService";

const Navbar = ({ onMobileToggle, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [muted, setMuted] = useState(audioService.isMuted());

  useEffect(() => {
    const unsubscribe = audioService.subscribe((mutedState) => {
      setMuted(mutedState);
    });
    return () => unsubscribe();
  }, []);

  const toggleMute = () => {
    audioService.setMuted(!muted);
  };
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
        bgcolor: "rgba(13, 27, 42, 0.45)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        color: "#FFFFFF",
      }}
    >
      <Toolbar sx={{ justifySelf: "stretch", justifyContent: "space-between", px: { xs: 2.5, sm: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            onClick={onMobileToggle}
            sx={{ color: "#FFFFFF", display: { sm: "none" } }}
          >
            <Menu size={20} />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
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
              bgcolor: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: "#22C55E",
                boxShadow: "0 0 8px #22C55E",
              }}
            />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#22C55E" }}>
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
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                bgcolor: "rgba(255, 255, 255, 0.02)",
                display: { xs: "none", sm: "block" },
              }}
            >
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#94A3B8" }}>
                Consumer No: <span style={{ color: "#06B6D4", fontWeight: 700 }}>{consumerNumber}</span>
              </Typography>
            </Box>
          )}

          
          <IconButton
            onClick={toggleMute}
            aria-label={muted ? "Unmute Voice Assistant" : "Mute Voice Assistant"}
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: muted ? "#EF4444" : "#94A3B8",
              "&:hover": {
                color: muted ? "#F87171" : "#06B6D4",
                borderColor: muted ? "#F87171" : "#06B6D4",
                bgcolor: muted ? "rgba(239, 68, 68, 0.04)" : "rgba(6, 182, 212, 0.04)",
              },
            }}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </IconButton>

          <IconButton
            onClick={handleNotifClick}
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#94A3B8",
              "&:hover": { color: "#06B6D4", borderColor: "#06B6D4", bgcolor: "rgba(6, 182, 212, 0.04)" },
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
                borderRadius: "16px", 
                border: "1px solid rgba(255, 255, 255, 0.08)",
                bgcolor: "rgba(13, 27, 42, 0.95)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                color: "#FFFFFF",
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", fontSize: "0.95rem" }}>
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Typography 
                  variant="caption" 
                  sx={{ color: "primary.light", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                >
                  Mark all as read
                </Typography>
              )}
            </Stack>
            <Divider sx={{ mb: 1.5, borderColor: "rgba(255, 255, 255, 0.06)" }} />
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
                        "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
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
                              bgcolor: notif.read ? "transparent" : "#06B6D4", 
                              border: notif.read ? "none" : "2px solid #0D1B2A",
                              boxShadow: notif.read ? "none" : "0 0 6px #06B6D4"
                            }} 
                          />
                        </Box>
                        <ListItemText
                          primary={notif.primary}
                          secondary={notif.secondary}
                          primaryTypographyProps={{ 
                            fontWeight: notif.read ? 600 : 700, 
                            fontSize: "0.85rem", 
                            color: notif.read ? "#94A3B8" : "#FFFFFF",
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
                    {index !== notifications.length - 1 && <Divider sx={{ my: 0.5, borderColor: "rgba(255, 255, 255, 0.04)" }} />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Popover>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255, 255, 255, 0.06)" }} />

          
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
              <Typography fontWeight={700} variant="body2" sx={{ color: "#FFFFFF" }}>
                {consumerName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
                {userRole === "ADMIN" ? "Senior Grid Operator" : "Consumer Portal"}
              </Typography>
            </Box>

            <Avatar
              sx={{
                background: "linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "0.8rem",
                width: 38,
                height: 38,
                boxShadow: "0 2px 8px rgba(6, 182, 212, 0.3)",
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