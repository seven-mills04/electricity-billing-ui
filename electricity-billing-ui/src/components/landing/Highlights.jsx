import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent } from "@mui/material";
import { Clock, Zap, CreditCard, Bell, Lock, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const Highlights = () => {
  const highlights = [
    {
      title: "24×7 Online Services",
      desc: "Apply for connections, report outages, and check connection details anytime without visiting billing offices.",
      icon: <Clock size={28} color="#0056A6" />,
    },
    {
      title: "Instant Bill Generation",
      desc: "Smart meters feed consumption data directly, generating automated electronic invoices instantly every month.",
      icon: <Zap size={28} color="#00A99D" />,
    },
    {
      title: "Digital Payment Gateway",
      desc: "Safe online payment settlements with multi-channel support (UPI, debit/credit cards, and net banking).",
      icon: <CreditCard size={28} color="#F4B400" />,
    },
    {
      title: "SMS & Email Notifications",
      desc: "Automated alerts sent directly to registered details for billing updates, payment confirmations, and notices.",
      icon: <Bell size={28} color="#0056A6" />,
    },
    {
      title: "Secure JWT Authentication",
      desc: "Ensuring top-tier security for consumer credentials and data exchanges using JSON Web Tokens (JWT).",
      icon: <Lock size={28} color="#00A99D" />,
    },
    {
      title: "Transparent Tariff Slabs",
      desc: "Clear itemized breakdown of energy charges, state electricity duty, and fixed load charges on every bill.",
      icon: <Calculator size={28} color="#F4B400" />,
    },
  ];

  return (
    <Box
      id="highlights"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#FFFFFF",
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
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Capabilities
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Service Highlights & Infrastructure
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "600px",
            }}
          >
            Engineered to deliver transparency, efficiency, and data security to power consumers.
          </Typography>
        </Stack>

        {/* Highlights Horizontal Cards Grid */}
        <Grid container spacing={3.5}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                    bgcolor: "#FFFFFF",
                    boxShadow: "0 4px 10px rgba(0, 86, 166, 0.02)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: "#0056A6",
                      boxShadow: "0 8px 20px rgba(0, 86, 166, 0.06)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                      <Box
                        sx={{
                          p: 1.8,
                          borderRadius: "12px",
                          bgcolor: "rgba(0, 86, 166, 0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {highlight.icon}
                      </Box>
                      <Stack spacing={1} sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "#1E293B",
                            fontSize: "1.1rem",
                          }}
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#475569",
                            lineHeight: 1.5,
                            fontSize: "0.85rem",
                          }}
                        >
                          {highlight.desc}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Highlights;
