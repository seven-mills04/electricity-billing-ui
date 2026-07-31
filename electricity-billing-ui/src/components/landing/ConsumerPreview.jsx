import React, { useState } from "react";
import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";

const ConsumerPreview = () => {
  const navigate = useNavigate();
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
            maxWidth: { xs: "100%", md: 1140, lg: 1200 },
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
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" spacing={0.8} alignItems="center">
              {/* Dots */}
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#C5382F" }} />
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#F05A28" }} />
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#087A5A" }} />
            </Stack>

            {/* Mock URL bar */}
            <Box
              sx={{
                bgcolor: "#FFFDF8",
                border: "1px solid #C9C3B7",
                borderRadius: "2px",
                ml: { xs: 0, sm: 2 },
                px: 2,
                py: 0.25,
                width: { xs: "100%", sm: "50%" },
                maxWidth: 400,
                fontSize: "0.72rem",
                color: "#625F58",
                fontFamily: "monospace",
                order: { xs: 3, sm: 2 },
              }}
            >
              https://portal.knkpower.co.in/dashboard
            </Box>

            {/* Sample Account Badge */}
            <Box sx={{ ml: { xs: 0, sm: "auto" }, order: { xs: 2, sm: 3 } }}>
              <Chip
                label="SAMPLE DEMO ACCOUNT"
                size="small"
                sx={{
                  bgcolor: "rgba(7, 91, 181, 0.1)",
                  color: "#075BB5",
                  border: "1px solid rgba(7, 91, 181, 0.2)",
                  fontWeight: 800,
                  fontSize: "0.65rem",
                  borderRadius: "2px",
                  height: 20,
                }}
              />
            </Box>
          </Box>

          {/* Main 2-Column Application Preview Body Layout */}
          <Box
            className="portal-preview-body"
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "190px minmax(0, 1fr)",
                md: "220px minmax(0, 1fr)",
              },
              bgcolor: "#FFFDF8",
              minHeight: 450,
            }}
          >
            {/* Left Sidebar Menu */}
            <Box
              component="aside"
              className="portal-sidebar"
              sx={{
                borderRight: { xs: "none", sm: "1px solid #C9C3B7" },
                borderBottom: { xs: "1px solid #C9C3B7", sm: "none" },
                bgcolor: "#F3F0E8", // warm paper sidebar background
              }}
            >
              <Box sx={{ p: 2, display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1.5 }}>
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
                <Box sx={{ overflow: "hidden" }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dr. Aditya Sen
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#625F58", fontFamily: "monospace", fontWeight: 700 }}>
                    CON-984210
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: "#C9C3B7", mb: 1, display: { xs: "none", sm: "block" } }} />

              {/* Vertical tabs for desktop/tablet */}
              <Tabs
                orientation="vertical"
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                  display: { xs: "none", sm: "flex" },
                  "& .MuiTabs-indicator": { left: 0, right: "auto", width: 4, bgcolor: "#075BB5" },
                  "& .MuiTab-root": {
                    alignItems: "flex-start",
                    textAlign: "left",
                    pl: 2.5,
                    pr: 1.5,
                    py: 1.5,
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "none",
                    color: "#625F58",
                    minHeight: 44,
                    "&.Mui-selected": { color: "#075BB5" },
                  },
                }}
              >
                <Tab label="Current Bill Details" icon={<FileText size={16} />} iconPosition="start" />
                <Tab label="Consumer Profile" icon={<User size={16} />} iconPosition="start" />
                <Tab label="Payment Settlements" icon={<CreditCard size={16} />} iconPosition="start" />
                <Tab label="Meter Reading Logs" icon={<Activity size={16} />} iconPosition="start" />
              </Tabs>

              {/* Horizontal scrollable tabs for mobile */}
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  display: { xs: "flex", sm: "none" },
                  bgcolor: "#E9E5DB",
                  "& .MuiTabs-indicator": { height: 3, bgcolor: "#075BB5" },
                  "& .MuiTab-root": {
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    textTransform: "none",
                    color: "#625F58",
                    minWidth: "auto",
                    py: 1.5,
                    px: 2,
                    "&.Mui-selected": { color: "#075BB5" },
                  },
                }}
              >
                <Tab label="Bill Details" icon={<FileText size={14} />} iconPosition="start" />
                <Tab label="Profile" icon={<User size={14} />} iconPosition="start" />
                <Tab label="Payments" icon={<CreditCard size={14} />} iconPosition="start" />
                <Tab label="Meter Logs" icon={<Activity size={14} />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* Right Main Content Preview Area */}
            <Box
              component="main"
              className="portal-preview-content"
              sx={{
                p: { xs: 2, sm: 3, md: 3.5 },
                bgcolor: "#FFFDF8",
                minWidth: 0,
                width: "100%",
              }}
            >
              {/* Tab 0: Current Bill Details */}
              {activeTab === 0 && (
                <Box>
                  {/* Account Overview Header */}
                  <Typography variant="h5" sx={{ fontWeight: 900, color: "#171717", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
                    Account Overview
                  </Typography>
                  
                  {/* Account Overview Grid - 4 Cards */}
                  <Grid container spacing={2} sx={{ mb: 3.5 }}>
                    <Grid item xs={6} sm={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: "#F3F0E8", border: "1px solid #C9C3B7", borderRadius: "2px", height: "100%" }}>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                          Current Bill
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.95rem", mt: 0.5 }}>
                          ₹1,800.75
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: "#F3F0E8", border: "1px solid #C9C3B7", borderRadius: "2px", height: "100%" }}>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                          Usage
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.95rem", mt: 0.5 }}>
                          320 kWh
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: "#F3F0E8", border: "1px solid #C9C3B7", borderRadius: "2px", height: "100%" }}>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                          Due Date
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.95rem", mt: 0.5 }}>
                          20 Jul 2026
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                      <Box sx={{ p: 2, bgcolor: "#F3F0E8", border: "1px solid #C9C3B7", borderRadius: "2px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem" }}>
                          Connection
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          <Chip
                            label="ACTIVE"
                            size="small"
                            sx={{
                              bgcolor: "rgba(8, 122, 90, 0.1)",
                              color: "#087A5A",
                              border: "1px solid rgba(8, 122, 90, 0.2)",
                              fontWeight: 800,
                              borderRadius: "2px",
                              height: 18,
                              fontSize: "0.62rem",
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Current Bill & Energy Usage 2-Column Row */}
                  <Grid container spacing={3} sx={{ mb: 3.5 }}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: "#171717", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
                        Current Bill
                      </Typography>
                      <Card
                        variant="outlined"
                        sx={{
                          borderRadius: "2px",
                          border: "1px solid #C9C3B7",
                          bgcolor: "#FFFDF8",
                          boxShadow: "none",
                          height: "calc(100% - 30px)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <CardContent sx={{ p: 2.5 }}>
                          <Stack spacing={1.5}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1 }}>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.9rem" }}>
                                  July 2026 statement
                                </Typography>
                                <Typography variant="caption" sx={{ color: "#625F58", display: "block", mt: 0.25 }}>
                                  320 kWh consumed &bull; Payment due 20 July 2026
                                </Typography>
                              </Box>
                              <Typography variant="body1" sx={{ fontWeight: 900, color: "#075BB5", fontSize: "1.15rem" }}>
                                ₹1,800.75
                              </Typography>
                            </Box>
                            <Divider sx={{ borderColor: "#C9C3B7" }} />
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => navigate("/login", { state: { tab: 1 } })}
                              sx={{
                                bgcolor: "#075BB5",
                                color: "#FFFDF8",
                                borderRadius: "2px",
                                fontWeight: 700,
                                textTransform: "none",
                                px: 2.5,
                                py: 0.75,
                                fontSize: "0.78rem",
                                alignSelf: "flex-start",
                                "&:hover": { bgcolor: "#064B95" },
                              }}
                            >
                              Pay Bill
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: "#171717", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
                        Energy Usage
                      </Typography>
                      <Box sx={{ p: 2, border: "1px solid #C9C3B7", borderRadius: "2px", bgcolor: "#F3F0E8", height: "calc(100% - 30px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        {/* SVG Bar Chart */}
                        <Box sx={{ width: "100%", height: 160, position: "relative" }}>
                          <svg viewBox="0 0 300 140" width="100%" height="100%">
                            {/* Grid lines */}
                            <line x1="30" y1="20" x2="290" y2="20" stroke="#C9C3B7" strokeDasharray="3,3" strokeWidth="0.5" />
                            <line x1="30" y1="60" x2="290" y2="60" stroke="#C9C3B7" strokeDasharray="3,3" strokeWidth="0.5" />
                            <line x1="30" y1="100" x2="290" y2="100" stroke="#C9C3B7" strokeDasharray="3,3" strokeWidth="0.5" />
                            <line x1="30" y1="120" x2="290" y2="120" stroke="#171717" strokeWidth="1" />
                            
                            {/* Y-axis labels */}
                            <text x="5" y="24" fill="#625F58" fontSize="8" fontWeight="700" fontFamily="sans-serif">300</text>
                            <text x="5" y="64" fill="#625F58" fontSize="8" fontWeight="700" fontFamily="sans-serif">200</text>
                            <text x="5" y="104" fill="#625F58" fontSize="8" fontWeight="700" fontFamily="sans-serif">100</text>
                            <text x="15" y="123" fill="#625F58" fontSize="8" fontWeight="700" fontFamily="sans-serif">0</text>
                            
                            {/* Bars */}
                            <rect x="45" y="36" width="22" height="84" fill="#075BB5" rx="1" />
                            <rect x="85" y="24" width="22" height="96" fill="#075BB5" rx="1" />
                            <rect x="125" y="8" width="22" height="112" fill="#075BB5" rx="1" />
                            <rect x="165" y="4" width="22" height="116" fill="#075BB5" rx="1" />
                            <rect x="205" y="12" width="22" height="108" fill="#075BB5" rx="1" />
                            <rect x="245" y="2" width="22" height="118" fill="#F05A28" rx="1" />
                            
                            {/* X-axis labels */}
                            <text x="56" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">Feb</text>
                            <text x="96" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">Mar</text>
                            <text x="136" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">Apr</text>
                            <text x="176" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">May</text>
                            <text x="216" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">Jun</text>
                            <text x="256" y="132" fill="#171717" fontSize="8" fontWeight="700" textAnchor="middle">Jul</text>
                          </svg>
                        </Box>
                        
                        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px dashed #C9C3B7", display: "flex", justifyContent: "space-between" }}>
                          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.72rem" }}>Peak Load (July)</Typography>
                          <Typography variant="body2" sx={{ color: "#171717", fontWeight: 800, fontSize: "0.75rem" }}>1.85 kW</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  {/* Service & Meter Profile */}
                  <Box sx={{ mb: 3.5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: "#171717", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
                      Service & Meter Profile
                    </Typography>
                    <Box sx={{ p: 2, border: "1px solid #C9C3B7", borderRadius: "2px", bgcolor: "#F3F0E8" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.72rem", display: "block" }}>Connection Status</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#087A5A", fontSize: "0.8rem", mt: 0.25 }}>ACTIVE</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.72rem", display: "block" }}>Meter Serial No.</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace", fontSize: "0.8rem", mt: 0.25 }}>SPX-8800-M1</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.72rem", display: "block" }}>Tariff Class</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.8rem", mt: 0.25 }}>Commercial</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.72rem", display: "block" }}>Service Sector</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontSize: "0.8rem", mt: 0.25 }}>Sector 4</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                  {/* Outstanding Invoice Summary Section */}
                  <Box sx={{ mt: 3.5, pt: 3.5, borderTop: "1px solid #C9C3B7" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                        mb: 2.5
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", fontSize: "1.1rem" }}>
                        Outstanding Invoice Summary
                      </Typography>
                      <Chip
                        label="UNPAID"
                        size="small"
                        sx={{
                          bgcolor: "#FFFDF8",
                          color: "#F05A28",
                          border: "1.5px solid #F05A28",
                          fontWeight: 800,
                          borderRadius: "2px",
                        }}
                      />
                    </Box>
                    
                    <Grid container spacing={2.5}>
                      <Grid item xs={12} md={8}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderRadius: "2px",
                            border: "1px dashed #075BB5",
                            bgcolor: "#F3F0E8",
                            boxShadow: "none",
                          }}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>Billing Month</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717" }}>{mockBill.billingMonth}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>Bill Reference</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>{mockBill.billNo}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>Units Consumed</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>{mockBill.unitsConsumed} kWh</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>Payment Due Date</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: "#C5382F" }}>{mockBill.dueDate}</Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            border: "1px solid #C9C3B7",
                            borderRadius: "2px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            bgcolor: "#E9E5DB",
                            p: 2,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "#625F58", display: "block", mb: 0.5, fontWeight: 700 }}>
                            Total Amount Due
                          </Typography>
                          <Typography
                            variant="h3"
                            sx={{ fontWeight: 900, color: "#075BB5", fontFamily: "monospace", mb: 1, fontSize: "1.4rem" }}
                          >
                            ₹{mockBill.totalAmount.toLocaleString()}
                          </Typography>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate("/login", { state: { tab: 1 } })}
                            sx={{
                              bgcolor: "#075BB5",
                              color: "#FFFDF8",
                              borderRadius: "2px",
                              fontWeight: 700,
                              py: 0.75,
                              textTransform: "none",
                              fontSize: "0.78rem",
                              "&:hover": { bgcolor: "#064B95" },
                            }}
                          >
                            Settle Bill Now
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
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
                        <Typography variant="caption" sx={{ color: "#625F58" }}>Sanctioned Load</Typography>
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
            </Box>
          </Box>
        </Box>

        {/* Landing Page CTA below the Mock Browser */}
        <Stack alignItems="center" spacing={2.5} sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "#171717", fontWeight: 800, fontSize: "1.05rem" }}>
            Manage your electricity account online.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/login", { state: { tab: 1 } })}
            sx={{
              bgcolor: "#075BB5",
              color: "#FFFDF8",
              borderRadius: "2px",
              fontWeight: 800,
              px: 4.5,
              py: 1.6,
              textTransform: "uppercase",
              fontSize: "0.85rem",
              letterSpacing: "0.06em",
              border: "2px solid #171717",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#FFFDF8",
                color: "#075BB5",
                borderColor: "#075BB5",
              },
              transition: "all 150ms ease",
            }}
          >
            Open Consumer Portal
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ConsumerPreview;
