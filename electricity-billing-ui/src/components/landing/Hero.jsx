import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { ArrowRight, CreditCard, Sparkles } from "lucide-react";
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
        bgcolor: "transparent",
        pt: { xs: 10, md: 16 },
        pb: { xs: 12, md: 18 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          {/* Left: Info */}
          <Box sx={{ flex: 1.1, width: "100%", maxWidth: { xs: "100%", md: "52%" } }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  bgcolor: "rgba(6, 182, 212, 0.08)",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                  borderRadius: "30px",
                  px: 2.2,
                  py: 0.8,
                  mb: 3,
                }}
              >
                <Sparkles size={14} color="#06B6D4" />
                <Typography
                  sx={{
                    color: "#06B6D4",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Official Consumer Portal
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4.2rem" },
                  lineHeight: 1.1,
                  mb: 3,
                  letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #FFFFFF 0%, #93C5FD 50%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Powering Communities with Smart Digital Services
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#94A3B8",
                  fontSize: { xs: "1.05rem", sm: "1.15rem" },
                  lineHeight: 1.65,
                  mb: 5,
                  maxWidth: "580px",
                }}
              >
                Settle billing transactions, request grid connections, analyze consumption patterns, and report field issues. Experience fully digitized utility services built on next-gen infrastructure.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handlePayBillClick}
                  startIcon={<CreditCard size={18} />}
                  sx={{
                    bgcolor: "#06B6D4",
                    color: "#020617",
                    py: 2,
                    px: 4.5,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "14px",
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.2)",
                    "&:hover": {
                      bgcolor: "#22D3EE",
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.45)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Pay Bill
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={handlePortalClick}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    borderWidth: "1.5px",
                    py: 2,
                    px: 4.5,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "14px",
                    "&:hover": {
                      borderColor: "#8B5CF6",
                      borderWidth: "1.5px",
                      bgcolor: "rgba(139, 92, 246, 0.08)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Consumer Portal
                </Button>
              </Stack>
            </motion.div>
          </Box>

          {/* Right: Premium Isometric Glow Grid & Telemetry Screen */}
          <Box sx={{ flex: 0.9, width: "100%", maxWidth: { xs: "100%", md: "45%" }, display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: 5 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
              style={{ width: "100%" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: 500,
                  aspectRatio: "1/1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Glowing Aura behind Illustration */}
                <Box
                  sx={{
                    position: "absolute",
                    width: "70%",
                    height: "70%",
                    borderRadius: "50%",
                    bgcolor: "rgba(6, 182, 212, 0.15)",
                    filter: "blur(70px)",
                    zIndex: 0,
                  }}
                />

                {/* SVG Telemetry Dashboard Graphic */}
                <svg
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "auto", zIndex: 1, filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.3))" }}
                >
                  {/* Grid Lines */}
                  <g opacity="0.3">
                    <line x1="50" y1="50" x2="450" y2="50" stroke="#1E293B" strokeWidth="1" />
                    <line x1="50" y1="150" x2="450" y2="150" stroke="#1E293B" strokeWidth="1" />
                    <line x1="50" y1="250" x2="450" y2="250" stroke="#1E293B" strokeWidth="1" />
                    <line x1="50" y1="350" x2="450" y2="350" stroke="#1E293B" strokeWidth="1" />
                    <line x1="50" y1="450" x2="450" y2="450" stroke="#1E293B" strokeWidth="1" />

                    <line x1="50" y1="50" x2="50" y2="450" stroke="#1E293B" strokeWidth="1" />
                    <line x1="150" y1="50" x2="150" y2="450" stroke="#1E293B" strokeWidth="1" />
                    <line x1="250" y1="50" x2="250" y2="450" stroke="#1E293B" strokeWidth="1" />
                    <line x1="350" y1="50" x2="350" y2="450" stroke="#1E293B" strokeWidth="1" />
                    <line x1="450" y1="50" x2="450" y2="450" stroke="#1E293B" strokeWidth="1" />
                  </g>

                  {/* Smart Grid Flow Path Lines */}
                  <path d="M 100 250 H 400" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 250 100 V 400" stroke="rgba(255,255,255,0.06)" strokeWidth="4" strokeLinecap="round" />
                  
                  {/* Neon Flow Paths */}
                  <path
                    d="M 100 250 H 250 V 400"
                    stroke="url(#neonCyanGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="40 120"
                    style={{ animation: "dashFlow 8s infinite linear" }}
                  />
                  <path
                    d="M 400 250 H 250 V 100"
                    stroke="url(#neonPurpleGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="40 120"
                    style={{ animation: "dashFlowReverse 8s infinite linear" }}
                  />

                  {/* Core Nodes */}
                  {/* Node 1: Left (Commercial Grid) */}
                  <g transform="translate(100, 250)">
                    <circle r="22" fill="#020617" stroke="#1E293B" strokeWidth="2" />
                    <circle r="15" fill="rgba(6, 182, 212, 0.1)" stroke="#06B6D4" strokeWidth="2" />
                    <circle r="5" fill="#06B6D4" />
                    <circle r="15" fill="none" stroke="#06B6D4" strokeWidth="1.5">
                      <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Node 2: Center (Substation Hub) */}
                  <g transform="translate(250, 250)">
                    <circle r="28" fill="#020617" stroke="#1E293B" strokeWidth="2" />
                    <circle r="20" fill="rgba(244, 180, 0, 0.08)" stroke="#F4B400" strokeWidth="2" />
                    <circle r="8" fill="#F4B400" />
                    <polygon points="0,-12 10,6 -10,6" fill="#F4B400" transform="scale(0.65)" />
                  </g>

                  {/* Node 3: Right (Smart Community) */}
                  <g transform="translate(400, 250)">
                    <circle r="22" fill="#020617" stroke="#1E293B" strokeWidth="2" />
                    <circle r="15" fill="rgba(139, 92, 246, 0.1)" stroke="#8B5CF6" strokeWidth="2" />
                    <circle r="5" fill="#8B5CF6" />
                    <circle r="15" fill="none" stroke="#8B5CF6" strokeWidth="1.5">
                      <animate attributeName="r" values="8;24;8" dur="4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="4s" repeatCount="indefinite" />
                    </circle>
                  </g>

                  {/* Node 4: Top (Renewable Energy Solar/Wind Input) */}
                  <g transform="translate(250, 100)">
                    <circle r="20" fill="#020617" stroke="#1E293B" strokeWidth="2" />
                    <circle r="13" fill="rgba(52, 211, 153, 0.1)" stroke="#34D399" strokeWidth="2" />
                    <circle r="4" fill="#34D399" />
                  </g>

                  {/* Node 5: Bottom (Industrial Feeder) */}
                  <g transform="translate(250, 400)">
                    <circle r="20" fill="#020617" stroke="#1E293B" strokeWidth="2" />
                    <circle r="13" fill="rgba(244, 63, 94, 0.1)" stroke="#F43F5E" strokeWidth="2" />
                    <circle r="4" fill="#F43F5E" />
                  </g>

                  {/* Floating Analytics Card Layer */}
                  <g transform="translate(60, 60)" style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))" }}>
                    {/* Glass Frame */}
                    <rect width="160" height="90" rx="12" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                    
                    {/* Header */}
                    <circle cx="20" cy="20" r="4" fill="#EF4444" />
                    <circle cx="32" cy="20" r="4" fill="#F59E0B" />
                    <circle cx="44" cy="20" r="4" fill="#10B981" />
                    <text x="145" y="23" fill="#64748B" fontSize="8" fontWeight="700" textAnchor="end" fontFamily="sans-serif">TELEMETRY</text>

                    {/* Chart / Indicators */}
                    <rect x="15" y="40" width="130" height="36" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
                    
                    {/* Sine Waves for telemetry */}
                    <path d="M 20 58 Q 30 45 40 58 T 60 58 T 80 58 T 100 58 T 120 58 T 140 58" fill="none" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1.5" />
                    <path d="M 20 58 Q 30 38 40 58 T 60 58 T 80 44 T 100 58 T 120 52 T 140 58" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />

                    {/* Pulse Dot */}
                    <circle cx="80" cy="44" r="3" fill="#FFFFFF" />
                    <circle cx="80" cy="44" r="5" fill="none" stroke="#FFFFFF" strokeWidth="1" />
                  </g>

                  {/* Floating Bill Ledger Card Layer */}
                  <g transform="translate(280, 310)" style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))" }}>
                    {/* Glass Frame */}
                    <rect width="160" height="110" rx="12" fill="rgba(15, 23, 42, 0.65)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                    
                    <text x="15" y="25" fill="#E2E8F0" fontSize="10" fontWeight="800" fontFamily="sans-serif">Quick Settlement</text>
                    
                    {/* Bill Item */}
                    <rect x="15" y="40" width="130" height="28" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.04)" />
                    <text x="25" y="57" fill="#94A3B8" fontSize="8" fontWeight="600" fontFamily="sans-serif">Ref: #KNP-2026</text>
                    <text x="135" y="57" fill="#34D399" fontSize="8" fontWeight="800" textAnchor="end" fontFamily="sans-serif">₹2,480.00</text>

                    {/* Button */}
                    <rect x="15" y="76" width="130" height="20" rx="6" fill="#8B5CF6" />
                    <text x="80" y="89" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">AUTHORIZE INSTANTLY</text>
                  </g>

                  {/* Definitions */}
                  <defs>
                    <linearGradient id="neonCyanGrad" x1="100" y1="250" x2="250" y2="400" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="1" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="neonPurpleGrad" x1="400" y1="250" x2="250" y2="100" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Embedded styles for dashboard svg animations */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes dashFlow {
                      0% { stroke-dashoffset: 320; }
                      100% { stroke-dashoffset: 0; }
                    }
                    @keyframes dashFlowReverse {
                      0% { stroke-dashoffset: -320; }
                      100% { stroke-dashoffset: 0; }
                    }
                  `
                }} />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
