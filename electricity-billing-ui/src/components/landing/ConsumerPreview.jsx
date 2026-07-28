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
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
        borderBottom: "1px solid #C9C3B7",
      }}
    >
      <Container maxWidth="xl">
        {/* Section Heading */}
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
            PORTAL PREVIEW
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.85rem", md: "2.3rem" },
              color: "#171717",
            }}
          >
            Consumer Dashboard Preview
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#625F58",
              maxWidth: "600px",
              fontSize: "0.9rem",
            }}
          >
            A preview of the self-service web portal interface. Review active statements, transaction logs, and billing meters online.
          </Typography>
        </Stack>

        {/* Browser Mock Interface Frame */}
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            borderRadius: "2px",
            border: "2px solid #171717", // Strong ink border
            bgcolor: "#FFFDF8",
            overflow: "hidden",
            boxShadow: "none",
          }}
        >
          {/* Mock Browser Header Bar */}
          <Box
            sx={{
              bgcolor: "#E9E5DB", // soft panel bg
              borderBottom: "1px solid #C9C3B7",
              px: 2.5,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* Dots */}
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#C5382F" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#F05A28" }} />
            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#087A5A" }} />

            {/* Mock URL bar */}
            <Box
              sx={{
                bgcolor: "#FFFDF8",
                border: "1px solid #C9C3B7",
                borderRadius: "2px",
                ml: 4,
                px: 2,
                py: 0.25,
                width: "50%",
                maxWidth: 400,
                fontSize: "0.72rem",
                color: "#625F58",
                fontFamily: "monospace",
              }}
            >
              https://portal.knkpower.co.in/dashboard
            </Box>
          </Box>

          <Grid container>
            {/* Left Sidebar Menu */}
            <Grid
              item
              xs={12}
              sm={3.5}
              sx={{
                borderRight: "1px solid #C9C3B7",
                bgcolor: "#F3F0E8", // warm paper sidebar background
              }}
            >
              <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    bgcolor: "#075BB5",
                    color: "#FFFDF8",
                    border: "1px solid #171717",
                    width: 36,
                    height: 36,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    borderRadius: "2px",
                  }}
                >
                  AS
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717" }}>
                    Dr. Aditya Sen
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#625F58", fontFamily: "monospace", fontWeight: 700 }}>
                    CON-984210
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: "#C9C3B7", mb: 1 }} />

              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  "& .MuiTabs-indicator": { left: 0, right: "auto", width: 4, bgcolor: "#075BB5" },
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    pl: 3,
                    py: 1.8,
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#625F58",
                    "&.Mui-selected": { color: "#075BB5" },
                  },
                }}
              >
                <Tab label="Current Bill Details" icon={<FileText size={16} />} iconPosition="start" />
                <Tab label="Consumer Profile" icon={<User size={16} />} iconPosition="start" />
                <Tab label="Payment Settlements" icon={<CreditCard size={16} />} iconPosition="start" />
                <Tab label="Meter Reading Logs" icon={<Activity size={16} />} iconPosition="start" />
              </Tabs>
            </Grid>

            {/* Right Main Content Preview Area */}
            <Grid item xs={12} sm={8.5} sx={{ p: 4, bgcolor: "#FFFDF8", minHeight: 380 }}>
              {/* Tab 0: Current Bill Details */}
              {activeTab === 0 && (
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", fontSize: "1.25rem" }}>
                      Outstanding Invoice Summary
                    </Typography>
                    <Chip
                      label="UNPAID"
                      size="small"
                      sx={{
                        bgcolor: "#FFFDF8",
                        color: "#F05A28",
                        border: "1.5px solid #F05A28", // Safety orange border
                        fontWeight: 800,
                        borderRadius: "2px",
                      }}
                    />
                  </Stack>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                      <Card
                        variant="outlined"
                        sx={{
                          borderRadius: "2px",
                          border: "1px dashed #075BB5",
                          bgcolor: "#F3F0E8",
                          boxShadow: "none",
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Billing Month</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717" }}>{mockBill.billingMonth}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Bill Reference</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717", fontFamily: "monospace" }}>{mockBill.billNo}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Units Consumed</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717", fontFamily: "monospace" }}>{mockBill.unitsConsumed} kWh</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Payment Due Date</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: "#C5382F" }}>{mockBill.dueDate}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <Box
                        sx={{
                          border: "1px solid #C9C3B7",
                          borderRadius: "2px",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          bgcolor: "#E9E5DB",
                          p: 3,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", mb: 0.5 }}>
                          Total Amount Due
                        </Typography>
                        <Typography
                          variant="h3"
                          sx={{ fontWeight: 800, color: "#075BB5", fontFamily: "monospace", mb: 1, fontSize: "1.85rem" }}
                        >
                          ₹{mockBill.totalAmount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", mb: 2, fontSize: "0.72rem" }}>
                          Includes 5% State Duty & fixed service rates
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: "#075BB5",
                            color: "#FFFDF8",
                            borderRadius: "2px",
                            fontWeight: 700,
                            py: 1,
                            "&:hover": { bgcolor: "#064B95" },
                          }}
                        >
                          Settle Bill Now
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Tab 1: Consumer Profile */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", mb: 3, fontSize: "1.25rem" }}>
                    Consumer Account Profile
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Consumer Number</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            py: 1,
                            px: 1.5,
                            bgcolor: "#F3F0E8",
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            color: "#171717",
                            fontFamily: "monospace",
                          }}
                        >
                          {mockProfile.consumerNo}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Tariff Slab Category</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            py: 1,
                            px: 1.5,
                            bgcolor: "#F3F0E8",
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            color: "#171717",
                          }}
                        >
                          {mockProfile.category}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Sanctioned Grid Load</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            py: 1,
                            px: 1.5,
                            bgcolor: "#F3F0E8",
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            color: "#171717",
                            fontFamily: "monospace",
                          }}
                        >
                          {mockProfile.sanctionedLoad}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Smart Meter ID</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            py: 1,
                            px: 1.5,
                            bgcolor: "#F3F0E8",
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            color: "#171717",
                            fontFamily: "monospace",
                          }}
                        >
                          {mockProfile.meterNo}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={0.5}>
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Registered Billing Address</Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            py: 1,
                            px: 1.5,
                            bgcolor: "#F3F0E8",
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            color: "#171717",
                          }}
                        >
                          {mockProfile.billingAddress}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Tab 2: Payment Settlements */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", mb: 3, fontSize: "1.25rem" }}>
                    Payment History & Settlements
                  </Typography>
                  <TableContainer sx={{ border: "1px solid #C9C3B7", borderRadius: "2px" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction Ref</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Amount Paid</TableCell>
                          <TableCell>Payment Method</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockPayments.map((p, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ fontFamily: "monospace", fontWeight: 700 }}>{p.ref}</TableCell>
                            <TableCell>{p.date}</TableCell>
                            <TableCell sx={{ fontFamily: "monospace", fontWeight: 700 }}>₹{p.amount.toFixed(2)}</TableCell>
                            <TableCell>{p.mode}</TableCell>
                            <TableCell>
                              <Chip
                                label={p.status}
                                size="small"
                                sx={{
                                  bgcolor: "#FFFDF8",
                                  color: "#087A5A",
                                  border: "1px solid #087A5A",
                                  fontWeight: 800,
                                  fontSize: "0.68rem",
                                  borderRadius: "2px",
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Tab 3: Meter Reading Logs */}
              {activeTab === 3 && (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", mb: 3, fontSize: "1.25rem" }}>
                    Meter Reading Ledger
                  </Typography>
                  <TableContainer sx={{ border: "1px solid #C9C3B7", borderRadius: "2px" }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Reading Date</TableCell>
                          <TableCell>Current Register</TableCell>
                          <TableCell>Previous Register</TableCell>
                          <TableCell>Consumption Delta</TableCell>
                          <TableCell>Submission Channel</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockReadings.map((r, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{r.date}</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontFamily: "monospace" }}>{r.reading}</TableCell>
                            <TableCell sx={{ fontFamily: "monospace" }}>{r.previous}</TableCell>
                            <TableCell sx={{ color: "#075BB5", fontWeight: 800, fontFamily: "monospace" }}>
                              {r.units} kWh
                            </TableCell>
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
        </Box>
      </Container>
    </Box>
  );
};

export default ConsumerPreview;
