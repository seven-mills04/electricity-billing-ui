import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Menu, X, Zap, Volume2, VolumeX } from "lucide-react";
import audioService from "../../services/audioService";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <Box sx={{ p: 3, height: "100%", bgcolor: "#FFFDF8", color: "#171717", display: "flex", flexDirection: "column" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Zap size={20} color="#075BB5" fill="#075BB5" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", letterSpacing: "-0.02em" }}>
            KNK POWER
          </Typography>
        </Stack>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "#171717" }}>
          <X size={20} />
        </IconButton>
      </Stack>
      <List sx={{ mb: "auto" }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => scrollToSection(item.id)}
              sx={{
                borderRadius: "2px",
                my: 0.5,
                color: "#625F58",
                "&:hover": { bgcolor: "#E9E5DB", color: "#171717" },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 700, fontSize: "0.95rem" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 4 }}>
        <Stack spacing={1.5}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleLoginClick(1)}
            sx={{
              bgcolor: "#075BB5",
              color: "#FFFDF8",
              borderRadius: "2px",
              fontWeight: 700,
              py: 1.5,
              "&:hover": { bgcolor: "#064B95" },
            }}
          >
            Consumer Login
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => handleLoginClick(0)}
            sx={{
              borderColor: "#171717",
              color: "#171717",
              borderRadius: "2px",
              fontWeight: 700,
              py: 1.5,
              "&:hover": { borderColor: "#075BB5", bgcolor: "#E9E5DB" },
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
      <AppBar
        position="sticky"
        sx={{
          color: "#171717",
          boxShadow: "none",
          bgcolor: "#FFFDF8",
          borderBottom: "2px solid #171717", // Strong bottom border
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", height: 76, px: { xs: 1, sm: 2 } }}>
            {/* Logo and Brand */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Box
                sx={{
                  bgcolor: "#E9E5DB",
                  color: "#171717",
                  p: 0.8,
                  border: "1px solid #C9C3B7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={20} fill="#171717" />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#171717",
                    lineHeight: 1.1,
                  }}
                >
                  KNK POWER
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#625F58",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  Corporation Ltd.
                </Typography>
              </Box>
            </Stack>

            {/* Desktop Navigation Links */}
            <Stack
              direction="row"
              spacing={3.5}
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
                    color: "#625F58",
                    cursor: "pointer",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    position: "relative",
                    transition: "color 120ms ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "0%",
                      height: "2px",
                      bottom: "-4px",
                      left: "0%",
                      backgroundColor: "#075BB5",
                      transition: "all 150ms ease-in-out",
                    },
                    "&:hover": {
                      color: "#075BB5",
                      "&::after": { width: "100%" },
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Stack>

            {/* Actions: Voice Assistant & Login buttons */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <IconButton
                onClick={toggleMute}
                aria-label={muted ? "Unmute Voice Assistant" : "Mute Voice Assistant"}
                sx={{
                  color: muted ? "#C5382F" : "#625F58",
                  border: "1px solid #C9C3B7",
                  borderRadius: "2px",
                  p: 1,
                  "&:hover": {
                    color: muted ? "#C5382F" : "#075BB5",
                    borderColor: "#171717",
                    bgcolor: "rgba(23, 23, 23, 0.04)",
                  },
                }}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </IconButton>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleLoginClick(1)}
                  sx={{
                    bgcolor: "#075BB5",
                    color: "#FFFDF8",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    borderRadius: "2px",
                    px: 2.2,
                    "&:hover": {
                      bgcolor: "#064B95",
                    },
                  }}
                >
                  Consumer Login
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => handleLoginClick(0)}
                  sx={{
                    borderColor: "#171717",
                    color: "#171717",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    borderRadius: "2px",
                    px: 2.2,
                    "&:hover": {
                      borderColor: "#075BB5",
                      bgcolor: "#E9E5DB",
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
                sx={{ display: { md: "none" }, color: "#171717" }}
              >
                <Menu size={24} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "#FFFDF8",
            borderLeft: "2px solid #171717",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
