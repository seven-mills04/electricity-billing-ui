import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useScrollTrigger,
} from "@mui/material";
import { Menu, X, Zap } from "lucide-react";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      bgcolor: trigger ? "rgba(255, 255, 255, 0.95)" : "#FFFFFF",
      backdropFilter: trigger ? "blur(12px)" : "none",
      borderBottom: trigger ? "none" : "1px solid #E2E8F0",
      transition: "all 0.3s ease-in-out",
    },
  });
}

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Consumer Services", id: "services" },
    { label: "Billing", id: "preview" },
    { label: "New Connection", id: "how-it-works" },
    { label: "Tariff", id: "highlights" },
    { label: "About Us", id: "why-us" },
    { label: "Contact", id: "footer" },
  ];

  const handleLoginClick = (tabIndex) => {
    navigate("/login", { state: { tab: tabIndex } });
  };

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Zap size={22} color="#0056A6" fill="#0056A6" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#0056A6", letterSpacing: "-0.02em" }}>
            APEX POWER
          </Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#475569" }}>
          <X size={20} />
        </IconButton>
      </Stack>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(item.id)}
              sx={{
                borderRadius: "8px",
                my: 0.5,
                "&:hover": { bgcolor: "#F0F4F8", color: "#0056A6" },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: "0.95rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 3, px: 2 }}>
        <Stack spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginClick(1)}
            sx={{
              borderColor: "#0056A6",
              color: "#0056A6",
              "&:hover": { borderColor: "#003c74", bgcolor: "rgba(0, 86, 166, 0.04)" },
            }}
          >
            Consumer Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleLoginClick(0)}
            sx={{
              bgcolor: "#00A99D",
              "&:hover": { bgcolor: "#00766d" },
            }}
          >
            Admin Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="sticky" sx={{ color: "#1E293B", boxShadow: "none" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between", height: 80, px: { xs: 1, sm: 2 } }}>
              {/* Logo */}
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Box
                  sx={{
                    bgcolor: "#0056A6",
                    color: "#FFFFFF",
                    p: 1,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Zap size={22} fill="currentColor" />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "-0.03em",
                      color: "#0056A6",
                      lineHeight: 1.1,
                    }}
                  >
                    APEX POWER
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#00A99D",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      display: "block",
                      textTransform: "uppercase",
                    }}
                  >
                    Corporation Ltd.
                  </Typography>
                </Box>
              </Stack>

              {/* Navigation Items (Desktop) */}
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                {navItems.map((item) => (
                  <Typography
                    key={item.label}
                    component="a"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    sx={{
                      color: "#475569",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      position: "relative",
                      transition: "color 0.2s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "0%",
                        height: "2px",
                        bottom: "-4px",
                        left: "0%",
                        backgroundColor: "#0056A6",
                        transition: "all 0.25s ease-in-out",
                      },
                      "&:hover": {
                        color: "#0056A6",
                        "&::after": { width: "100%" },
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Stack>

              {/* Action Buttons (Desktop) */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleLoginClick(1)}
                  sx={{
                    borderColor: "#0056A6",
                    color: "#0056A6",
                    borderWidth: "1.5px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 2.5,
                    "&:hover": {
                      borderColor: "#003c74",
                      borderWidth: "1.5px",
                      bgcolor: "rgba(0, 86, 166, 0.04)",
                    },
                  }}
                >
                  Consumer Login
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleLoginClick(0)}
                  sx={{
                    bgcolor: "#00A99D",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "#00766d",
                    },
                  }}
                >
                  Admin Login
                </Button>
              </Stack>

              {/* Mobile Drawer Trigger */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" }, color: "#1E293B" }}
              >
                <Menu size={24} />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 280, bgcolor: "#FFFFFF" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
