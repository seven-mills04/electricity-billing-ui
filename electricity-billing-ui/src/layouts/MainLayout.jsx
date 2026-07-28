import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BackgroundEffects from "../components/landing/BackgroundEffects";

const drawerWidth = 260;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    const role = localStorage.getItem("userRole") || "ADMIN";
    if (path.includes("consumers")) return "Consumer Directory";
    if (path.includes("connections")) return "Grid Connections Management";
    if (path.includes("meter-readings")) return "Meter Reading Ledger";
    if (path.includes("bills")) return "Billing & Invoices";
    if (path.includes("payments")) return "Payment Settlements";
    return role === "ADMIN" ? "Executive Dashboard" : "Consumer Dashboard";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F3F0E8", color: "#171717", overflow: "hidden", position: "relative" }}>
      {/* Background Orbs Grid Effects */}
      <BackgroundEffects />
      
      <Navbar onMobileToggle={() => setMobileOpen(!mobileOpen)} title={getPageTitle()} />

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 5 }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              bgcolor: "transparent",
            },
          }}
        >
          <Sidebar onClose={() => setMobileOpen(false)} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxSizing: "border-box",
              bgcolor: "transparent",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          p: { xs: 2.5, sm: 4, md: 4.5 },
          bgcolor: "transparent",
          minHeight: "calc(100vh - 64px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;