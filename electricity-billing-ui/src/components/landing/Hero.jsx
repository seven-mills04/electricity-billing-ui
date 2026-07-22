import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Typography, Button, Stack } from "@mui/material";
import { ArrowRight, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handlePayBillClick = () => {
    const element = document.getElementById("services");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handlePortalClick = () => {
    navigate("/login", { state: { tab: 1 } });
  };

  return (
    <Box
      id="home"
      sx={{
        position: "relative",
        bgcolor: "#FFFFFF",
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 16 },
        overflow: "hidden",
      }}
    >
      {/* Subtle Blue Waves in Background */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.85,
        }}
      >
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", position: "absolute", bottom: 0 }}
        >
          <path
            d="M0 220C240 180 480 320 720 280C960 240 1200 100 1440 140V600H0V220Z"
            fill="#F7F9FC"
          />
          <path
            d="M0 310C300 280 600 410 900 370C1200 330 1350 240 1440 210V600H0V310Z"
            fill="rgba(0, 86, 166, 0.03)"
          />
        </svg>
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Text Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                component="span"
                sx={{
                  color: "#00A99D",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  mb: 2,
                  display: "inline-block",
                  borderBottom: "2px solid #00A99D",
                  pb: 0.5,
                }}
              >
                Official Consumer Portal
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  color: "#0056A6",
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", sm: "3.2rem", md: "3.8rem" },
                  lineHeight: 1.15,
                  mb: 3,
                  letterSpacing: "-0.02em",
                }}
              >
                Powering Every Home with Reliable Electricity Services
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#475569",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.65,
                  mb: 5,
                  maxWidth: "560px",
                }}
              >
                Manage your electricity connection, pay bills online, track consumption, submit meter readings, and access digital services—all from one secure platform.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePayBillClick}
                  startIcon={<CreditCard size={20} />}
                  sx={{
                    bgcolor: "#0056A6",
                    color: "#FFFFFF",
                    py: 1.8,
                    px: 4,
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(0, 86, 166, 0.15)",
                    "&:hover": {
                      bgcolor: "#003c74",
                      boxShadow: "0 6px 16px rgba(0, 86, 166, 0.25)",
                    },
                  }}
                >
                  Pay Bill
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={handlePortalClick}
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    borderColor: "#00A99D",
                    color: "#00A99D",
                    borderWidth: "1.5px",
                    py: 1.8,
                    px: 4,
                    fontSize: "1rem",
                    "&:hover": {
                      borderColor: "#00766d",
                      borderWidth: "1.5px",
                      bgcolor: "rgba(0, 169, 157, 0.04)",
                    },
                  }}
                >
                  Consumer Portal
                </Button>
              </Stack>
            </motion.div>
          </Grid>

          {/* Right Vector Illustration */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 580,
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <svg
                  viewBox="0 0 600 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "auto" }}
                >
                  {/* Subtle Grid / Network background circles */}
                  <circle cx="300" cy="250" r="220" fill="none" stroke="rgba(0, 86, 166, 0.03)" strokeWidth="1" />
                  <circle cx="300" cy="250" r="160" fill="none" stroke="rgba(0, 169, 157, 0.03)" strokeWidth="1.5" strokeDasharray="5 5" />
                  
                  {/* Wind Turbine / Green Energy Elements */}
                  <g transform="translate(100, 120)" opacity="0.85">
                    <line x1="0" y1="100" x2="0" y2="0" stroke="#94A3B8" strokeWidth="3" />
                    <circle cx="0" cy="0" r="6" fill="#64748B" />
                    {/* Rotors */}
                    <path d="M0 0 L-10 -35 L10 -35 Z" fill="#CBD5E1" transform="rotate(0)" />
                    <path d="M0 0 L-10 -35 L10 -35 Z" fill="#CBD5E1" transform="rotate(120)" />
                    <path d="M0 0 L-10 -35 L10 -35 Z" fill="#CBD5E1" transform="rotate(240)" />
                  </g>
                  
                  <g transform="translate(50, 170)" opacity="0.7">
                    <line x1="0" y1="60" x2="0" y2="0" stroke="#94A3B8" strokeWidth="2" />
                    <circle cx="0" cy="0" r="4" fill="#64748B" />
                    <path d="M0 0 L-6 -22 L6 -22 Z" fill="#E2E8F0" transform="rotate(45)" />
                    <path d="M0 0 L-6 -22 L6 -22 Z" fill="#E2E8F0" transform="rotate(165)" />
                    <path d="M0 0 L-6 -22 L6 -22 Z" fill="#E2E8F0" transform="rotate(285)" />
                  </g>

                  {/* Transmission Tower */}
                  <g transform="translate(480, 80)">
                    {/* Tower Frame */}
                    <path d="M20 300 L60 80 L80 80 L120 300" stroke="#475569" strokeWidth="3" fill="none" />
                    <line x1="40" y1="190" x2="100" y2="190" stroke="#475569" strokeWidth="2.5" />
                    <line x1="50" y1="135" x2="90" y2="135" stroke="#475569" strokeWidth="2" />
                    <line x1="60" y1="80" x2="80" y2="80" stroke="#475569" strokeWidth="2" />
                    
                    {/* Crossbeams X */}
                    <line x1="20" y1="300" x2="100" y2="190" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="120" y1="300" x2="40" y2="190" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="40" y1="190" x2="90" y2="135" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="100" y1="190" x2="50" y2="135" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="50" y1="135" x2="80" y2="80" stroke="#64748B" strokeWidth="1.5" />
                    <line x1="90" y1="135" x2="60" y2="80" stroke="#64748B" strokeWidth="1.5" />

                    {/* Crossarms */}
                    <line x1="15" y1="135" x2="125" y2="135" stroke="#475569" strokeWidth="3" />
                    <line x1="5" y1="80" x2="135" y2="80" stroke="#475569" strokeWidth="3" />

                    {/* Insulators */}
                    <line x1="15" y1="135" x2="15" y2="150" stroke="#94A3B8" strokeWidth="3" />
                    <line x1="125" y1="135" x2="125" y2="150" stroke="#94A3B8" strokeWidth="3" />
                    <line x1="5" y1="80" x2="5" y2="95" stroke="#94A3B8" strokeWidth="3" />
                    <line x1="135" y1="80" x2="135" y2="95" stroke="#94A3B8" strokeWidth="3" />
                  </g>

                  {/* Power Lines connecting towers/poles */}
                  <path d="M5 175 Q 230 250 495 215" stroke="#94A3B8" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  <path d="M5 230 Q 230 300 615 215" stroke="#94A3B8" strokeWidth="1.5" fill="none" />

                  {/* Utility Pole */}
                  <g transform="translate(40, 200)">
                    <line x1="20" y1="200" x2="20" y2="30" stroke="#64748B" strokeWidth="4" />
                    <line x1="0" y1="45" x2="40" y2="45" stroke="#475569" strokeWidth="3" />
                    <circle cx="5" cy="45" r="3" fill="#334155" />
                    <circle cx="35" cy="45" r="3" fill="#334155" />
                  </g>

                  {/* Family Home */}
                  <g transform="translate(160, 240)">
                    {/* Main Building Frame */}
                    <rect x="20" y="80" width="180" height="130" fill="#E2E8F0" rx="4" />
                    
                    {/* Second level left side */}
                    <rect x="20" y="10" width="100" height="70" fill="#F1F5F9" />
                    
                    {/* Modern slanted roofs */}
                    <polygon points="10,10 130,10 120,0 20,0" fill="#0056A6" />
                    <polygon points="110,80 210,80 200,70 120,70" fill="#003c74" />

                    {/* Solar Panels on Roof */}
                    <polygon points="35,35 95,35 85,20 45,20" fill="#1E293B" stroke="#00A99D" strokeWidth="1" />
                    <line x1="52" y1="20" x2="52" y2="35" stroke="#00A99D" strokeWidth="0.5" />
                    <line x1="68" y1="20" x2="68" y2="35" stroke="#00A99D" strokeWidth="0.5" />
                    <line x1="38" y1="28" x2="92" y2="28" stroke="#00A99D" strokeWidth="0.5" />

                    {/* Front Door */}
                    <rect x="135" y="140" width="35" height="70" fill="#0056A6" rx="2" />
                    <circle cx="143" cy="175" r="2.5" fill="#F4B400" />

                    {/* Windows */}
                    {/* Light coming from window representing reliability */}
                    <rect x="45" y="105" width="45" height="35" fill="#F4B400" rx="3" />
                    <line x1="67.5" y1="105" x2="67.5" y2="140" stroke="#E2E8F0" strokeWidth="1.5" />
                    <line x1="45" y1="122.5" x2="90" y2="122.5" stroke="#E2E8F0" strokeWidth="1.5" />

                    <rect x="45" y="30" width="35" height="30" fill="#FFFFFF" rx="2" stroke="#475569" strokeWidth="1.5" />
                    <line x1="62.5" y1="30" x2="62.5" y2="60" stroke="#475569" strokeWidth="1" />

                    <rect x="140" y="105" width="40" height="25" fill="#FFFFFF" rx="2" stroke="#475569" strokeWidth="1.5" />

                    {/* Outdoor Electricity Meter on wall */}
                    <rect x="15" y="125" width="12" height="18" fill="#334155" rx="1" />
                    <rect x="17" y="128" width="8" height="6" fill="#00A99D" opacity="0.9" />
                    <circle cx="21" cy="139" r="1.5" fill="#F4B400" />
                    
                    {/* Connecting cable to pole */}
                    <path d="M15 128 C -30 120 -80 180 -100 20" stroke="#475569" strokeWidth="1" fill="none" />
                  </g>

                  {/* Green Energy Grass & Trees */}
                  <g transform="translate(110, 410)">
                    <rect x="0" y="0" width="420" height="40" fill="#00A99D" opacity="0.1" rx="10" />
                    <rect x="-100" y="30" width="700" height="30" fill="#F7F9FC" />
                    
                    {/* Modern Deciduous Trees */}
                    <circle cx="10" cy="-20" r="25" fill="#00A99D" opacity="0.8" />
                    <line x1="10" y1="10" x2="10" y2="-20" stroke="#475569" strokeWidth="3" />
                    
                    <circle cx="340" cy="-10" r="18" fill="#00A99D" opacity="0.8" />
                    <line x1="340" y1="20" x2="340" y2="-10" stroke="#475569" strokeWidth="2.5" />
                  </g>

                  {/* Mobile Bill Payment / Phone Screen Element */}
                  <g transform="translate(340, 200)">
                    {/* Smartphone Body */}
                    <rect x="0" y="0" width="95" height="165" fill="#1E293B" rx="12" stroke="#64748B" strokeWidth="3" />
                    {/* Speaker */}
                    <line x1="38" y1="8" x2="57" y2="8" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                    {/* Screen */}
                    <rect x="5" y="16" width="85" height="132" fill="#FFFFFF" rx="6" />
                    
                    {/* App Header */}
                    <rect x="5" y="16" width="85" height="24" fill="#0056A6" rx="4" />
                    <text x="47" y="31" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">APEX PAY</text>
                    
                    {/* Checkmark Circle (Success) */}
                    <circle cx="47" cy="72" r="18" fill="#00A99D" />
                    {/* Checkmark */}
                    <path d="M39 72 L44 77 L55 66" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Receipt Details lines */}
                    <rect x="15" y="105" width="65" height="5" fill="#E2E8F0" rx="2" />
                    <rect x="15" y="115" width="50" height="5" fill="#E2E8F0" rx="2" />
                    <rect x="15" y="125" width="55" height="5" fill="#00A99D" opacity="0.2" rx="2" />
                    
                    {/* Home button */}
                    <circle cx="47.5" cy="155" r="4" fill="#64748B" />
                  </g>

                  {/* Engineer Avatar */}
                  <g transform="translate(80, 310)">
                    {/* Hardhat */}
                    <path d="M15 50 C 15 30, 45 30, 45 50 Z" fill="#F4B400" />
                    <rect x="12" y="47" width="36" height="5" fill="#F4B400" rx="1.5" />
                    <rect x="27" y="32" width="6" height="16" fill="#F4B400" />
                    
                    {/* Face */}
                    <rect x="18" y="52" width="24" height="20" fill="#FED7AA" rx="4" />
                    <circle cx="25" cy="60" r="1.5" fill="#1E293B" />
                    <circle cx="35" cy="60" r="1.5" fill="#1E293B" />
                    <path d="M26 66 Q 30 69 34 66" stroke="#1E293B" strokeWidth="1" fill="none" />
                    
                    {/* Body/Jacket */}
                    <path d="M5 85 L10 72 L50 72 L55 85 Z" fill="#0056A6" />
                    {/* Safety Vest */}
                    <path d="M18 72 L23 85 L37 85 L42 72 Z" fill="#F4B400" />
                    {/* Silver reflective strips */}
                    <line x1="22" y1="75" x2="25" y2="85" stroke="#E2E8F0" strokeWidth="2.5" />
                    <line x1="38" y1="75" x2="35" y2="85" stroke="#E2E8F0" strokeWidth="2.5" />

                    {/* Clipboard / Tablet */}
                    <rect x="42" y="58" width="18" height="24" fill="#334155" rx="2" />
                    <rect x="44" y="60" width="14" height="20" fill="#00A99D" opacity="0.8" />
                    <line x1="47" y1="64" x2="55" y2="64" stroke="#FFFFFF" strokeWidth="1.5" />
                    <line x1="47" y1="70" x2="52" y2="70" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                </svg>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
