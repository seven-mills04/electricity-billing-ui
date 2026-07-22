import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, Chip } from "@mui/material";
import { Activity, Phone, Sun, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const SystemTicker = () => {
  const [demand, setDemand] = useState(4824);
  const [frequency, setFrequency] = useState(50.02);

  // Simulate real-time grid fluctuations
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
        bgcolor: "#001E3D",
        color: "#E2E8F0",
        py: 1,
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        fontSize: "0.75rem",
        fontWeight: 500,
        position: "relative",
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1.5}
        >
          {/* Left: Real-time grid parameters */}
          <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap" justifyContent="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.4 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.4 },
                  },
                }}
              />
              <Typography variant="caption" sx={{ color: "#10B981", fontWeight: 700, letterSpacing: "0.05em" }}>
                LIVE GRID STATUS: STABLE
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Activity size={14} style={{ color: "#00A99D" }} />
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                Grid Frequency:{" "}
                <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                  {frequency} Hz
                </span>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Cpu size={14} style={{ color: "#F4B400" }} />
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                System Demand:{" "}
                <span style={{ color: "#FFFFFF", fontWeight: 700 }}>
                  {demand.toLocaleString()} MW
                </span>
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.8} alignItems="center">
              <Sun size={14} style={{ color: "#00A99D" }} />
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                Solar/Wind Mix:{" "}
                <span style={{ color: "#00A99D", fontWeight: 700 }}>34.8%</span>
              </Typography>
            </Stack>
          </Stack>

          {/* Right: Helpline & Core Bulletins */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Stack direction="row" spacing={0.8} alignItems="center">
              <ShieldAlert size={14} style={{ color: "#EF4444" }} />
              <Typography variant="caption" sx={{ color: "#F8FAFC", fontWeight: 600 }}>
                Safety First: Report power line faults immediately.
              </Typography>
            </Stack>

            <Chip
              icon={<Phone size={10} style={{ color: "#FFFFFF" }} />}
              label="Emergency Helpline: 19122"
              size="small"
              sx={{
                bgcolor: "#0056A6",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.68rem",
                height: 20,
                "& .MuiChip-icon": { color: "#FFFFFF" },
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SystemTicker;
