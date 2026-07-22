import React from "react";
import { Box, Container, Grid, Typography, Stack, Divider, Link, IconButton } from "@mui/material";
import { Zap, Phone, Mail, MapPin, ShieldAlert } from "lucide-react";

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <Box
      id="footer"
      sx={{
        bgcolor: "#002a52", // Rich deep corporate blue from theme update
        color: "#E2E8F0",
        pt: 10,
        pb: 5,
        borderTop: "4px solid #00A99D",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Column 1: Company Logo & Details */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    bgcolor: "#FFFFFF",
                    color: "#0056A6",
                    p: 0.8,
                    borderRadius: "8px",
                    display: "flex",
                  }}
                >
                  <Zap size={22} fill="currentColor" />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                    APEX POWER
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#00A99D", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase" }}>
                    Corporation Limited
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ color: "#94A3B8", lineHeight: 1.6, maxWidth: 320 }}>
                Apex Power Corporation is a certified state-licensed power distribution utility serving over 4.8 million consumers. Powering growth, residential reliability, and national grid safety.
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", display: "block" }}>
                CIN: U40109DL2026PLC098241
              </Typography>
            </Stack>
          </Grid>

          {/* Column 2: Consumer Services */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 3 }}>
              Consumer Services
            </Typography>
            <Stack spacing={1.8}>
              <Link href="#" onClick={handleScrollToSection("services")} sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Quick Bill Pay</Link>
              <Link href="/login" sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>View Bill History</Link>
              <Link href="/login" sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Apply for Connection</Link>
              <Link href="/login" sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Submit Meter Reading</Link>
              <Link href="/login" sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Register Complaint</Link>
            </Stack>
          </Grid>

          {/* Column 3: Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 3 }}>
              Quick Links
            </Typography>
            <Stack spacing={1.8}>
              <Link href="#" onClick={handleScrollToSection("home")} sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Home Page</Link>
              <Link href="#" onClick={handleScrollToSection("highlights")} sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Tariff slab Structure</Link>
              <Link href="#" onClick={handleScrollToSection("announcements")} sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Latest Notices</Link>
              <Link href="#" onClick={handleScrollToSection("faq")} sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>FAQs / Help</Link>
              <Link href="/login" sx={{ color: "#94A3B8", textDecoration: "none", fontSize: "0.875rem", "&:hover": { color: "#00A99D" } }}>Portal Login</Link>
            </Stack>
          </Grid>

          {/* Column 4: Contact & Helpline */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 3 }}>
              Customer Care & Contact
            </Typography>
            <Stack spacing={2.5}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "rgba(244, 180, 0, 0.08)",
                  border: "1px dashed rgba(244, 180, 0, 0.4)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <ShieldAlert size={24} color="#F4B400" />
                <Box>
                  <Typography variant="caption" sx={{ color: "#F4B400", fontWeight: 700, display: "block", textTransform: "uppercase" }}>
                    Emergency Helpline (24x7)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
                    19122 / 1800-419-1912 (Toll Free)
                  </Typography>
                </Box>
              </Box>
              
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#94A3B8" }}>
                  <Mail size={16} />
                  <Typography variant="body2">customercare@apexpower.co.in</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#94A3B8" }}>
                  <Phone size={16} />
                  <Typography variant="body2">011-28942100 (Corporate Office)</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ color: "#94A3B8" }}>
                  <MapPin size={16} sx={{ mt: 0.5 }} />
                  <Typography variant="body2" sx={{ maxWidth: 280 }}>
                    Apex Power HQ, Energy Bhawan, 12 Institutional Area, Metro City, 110003
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: "rgba(255, 255, 255, 0.08)" }} />

        {/* Bottom Bar: Social, Copyright & Policies */}
        <Grid container spacing={3} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ color: "#64748B" }}>
              © {new Date().getFullYear()} Apex Power Corporation Limited. All rights reserved. Registered under regulatory authorities.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", md: "flex-end" }} sx={{ mb: 2 }}>
              <IconButton size="small" sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.05)" } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </IconButton>
              <IconButton size="small" sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.05)" } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </IconButton>
              <IconButton size="small" sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.05)" } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </IconButton>
              <IconButton size="small" sx={{ color: "#94A3B8", "&:hover": { color: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.05)" } }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98"/></svg>
              </IconButton>
            </Stack>
            <Stack direction="row" spacing={2.5} justifyContent={{ xs: "flex-start", md: "flex-end" }} sx={{ color: "#64748B", fontSize: "0.8rem" }}>
              <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFFFF" } }}>Privacy Policy</Link>
              <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFFFF" } }}>Terms & Conditions</Link>
              <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFFFF" } }}>Hyperlink Policy</Link>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
