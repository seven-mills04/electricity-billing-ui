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
    elevation: 0,
    sx: {
      bgcolor: trigger ? "rgba(15, 23, 42, 0.75)" : "rgba(15, 23, 42, 0.3)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
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
      const offset = 80; 
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
    <Box sx={{ p: 3, height: "100%", bgcolor: "rgba(15, 23, 42, 0.95)", color: "#F8FAFC" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Zap size={22} color="#06B6D4" fill="#06B6D4" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
            KNK POWER
          </Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#FFFFFF" }}>
          <X size={20} />
        </IconButton>
      </Stack>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(item.id)}
              sx={{
                borderRadius: "10px",
                my: 0.5,
                color: "#94A3B8",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)", color: "#06B6D4" },
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
      <Box sx={{ mt: 4 }}>
        <Stack spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginClick(1)}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              "&:hover": { borderColor: "#06B6D4", bgcolor: "rgba(6, 182, 212, 0.05)" },
            }}
          >
            Consumer Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleLoginClick(0)}
            sx={{
              bgcolor: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#C084FC",
              "&:hover": { bgcolor: "rgba(139, 92, 246, 0.4)", color: "#E9D5FF" },
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
        <AppBar position="sticky" sx={{ color: "#F8FAFC", boxShadow: "none", bgcolor: "transparent" }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between", height: 80, px: { xs: 1, sm: 2 } }}>
              
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Box
                  sx={{
                    bgcolor: "rgba(6, 182, 212, 0.15)",
                    color: "#06B6D4",
                    p: 1,
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
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
                      color: "#FFFFFF",
                      lineHeight: 1.1,
                    }}
                  >
                    KNK POWER
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#06B6D4",
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
                      color: "#94A3B8",
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
                        backgroundColor: "#06B6D4",
                        transition: "all 0.25s ease-in-out",
                      },
                      "&:hover": {
                        color: "#FFFFFF",
                        "&::after": { width: "100%" },
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Stack>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleLoginClick(1)}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    borderWidth: "1.5px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 2.5,
                    "&:hover": {
                      borderColor: "#06B6D4",
                      borderWidth: "1.5px",
                      bgcolor: "rgba(6, 182, 212, 0.05)",
                    },
                  }}
                >
                  Consumer Login
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleLoginClick(0)}
                  sx={{
                    bgcolor: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    color: "#C084FC",
                    fontWeight: 600,
                    borderRadius: "10px",
                    px: 2.5,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "rgba(139, 92, 246, 0.4)",
                      color: "#E9D5FF",
                    },
                  }}
                >
                  Admin Login
                </Button>
              </Stack>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" }, color: "#FFFFFF" }}
              >
                <Menu size={24} />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 280, bgcolor: "rgba(15, 23, 42, 0.95)", borderLeft: "1px solid rgba(255, 255, 255, 0.08)", backdropFilter: "blur(16px)" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
