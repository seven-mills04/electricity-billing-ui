import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent } from "@mui/material";
import { Clock, Zap, CreditCard, Bell, Lock, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const Highlights = () => {
  const highlights = [
    {
      title: "24×7 Online Services",
      desc: "Apply for connections, report outages, and check connection details anytime without visiting billing offices.",
      icon: <Clock size={24} color="#06B6D4" />,
      bg: "rgba(6, 182, 212, 0.1)",
    },
    {
      title: "Instant Bill Generation",
      desc: "Smart meters feed consumption data directly, generating automated electronic invoices instantly every month.",
      icon: <Zap size={24} color="#34D399" />,
      bg: "rgba(52, 211, 153, 0.1)",
    },
    {
      title: "Digital Payment Gateway",
      desc: "Safe online payment settlements with multi-channel support (UPI, debit/credit cards, and net banking).",
      icon: <CreditCard size={24} color="#F59E0B" />,
      bg: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "SMS & Email Notifications",
      desc: "Automated alerts sent directly to registered details for billing updates, payment confirmations, and notices.",
      icon: <Bell size={24} color="#A78BFA" />,
      bg: "rgba(167, 139, 250, 0.1)",
    },
    {
      title: "Secure JWT Authentication",
      desc: "Ensuring top-tier security for consumer credentials and data exchanges using JSON Web Tokens (JWT).",
      icon: <Lock size={24} color="#60A5FA" />,
      bg: "rgba(96, 165, 250, 0.1)",
    },
    {
      title: "Transparent Tariff Slabs",
      desc: "Clear itemized breakdown of energy charges, state electricity duty, and fixed load charges on every bill.",
      icon: <Calculator size={24} color="#EC4899" />,
      bg: "rgba(236, 72, 153, 0.1)",
    },
  ];

  return (
    <Box
      id="highlights"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "transparent",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <Container maxWidth="xl">
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#06B6D4",
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
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Service Highlights & Infrastructure
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              maxWidth: "600px",
            }}
          >
            Engineered to deliver transparency, efficiency, and data security to power consumers.
          </Typography>
        </Stack>

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
                    borderRadius: "18px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    bgcolor: "rgba(15, 23, 42, 0.35)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: "#06B6D4",
                      boxShadow: "0 8px 30px rgba(6, 182, 212, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3.5 }}>
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                      <Box
                        sx={{
                          p: 1.8,
                          borderRadius: "12px",
                          bgcolor: highlight.bg,
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
                            color: "#E2E8F0",
                            fontSize: "1.1rem",
                          }}
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#94A3B8",
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
