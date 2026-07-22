import React from "react";
import { Box, Container, Grid, Typography, Stack, Divider } from "@mui/material";
import { Users, FileText, CheckCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// Import landing components
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

const LandingPage = () => {
  // Static Genuine Utility Statistics data
  const stats = [
    {
      label: "Consumers Served",
      value: "4.8 Million+",
      desc: "Providing active grid connections to domestic, industrial, and commercial sectors.",
      icon: <Users size={28} color="#0056A6" />,
    },
    {
      label: "Bills Generated",
      value: "55M Annually",
      desc: "Reliable automated monthly invoice processing with zero billing discrepancies.",
      icon: <FileText size={28} color="#00A99D" />,
    },
    {
      label: "Payments Processed",
      value: "₹12,450 Cr",
      desc: "Secure online transaction settlement processed through state banking gateways.",
      icon: <CheckCircle size={28} color="#F4B400" />,
    },
    {
      label: "Service Availability",
      value: "99.98%",
      desc: "Grid uptime and continuous power distribution monitored 24x7 by command centers.",
      icon: <ShieldCheck size={28} color="#0056A6" />,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FFFFFF", color: "#1E293B", overflowX: "hidden" }}>
      {/* 1. Header Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Quick Services Section */}
      <QuickServices />

      {/* 4. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 5. Consumer Dashboard Preview Section */}
      <ConsumerPreview />

      {/* 6. Service Highlights Section */}
      <Highlights />

      {/* 7. How It Works Section */}
      <HowItWorks />

      {/* 8. Genuine Utility Statistics Section */}
      <Box
        id="statistics"
        sx={{
          py: 12,
          bgcolor: "#FFFFFF",
          borderY: "1px solid #E2E8F0",
        }}
      >
        <Container maxWidth="xl">
          {/* Section Header */}
          <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: "#00A99D",
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
                color: "#0056A6",
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Genuine Utility Statistics
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#475569",
                maxWidth: "600px",
              }}
            >
              Transparent operational data showing our service delivery scale and network stability across the region.
            </Typography>
          </Stack>

          {/* Stats Grid */}
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
                      borderRadius: "16px",
                      bgcolor: "#F7F9FC",
                      border: "1px solid #E2E8F0",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0, 86, 166, 0.04)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 54,
                        height: 54,
                        borderRadius: "12px",
                        bgcolor: "rgba(0, 86, 166, 0.04)",
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
                        color: "#0056A6",
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
                        color: "#1E293B",
                        mb: 1.5,
                        fontSize: "1.05rem",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
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

      {/* 9. Announcements Section */}
      <Announcements />

      {/* 10. FAQ Section */}
      <FAQ />

      {/* 11. Corporate Footer */}
      <Footer />
    </Box>
  );
};

export default LandingPage;
