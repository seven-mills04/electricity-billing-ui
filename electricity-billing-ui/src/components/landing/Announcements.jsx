import React from "react";
import { Box, Container, Grid, Typography, Stack, Card, CardContent, Chip, Button } from "@mui/material";
import { FileText, Calendar, BellRing } from "lucide-react";
import { motion } from "framer-motion";

const Announcements = () => {
  const notices = [
    {
      category: "Scheduled Maintenance",
      colorStyle: { bgcolor: "#FFFDF8", color: "#075BB5", border: "1px solid #075BB5" },
      title: "Planned Grid Infrastructure Upgrades",
      date: "July 22, 2026",
      desc: "Scheduled maintenance will take place in Grid Sector-4 on July 25, 2026, from 09:00 AM to 01:00 PM to replace distribution transformers and improve line safety. Power supply will be temporarily affected.",
    },
    {
      category: "Tariff Update",
      colorStyle: { bgcolor: "#FFFDF8", color: "#F05A28", border: "1px solid #F05A28" },
      title: "Approved Tariff Slabs & Slab Rates for FY 2026-27",
      date: "July 15, 2026",
      desc: "The State Electricity Regulatory Commission has approved the updated tariff slabs for domestic and commercial consumer categories, effective from August 1, 2026. Please download the detailed slab structure.",
    },
    {
      category: "Government Notification",
      colorStyle: { bgcolor: "#FFFDF8", color: "#087A5A", border: "1px solid #087A5A" },
      title: "Solar Rooftop Net-Metering Subsidy Guidelines",
      date: "July 10, 2026",
      desc: "Under the new clean energy initiative, residential consumers installing approved grid-interactive solar systems up to 10 kW can apply for a capital subsidy of 30%. Applications are open in the consumer portal.",
    },
    {
      category: "Power Outage",
      colorStyle: { bgcolor: "#FFFDF8", color: "#C5382F", border: "1px solid #C5382F" },
      title: "Storm Recovery & Grid Restoration Report",
      date: "July 08, 2026",
      desc: "Monsoon storms damaged overhead transmission lines in Sector-12 yesterday. Our emergency crew successfully restored power supply to all affected grid sub-stations within 4 hours. We appreciate your patience.",
    },
  ];

  return (
    <Box
      id="announcements"
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
            BULLETIN BOARD
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.85rem", md: "2.3rem" },
              color: "#171717",
            }}
          >
            Latest Notices & Announcements
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#625F58",
              maxWidth: "600px",
              fontSize: "0.9rem",
            }}
          >
            Keep track of active grid maintenance schedules, approved regulatory updates, and official notifications.
          </Typography>
        </Stack>

        <Grid container spacing={4}>
          {notices.map((notice, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{ height: "100%" }}
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
                  <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
                      <Chip
                        label={notice.category}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          borderRadius: "2px",
                          bgcolor: notice.colorStyle.bgcolor,
                          color: notice.colorStyle.color,
                          border: notice.colorStyle.border,
                        }}
                      />
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "#625F58" }}>
                        <Calendar size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: "monospace" }}>{notice.date}</Typography>
                      </Stack>
                    </Stack>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "#171717",
                        mb: 2,
                        lineHeight: 1.3,
                        fontSize: "1.15rem",
                      }}
                    >
                      {notice.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#625F58",
                        lineHeight: 1.55,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {notice.desc}
                    </Typography>

                    <Box sx={{ pt: 2, borderTop: "1px dashed #C9C3B7" }}>
                      <Button
                        size="small"
                        startIcon={<FileText size={16} />}
                        sx={{
                          color: "#075BB5",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          p: 0,
                          "&:hover": { bgcolor: "transparent", color: "#064B95" },
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

        {/* Real-time Grid Alerts bulletin box */}
        <Box
          sx={{
            mt: 6,
            p: 3.5,
            borderRadius: "2px",
            bgcolor: "#FFFDF8",
            border: "2px solid #171717", // Strong ink border
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Box sx={{ color: "#075BB5", display: "flex" }}>
              <BellRing size={22} />
            </Box>
            <Typography variant="body2" sx={{ color: "#171717", fontWeight: 700 }}>
              Want real-time grid alerts? Log in to your consumer account to configure SMS and Email notification settings.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            size="small"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              bgcolor: "#075BB5",
              color: "#FFFDF8",
              fontWeight: 700,
              px: 3.5,
              py: 1,
              borderRadius: "2px",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#064B95" },
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
