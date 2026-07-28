import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent } from "@mui/material";
import { Clock, Zap, CreditCard, Bell, Lock, Calculator } from "lucide-react";
import { motion } from "framer-motion";

const Highlights = () => {
  const highlights = [
    {
      title: "24×7 Online Services",
      desc: "Apply for connections, report outages, and check connection details anytime without visiting billing offices.",
      icon: <Clock size={22} color="#075BB5" />,
    },
    {
      title: "Instant Bill Generation",
      desc: "Smart meters feed consumption data directly, generating automated electronic invoices instantly every month.",
      icon: <Zap size={22} color="#075BB5" />,
    },
    {
      title: "Digital Payment Gateway",
      desc: "Safe online payment settlements with multi-channel support (UPI, debit/credit cards, and net banking).",
      icon: <CreditCard size={22} color="#075BB5" />,
    },
    {
      title: "SMS & Email Notifications",
      desc: "Automated alerts sent directly to registered details for billing updates, payment confirmations, and notices.",
      icon: <Bell size={22} color="#075BB5" />,
    },
    {
      title: "Secure JWT Authentication",
      desc: "Ensuring top-tier security for consumer credentials and data exchanges using JSON Web Tokens (JWT).",
      icon: <Lock size={22} color="#075BB5" />,
    },
    {
      title: "Transparent Tariff Slabs",
      desc: "Clear itemized breakdown of energy charges, state electricity duty, and fixed load charges on every bill.",
      icon: <Calculator size={22} color="#075BB5" />,
    },
  ];

  return (
    <Box
      id="highlights"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
        borderBottom: "1px solid #C9C3B7",
      }}
    >
      <Container maxWidth="xl">
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#075BB5",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            PORTAL FEATURES
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.85rem", md: "2.3rem" },
              color: "#171717",
            }}
          >
            Service Highlights & Capabilities
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#625F58",
              maxWidth: "600px",
              fontSize: "0.9rem",
            }}
          >
            Engineered to deliver transparency, efficiency, and data security to power consumers.
          </Typography>
        </Stack>

        <Grid container spacing={3.5}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card
                  sx={{
                    borderRadius: "2px",
                    border: "1px solid #C9C3B7",
                    bgcolor: "#FFFDF8",
                    boxShadow: "none",
                    height: "100%",
                    transition: "all 120ms ease-in-out",
                    "&:hover": {
                      borderColor: "#171717",
                      bgcolor: "#F3F0E8",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={2.5} alignItems="flex-start">
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: "2px",
                          bgcolor: "#E9E5DB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #C9C3B7",
                        }}
                      >
                        {highlight.icon}
                      </Box>
                      <Stack spacing={1} sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: "#171717",
                            fontSize: "1.1rem",
                          }}
                        >
                          {highlight.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#625F58",
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
