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
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

import EnergyStatCard from "../components/EnergyStatCard";
import { getDashboard, getPredictions } from "../api/dashboardApi";
import { getBills } from "../api/billApi";
import { getPayments } from "../api/paymentApi";

const Dashboard = () => {
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
  const [loading, setLoading] = useState(true);

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const consumerName = localStorage.getItem("consumerName") || "Admin User";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
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
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sample Revenue vs Collection Trend Chart Data
  const chartData = [
    { month: "Jan", revenue: 42000, collection: 38000 },
    { month: "Feb", revenue: 48000, collection: 45000 },
    { month: "Mar", revenue: 55000, collection: 52000 },
    { month: "Apr", revenue: 61000, collection: 59000 },
    { month: "May", revenue: 73000, collection: 68000 },
    { month: "Jun", revenue: 84000, collection: 81000 },
  ];

  const categoryData = [
    { category: "Domestic", kWh: 18400, fill: "#0284C7" },
    { category: "Commercial", kWh: 24500, fill: "#10B981" },
    { category: "Industrial", kWh: 39100, fill: "#F59E0B" },
  ];

  return (
    <Box sx={{ pb: 6 }}>
      {/* Executive Welcome Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: "24px",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={3}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Chip
                icon={<Sparkles size={14} color="#38BDF8" />}
                label={userRole === "ADMIN" ? "ENTERPRISE GRID CONTROL" : "CONSUMER PORTAL"}
                size="small"
                sx={{ bgcolor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", fontWeight: 700, fontSize: "0.72rem" }}
              />
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
              </Typography>
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 1 }}>
              Welcome back, {consumerName} 👋
            </Typography>

            <Typography variant="body1" sx={{ color: "#94A3B8", maxWidth: "600px" }}>
              {userRole === "ADMIN"
                ? "Grid Sector-4 status is operating normally. 99.98% load settlement efficiency recorded today."
                : "View your electricity consumption metrics, outstanding bills, and instant payment receipts."}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Tooltip title="Refresh All Data">
              <IconButton
                onClick={fetchDashboardData}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                  color: "#FFFFFF",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.15)" },
                }}
              >
                <RefreshCw size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>

      {/* Progress Bar when loading */}
      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />}

      {/* 4 Primary KPI Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <EnergyStatCard
            title="Total Registered Consumers"
            value={stats.totalConsumers ? stats.totalConsumers.toLocaleString() : "0"}
            subtitle="Active User Accounts"
            icon={Users}
            color="#0284C7"
            trend="up"
            trendLabel="+12% MoM"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <EnergyStatCard
            title="Active Grid Connections"
            value={stats.totalConnections ? stats.totalConnections.toLocaleString() : "0"}
            subtitle="Smart Meter Nodes"
            icon={Plug2}
            color="#10B981"
            trend="up"
            trendLabel="Operational"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <EnergyStatCard
            title="Monthly Revenue Settled"
            value={`₹${(stats.monthlyRevenue || 0).toLocaleString()}`}
            subtitle="Total Collections This Month"
            icon={CreditCard}
            color="#8B5CF6"
            trend="up"
            trendLabel="+8.4%"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <EnergyStatCard
            title="Pending Unpaid Bills"
            value={stats.unpaidBills ? stats.unpaidBills.toLocaleString() : "0"}
            subtitle="Awaiting Consumer Payment"
            icon={Receipt}
            color="#F59E0B"
            trend="down"
            trendLabel="Action Due"
          />
        </Grid>
      </Grid>

      {/* Interactive Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue vs Collections Chart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  Monthly Billing vs Settlement Collection
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B" }}>
                  Financial revenue performance over the last 6 billing cycles
                </Typography>
              </Box>
              <Chip label="2026 AUDITED" size="small" sx={{ bgcolor: "#F1F5F9", color: "#475569", fontWeight: 700 }} />
            </Stack>

            <Box sx={{ height: 320, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#0F172A", border: "none", borderRadius: "12px", color: "#FFF" }} />
                  <Area type="monotone" dataKey="revenue" name="Billed Revenue (₹)" stroke="#0284C7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="collection" name="Amount Settled (₹)" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorCol)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* AI Predictions & Consumption Forecast */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF", height: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <TrendingUp color="#0284C7" size={20} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A" }}>
                AI Load Forecast
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: "#64748B", display: "block", mb: 3 }}>
              Upcoming 3-month predictive energy consumption model
            </Typography>

            <Stack spacing={2}>
              {predictions.length > 0 ? (
                predictions.map((pred, idx) => (
                  <Box key={idx} sx={{ p: 2, borderRadius: "14px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                        {pred.month} Forecast
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0284C7" }}>
                        {pred.predictedKwh} kWh
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" sx={{ color: "#64748B" }}>
                        Lower: {pred.lowerBoundKwh} kWh
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64748B" }}>
                        Upper: {pred.upperBoundKwh} kWh
                      </Typography>
                    </Stack>
                  </Box>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: "center", bgcolor: "#F8FAFC", borderRadius: "14px" }}>
                  <Typography variant="body2" sx={{ color: "#64748B" }}>
                    Generating statistical forecast predictions...
                  </Typography>
                </Box>
              )}
            </Stack>

            <Box sx={{ mt: 3, p: 2, borderRadius: "12px", bgcolor: "rgba(2, 132, 199, 0.05)", border: "1px solid rgba(2, 132, 199, 0.2)" }}>
              <Typography variant="caption" sx={{ color: "#0284C7", fontWeight: 700, display: "block" }}>
                💡 MODEL CONFIDENCE: 96.4%
              </Typography>
              <Typography variant="caption" sx={{ color: "#475569" }}>
                Calculated using linear regression over historical meter reading logs.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Ledger Summary Tables */}
      <Grid container spacing={3}>
        {/* Recent Bills */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A", mb: 2 }}>
              Recent Generated Bills
            </Typography>
            <Stack spacing={1.5}>
              {recentBills.map((b) => (
                <Stack key={b.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, borderRadius: "12px", border: "1px solid #F1F5F9", "&:hover": { bgcolor: "#F8FAFC" } }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                      Bill #{b.billNumber}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748B" }}>
                      Month: {b.billingMonth} | {b.unitsConsumed} kWh
                    </Typography>
                  </Box>
                  <Stack textAlign="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
                      ₹{(b.totalAmount || 0).toLocaleString()}
                    </Typography>
                    <Chip size="small" label={b.billStatus} sx={{ bgcolor: b.billStatus === "PAID" ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: b.billStatus === "PAID" ? "#059669" : "#D97706", fontWeight: 700, fontSize: "0.68rem" }} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Payments */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "20px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A", mb: 2 }}>
              Recent Payment Settlements
            </Typography>
            <Stack spacing={1.5}>
              {recentPayments.map((p) => (
                <Stack key={p.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, borderRadius: "12px", border: "1px solid #F1F5F9", "&:hover": { bgcolor: "#F8FAFC" } }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#0F172A" }}>
                      Txn #{p.transactionId}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#64748B" }}>
                      Date: {p.paymentDate} | Mode: {p.paymentMode}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#10B981" }}>
                      +₹{(p.amountPaid || 0).toLocaleString()}
                    </Typography>
                    <Chip size="small" label="SETTLED" sx={{ bgcolor: "rgba(16,185,129,0.1)", color: "#059669", fontWeight: 700, fontSize: "0.68rem" }} />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;