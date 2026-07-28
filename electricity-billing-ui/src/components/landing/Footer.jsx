import React from "react";
import { Box, Container, Grid, Typography, Stack, Divider, Link, IconButton } from "@mui/material";
import { Zap, Phone, Mail, MapPin, ShieldAlert, AlertOctagon } from "lucide-react";

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
    <Box sx={{ mt: 4 }}>
      {/* ==================================================
          EMERGENCY AND SUPPORT SECTION (Before standard footer)
          ================================================== */}
      <Box
        sx={{
          bgcolor: "#FFFDF8",
          borderTop: "2px solid #C5382F", // Red border for emergency section
          borderBottom: "2px solid #171717",
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="stretch">
            {/* Left Column: Power Line Fault Emergency */}
            <Grid item xs={12} md={6} sx={{ borderRight: { xs: "none", md: "1px solid #C9C3B7" } }}>
              <Stack spacing={2.5} sx={{ pr: { xs: 0, md: 4 } }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#C5382F" }}>
                  <AlertOctagon size={24} />
                  <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#C5382F" }}>
                    Report a power-line fault
                  </Typography>
                </Stack>
                
                <Typography variant="body2" sx={{ color: "#625F58", lineHeight: 1.5 }}>
                  If you detect fallen wires, spark damage on distribution poles, or localized power surges, report immediately to our 24x7 emergency helpline. Do not approach electrical wires.
                </Typography>

                <Box
                  sx={{
                    p: 2,
                    border: "2px solid #C5382F", // Red alert border
                    borderRadius: "2px",
                    bgcolor: "#FFFDF8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 2,
                    maxWidth: 420,
                  }}
                >
                  <Phone size={20} color="#C5382F" />
                  <Box>
                    <Typography variant="caption" sx={{ color: "#C5382F", fontWeight: 800, display: "block" }}>
                      EMERGENCY LINE (TOLL FREE)
                    </Typography>
                    <Typography
                      component="a"
                      href="tel:19122"
                      variant="h5"
                      sx={{ fontWeight: 900, color: "#171717", textDecoration: "underline", fontFamily: "monospace" }}
                    >
                      19122
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Grid>

            {/* Right Column: Account Assistance */}
            <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 6 } }}>
              <Stack spacing={2.5} sx={{ pl: { xs: 0, md: 4 } }}>
                <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#171717" }}>
                  Need account assistance?
                </Typography>
                
                <Typography variant="body2" sx={{ color: "#625F58", lineHeight: 1.5 }}>
                  For general billing issues, connections status lookups, online password resets, or tariff questions, browse our portal resources or speak with billing support.
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Link href="#services" onClick={handleScrollToSection("services")} sx={{ color: "#075BB5", fontWeight: 700, fontSize: "0.85rem", textDecoration: "underline" }}>
                        Consumer services
                      </Link>
                      <Link href="#faq" onClick={handleScrollToSection("faq")} sx={{ color: "#075BB5", fontWeight: 700, fontSize: "0.85rem", textDecoration: "underline" }}>
                        Billing help & FAQ
                      </Link>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack spacing={1}>
                      <Link href="/login" sx={{ color: "#075BB5", fontWeight: 700, fontSize: "0.85rem", textDecoration: "underline" }}>
                        New connection support
                      </Link>
                      <Link href="tel:01128942100" sx={{ color: "#075BB5", fontWeight: 700, fontSize: "0.85rem", textDecoration: "underline" }}>
                        Corporate desk
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ==================================================
          MAIN PRACTICAL FOOTER
          ================================================== */}
      <Box
        id="footer"
        sx={{
          bgcolor: "#171717", // Ink-black background
          color: "#FFFDF8", // Warm off-white text
          pt: 8,
          pb: 5,
          borderTop: "3px solid #F05A28", // Strong top border in safety orange
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Column 1: Brand Info */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      bgcolor: "#FFFDF8",
                      color: "#171717",
                      p: 0.8,
                      border: "1px solid #C9C3B7",
                      display: "flex",
                    }}
                  >
                    <Zap size={18} fill="#171717" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFDF8", letterSpacing: "-0.02em" }}>
                      KNK POWER
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.65rem", textTransform: "uppercase" }}>
                      Corporation LTD.
                    </Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ color: "#C9C3B7", lineHeight: 1.6, maxWidth: 320 }}>
                  KNK Power Corporation LTD. is a certified state-licensed power distribution utility serving over 4.8 million consumers. Powering growth and grid reliability.
                </Typography>
                <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontFamily: "monospace" }}>
                  CIN: U40109DL2026PLC098241
                </Typography>
              </Stack>
            </Grid>

            {/* Column 2: Consumer Services Links */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: "#FFFDF8", fontWeight: 800, mb: 2.5, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Services
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" onClick={handleScrollToSection("services")} sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Quick Bill Pay</Link>
                <Link href="/login" sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>View Bill History</Link>
                <Link href="/login" sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Apply for Connection</Link>
                <Link href="/login" sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Submit Meter Reading</Link>
              </Stack>
            </Grid>

            {/* Column 3: Quick Links */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ color: "#FFFDF8", fontWeight: 800, mb: 2.5, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                <Link href="#" onClick={handleScrollToSection("home")} sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Home Page</Link>
                <Link href="#" onClick={handleScrollToSection("highlights")} sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Tariff Slab Structure</Link>
                <Link href="#" onClick={handleScrollToSection("announcements")} sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>Latest Notices</Link>
                <Link href="#" onClick={handleScrollToSection("faq")} sx={{ color: "#C9C3B7", textDecoration: "none", fontSize: "0.85rem", transition: "color 120ms", "&:hover": { color: "#FFFDF8", textDecoration: "underline" } }}>FAQs / Help</Link>
              </Stack>
            </Grid>

            {/* Column 4: Contact info */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ color: "#FFFDF8", fontWeight: 800, mb: 2.5, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Corporate Contact
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#C9C3B7" }}>
                  <Mail size={14} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>customercare@knkpower.co.in</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: "#C9C3B7" }}>
                  <Phone size={14} />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>011-28942100 (Corporate Office)</Typography>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ color: "#C9C3B7" }}>
                  <MapPin size={14} sx={{ mt: 0.5 }} />
                  <Typography variant="body2" sx={{ maxWidth: 280, fontSize: "0.85rem", lineHeight: 1.4 }}>
                    KNK Power HQ, Energy Bhawan, 12 Institutional Area, Metro City, 110003
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: "#625F58" }} />

          {/* Bottom copyright details */}
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ color: "#625F58", fontSize: "0.8rem" }}>
                © {new Date().getFullYear()} KNK Power Corporation LTD. All rights reserved. Registered under regulatory authorities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Stack direction="row" spacing={2.5} justifyContent={{ xs: "flex-start", md: "flex-end" }} sx={{ color: "#625F58", fontSize: "0.8rem" }}>
                <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFDF8" } }}>Privacy Policy</Link>
                <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFDF8" } }}>Terms & Conditions</Link>
                <Link href="#" onClick={handleScrollToTop} sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#FFFDF8" } }}>Hyperlink Policy</Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
