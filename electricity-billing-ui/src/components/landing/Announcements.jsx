import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent, Chip, Button } from "@mui/material";
import { FileText, Calendar, BellRing } from "lucide-react";
import { motion } from "framer-motion";

const Announcements = () => {
  const notices = [
    {
      category: "Scheduled Maintenance",
      colorStyle: { bgcolor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", border: "1px solid rgba(56, 189, 248, 0.3)" },
      title: "Planned Grid Infrastructure Upgrades",
      date: "July 22, 2026",
      desc: "Scheduled maintenance will take place in Grid Sector-4 on July 25, 2026, from 09:00 AM to 01:00 PM to replace distribution transformers and improve line safety. Power supply will be temporarily affected.",
    },
    {
      category: "Tariff Update",
      colorStyle: { bgcolor: "rgba(245, 158, 11, 0.15)", color: "#F59E0B", border: "1px solid rgba(245, 158, 11, 0.3)" },
      title: "Approved Tariff Slabs & Slab Rates for FY 2026-27",
      date: "July 15, 2026",
      desc: "The State Electricity Regulatory Commission has approved the updated tariff slabs for domestic and commercial consumer categories, effective from August 1, 2026. Please download the detailed slab structure.",
    },
    {
      category: "Government Notification",
      colorStyle: { bgcolor: "rgba(52, 211, 153, 0.15)", color: "#34D399", border: "1px solid rgba(52, 211, 153, 0.3)" },
      title: "Solar Rooftop Net-Metering Subsidy Guidelines",
      date: "July 10, 2026",
      desc: "Under the new clean energy initiative, residential consumers installing approved grid-interactive solar systems up to 10 kW can apply for a capital subsidy of 30%. Applications are open in the consumer portal.",
    },
    {
      category: "Power Outage",
      colorStyle: { bgcolor: "rgba(244, 63, 94, 0.15)", color: "#FB7185", border: "1px solid rgba(244, 63, 94, 0.3)" },
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
            Bulletin Board
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Latest Notices & Announcements
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              maxWidth: "600px",
            }}
          >
            Keep track of active grid maintenance schedules, approved regulatory updates, and official notifications.
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {notices.map((notice, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    borderRadius: "18px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    bgcolor: "rgba(15, 23, 42, 0.35)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
                    height: "100%",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#06B6D4",
                      boxShadow: "0 8px 30px rgba(6, 182, 212, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                      <Chip
                        label={notice.category}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          borderRadius: "6px",
                          bgcolor: notice.colorStyle.bgcolor,
                          color: notice.colorStyle.color,
                          border: notice.colorStyle.border,
                        }}
                      />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#94A3B8" }}>
                        <Calendar size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 500 }}>{notice.date}</Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#E2E8F0",
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
                        color: "#94A3B8",
                        lineHeight: 1.6,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {notice.desc}
                    </Typography>

                    <Box sx={{ pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                      <Button
                        size="small"
                        startIcon={<FileText size={16} />}
                        sx={{
                          color: "#06B6D4",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          p: 0,
                          "&:hover": { bgcolor: "transparent", color: "#22D3EE" },
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

        <Box
          sx={{
            mt: 6,
            p: 3,
            borderRadius: "18px",
            bgcolor: "rgba(6, 182, 212, 0.05)",
            border: "1px solid rgba(6, 182, 212, 0.15)",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ color: "#06B6D4", display: "flex" }}>
              <BellRing size={24} />
            </Box>
            <Typography variant="body2" sx={{ color: "#E2E8F0", fontWeight: 600 }}>
              Want real-time grid alerts? Log in to your consumer account to configure SMS and Email notification settings.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              bgcolor: "#06B6D4",
              color: "#020617",
              fontWeight: 700,
              px: 3,
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#22D3EE" },
            }}
          >
            Access Portal
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Announcements;
