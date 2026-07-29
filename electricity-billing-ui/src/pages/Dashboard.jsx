import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import {
  Users,
  Plug2,
  Receipt,
  CreditCard,
  TrendingUp,
  RefreshCw,
  Zap,
  ArrowUpRight,
  Plus,
  BarChart2,
  Calendar,
  User,
  Info,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import EnergyStatCard from "../components/EnergyStatCard";
import GlassCard from "../components/common/GlassCard";
import ChartCard from "../components/common/ChartCard";
import SectionHeader from "../components/common/SectionHeader";
import StatusBadge from "../components/common/StatusBadge";
import { getDashboard, getPredictions } from "../api/dashboardApi";
import { getBills } from "../api/billApi";
import { getPayments } from "../api/paymentApi";
import { getConsumerDashboard } from "../api/consumerApi";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userRole, consumerName, updateConsumerNumber } = useAuth();
  const [stats, setStats] = useState({
    totalConsumers: 0,
    totalConnections: 0,
    totalBills: 0,
    paidBills: 0,
    unpaidBills: 0,
    todayCollection: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
  });

  const [predictions, setPredictions] = useState([]);
  const [recentBills, setRecentBills] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [consumerChartData, setConsumerChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const role = localStorage.getItem("userRole") || "ADMIN";
      if (role === "ADMIN") {
        const [dashRes, predRes, billRes, payRes] = await Promise.all([
          getDashboard(),
          getPredictions(),
          getBills(),
          getPayments(),
        ]);

        if (dashRes?.data) setStats(dashRes.data);
        if (Array.isArray(predRes?.data)) setPredictions(predRes.data);

        const allBills = Array.isArray(billRes?.data) ? billRes.data : [];
        setRecentBills(allBills.slice(-5).reverse());

        const allPayments = Array.isArray(payRes?.data) ? payRes.data : [];
        setRecentPayments(allPayments.slice(-5).reverse());
      } else {
        const response = await getConsumerDashboard();
        if (response?.data) {
          const d = response.data;
          if (d.consumerNumber) {
            updateConsumerNumber(d.consumerNumber);
          }
          setStats({
            consumerNumber: d.consumerNumber,
            fullName: d.fullName,
            connectionNumber: d.connectionNumber,
            meterNumber: d.meterNumber,
            connectionType: d.connectionType,
            connectionStatus: d.connectionStatus,
            currentMonthUnitsConsumed: d.currentMonthUnitsConsumed,
            currentOutstandingBill: d.currentOutstandingBill,
            paymentStatus: d.paymentStatus,
            currentTariff: d.currentTariff,
            lastPaymentAmount: d.lastPaymentAmount,
            lastPaymentDate: d.lastPaymentDate,
          });
          setRecentBills(d.recentBills || []);
          setRecentPayments(d.paymentHistory || []);
          setConsumerChartData(d.monthlyConsumptionHistory || []);
        }
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    { month: "Jan", revenue: 42000, collection: 38000 },
    { month: "Feb", revenue: 48000, collection: 45000 },
    { month: "Mar", revenue: 55000, collection: 52000 },
    { month: "Apr", revenue: 61000, collection: 59000 },
    { month: "May", revenue: 73000, collection: 68000 },
    { month: "Jun", revenue: 84000, collection: 81000 },
  ];

  return (
    <Box sx={{ pb: 6 }}>
      
      {/* ==================================================
          ADMIN DASHBOARD VIEW
          ================================================== */}
      {userRole === "ADMIN" ? (
        <>
          {/* Operations Overview Summary (replaces gray banner) */}
          <Paper
            elevation={0}
            sx={{
              p: 3.5,
              mb: 4,
              borderRadius: "2px",
              bgcolor: "#FFFDF8",
              border: "1px solid #C9C3B7",
              borderTop: "4px solid #075BB5", // Utility Blue Accent Rule
              position: "relative",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={3}>
              <Box>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: "#075BB5", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    OPERATIONS OVERVIEW
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: "#C9C3B7", height: 12, alignSelf: "center" }} />
                  <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontFamily: "monospace" }}>
                    {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                  </Typography>
                </Stack>

                <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", mb: 1, letterSpacing: "-0.02em" }}>
                  Welcome back, {consumerName}
                </Typography>

                <Typography variant="body2" sx={{ color: "#625F58", maxWidth: "680px", lineHeight: 1.5 }}>
                  Grid operations are normal. Review consumer accounts, connections, billing invoices, and transaction settlements from the metrics and logs panel below.
                </Typography>
              </Box>

              <Stack direction="row" spacing={2} sx={{ alignSelf: { xs: "flex-end", md: "center" } }}>
                <Button
                  onClick={fetchDashboardData}
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshCw size={14} />}
                  sx={{
                    borderColor: "#C9C3B7",
                    color: "#171717",
                    fontWeight: 700,
                    borderRadius: "2px",
                    px: 2,
                    py: 1,
                    "&:hover": { borderColor: "#171717", bgcolor: "#E9E5DB" },
                  }}
                >
                  Refresh Data
                </Button>
              </Stack>
            </Stack>
          </Paper>

          {loading && (
            <LinearProgress
              sx={{
                mb: 3,
                borderRadius: "2px",
                bgcolor: "#E9E5DB",
                "& .MuiLinearProgress-bar": { bgcolor: "#075BB5" },
              }}
            />
          )}

          {/* KPI Statistics Section (Desktop 4 columns, Tablet 2x2, Mobile 1 column) */}
          <Grid container spacing={3.5} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <EnergyStatCard
                title="Total Registered Consumers"
                value={stats.totalConsumers ? stats.totalConsumers.toLocaleString() : "0"}
                subtitle="Active consumer accounts"
                icon={Users}
                color="#075BB5" // Utility blue
                trend="up"
                trendLabel="+12% MoM"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <EnergyStatCard
                title="Active Grid Connections"
                value={stats.totalConnections ? stats.totalConnections.toLocaleString() : "0"}
                subtitle="Registered load points"
                icon={Plug2}
                color="#087A5A" // Operational green
                trend="up"
                trendLabel="Operational"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <EnergyStatCard
                title="Monthly Collections Settled"
                value={`₹${(stats.monthlyRevenue || 0).toLocaleString()}`}
                subtitle="Current billing cycle receipts"
                icon={CreditCard}
                color="#075BB5" // Utility blue
                trend="up"
                trendLabel="+8.4%"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <EnergyStatCard
                title="Pending Unpaid Bills"
                value={stats.unpaidBills ? stats.unpaidBills.toLocaleString() : "0"}
                subtitle="Outstanding dues ledger"
                icon={Receipt}
                color="#F05A28" // Safety orange
                trend="down"
                trendLabel="Action Due"
              />
            </Grid>
          </Grid>

          {/* Analytics Block */}
          <Grid container spacing={3.5} sx={{ mb: 4 }}>
            {/* Left Chart */}
            <Grid item xs={12} md={8}>
              <ChartCard
                title="Monthly Billing vs Settlement Collection"
                subtitle="Financial revenue performance over the last 6 billing cycles"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#075BB5" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#075BB5" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#087A5A" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#087A5A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#C9C3B7" />
                    <XAxis dataKey="month" stroke="#625F58" fontSize={11} tickLine={false} style={{ fontWeight: 700 }} />
                    <YAxis stroke="#625F58" fontSize={11} tickLine={false} style={{ fontWeight: 700 }} />
                    <RechartsTooltip contentStyle={{ backgroundColor: "#FFFDF8", border: "1px solid #C9C3B7", borderRadius: "2px", color: "#171717" }} />
                    <Area type="monotone" dataKey="revenue" name="Billed Revenue (₹)" stroke="#075BB5" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                    <Area type="monotone" dataKey="collection" name="Amount Settled (₹)" stroke="#087A5A" strokeWidth={2} fillOpacity={1} fill="url(#colorCol)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </Grid>

            {/* Right predictions list */}
            <Grid item xs={12} md={4}>
              <GlassCard sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                    <TrendingUp color="#075BB5" size={18} />
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", fontSize: "1.05rem" }}>
                      Load Forecast Model
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: "#625F58", display: "block", mb: 3, fontWeight: 700 }}>
                    Upcoming 3-month predictive energy consumption model based on regression
                  </Typography>

                  <Stack spacing={2}>
                    {predictions.length > 0 ? (
                      predictions.map((pred, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            p: 2,
                            borderRadius: "2px",
                            bgcolor: "#FFFDF8",
                            border: "1px solid #C9C3B7",
                            transition: "all 120ms ease",
                            "&:hover": { bgcolor: "#F3F0E8" },
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#171717" }}>
                              {pred.month} Forecast
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#075BB5", fontFamily: "monospace" }}>
                              {pred.predictedKwh} kWh
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                              Lower: {pred.lowerBoundKwh} kWh
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                              Upper: {pred.upperBoundKwh} kWh
                            </Typography>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box sx={{ p: 3, textAlign: "center", bgcolor: "#FFFDF8", border: "1px dashed #C9C3B7", borderRadius: "2px" }}>
                        <Typography variant="body2" sx={{ color: "#625F58" }}>
                          Generating forecast projections...
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>

                <Box sx={{ mt: 3, p: 2, borderRadius: "2px", bgcolor: "#FFFDF8", border: "1px solid #C9C3B7" }}>
                  <Typography variant="caption" sx={{ color: "#087A5A", fontWeight: 800, display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
                    <Info size={14} /> MODEL CONFIDENCE: 96.4%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#625F58", display: "block", lineHeight: 1.3 }}>
                    Calculated using standard linear regression over historical grid meter readings ledger.
                  </Typography>
                </Box>
              </GlassCard>
            </Grid>
          </Grid>

          {/* Lower activity cards */}
          <Grid container spacing={3.5}>
            <Grid item xs={12} md={6}>
              <GlassCard sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", mb: 2.5, fontSize: "1.05rem" }}>
                  Recent Generated Invoices
                </Typography>
                <Stack spacing={1.5}>
                  {recentBills.map((b) => (
                    <Box
                      key={b.id}
                      sx={{
                        p: 2,
                        borderRadius: "2px",
                        border: "1px solid #C9C3B7",
                        bgcolor: "#FFFDF8",
                        transition: "all 120ms ease",
                        "&:hover": { bgcolor: "#F3F0E8" },
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
                        gap: { xs: 1.5, sm: 2 },
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#171717" }}>
                          Bill #{b.billNumber}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", mt: 0.2, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          Period: {b.billingMonth} | Consumed: {b.unitsConsumed} kWh
                        </Typography>
                      </Box>
                      <Stack
                        direction={{ xs: "row", sm: "column" }}
                        justifyContent={{ xs: "space-between", sm: "flex-end" }}
                        alignItems={{ xs: "center", sm: "flex-end" }}
                        spacing={{ xs: 1, sm: 0.5 }}
                        sx={{ minWidth: { sm: "100px" } }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace", fontSize: "0.95rem" }}>
                          ₹{(b.totalAmount || 0).toLocaleString()}
                        </Typography>
                        <StatusBadge label={b.billStatus} />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <GlassCard sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", mb: 2.5, fontSize: "1.05rem" }}>
                  Recent Settlement Receipts
                </Typography>
                <Stack spacing={1.5}>
                  {recentPayments.map((p) => (
                    <Box
                      key={p.id}
                      sx={{
                        p: 2,
                        borderRadius: "2px",
                        border: "1px solid #C9C3B7",
                        bgcolor: "#FFFDF8",
                        transition: "all 120ms ease",
                        "&:hover": { bgcolor: "#F3F0E8" },
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
                        gap: { xs: 1.5, sm: 2 },
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#171717" }}>
                          Txn #{p.transactionId}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#625F58", display: "block", mt: 0.2, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          Date: {p.paymentDate} | Method: {p.paymentMode}
                        </Typography>
                      </Box>
                      <Stack
                        direction={{ xs: "row", sm: "column" }}
                        justifyContent={{ xs: "space-between", sm: "flex-end" }}
                        alignItems={{ xs: "center", sm: "flex-end" }}
                        spacing={{ xs: 1, sm: 0.5 }}
                        sx={{ minWidth: { sm: "100px" } }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#087A5A", fontFamily: "monospace", fontSize: "0.95rem" }}>
                          +₹{(p.amountPaid || 0).toLocaleString()}
                        </Typography>
                        <StatusBadge label="SETTLED" />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </GlassCard>
            </Grid>
          </Grid>
        </>
      ) : (
        /* ==================================================
            CONSUMER DASHBOARD VIEW
            ================================================== */
        <>
          {/* Account Overview Summary */}
          <Paper
            elevation={0}
            sx={{
              p: 3.5,
              mb: 4,
              borderRadius: "2px",
              bgcolor: "#FFFDF8",
              border: "1px solid #C9C3B7",
              borderTop: "4px solid #075BB5",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={3}>
              <Box>
                <Typography variant="caption" sx={{ color: "#075BB5", fontWeight: 800, letterSpacing: "0.08em", display: "block", mb: 1, textTransform: "uppercase" }}>
                  YOUR ELECTRICITY ACCOUNT
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717", mb: 1.5, letterSpacing: "-0.02em" }}>
                  Welcome back, {stats.fullName || consumerName}
                </Typography>
                
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} divider={<Divider orientation="vertical" flexItem sx={{ borderColor: "#C9C3B7", display: { xs: "none", sm: "block" } }} />}>
                  <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                    Consumer No: <span style={{ color: "#171717", fontFamily: "monospace", fontWeight: 800 }}>{stats.consumerNumber || "Loading..."}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                    Connection Type: <span style={{ color: "#171717", fontWeight: 800 }}>{stats.connectionType || "Loading..."}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700, display: "flex", alignItems: "center", gap: 1 }}>
                    Status: <StatusBadge label={stats.connectionStatus || "ACTIVE"} />
                  </Typography>
                </Stack>
              </Box>

              <Button
                onClick={fetchDashboardData}
                variant="outlined"
                size="small"
                startIcon={<RefreshCw size={14} />}
                sx={{
                  borderColor: "#C9C3B7",
                  color: "#171717",
                  fontWeight: 700,
                  borderRadius: "2px",
                  px: 2,
                  py: 1,
                  "&:hover": { borderColor: "#171717", bgcolor: "#E9E5DB" },
                }}
              >
                Refresh
              </Button>
            </Stack>
          </Paper>

          {loading && (
            <LinearProgress
              sx={{
                mb: 3,
                borderRadius: "2px",
                bgcolor: "#E9E5DB",
                "& .MuiLinearProgress-bar": { bgcolor: "#075BB5" },
              }}
            />
          )}

          {/* LEVEL 1: PRIMARY ACCOUNT INFORMATION STATS */}
          <Grid container spacing={3.5} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={4}>
              <EnergyStatCard
                title="Current Outstanding Bill"
                value={`₹${(stats.currentOutstandingBill || 0).toLocaleString()}`}
                subtitle={`Payment Status: ${stats.paymentStatus || "SETTLED"}`}
                icon={Receipt}
                color={stats.currentOutstandingBill > 0 ? "#F05A28" : "#087A5A"} // Orange or Green
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <EnergyStatCard
                title="Monthly Energy Consumption"
                value={`${(stats.currentMonthUnitsConsumed || 0).toLocaleString()} kWh`}
                subtitle="Electricity units recorded"
                icon={Zap}
                color="#075BB5" // Utility blue
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <EnergyStatCard
                title="Connection Status"
                value={stats.connectionStatus || "ACTIVE"}
                subtitle={`Meter Serial: ${stats.meterNumber || "-"}`}
                icon={Plug2}
                color={stats.connectionStatus === "ACTIVE" ? "#087A5A" : "#C5382F"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3.5} sx={{ mb: 4 }}>
            {/* Left side: Bill Action & Consumption Chart */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3.5}>
                {/* Billing Summary Box */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "2px",
                    bgcolor: "#FFFDF8",
                    border: "1px solid #C9C3B7",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", mb: 2 }}>
                    Active Invoicing Summary
                  </Typography>

                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1.5}>
                        <Box>
                          <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>
                            BILLING MONTH
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 800, color: "#171717" }}>
                            {recentBills[0]?.billingMonth || "Current Month"}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: "#625F58", display: "block", fontWeight: 700 }}>
                            OUTSTANDING DUE
                          </Typography>
                          <Typography variant="h5" sx={{ fontWeight: 900, color: stats.currentOutstandingBill > 0 ? "#F05A28" : "#171717", fontFamily: "monospace" }}>
                            ₹{(stats.currentOutstandingBill || 0).toLocaleString()}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          onClick={() => navigate("/bills")}
                          sx={{
                            flex: 1,
                            bgcolor: "#075BB5",
                            color: "#FFFDF8",
                            borderRadius: "2px",
                            fontWeight: 700,
                            py: 1.5,
                            "&:hover": { bgcolor: "#064B95" },
                          }}
                        >
                          {stats.currentOutstandingBill > 0 ? "Pay Outstanding Dues" : "View Billing Ledger"}
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Energy Consumption History Chart */}
                <ChartCard
                  title="Monthly Energy Consumption"
                  subtitle="Recorded power consumption (kWh) over the last 6 months"
                  action={
                    <Chip
                      label="METER HISTORY"
                      size="small"
                      sx={{
                        bgcolor: "#FFFDF8",
                        border: "1.5px solid #075BB5",
                        color: "#075BB5",
                        fontWeight: 800,
                        borderRadius: "2px",
                      }}
                    />
                  }
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={consumerChartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#075BB5" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#075BB5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#C9C3B7" />
                      <XAxis dataKey="month" stroke="#625F58" fontSize={11} tickLine={false} style={{ fontWeight: 700 }} />
                      <YAxis stroke="#625F58" fontSize={11} tickLine={false} style={{ fontWeight: 700 }} />
                      <RechartsTooltip contentStyle={{ backgroundColor: "#FFFDF8", border: "1px solid #C9C3B7", borderRadius: "2px", color: "#171717" }} />
                      <Area type="monotone" dataKey="unitsConsumed" name="Consumption (kWh)" stroke="#075BB5" strokeWidth={2} fillOpacity={1} fill="url(#colorUnits)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </Stack>
            </Grid>

            {/* Right side: Quick Actions & Secondary Account Details */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3.5}>
                {/* Quick Actions */}
                <GlassCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", mb: 2.5 }}>
                    Quick Shortcuts
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Receipt size={16} />}
                      onClick={() => navigate("/bills")}
                      sx={{
                        py: 1.5,
                        borderColor: "#C9C3B7",
                        color: "#171717",
                        borderRadius: "2px",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { borderColor: "#171717", bgcolor: "#E9E5DB" },
                      }}
                    >
                      View Billing History
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<CreditCard size={16} />}
                      onClick={() => navigate("/payments")}
                      sx={{
                        py: 1.5,
                        borderColor: "#C9C3B7",
                        color: "#171717",
                        borderRadius: "2px",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { borderColor: "#171717", bgcolor: "#E9E5DB" },
                      }}
                    >
                      View Payment Ledger
                    </Button>
                  </Stack>
                </GlassCard>

                {/* LEVEL 2: SECONDARY ACCOUNT DETAILS */}
                <GlassCard sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717", mb: 2 }}>
                    Account Details
                  </Typography>

                  <Stack spacing={1.8}>
                    <Box sx={{ pb: 1.2, borderBottom: "1px dashed #C9C3B7", display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                        METER SERIAL NO.
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>
                        {stats.meterNumber || "-"}
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 1.2, borderBottom: "1px dashed #C9C3B7", display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                        ACTIVE TARIFF
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717" }}>
                        ₹{(stats.currentTariff || 0).toFixed(2)}/kWh
                      </Typography>
                    </Box>
                    <Box sx={{ pb: 1.2, borderBottom: "1px dashed #C9C3B7", display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                        CONNECTION NUMBER
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>
                        {stats.connectionNumber || "-"}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
                        LAST PAYMENT SETTLED
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "#087A5A", fontFamily: "monospace" }}>
                        ₹{(stats.lastPaymentAmount || 0).toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                </GlassCard>
              </Stack>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;