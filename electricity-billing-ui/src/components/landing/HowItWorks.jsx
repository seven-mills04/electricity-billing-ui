import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import { UserPlus, Eye, CreditCard, Download } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Register account",
      desc: "Use the consumer number to create portal credentials.",
      icon: <UserPlus size={18} color="#075BB5" />,
      offset: -12, // Offset to create rhythm on desktop
    },
    {
      step: "02",
      title: "Review bills",
      desc: "Check current readings, statements, due dates, and outstanding amounts.",
      icon: <Eye size={18} color="#075BB5" />,
      offset: 12,
    },
    {
      step: "03",
      title: "Pay securely",
      desc: "Select an available digital payment method and complete payment.",
      icon: <CreditCard size={18} color="#075BB5" />,
      offset: -12,
    },
    {
      step: "04",
      title: "Save receipt",
      desc: "Download or print the generated transaction receipt.",
      icon: <Download size={18} color="#075BB5" />,
      offset: 12,
    },
  ];

  return (
    <Box
      id="how-it-works"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
        borderBottom: "1px solid #C9C3B7",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Left Column: Heading */}
          <Grid item xs={12} md={3.5}>
            <Stack spacing={2} sx={{ position: "sticky", top: 120 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#075BB5",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                PORTAL WORKFLOW
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.85rem", md: "2.3rem" },
                  lineHeight: 1.15,
                }}
              >
                How it works
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", maxWidth: "280px", fontSize: "0.9rem" }}>
                Settle your accounts and manage your distribution details online in four straightforward steps.
              </Typography>
            </Stack>
          </Grid>

          {/* Right Column: Connected Timeline */}
          <Grid item xs={12} md={8.5}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: { xs: 5, md: 3.5 },
                pt: { xs: 2, md: 6 },
                pb: { xs: 2, md: 6 },
                // Connected timeline line (horizontal on desktop, vertical on mobile)
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bgcolor: "#F05A28", // Safety orange process line
                  opacity: 0.8,
                  // Desktop settings
                  top: { xs: 0, md: "50%" },
                  left: { xs: "28px", md: 0 },
                  width: { xs: "3px", md: "100%" },
                  height: { xs: "100%", md: "3px" },
                  zIndex: 0,
                },
              }}
            >
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Stack
                    spacing={2.5}
                    sx={{
                      alignItems: "flex-start",
                      textAlign: "left",
                      pl: { xs: 8, md: 0 },
                      // Vary alignment on desktop to create rhythm
                      transform: { xs: "none", md: `translateY(${step.offset}px)` },
                      maxWidth: { xs: "100%", md: "190px" },
                    }}
                  >
                    {/* Step Circle & Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "#FFFDF8",
                        border: "2.5px solid #F05A28", // safety orange border
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "none",
                        position: { xs: "absolute", md: "relative" },
                        left: { xs: 0, md: "auto" },
                        top: { xs: 0, md: "auto" },
                      }}
                    >
                      {step.icon}
                    </Box>

                    {/* Step Content */}
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#F05A28",
                            fontSize: "0.85rem",
                          }}
                        >
                          {step.step}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            fontSize: "1rem",
                            color: "#171717",
                          }}
                        >
                          {step.title}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" sx={{ color: "#625F58", fontSize: "0.825rem", lineHeight: 1.45 }}>
                        {step.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
