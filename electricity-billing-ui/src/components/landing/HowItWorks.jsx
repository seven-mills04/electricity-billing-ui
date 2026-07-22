import React from "react";
import { Box, Container, Grid, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { UserPlus, Eye, CreditCard, Download, ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const steps = [
    {
      step: "01",
      title: "Register Account",
      desc: "Sign up on the portal using your unique Consumer Number. Setup your login credentials.",
      icon: <UserPlus size={26} color="#0056A6" />,
    },
    {
      step: "02",
      title: "View Bills",
      desc: "Log in to check your active meter readings, energy statements, and total dues.",
      icon: <Eye size={26} color="#00A99D" />,
    },
    {
      step: "03",
      title: "Pay Online",
      desc: "Settle your electricity bills instantly using secure UPI, card, or banking options.",
      icon: <CreditCard size={26} color="#F4B400" />,
    },
    {
      step: "04",
      title: "Download Receipt",
      desc: "Download and save the digitally generated transaction receipts for your records.",
      icon: <Download size={26} color="#0056A6" />,
    },
  ];

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#F7F9FC",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 10 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#00A99D",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Workflow
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            How it Works
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "600px",
            }}
          >
            Follow these simple steps to manage your connection and settle your electricity invoices digitally.
          </Typography>
        </Stack>

        {/* Steps Layout */}
        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <Grid item xs={12} sm={6} md={2.5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: "100%" }}
                >
                  <Stack
                    spacing={3}
                    alignItems="center"
                    textAlign="center"
                    sx={{
                      bgcolor: "#FFFFFF",
                      p: 4,
                      borderRadius: "16px",
                      border: "1px solid #E2E8F0",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.01)",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Step Number Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        left: 15,
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#94A3B8",
                        bgcolor: "#F1F5F9",
                        px: 1.2,
                        py: 0.4,
                        borderRadius: "20px",
                      }}
                    >
                      Step {step.step}
                    </Box>

                    {/* Step Icon Circle */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        border: "2px solid #E2E8F0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#FFFFFF",
                        boxShadow: "0 4px 8px rgba(0, 86, 166, 0.03)",
                        mt: 2,
                      }}
                    >
                      {step.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#1E293B",
                        fontSize: "1.1rem",
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        lineHeight: 1.55,
                        fontSize: "0.85rem",
                      }}
                    >
                      {step.desc}
                    </Typography>
                  </Stack>
                </motion.div>
              </Grid>

              {/* Connecting Arrow */}
              {index < 3 && (
                <Grid
                  item
                  xs={12}
                  md={0.6}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    py: { xs: 1, md: 0 },
                  }}
                >
                  {isMobile ? (
                    <ArrowDown size={24} color="#94A3B8" />
                  ) : (
                    <ArrowRight size={24} color="#94A3B8" />
                  )}
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
