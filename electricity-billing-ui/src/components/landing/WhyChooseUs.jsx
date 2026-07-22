import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Reliable Electricity Supply",
      desc: "Operating automated distribution networks with advanced grid monitoring to ensure uninterrupted power delivery and 99.98% operational uptime across millions of households.",
      svg: (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 120 }}>
          {/* Grassy ground */}
          <path d="M10 140 H190" stroke="#E2E8F0" strokeWidth="2" />
          <path d="M10 140 Q 60 135 110 140 T 190 140" stroke="#00A99D" strokeWidth="1.5" opacity="0.4" />
          {/* Transmission Tower */}
          <path d="M70 140 L90 40 H110 L130 140" stroke="#0056A6" strokeWidth="2.5" fill="none" />
          <line x1="80" y1="90" x2="120" y2="90" stroke="#0056A6" strokeWidth="2" />
          <line x1="85" y1="65" x2="115" y2="65" stroke="#0056A6" strokeWidth="2" />
          <line x1="90" y1="40" x2="110" y2="40" stroke="#0056A6" strokeWidth="2" />
          <line x1="70" y1="140" x2="110" y2="90" stroke="#64748B" strokeWidth="1.2" />
          <line x1="130" y1="140" x2="90" y2="90" stroke="#64748B" strokeWidth="1.2" />
          {/* Crossarms */}
          <line x1="60" y1="65" x2="140" y2="65" stroke="#0056A6" strokeWidth="2" />
          {/* Glowing Bulb / Energy symbol */}
          <circle cx="100" cy="20" r="10" fill="#F4B400" opacity="0.2" />
          <circle cx="100" cy="20" r="5" fill="#F4B400" />
          {/* Power Waves */}
          <path d="M115 15 Q 120 10 125 15" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M85 15 Q 80 10 75 15" stroke="#F4B400" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Secure Online Payments",
      desc: "Fully encrypted payment gateway integrated with national banking channels. Safely settle utility bills using UPI, credit cards, or net banking with instant generation of digital receipts.",
      svg: (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 120 }}>
          {/* Card Shape */}
          <rect x="30" y="30" width="120" height="80" rx="8" fill="#F8FAFC" stroke="#0056A6" strokeWidth="2" />
          <rect x="30" y="45" width="120" height="15" fill="#0056A6" />
          <rect x="42" y="75" width="25" height="15" fill="#E2E8F0" rx="2" />
          <circle cx="130" cy="85" r="8" fill="#00A99D" opacity="0.3" />
          <circle cx="138" cy="85" r="8" fill="#F4B400" opacity="0.3" />
          
          {/* Shield / Lock Overlay */}
          <g transform="translate(110, 75)">
            <rect x="0" y="0" width="45" height="45" rx="22.5" fill="#FFFFFF" />
            <circle cx="22.5" cy="22.5" r="20" fill="#00A99D" />
            {/* Lock Shape inside Shield */}
            <rect x="15" y="21" width="15" height="12" rx="2" fill="#FFFFFF" />
            <path d="M18 21 V 17 C 18 14.5, 27 14.5, 27 17 V 21" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      title: "Digital Consumer Services",
      desc: "A unified self-service portal to submit meter readings, track energy trends, request load enhancements, register service issues, and monitor transaction ledgers at your convenience.",
      svg: (
        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 120 }}>
          {/* Laptop Screen */}
          <rect x="25" y="20" width="120" height="80" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
          <rect x="30" y="25" width="110" height="70" fill="#FFFFFF" />
          {/* Laptop Keyboard Base */}
          <polygon points="15,100 155,100 165,112 5,112" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          
          {/* Dashboard Elements Inside Laptop Screen */}
          <rect x="36" y="32" width="40" height="24" fill="#0056A6" opacity="0.1" rx="2" />
          <rect x="40" y="38" width="32" height="4" fill="#0056A6" rx="1" />
          <rect x="40" y="46" width="20" height="4" fill="#00A99D" rx="1" />
          
          <rect x="84" y="32" width="50" height="54" fill="#F7F9FC" rx="2" />
          <circle cx="109" cy="46" r="8" fill="#F4B400" opacity="0.2" />
          <line x1="90" y1="65" x2="128" y2="65" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="90" y1="73" x2="115" y2="73" stroke="#CBD5E1" strokeWidth="2" />

          {/* Smartphone Overlay */}
          <g transform="translate(130, 50)">
            <rect x="0" y="0" width="35" height="65" rx="6" fill="#0056A6" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="3" y="6" width="29" height="48" fill="#FFFFFF" rx="2" />
            <circle cx="17.5" cy="58" r="2.5" fill="#FFFFFF" />
            
            {/* Small chart on phone */}
            <path d="M7 45 L15 35 L22 40 L28 28" stroke="#00A99D" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <Box
      id="why-us"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#FFFFFF",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Title */}
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 10 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#00A99D",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Reliable Utilities Built For Communities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "600px",
            }}
          >
            Serving millions of consumers with modern smart grid infrastructure, secure transaction processing, and accessible digital portal systems.
          </Typography>
        </Stack>

        {/* Three Columns Grid */}
        <Grid container spacing={5}>
          {reasons.map((reason, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Stack spacing={3} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 240,
                      display: "flex",
                      justifyContent: "center",
                      mb: 1.5,
                    }}
                  >
                    {reason.svg}
                  </Box>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: "#1E293B",
                      fontSize: "1.35rem",
                    }}
                  >
                    {reason.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#475569",
                      lineHeight: 1.6,
                      fontSize: "0.95rem",
                      px: { xs: 1, md: 2 },
                    }}
                  >
                    {reason.desc}
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChooseUs;
