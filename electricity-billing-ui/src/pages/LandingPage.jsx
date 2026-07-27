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
import audioService from "../services/audioService";

const LandingPage = () => {
  useEffect(() => {
    const cleanup = audioService.playWelcome();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const stats = [
    {
      label: "Consumers Served",
      value: "4.8 Million+",
      desc: "Providing active grid connections to domestic, industrial, and commercial sectors.",
      icon: <Users size={28} color="#38BDF8" />,
    },
    {
      label: "Bills Generated",
      value: "55M Annually",
      desc: "Reliable automated monthly invoice processing with zero billing discrepancies.",
      icon: <FileText size={28} color="#34D399" />,
    },
    {
      label: "Payments Processed",
      value: "₹12,450 Cr",
      desc: "Secure online transaction settlement processed through state banking gateways.",
      icon: <CheckCircle size={28} color="#FB7185" />,
    },
    {
      label: "Service Availability",
      value: "99.98%",
      desc: "Grid uptime and continuous power distribution monitored 24x7 by command centers.",
      icon: <ShieldCheck size={28} color="#A78BFA" />,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "transparent", color: "#F8FAFC", overflowX: "hidden", position: "relative" }}>
      <BackgroundEffects />
      
      <SystemTicker />

      <Navbar />

      <Hero />

      <QuickServices />

      <WhyChooseUs />

      <ConsumerPreview />

      <Highlights />

      <HowItWorks />

      <Box
        id="statistics"
        sx={{
          py: 12,
          position: "relative",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <Container maxWidth="xl">
          <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#06B6D4",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Performance
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Genuine Utility Statistics
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#94A3B8",
                maxWidth: "600px",
              }}
            >
              Transparent operational data showing our service delivery scale and network stability across the region.
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: "18px",
                      bgcolor: "rgba(15, 23, 42, 0.35)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderTop: `3px solid ${index % 2 === 0 ? "#38BDF8" : "#34D399"}`,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 30px ${index % 2 === 0 ? "rgba(56, 189, 248, 0.15)" : "rgba(52, 211, 153, 0.15)"}`,
                        borderColor: index % 2 === 0 ? "#38BDF8" : "#34D399",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 54,
                        height: 54,
                        borderRadius: "12px",
                        bgcolor: index % 2 === 0 ? "rgba(56, 189, 248, 0.08)" : "rgba(52, 211, 153, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: "2rem", md: "2.35rem" },
                        color: "#FFFFFF",
                        letterSpacing: "-0.02em",
                        mb: 1.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#E2E8F0",
                        mb: 1.5,
                        fontSize: "1.05rem",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#94A3B8",
                        lineHeight: 1.5,
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
