import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { Users, FileText, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import QuickServices from "../components/landing/QuickServices";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import ConsumerPreview from "../components/landing/ConsumerPreview";
import Highlights from "../components/landing/Highlights";
import HowItWorks from "../components/landing/HowItWorks";
import Announcements from "../components/landing/Announcements";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";
import SystemTicker from "../components/landing/SystemTicker";
import BackgroundEffects from "../components/landing/BackgroundEffects";

const LandingPage = () => {

  const stats = [
    {
      label: "Consumers Served",
      value: "4.8 Million+",
      desc: "Providing active grid connections to domestic, industrial, and commercial sectors.",
      icon: <Users size={24} color="#075BB5" />,
    },
    {
      label: "Bills Generated",
      value: "55M Annually",
      desc: "Reliable automated monthly invoice processing with zero billing discrepancies.",
      icon: <FileText size={24} color="#075BB5" />,
    },
    {
      label: "Payments Processed",
      value: "₹12,450 Cr",
      desc: "Secure online transaction settlement processed through state banking gateways.",
      icon: <CheckCircle size={24} color="#075BB5" />,
    },
    {
      label: "Service Availability",
      value: "99.98%",
      desc: "Grid uptime and continuous power distribution monitored 24x7 by command centers.",
      icon: <ShieldCheck size={24} color="#075BB5" />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F0E8", // Warm paper background
        color: "#171717", // Ink black text
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <BackgroundEffects />
      
      <SystemTicker />

      <Navbar />

      <Hero />

      <QuickServices />

      <WhyChooseUs />

      <ConsumerPreview />

      <Highlights />

      <HowItWorks />

      {/* ==================================================
          STATISTICS SECTION
          ================================================== */}
      <Box
        id="statistics"
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "#E9E5DB", // soft panel bg
          borderBottom: "1px solid #C9C3B7",
        }}
      >
        <Container maxWidth="xl">
          <Stack alignItems="center" textAlign="center" spacing={1.5} sx={{ mb: 8 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#075BB5",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              PERFORMANCE & AUDIT
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.85rem", md: "2.3rem" },
                color: "#171717",
              }}
            >
              Genuine Utility Statistics
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#625F58",
                maxWidth: "600px",
                fontSize: "0.9rem",
              }}
            >
              Transparent operational data showing our service delivery scale and network stability across the region.
            </Typography>
          </Stack>

          <Grid container spacing={3.5}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "2px",
                      bgcolor: "#FFFDF8",
                      border: "1px solid #C9C3B7",
                      borderTop: `3.5px solid #075BB5`, // Utility blue accent top border
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: "none",
                      transition: "all 120ms ease-in-out",
                      position: "relative",
                      "&:hover": {
                        borderColor: "#171717",
                        bgcolor: "#F3F0E8",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "2px",
                        bgcolor: "#E9E5DB",
                        border: "1px solid #C9C3B7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2.5,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "1.75rem", md: "2rem" },
                        color: "#075BB5",
                        fontFamily: "monospace",
                        letterSpacing: "-0.02em",
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#171717",
                        mb: 1,
                        fontSize: "0.95rem",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#625F58",
                        lineHeight: 1.45,
                        fontSize: "0.825rem",
                      }}
                    >
                      {stat.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Announcements />

      <FAQ />

      <Footer />
    </Box>
  );
};

export default LandingPage;
