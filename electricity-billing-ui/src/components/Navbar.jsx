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
  };

  const handleNotifClose = () => {
    setAnchorEl(null);
  };

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
            <Badge badgeContent={2} color="primary">
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
              sx: { width: 320, p: 2, borderRadius: "16px", border: "1px solid #E2E8F0" },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Notifications
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <List disablePadding>
              <ListItem disablePadding sx={{ mb: 1.5 }}>
                <ListItemText
                  primary="Monthly Billing Cycle Completed"
                  secondary="Grid Sector-4 invoices compiled and generated."
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.85rem" }}
                  secondaryTypographyProps={{ fontSize: "0.75rem" }}
                />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText
                  primary="AI Load Prediction Updated"
                  secondary="Consumption forecast calculated with 96% accuracy."
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "0.85rem" }}
                  secondaryTypographyProps={{ fontSize: "0.75rem" }}
                />
              </ListItem>
            </List>
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