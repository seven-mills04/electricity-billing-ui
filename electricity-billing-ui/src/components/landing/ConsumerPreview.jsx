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
  ShieldCheck,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

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
      energy: 1440.0, // 320 * 4.5
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
        bgcolor: "#F7F9FC",
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
            Digital Portal
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Consumer Dashboard Preview
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "600px",
            }}
          >
            Sneak peek into our secure self-service portal. Manage your profile, pay bills instantly, verify connection settings, and view consumption trends.
          </Typography>
        </Stack>

        {/* Browser Mockup */}
        <Card
          sx={{
            maxWidth: 1000,
            mx: "auto",
            borderRadius: "16px",
            border: "1px solid #CBD5E1",
            boxShadow: "0 12px 32px rgba(0, 86, 166, 0.08)",
            bgcolor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Browser Window Controls Header */}
          <Box
            sx={{
              bgcolor: "#ECEFF1",
              borderBottom: "1px solid #CFD8DC",
              px: 2.5,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#EF5350" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#FFCA28" }} />
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "#66BB6A" }} />
            
            {/* Mock URL bar */}
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                borderRadius: "6px",
                border: "1px solid #CFD8DC",
                ml: 4,
                px: 2,
                py: 0.5,
                width: "40%",
                maxWidth: 400,
                fontSize: "0.75rem",
                color: "#64748B",
                fontFamily: "monospace",
              }}
            >
              https://portal.apexpower.co.in/dashboard
            </Box>
          </Box>

          <Grid container>
            {/* Mock Sidebar Menu */}
            <Grid item xs={12} sm={3} sx={{ borderRight: "1px solid #E2E8F0", bgcolor: "#FAFAFA" }}>
              <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "#0056A6", width: 34, height: 34, fontSize: "0.85rem", fontWeight: 700 }}>AS</Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#1E293B" }}>Dr. Aditya Sen</Typography>
                  <Typography variant="caption" sx={{ color: "#64748B" }}>CON984210</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTabs-indicator": { left: 0, right: "auto", width: 4, bgcolor: "#0056A6" },
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    pl: 3,
                    py: 2,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "none",
                    color: "#64748B",
                    "&.Mui-selected": { color: "#0056A6" },
                  },
                }}
              >
                <Tab label="Current Bill Details" icon={<FileText size={18} />} iconPosition="start" />
                <Tab label="Consumer Profile" icon={<User size={18} />} iconPosition="start" />
                <Tab label="Payment Settlements" icon={<CreditCard size={18} />} iconPosition="start" />
                <Tab label="Meter Reading Logs" icon={<Activity size={18} />} iconPosition="start" />
              </Tabs>
            </Grid>

            {/* Dashboard Content Area */}
            <Grid item xs={12} sm={9} sx={{ p: 4, bgcolor: "#FFFFFF", minHeight: 380 }}>
              {activeTab === 0 && (
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "#0056A6" }}>Outstanding Invoice Summary</Typography>
                    <Chip label="UNPAID" color="warning" size="small" sx={{ fontWeight: 700 }} />
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                      <Card variant="outlined" sx={{ borderRadius: "12px", border: "1px dashed #0056A6", bgcolor: "rgba(0, 86, 166, 0.01)" }}>
                        <CardContent sx={{ p: 3 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">Billing Month</Typography>
                              <Typography variant="body1" fontWeight={600}>{mockBill.billingMonth}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">Bill Reference</Typography>
                              <Typography variant="body1" fontWeight={600}>{mockBill.billNo}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">Units Consumed</Typography>
                              <Typography variant="body1" fontWeight={600}>{mockBill.unitsConsumed} kWh</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="textSecondary">Payment Due Date</Typography>
                              <Typography variant="body1" fontWeight={600} color="error">{mockBill.dueDate}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Card variant="outlined" sx={{ borderRadius: "12px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", bgcolor: "#FAFAFA", p: 3 }}>
                        <Typography variant="caption" color="textSecondary" align="center" display="block">Total Amount Due</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: "#1E293B", textAlign: "center", my: 1 }}>₹{mockBill.totalAmount.toLocaleString()}</Typography>
                        <Typography variant="caption" align="center" color="textSecondary" sx={{ mb: 2 }}>Includes 5% Electricity Duty & Fixed Charges</Typography>
                        <button
                          style={{
                            background: "#0056A6",
                            color: "#FFFFFF",
                            border: "none",
                            padding: "10px 0",
                            borderRadius: "8px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
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
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#0056A6", mb: 3 }}>Consumer Account Profile</Typography>
                  <Grid container spacing={3.5}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="textSecondary">Consumer Number</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ py: 1, px: 1.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}>{mockProfile.consumerNo}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="textSecondary">Tariff Slab Category</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ py: 1, px: 1.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}>{mockProfile.category}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="textSecondary">Sanctioned Grid Load</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ py: 1, px: 1.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}>{mockProfile.sanctionedLoad}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="textSecondary">Smart Meter ID</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ py: 1, px: 1.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}>{mockProfile.meterNo}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <Typography variant="caption" color="textSecondary">Registered Billing Address</Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ py: 1, px: 1.5, bgcolor: "#F1F5F9", borderRadius: "6px" }}>{mockProfile.billingAddress}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeTab === 2 && (
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#0056A6", mb: 3 }}>Payment History & Settlements</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Transaction Ref</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Amount Paid</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Payment Method</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockPayments.map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ fontFamily: "monospace" }}>{p.ref}</TableCell>
                            <TableCell>{p.date}</TableCell>
                            <TableCell>₹{p.amount.toFixed(2)}</TableCell>
                            <TableCell>{p.mode}</TableCell>
                            <TableCell>
                              <Chip label={p.status} size="small" sx={{ bgcolor: "#E6FDF9", color: "#00A99D", fontWeight: 700, fontSize: "0.68rem" }} />
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
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#0056A6", mb: 3 }}>Meter Reading Ledger</Typography>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Reading Date</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Current Register</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Previous Register</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Consumption Delta</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Submission Channel</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockReadings.map((r, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{r.date}</TableCell>
                            <TableCell fontWeight={600}>{r.reading}</TableCell>
                            <TableCell>{r.previous}</TableCell>
                            <TableCell sx={{ color: "#0056A6", fontWeight: 700 }}>{r.units} kWh</TableCell>
                            <TableCell>{r.source}</TableCell>
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
