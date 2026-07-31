import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { ArrowRight, CreditCard, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handlePayBillClick = () => {
    // Scroll to the task strip/services index
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
        bgcolor: "transparent",
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        borderBottom: "1px solid #C9C3B7",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Left Side: 7 Columns on Desktop */}
          <Box sx={{ flex: 1.2, width: "100%", textAlign: "left" }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Badge label */}
              <Typography
                variant="caption"
                sx={{
                  color: "#075BB5",
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  mb: 2,
                  borderLeft: "3px solid #075BB5",
                  pl: 1.5,
                }}
              >
                PUBLIC UTILITY PORTAL
              </Typography>

              {/* Headline */}
              <Typography
                variant="h1"
                sx={{
                  color: "#171717",
                  fontSize: { xs: "2.3rem", sm: "3.2rem", md: "3.8rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  maxWidth: "680px",
                }}
              >
                Your electricity account, in one place.
              </Typography>

              {/* Supporting Copy */}
              <Typography
                variant="body1"
                sx={{
                  color: "#625F58",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
                  lineHeight: 1.6,
                  mb: 4,
                  maxWidth: "580px",
                }}
              >
                Pay bills, review statements, submit meter readings, apply for a new connection, and download receipts through the official KNK Power consumer portal.
              </Typography>

              {/* CTAs */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  onClick={handlePayBillClick}
                  startIcon={<CreditCard size={18} />}
                  sx={{
                    bgcolor: "#075BB5",
                    color: "#FFFDF8",
                    py: 1.8,
                    px: 4,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "2px",
                    "&:hover": {
                      bgcolor: "#064B95",
                    },
                  }}
                >
                  Pay electricity bill
                </Button>

                <Button
                  variant="outlined"
                  onClick={handlePortalClick}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    borderColor: "#171717",
                    color: "#171717",
                    py: 1.8,
                    px: 4,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "2px",
                    "&:hover": {
                      borderColor: "#075BB5",
                      bgcolor: "#E9E5DB",
                    },
                  }}
                >
                  Open consumer portal
                </Button>
              </Stack>

              {/* Tertiary link */}
              <Typography
                component="a"
                onClick={() => navigate("/login", { state: { tab: 2 } })}
                sx={{
                  color: "#075BB5",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  "&:hover": {
                    color: "#064B95",
                  },
                }}
              >
                Apply for a new connection <ArrowRight size={14} />
              </Typography>
            </motion.div>
          </Box>

          {/* Right Side: 5 Columns on Desktop (Custom Bill and Meter composition) */}
          <Box
            sx={{
              flex: 0.8,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ width: "100%", maxWidth: "420px" }}
            >
              <Box
                sx={{
                  bgcolor: "#FFFDF8",
                  border: "2px solid #171717",
                  borderRadius: "2px",
                  p: 3.5,
                  position: "relative",
                  boxShadow: "none",
                }}
              >
                {/* Visual perforated stamp at top left */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -1,
                    left: 24,
                    width: 32,
                    height: 12,
                    bgcolor: "#F3F0E8",
                    borderBottom: "2px solid #171717",
                    borderLeft: "2px solid #171717",
                    borderRight: "2px solid #171717",
                  }}
                />

                {/* Technical watermark/stamp */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 24,
                    border: "1.5px dashed #087A5A",
                    color: "#087A5A",
                    fontSize: "0.68rem",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    px: 1,
                    py: 0.4,
                    transform: "rotate(-8deg)",
                    textTransform: "uppercase",
                    userSelect: "none",
                  }}
                >
                  APPROVED & VERIFIED
                </Box>

                {/* Section title */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3, mt: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ fontFamily: "monospace", fontWeight: 700, color: "#625F58", fontSize: "0.75rem" }}
                  >
                    REF: KNK-BILL-STUB
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: "#E9E5DB",
                      color: "#171717",
                      px: 1,
                      py: 0.25,
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      fontFamily: "monospace",
                    }}
                  >
                    CY-2026
                  </Typography>
                </Stack>

                {/* Stub details */}
                <Stack spacing={1.5} sx={{ mb: 4 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.75rem" }}>
                      Consumer Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.1rem" }}>
                      CON-984210
                    </Typography>
                  </Box>

                  <Box sx={{ borderBottom: "1px dashed #C9C3B7", my: 0.5 }} />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.7rem", display: "block" }}>
                        Billing Period
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        July 2026
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                      <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.7rem", display: "block" }}>
                        Due Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#C5382F" }}>
                        2026-08-05
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ borderBottom: "1px dashed #C9C3B7", my: 0.5 }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.7rem" }}>
                        Total Outstanding Dues
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#075BB5" }}>
                        ₹1,845.00
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>

                {/* Line illustration of a meter */}
                <Box
                  sx={{
                    border: "1px solid #C9C3B7",
                    bgcolor: "#E9E5DB",
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ flexShrink: 0 }}
                  >
                    {/* Meter Outer Frame */}
                    <rect x="2" y="2" width="60" height="60" rx="2" stroke="#171717" strokeWidth="2" fill="#FFFDF8" />
                    {/* Glass Dial Border */}
                    <circle cx="32" cy="24" r="16" stroke="#171717" strokeWidth="1.5" />
                    {/* Indicator Scale Ticks */}
                    <line x1="22" y1="24" x2="25" y2="24" stroke="#171717" strokeWidth="1" />
                    <line x1="42" y1="24" x2="39" y2="24" stroke="#171717" strokeWidth="1" />
                    <line x1="32" y1="14" x2="32" y2="17" stroke="#171717" strokeWidth="1" />
                    {/* Dial pointer */}
                    <line x1="32" y1="24" x2="38" y2="18" stroke="#F05A28" strokeWidth="1.5" />
                    {/* Digital display box */}
                    <rect x="12" y="44" width="40" height="12" stroke="#171717" strokeWidth="1" fill="#E9E5DB" />
                    {/* Monospace reading */}
                    <text
                      x="32"
                      y="53"
                      fill="#171717"
                      fontSize="7"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      04520.8
                    </text>
                  </svg>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#171717",
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Smart Meter
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.7rem", display: "block" }}>
                      Model: SPX-8800-M1
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#087A5A", fontSize: "0.68rem", fontWeight: 700, fontFamily: "monospace", display: "block" }}
                    >
                      ● ONLINE STATUS: SYNCED
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
