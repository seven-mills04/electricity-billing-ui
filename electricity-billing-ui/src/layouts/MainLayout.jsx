import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";

import {
  LayoutDashboard,
  Gauge,
  Plug2,
  ReceiptText,
  Menu,
  LogOut,
  Bell,
  Zap,
  Users,
  CreditCard,
} from "lucide-react";

const drawerWidth = 260;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
      text: "Bills",
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

  // Dynamically filter menu items based on the logged-in user role
  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const getPageTitle = () => {
    const activeItem = menuItems.find((item) =>
      location.pathname.startsWith(item.path)
    );
    return activeItem ? activeItem.text : "Dashboard";
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#F8FAFC",
        borderRight: "1px solid #E2E8F0",
      }}
    >
      {/* Logo */}
      <Toolbar sx={{ my: 1.5, px: 3 }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            fontWeight: 700,
            color: "#0F172A",
            letterSpacing: "-0.03em",
            fontSize: "1.05rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "#ffffff",
              p: 0.8,
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} fill="currentColor" />
          </Box>
          ELECTRICITY BILLING
        </Typography>
      </Toolbar>

      {/* Navigation */}
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: "8px",
                  py: 1,
                  bgcolor: isActive ? "rgba(79, 70, 229, 0.06)" : "transparent",
                  color: isActive ? "primary.main" : "text.secondary",
                  "&:hover": {
                    bgcolor: isActive
                      ? "rgba(79, 70, 229, 0.09)"
                      : "rgba(0, 0, 0, 0.02)",
                    color: isActive ? "primary.main" : "text.primary",
                    "& .MuiListItemIcon-root": {
                      color: "primary.main",
                    },
                  },
                  transition: "all 0.15s ease",
                }}
              >
                <ListItemIcon
                  className="MuiListItemIcon-root"
                  sx={{
                    color: isActive ? "primary.main" : "text.secondary",
                    minWidth: 38,
                    transition: "color 0.15s ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.875rem",
                    letterSpacing: "-0.01em",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <ListItemButton
          sx={{
            borderRadius: "8px",
            color: "error.main",
            py: 1,
            "&:hover": {
              bgcolor: "rgba(220, 38, 38, 0.04)",
            },
            transition: "all 0.15s ease",
          }}
          onClick={handleSignOut}
        >
          <ListItemIcon
            sx={{
              color: "error.main",
              minWidth: 38,
            }}
          >
            <LogOut size={18} />
          </ListItemIcon>

          <ListItemText
            primary="Sign Out"
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  const userInitials = consumerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Top Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          ml: {
            sm: `${drawerWidth}px`,
          },
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #E2E8F0",
          color: "#0F172A",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2.5, sm: 4 } }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                color: "text.primary",
                display: {
                  sm: "none",
                },
              }}
            >
              <Menu size={20} />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              {getPageTitle()}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              sx={{
                border: "1px solid #E2E8F0",
                color: "text.secondary",
                transition: "all 0.15s ease",
                "&:hover": {
                  color: "primary.main",
                  borderColor: "primary.main",
                  bgcolor: "rgba(79, 70, 229, 0.04)",
                },
              }}
            >
              <Bell size={18} />
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ borderColor: "#E2E8F0" }} />

            <Box
              sx={{
                textAlign: "right",
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography fontWeight={600} variant="body2" sx={{ color: "#0F172A" }}>
                {consumerName}
              </Typography>

              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                {userRole === "ADMIN" ? "Billing Manager" : "Consumer Portal"}
              </Typography>
            </Box>

            <Avatar
              sx={{
                bgcolor: "primary.main",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.8rem",
                width: 36,
                height: 36,
              }}
            >
              {userInitials}
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth,
          },
          flexShrink: {
            sm: 0,
          },
        }}
      >
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              bgcolor: "#F8FAFC",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxSizing: "border-box",
              bgcolor: "#F8FAFC",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${drawerWidth}px)`,
          },
          mt: 8,
          p: {
            xs: 3,
            sm: 4,
            md: 5,
          },
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;