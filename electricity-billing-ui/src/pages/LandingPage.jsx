import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  Paper,
} from "@mui/material";
import {
  Zap,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Receipt,
  Users,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Activity,
  Globe2,
  Lock,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const [calcUnits, setCalcUnits] = useState(250);
  const [calcResult, setCalcResult] = useState(0);

  // Instant Tariff Estimate Calculator
  useEffect(() => {
    const units = Number(calcUnits) || 0;
    let energyCharge = 0;
    if (units <= 200) energyCharge = units * 3.0;
    else if (units <= 400) energyCharge = units * 4.5;
    else if (units <= 800) energyCharge = units * 6.5;
    else if (units <= 1200) energyCharge = units * 7.0;
    else energyCharge = units * 7.75;

    const fixedCharge = 275; // 4kW avg
    const duty = energyCharge * 0.05;
    setCalcResult(Math.round(energyCharge + fixedCharge + duty));
  }, [calcUnits]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0F172A", color: "#FFFFFF", overflowX: "hidden" }}>
      {/* Dynamic Grid Background Overlay */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          opacity: 0.15,
          backgroundImage: `
            radial-gradient(circle at 50% 0%, #0284C7 0%, transparent 60%),
            linear-gradient(to right, #1E293B 1px, transparent 1px),
            linear-gradient(to bottom, #1E293B 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top Header Navbar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(15, 23, 42, 0.8)",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            {/* Logo */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
                  color: "#FFFFFF",
                  p: 1,
                  borderRadius: "10px",
                  display: "flex",
                  boxShadow: "0 0 20px rgba(2, 132, 199, 0.4)",
                }}
              >
                <Zap size={22} fill="currentColor" />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                  GRIDPULSE <span style={{ color: "#38BDF8" }}>UTILITIES</span>
                </Typography>
                <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.68rem", display: "block" }}>
                  National Smart Energy Infrastructure
                </Typography>
              </Box>
            </Stack>

            {/* Navigation Links */}
            <Stack direction="row" spacing={4} sx={{ display: { xs: "none", md: "flex" } }}>
              {["Overview", "Features", "Tariff Slabs", "Grid Live", "Calculator"].map((link) => (
                <Typography
                  key={link}
                  component="a"
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  sx={{
                    color: "#94A3B8",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    "&:hover": { color: "#38BDF8" },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>

            {/* Actions */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#38BDF8",
                  borderColor: "rgba(56, 189, 248, 0.4)",
                  "&:hover": { borderColor: "#38BDF8", bgcolor: "rgba(56, 189, 248, 0.08)" },
                }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                endIcon={<ArrowRight size={16} />}
                sx={{
                  background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
                  boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
                  "&:hover": { boxShadow: "0 6px 20px rgba(2, 132, 199, 0.6)" },
                }}
              >
                Access Portal
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Chip
                icon={<Sparkles size={14} color="#38BDF8" />}
                label="NEXT-GEN ELECTRICITY UTILITY PLATFORM"
                sx={{
                  bgcolor: "rgba(2, 132, 199, 0.15)",
                  color: "#38BDF8",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  mb: 3,
                  py: 0.5,
                }}
              />

              <Typography variant="h1" sx={{ color: "#FFFFFF", mb: 2.5 }}>
                Smart Electricity Billing & <span style={{ background: "linear-gradient(135deg, #38BDF8 0%, #34D399 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Grid Management System</span>
              </Typography>

              <Typography variant="body1" sx={{ color: "#94A3B8", fontSize: "1.15rem", mb: 4, maxWidth: "600px", lineHeight: 1.6 }}>
                Powering national power distribution networks with automated smart metering, automated tariff calculations, predictive AI consumption forecasting, and instant consumer settlements.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ mb: 6 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    py: 1.5,
                    px: 3.5,
                    fontSize: "1rem",
                    background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
                    boxShadow: "0 8px 25px rgba(2, 132, 199, 0.4)",
                  }}
                >
                  Admin / Staff Portal
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    py: 1.5,
                    px: 3.5,
                    fontSize: "1rem",
                    color: "#FFFFFF",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.05)" },
                  }}
                >
                  Consumer Portal Login
                </Button>
              </Stack>

              {/* Trust Badges */}
              <Stack direction="row" spacing={3} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <ShieldCheck size={18} color="#10B981" />
                  <Typography variant="caption" sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                    256-Bit Encrypted JWT Security
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <CheckCircle2 size={18} color="#38BDF8" />
                  <Typography variant="caption" sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                    99.99% Settlement Uptime
                  </Typography>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          {/* Interactive Live Energy Card Preview */}
          <Grid item xs={12} md={5}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: "24px",
                  bgcolor: "rgba(30, 41, 59, 0.7)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                    <Activity size={18} color="#38BDF8" /> Grid Real-Time Monitor
                  </Typography>
                  <Chip label="LIVE OPERATIONAL" size="small" sx={{ bgcolor: "rgba(16, 185, 129, 0.15)", color: "#34D399", border: "1px solid rgba(52, 211, 153, 0.3)", fontWeight: 700 }} />
                </Stack>

                {/* Grid Metrics */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 2, borderRadius: "14px", bgcolor: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <Typography variant="caption" sx={{ color: "#94A3B8" }}>Active Sanctioned Load</Typography>
                      <Typography variant="h5" sx={{ color: "#FFFFFF", fontWeight: 800, mt: 0.5 }}>14.8 GW</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ p: 2, borderRadius: "14px", bgcolor: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <Typography variant="caption" sx={{ color: "#94A3B8" }}>Monthly Revenue Settlement</Typography>
                      <Typography variant="h5" sx={{ color: "#34D399", fontWeight: 800, mt: 0.5 }}>₹94.2 Cr</Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* Animated Wave Simulation */}
                <Box sx={{ p: 2.5, borderRadius: "16px", background: "linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#E2E8F0" }}>Current Peak Load Frequency</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#38BDF8" }}>50.02 Hz</Typography>
                  </Stack>
                  <Box sx={{ height: 6, width: "100%", bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 3, overflow: "hidden", position: "relative" }}>
                    <Box sx={{ height: "100%", width: "78%", background: "linear-gradient(90deg, #38BDF8, #34D399)", borderRadius: 3 }} />
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Counter Section */}
      <Box sx={{ bgcolor: "rgba(30, 41, 59, 0.5)", py: 6, borderY: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} textAlign="center">
            {[
              { label: "Smart Meter Connections", val: "50,000+", icon: <Users color="#38BDF8" /> },
              { label: "Annual Energy Delivered", val: "1.2 TWh", icon: <Zap color="#34D399" /> },
              { label: "Automated Bill Settlement", val: "99.8%", icon: <Receipt color="#F59E0B" /> },
              { label: "AI Forecast Accuracy", val: "96.4%", icon: <TrendingUp color="#8B5CF6" /> },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
                  {stat.icon}
                  <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF" }}>{stat.val}</Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "#94A3B8", fontWeight: 500 }}>{stat.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container id="features" maxWidth="xl" sx={{ py: 12 }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Chip label="ENTERPRISE CAPABILITIES" sx={{ bgcolor: "rgba(16, 185, 129, 0.15)", color: "#34D399", fontWeight: 700, mb: 2 }} />
          <Typography variant="h2" sx={{ mb: 2 }}>Architected for High-Availability Utilities</Typography>
          <Typography variant="body1" sx={{ color: "#94A3B8", maxWidth: "600px", mx: "auto" }}>
            Comprehensive suite of tools tailored for power distribution companies, billing engineers, and retail consumers.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            { title: "Automated Tariff Calculation Engine", desc: "Slotted slab calculations for Energy Charges, Fixed Demands, and Electricity Duties with zero manual error.", icon: <Cpu color="#38BDF8" size={28} /> },
            { title: "AI Consumption Prediction Model", desc: "Linear regression model predicting upcoming 3-month kWh usage with upper and lower statistical confidence bands.", icon: <TrendingUp color="#34D399" size={28} /> },
            { title: "Instant Payment Gateway", desc: "Integrated payment reconciliation with instant transaction logging and automated digital receipt generation.", icon: <Receipt color="#F59E0B" size={28} /> },
            { title: "Role-Based Access Control", desc: "Strict separation between administrative grid managers and individual consumer self-service portals.", icon: <Lock color="#8B5CF6" size={28} /> },
            { title: "Real-Time Ledger & Readings", desc: "Track historical meter reading logs, previous vs current deltas, and connection load parameters seamlessly.", icon: <Clock color="#EC4899" size={28} /> },
            { title: "National Grid Scale Security", desc: "256-Bit JWT authenticated REST API architecture with audited database transactions.", icon: <Globe2 color="#06B6D4" size={28} /> },
          ].map((feat, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
                <Card sx={{ bgcolor: "rgba(30, 41, 59, 0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.08)", p: 1, height: "100%" }}>
                  <CardContent>
                    <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "rgba(15, 23, 42, 0.8)", width: "fit-content", mb: 2.5 }}>
                      {feat.icon}
                    </Box>
                    <Typography variant="h5" sx={{ color: "#FFFFFF", mb: 1.5 }}>{feat.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#94A3B8", lineHeight: 1.6 }}>{feat.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Interactive Tariff Slab Calculator */}
      <Box id="calculator" sx={{ bgcolor: "rgba(30, 41, 59, 0.4)", py: 10, borderY: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: "24px", bgcolor: "#1E293B", border: "1px solid rgba(255, 255, 255, 0.12)" }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <Calculator color="#38BDF8" size={24} />
              <Typography variant="h4" sx={{ color: "#FFFFFF" }}>Instant Tariff Estimate Calculator</Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "#94A3B8", mb: 4 }}>
              Test your estimated monthly kWh consumption against standard utility slab tariffs.
            </Typography>

            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Estimated Units Consumed (kWh)"
                  type="number"
                  value={calcUnits}
                  onChange={(e) => setCalcUnits(e.target.value)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><Typography sx={{ color: "#94A3B8", fontWeight: 700 }}>kWh</Typography></InputAdornment>,
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": { color: "#FFFFFF", bgcolor: "#0F172A", borderRadius: "12px" },
                    "& .MuiInputLabel-root": { color: "#94A3B8" },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ p: 3, borderRadius: "16px", background: "linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)", border: "1px solid rgba(56, 189, 248, 0.3)", textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: "#94A3B8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Estimated Total Bill</Typography>
                  <Typography variant="h3" sx={{ color: "#34D399", fontWeight: 800, my: 0.5 }}>₹{calcResult.toLocaleString()}</Typography>
                  <Typography variant="caption" sx={{ color: "#CBD5E1" }}>Includes Fixed Charges & 5% Duty</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: "#090D16", py: 6, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} justifyContent="space-between" alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <Zap size={20} color="#38BDF8" fill="currentColor" />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF" }}>GRIDPULSE UTILITIES</Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "#64748B", maxWidth: "450px" }}>
                Official Smart Energy Billing System. Certified for high-availability enterprise power utilities.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} textAlign={{ xs: "left", md: "right" }}>
              <Typography variant="body2" sx={{ color: "#94A3B8", mb: 1 }}>
                © {new Date().getFullYear()} GridPulse Electricity Billing System. All rights reserved.
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B" }}>
                Designed & Engineered for National Power Distribution.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
