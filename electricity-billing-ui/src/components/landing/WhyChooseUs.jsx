import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <Box
      id="why-us"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
        borderBottom: "1px solid #C9C3B7",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left Side: Editorial introduction + Grid Route Diagram */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3.5}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#F05A28", // Safety orange accent
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    display: "block",
                    mb: 1.5,
                  }}
                >
                  SYSTEM OPERATIONS
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.85rem", md: "2.3rem" },
                    lineHeight: 1.15,
                    mb: 2.5,
                  }}
                >
                  Built for dependable everyday service
                </Typography>
                <Typography variant="body1" sx={{ color: "#625F58", maxWidth: "600px", lineHeight: 1.6 }}>
                  Our network operations monitor electrical grid loads, automated sub-station routing, and consumer service access coordinates. We maintain operational standards ensuring stable electricity delivery and secure account settlements.
                </Typography>
              </Box>

              {/* Technical Schematic SVG Diagram */}
              <Box
                sx={{
                  border: "1px solid #C9C3B7",
                  bgcolor: "#FFFDF8",
                  p: 3,
                  width: "100%",
                  maxWidth: 620,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                <Typography variant="caption" sx={{ fontFamily: "monospace", color: "#625F58", fontSize: "0.72rem" }}>
                  GRID DISTRIBUTION ROUTE SCHEMATIC (SCH-R10)
                </Typography>

                <svg
                  viewBox="0 0 400 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "100%", height: "auto" }}
                >
                  {/* Grid Lines / Bus bars */}
                  <line x1="20" y1="60" x2="380" y2="60" stroke="#C9C3B7" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Plant node */}
                  <rect x="20" y="40" width="40" height="40" stroke="#171717" strokeWidth="1.5" fill="#FFFDF8" />
                  <text x="40" y="64" fill="#171717" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">GEN</text>
                  
                  {/* Connection lines */}
                  <line x1="60" y1="60" x2="130" y2="60" stroke="#171717" strokeWidth="1.5" />
                  
                  {/* Substation transformer symbol */}
                  <circle cx="145" cy="60" r="15" stroke="#171717" strokeWidth="1.5" fill="none" />
                  <circle cx="165" cy="60" r="15" stroke="#075BB5" strokeWidth="1.5" fill="none" />
                  <text x="155" y="100" fill="#625F58" fontSize="7" fontFamily="monospace" textAnchor="middle">132KV / 11KV SUB</text>

                  <line x1="180" y1="60" x2="260" y2="60" stroke="#171717" strokeWidth="1.5" />
                  
                  {/* Circuit breaker node */}
                  <rect x="260" y="48" width="24" height="24" stroke="#171717" strokeWidth="1.5" fill="#FFFDF8" />
                  <line x1="264" y1="53" x2="280" y2="67" stroke="#C5382F" strokeWidth="2" />
                  <text x="272" y="85" fill="#625F58" fontSize="7" fontFamily="monospace" textAnchor="middle">CB-04</text>

                  <line x1="284" y1="60" x2="340" y2="60" stroke="#171717" strokeWidth="1.5" />

                  {/* Consumer load node */}
                  <rect x="340" y="40" width="40" height="40" stroke="#171717" strokeWidth="1.5" fill="#FFFDF8" />
                  <text x="360" y="64" fill="#171717" fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">LOAD</text>

                  {/* Measurement annotations */}
                  <path d="M 95 60 L 95 40 L 110 40" stroke="#075BB5" strokeWidth="1" />
                  <text x="115" y="43" fill="#075BB5" fontSize="6.5" fontWeight="bold" fontFamily="monospace">PT-01</text>
                </svg>

                <Stack direction="row" justifyContent="space-between" sx={{ borderTop: "1px dashed #C9C3B7", pt: 1 }}>
                  <Typography variant="caption" sx={{ fontSize: "0.68rem", color: "#625F58", fontFamily: "monospace" }}>
                    BUS VOLTAGE: 11.02 KV
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: "0.68rem", color: "#087A5A", fontFamily: "monospace", fontWeight: 700 }}>
                    SYS PHASE: IN-SYNC
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Right Side: Plain typographic facts */}
          <Grid item xs={12} md={5} sx={{ pt: { xs: 4, md: "64px !important" } }}>
            <Stack spacing={5.5}>
              {/* Stat 1 */}
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: "3.2rem",
                    color: "#087A5A", // Operational green for normal uptime
                    fontFamily: "monospace",
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  99.98%
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.8, color: "#171717" }}>
                  Operational Grid Uptime
                </Typography>
                <Typography variant="body2" sx={{ color: "#625F58", lineHeight: 1.5 }}>
                  Grid uptime and distribution stability are monitored 24x7 by command centers to ensure uninterrupted power delivery to residential, commercial, and industrial consumers.
                </Typography>
              </Box>

              <Box sx={{ borderBottom: "1px solid #C9C3B7", width: "100%" }} />

              {/* Stat 2 */}
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: "3.2rem",
                    color: "#075BB5", // Utility blue for security transactions
                    fontFamily: "monospace",
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  SECURE
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.8, color: "#171717" }}>
                  Verified Digital Settlements
                </Typography>
                <Typography variant="body2" sx={{ color: "#625F58", lineHeight: 1.5 }}>
                  Bill payment transactions are settled securely through authorized national banking channels, instant payment networks, and digital UPI service gateways.
                </Typography>
              </Box>

              <Box sx={{ borderBottom: "1px solid #C9C3B7", width: "100%" }} />

              {/* Stat 3 */}
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: "3.2rem",
                    color: "#171717",
                    fontFamily: "monospace",
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  4.8M+
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.1rem", mb: 0.8, color: "#171717" }}>
                  Registered Service Endpoints
                </Typography>
                <Typography variant="body2" sx={{ color: "#625F58", lineHeight: 1.5 }}>
                  Providing active grid distribution services to residential, commercial, and manufacturing sectors with itemized tariff transparency.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
