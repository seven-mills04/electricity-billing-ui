import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import {
  User,
  CreditCard,
  FileText,
  Activity,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

const ConsumerPreview = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const mockProfile = {
    consumerNo: "CON984210",
    name: "Dr. Aditya Sen",
    category: "Domestic HT-I (Residential)",
    sanctionedLoad: "5.0 kW",
    meterNo: "APX-8842-M",
    email: "aditya.sen@email.com",
    phone: "+91 98765 43210",
    billingAddress: "Flat 4B, Blue Horizon Apts, Sector 15, Metro City, 400012",
  };

  const mockBill = {
    billNo: "BILL-2026-0701",
    billingMonth: "July 2026",
    readingDate: "2026-07-01",
    dueDate: "2026-07-20",
    unitsConsumed: 320,
    charges: {
      energy: 1440.0, 
      fixed: 275.0,
      duty: 85.75,
      arrears: 0.0,
    },
    totalAmount: 1800.75,
  };

  const mockPayments = [
    { ref: "TXN-884920", date: "2026-06-18", amount: 1450.0, mode: "UPI", status: "SUCCESS" },
    { ref: "TXN-842109", date: "2026-05-19", amount: 1680.0, mode: "Net Banking", status: "SUCCESS" },
    { ref: "TXN-809214", date: "2026-04-18", amount: 1220.0, mode: "Credit Card", status: "SUCCESS" },
  ];

  const mockReadings = [
    { date: "2026-07-01", reading: "4520 kWh", previous: "4200 kWh", units: 320, source: "Smart Meter" },
    { date: "2026-06-01", reading: "4200 kWh", previous: "3950 kWh", units: 250, source: "Self Submitted" },
    { date: "2026-05-01", reading: "3950 kWh", previous: "3670 kWh", units: 280, source: "Field Engineer" },
  ];

  return (
    <Box
      id="preview"
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
            Digital Portal
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Consumer Dashboard Preview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              maxWidth: "600px",
            }}
          >
            Sneak peek into our secure self-service portal. Manage your profile, pay bills instantly, verify connection settings, and view consumption trends.
          </Typography>
        </Stack>

        
        <Card
          sx={{
            maxWidth: 1000,
            mx: "auto",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
            bgcolor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
          }}
        >
          
          <Box
            sx={{
              bgcolor: "rgba(30, 41, 59, 0.4)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              px: 2.5,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#EF5350", opacity: 0.8 }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#FFCA28", opacity: 0.8 }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#66BB6A", opacity: 0.8 }} />
            
            
            <Box
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.5)",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                ml: 4,
                px: 2,
                py: 0.5,
                width: "40%",
                maxWidth: 400,
                fontSize: "0.75rem",
                color: "#94A3B8",
                fontFamily: "monospace",
              }}
            >
              https://portal.knkpower.com/dashboard
            </Box>
          </Box>

          <Grid container>
            
            <Grid item xs={12} sm={3} sx={{ borderRight: "1px solid rgba(255, 255, 255, 0.06)", bgcolor: "rgba(15, 23, 42, 0.15)" }}>
              <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{
                    bgcolor: "rgba(6, 182, 212, 0.15)",
                    color: "#06B6D4",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    width: 34,
                    height: 34,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}>AS</Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#FFFFFF" }}>Dr. Aditya Sen</Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>CON984210</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.06)", mb: 2 }} />

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTabs-indicator": { left: 0, right: "auto", width: 4, bgcolor: "#06B6D4" },
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    pl: 3,
                    py: 2,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "none",
                    color: "#94A3B8",
                    "&.Mui-selected": { color: "#06B6D4" },
                  },
                }}
              >
                <Tab label="Current Bill Details" icon={<FileText size={18} />} iconPosition="start" />
                <Tab label="Consumer Profile" icon={<User size={18} />} iconPosition="start" />
                <Tab label="Payment Settlements" icon={<CreditCard size={18} />} iconPosition="start" />
                <Tab label="Meter Reading Logs" icon={<Activity size={18} />} iconPosition="start" />
              </Tabs>
            </Grid>

            
            <Grid item xs={12} sm={9} sx={{ p: 4, bgcolor: "transparent", minHeight: 380 }}>
              {activeTab === 0 && (
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF" }}>Outstanding Invoice Summary</Typography>
                    <Chip label="UNPAID" size="small" sx={{
                        bgcolor: "rgba(245, 158, 11, 0.15)",
                        color: "#F59E0B",
                        border: "1px solid rgba(245, 158, 11, 0.3)",
                        fontWeight: 700,
                      }} />
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                      <Card variant="outlined" sx={{
                          borderRadius: "12px",
                          border: "1px dashed rgba(6, 182, 212, 0.3)",
                          bgcolor: "rgba(6, 182, 212, 0.02)",
                          boxShadow: "none",
                        }}>
                        <CardContent sx={{ p: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#64748B" }}>Billing Month</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{mockBill.billingMonth}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#64748B" }}>Bill Reference</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{mockBill.billNo}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#64748B" }}>Units Consumed</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{mockBill.unitsConsumed} kWh</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#64748B" }}>Payment Due Date</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: "#FB7185" }}>{mockBill.dueDate}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Card variant="outlined" sx={{
                          borderRadius: "12px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          bgcolor: "rgba(255, 255, 255, 0.02)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          boxShadow: "none",
                          p: 3,
                        }}>
                        <Typography variant="caption" sx={{ color: "#64748B", align: "center", display: "block" }}>Total Amount Due</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF", textAlign: "center", my: 1 }}>₹{mockBill.totalAmount.toLocaleString()}</Typography>
                        <Typography variant="caption" align="center" sx={{ color: "#64748B", mb: 2 }}>Includes 5% Electricity Duty & Fixed Charges</Typography>
                        <button
                          style={{
                            background: "#06B6D4",
                            color: "#020617",
                            border: "none",
                            padding: "12px 0",
                            borderRadius: "10px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = "#22D3EE"}
                          onMouseOut={(e) => e.currentTarget.style.background = "#06B6D4"}
                        >
                          Settle Bill Now
                        </button>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", mb: 3 }}>Consumer Account Profile</Typography>
                  <Grid container spacing={3.5}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Consumer Number</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, py: 1.2, px: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#FFFFFF" }}>{mockProfile.consumerNo}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Tariff Slab Category</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, py: 1.2, px: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#FFFFFF" }}>{mockProfile.category}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Sanctioned Grid Load</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, py: 1.2, px: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#FFFFFF" }}>{mockProfile.sanctionedLoad}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Smart Meter ID</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, py: 1.2, px: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#FFFFFF" }}>{mockProfile.meterNo}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Registered Billing Address</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, py: 1.2, px: 2, bgcolor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", color: "#FFFFFF" }}>{mockProfile.billingAddress}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", mb: 3 }}>Payment History & Settlements</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Transaction Ref</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Amount Paid</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Payment Method</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockPayments.map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ fontFamily: "monospace", color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{p.ref}</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{p.date}</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>₹{p.amount.toFixed(2)}</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{p.mode}</TableCell>
                            <TableCell sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                              <Chip label={p.status} size="small" sx={{
                                  bgcolor: "rgba(52, 211, 153, 0.15)",
                                  color: "#34D399",
                                  border: "1px solid rgba(52, 211, 153, 0.3)",
                                  fontWeight: 700,
                                  fontSize: "0.68rem",
                                }} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {activeTab === 3 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", mb: 3 }}>Meter Reading Ledger</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Reading Date</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Current Register</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Previous Register</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Consumption Delta</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#94A3B8", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>Submission Channel</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockReadings.map((r, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{r.date}</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", fontWeight: 600, borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{r.reading}</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{r.previous}</TableCell>
                            <TableCell sx={{ color: "#06B6D4", fontWeight: 700, borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{r.units} kWh</TableCell>
                            <TableCell sx={{ color: "#E2E8F0", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>{r.source}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ConsumerPreview;
