import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent, Chip, Button } from "@mui/material";
import { FileText, Calendar, BellRing } from "lucide-react";
import { motion } from "framer-motion";

const Announcements = () => {
  const notices = [
    {
      category: "Scheduled Maintenance",
      color: "info",
      title: "Planned Grid Infrastructure Upgrades",
      date: "July 22, 2026",
      desc: "Scheduled maintenance will take place in Grid Sector-4 on July 25, 2026, from 09:00 AM to 01:00 PM to replace distribution transformers and improve line safety. Power supply will be temporarily affected.",
    },
    {
      category: "Tariff Update",
      color: "warning",
      title: "Approved Tariff Slabs & Slab Rates for FY 2026-27",
      date: "July 15, 2026",
      desc: "The State Electricity Regulatory Commission has approved the updated tariff slabs for domestic and commercial consumer categories, effective from August 1, 2026. Please download the detailed slab structure.",
    },
    {
      category: "Government Notification",
      color: "success",
      title: "Solar Rooftop Net-Metering Subsidy Guidelines",
      date: "July 10, 2026",
      desc: "Under the new clean energy initiative, residential consumers installing approved grid-interactive solar systems up to 10 kW can apply for a capital subsidy of 30%. Applications are open in the consumer portal.",
    },
    {
      category: "Power Outage",
      color: "error",
      title: "Storm Recovery & Grid Restoration Report",
      date: "July 08, 2026",
      desc: "Monsoon storms damaged overhead transmission lines in Sector-12 yesterday. Our emergency crew successfully restored power supply to all affected grid sub-stations within 4 hours. We appreciate your patience.",
    },
  ];

  return (
    <Box
      id="announcements"
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
            Bulletin Board
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Latest Notices & Announcements
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "600px",
            }}
          >
            Keep track of active grid maintenance schedules, approved regulatory updates, and official notifications.
          </Typography>
        </Stack>

        {/* Notices Grid */}
        <Grid container spacing={4}>
          {notices.map((notice, index) => (
            <Grid item xs={12} md={6} key={index}>
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
                    boxShadow: "0 4px 12px rgba(0, 86, 166, 0.01)",
                    height: "100%",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#0056A6",
                      boxShadow: "0 8px 24px rgba(0, 86, 166, 0.05)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                      <Chip
                        label={notice.category}
                        color={notice.color}
                        size="small"
                        sx={{ fontWeight: 700, fontSize: "0.7rem", borderRadius: "6px" }}
                      />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#64748B" }}>
                        <Calendar size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>{notice.date}</Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#1E293B",
                        mb: 2,
                        lineHeight: 1.3,
                        fontSize: "1.2rem",
                      }}
                    >
                      {notice.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#475569",
                        lineHeight: 1.6,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {notice.desc}
                    </Typography>

                    <Box sx={{ pt: 2, borderTop: "1px solid #F1F5F9" }}>
                      <Button
                        size="small"
                        startIcon={<FileText size={16} />}
                        sx={{
                          color: "#0056A6",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          p: 0,
                          "&:hover": { bgcolor: "transparent", color: "#003c74" },
                        }}
                      >
                        Download PDF (Official Release)
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Info Banner */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            borderRadius: "16px",
            bgcolor: "rgba(0, 86, 166, 0.03)",
            border: "1px solid rgba(0, 86, 166, 0.08)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ color: "#0056A6", display: "flex" }}>
              <BellRing size={24} />
            </Box>
            <Typography variant="body2" sx={{ color: "#1E293B", fontWeight: 600 }}>
              Want real-time grid alerts? Log in to your consumer account to configure SMS and Email notification settings.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ bgcolor: "#0056A6", px: 3, whiteSpace: "nowrap" }}
          >
            Access Portal
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Announcements;
