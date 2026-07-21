import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Drawer } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const drawerWidth = 260;

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("consumers")) return "Consumer Directory";
    if (path.includes("connections")) return "Grid Connections Management";
    if (path.includes("meter-readings")) return "Meter Reading Ledger";
    if (path.includes("bills")) return "Billing & Invoices";
    if (path.includes("payments")) return "Payment Settlements";
    return "Executive Dashboard";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Top Navbar */}
      <Navbar onMobileToggle={() => setMobileOpen(!mobileOpen)} title={getPageTitle()} />

      {/* Sidebar Navigation */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile Temporary Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, border: "none" },
          }}
        >
          <Sidebar onClose={() => setMobileOpen(false)} />
        </Drawer>

        {/* Desktop Permanent Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxSizing: "border-box",
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Page Body Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          p: { xs: 2.5, sm: 4, md: 4.5 },
          bgcolor: "#F8FAFC",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default MainLayout;