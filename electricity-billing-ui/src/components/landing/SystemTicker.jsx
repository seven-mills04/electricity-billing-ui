import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Activity, Phone, Sun, ShieldAlert, Cpu } from "lucide-react";

const SystemTicker = () => {
  const [demand, setDemand] = useState(4824);
  const [frequency, setFrequency] = useState(50.02);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemand((prev) => prev + Math.floor(Math.random() * 9) - 4);
      setFrequency((prev) => {
        const val = prev + (Math.random() * 0.04 - 0.02);
        return parseFloat(val.toFixed(2));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#171717", // Dark ink background
        color: "#FFFDF8", // Warm paper near-white text
        py: 0.8,
        borderBottom: "1px solid #C9C3B7",
        zIndex: 1100,
        position: "relative",
        overflowX: "auto", // Allow horizontal scrolling on small devices
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbars
        },
        scrollbarWidth: "none",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
          sx={{
            minWidth: { xs: "720px", md: "auto" }, // Prevent shrinking on mobile, allow scrolling
            fontSize: "0.75rem",
          }}
        >
          {/* Left Grid Status details */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#087A5A", // Operational green
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "#087A5A",
                  fontWeight: 800,
                  fontFamily: "monospace",
                  letterSpacing: "0.05em",
                }}
              >
                GRID STATUS: NORMAL
              </Typography>
            </Stack>

            <Box sx={{ width: "1px", height: "12px", bgcolor: "#C9C3B7", opacity: 0.3 }} />

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Activity size={12} style={{ color: "#075BB5" }} />
              <Typography variant="caption" sx={{ color: "#FFFDF8", fontFamily: "monospace" }}>
                FREQ: <span style={{ color: "#FFFDF8", fontWeight: 700 }}>{frequency} HZ</span>
              </Typography>
            </Stack>

            <Box sx={{ width: "1px", height: "12px", bgcolor: "#C9C3B7", opacity: 0.3 }} />

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Cpu size={12} style={{ color: "#F05A28" }} />
              <Typography variant="caption" sx={{ color: "#FFFDF8", fontFamily: "monospace" }}>
                LOAD: <span style={{ color: "#FFFDF8", fontWeight: 700 }}>{demand.toLocaleString()} MW</span>
              </Typography>
            </Stack>

            <Box sx={{ width: "1px", height: "12px", bgcolor: "#C9C3B7", opacity: 0.3 }} />

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Sun size={12} style={{ color: "#087A5A" }} />
              <Typography variant="caption" sx={{ color: "#FFFDF8", fontFamily: "monospace" }}>
                RENEWABLES: <span style={{ color: "#087A5A", fontWeight: 700 }}>34.8%</span>
              </Typography>
            </Stack>
          </Stack>

          {/* Right Safety details */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <ShieldAlert size={12} style={{ color: "#C5382F" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "#FFFDF8",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                Report power line faults immediately.
              </Typography>
            </Stack>

            <Box sx={{ width: "1px", height: "12px", bgcolor: "#C9C3B7", opacity: 0.3 }} />

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              component="a"
              href="tel:19122"
              style={{ textDecoration: "none" }}
            >
              <Phone size={12} style={{ color: "#075BB5" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "#FFFDF8",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  letterSpacing: "0.02em",
                  borderBottom: "1px solid #075BB5",
                }}
              >
                HELPLINE: 19122
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SystemTicker;
