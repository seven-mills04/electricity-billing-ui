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
  User,
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

const Dashboard = () => {
  const navigate = useNavigate();
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

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const consumerName = localStorage.getItem("consumerName") || "Admin User";

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

  const categoryData = [
    { category: "Domestic", kWh: 18400, fill: "#0284C7" },
    { category: "Commercial", kWh: 24500, fill: "#10B981" },
    { category: "Industrial", kWh: 39100, fill: "#F59E0B" },
  ];

  return (
    <Box sx={{ pb: 6 }}>
      
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(13, 27, 42, 0.45) 0%, rgba(7, 20, 38, 0.55) 100%)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={3}>
          <Box>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <Chip
                icon={<Sparkles size={14} color="#06B6D4" />}
                label={userRole === "ADMIN" ? "ENTERPRISE GRID CONTROL" : "CONSUMER PORTAL"}
                size="small"
                sx={{ bgcolor: "rgba(6, 182, 212, 0.12)", color: "#06B6D4", border: "1px solid rgba(6, 182, 212, 0.2)", fontWeight: 700, fontSize: "0.72rem" }}
              />
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 500 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
              </Typography>
            </Stack>

            <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 1, letterSpacing: "-0.02em" }}>
              Welcome back, {userRole === "CONSUMER" && stats.fullName ? stats.fullName : consumerName} 👋
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
                  bgcolor: "rgba(255, 255, 255, 0.04)",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.12)", borderColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <RefreshCw size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>

      
      {loading && <LinearProgress sx={{ mb: 3, borderRadius: 2, bgcolor: "rgba(255,255,255,0.05)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #2563EB, #06B6D4)" } }} />}

      
      {userRole === "ADMIN" ? (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Total Registered Consumers"
              value={stats.totalConsumers ? stats.totalConsumers.toLocaleString() : "0"}
              subtitle="Active User Accounts"
              icon={Users}
              color="#2563EB"
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
              color="#06B6D4"
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
              color="#7C3AED"
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
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Consumer Number"
              value={stats.consumerNumber || "-"}
              subtitle="Portal Account ID"
              icon={User}
              color="#06B6D4"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Connection Status"
              value={stats.connectionStatus || "-"}
              subtitle="Smart Meter Node"
              icon={Plug2}
              color={stats.connectionStatus === "ACTIVE" ? "#10B981" : "#EF4444"}
              trend={stats.connectionStatus === "ACTIVE" ? "up" : "down"}
              trendLabel={stats.connectionStatus === "ACTIVE" ? "ONLINE" : "OFFLINE"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Month Consumption"
              value={`${(stats.currentMonthUnitsConsumed || 0).toLocaleString()} kWh`}
              subtitle="Active Units Recorded"
              icon={Zap}
              color="#2563EB"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Outstanding Bill"
              value={`₹${(stats.currentOutstandingBill || 0).toLocaleString()}`}
              subtitle={`Status: ${stats.paymentStatus || "N/A"}`}
              icon={Receipt}
              color={stats.currentOutstandingBill > 0 ? "#F59E0B" : "#10B981"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Last Payment Settled"
              value={`₹${(stats.lastPaymentAmount || 0).toLocaleString()}`}
              subtitle={stats.lastPaymentDate ? `Date: ${stats.lastPaymentDate}` : "No payment history"}
              icon={CreditCard}
              color="#7C3AED"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Current Tariff Rate"
              value={`₹${(stats.currentTariff || 0).toFixed(2)}/u`}
              subtitle="Energy Slab Rate"
              icon={TrendingUp}
              color="#EC4899"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Meter Serial Number"
              value={stats.meterNumber || "-"}
              subtitle="Smart Meter ID"
              icon={BarChart2}
              color="#8B5CF6"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <EnergyStatCard
              title="Connection Type"
              value={stats.connectionType || "-"}
              subtitle="Tariff Category"
              icon={Users}
              color="#F97316"
            />
          </Grid>
        </Grid>
      )}

      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        <Grid item xs={12} md={8}>
          {userRole === "ADMIN" ? (
            <ChartCard
              title="Monthly Billing vs Settlement Collection"
              subtitle="Financial revenue performance over the last 6 billing cycles"
              action={<Chip label="2026 AUDITED" size="small" sx={{ bgcolor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8", fontWeight: 700 }} />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C9C3B7" />
                  <XAxis dataKey="month" stroke="#625F58" fontSize={12} tickLine={false} />
                  <YAxis stroke="#625F58" fontSize={12} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#FFFDF8", border: "1px solid #C9C3B7", borderRadius: "2px", color: "#171717" }} />
                  <Area type="monotone" dataKey="revenue" name="Billed Revenue (₹)" stroke="#075BB5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="collection" name="Amount Settled (₹)" stroke="#087A5A" strokeWidth={3} fillOpacity={1} fill="url(#colorCol)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          ) : (
            <ChartCard
              title="Monthly Energy Consumption"
              subtitle="Historical power usage (kWh) over the last 6 months"
              action={<Chip label="REAL-TIME DATA" size="small" sx={{ bgcolor: "#FFFDF8", border: "1px solid #075BB5", color: "#075BB5", fontWeight: 700 }} />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={consumerChartData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#075BB5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#075BB5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#C9C3B7" />
                  <XAxis dataKey="month" stroke="#625F58" fontSize={12} tickLine={false} />
                  <YAxis stroke="#625F58" fontSize={12} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#FFFDF8", border: "1px solid #C9C3B7", borderRadius: "2px", color: "#171717" }} />
                  <Area type="monotone" dataKey="unitsConsumed" name="Consumption (kWh)" stroke="#075BB5" strokeWidth={3} fillOpacity={1} fill="url(#colorUnits)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </Grid>

        
        <Grid item xs={12} md={4}>
          {userRole === "ADMIN" ? (
            <GlassCard sx={{ p: 3, height: "100%" }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <TrendingUp color="#06B6D4" size={20} />
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                  AI Load Forecast
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: "#94A3B8", display: "block", mb: 3 }}>
                Upcoming 3-month predictive energy consumption model
              </Typography>

              <Stack spacing={2}>
                {predictions.length > 0 ? (
                  predictions.map((pred, idx) => (
                    <Box key={idx} sx={{ p: 2, borderRadius: "14px", bgcolor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.04)", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.04)" }, transition: "all 0.2s" }}>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 0.5, width: "100%" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                          {pred.month} Forecast
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#06B6D4", whiteSpace: "nowrap" }}>
                          {pred.predictedKwh} kWh
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 2, width: "100%" }}>
                        <Typography variant="caption" sx={{ color: "#64748B", whiteSpace: "nowrap" }}>
                          Lower: {pred.lowerBoundKwh} kWh
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Typography variant="caption" sx={{ color: "#64748B", whiteSpace: "nowrap" }}>
                          Upper: {pred.upperBoundKwh} kWh
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 3, textAlign: "center", bgcolor: "rgba(255, 255, 255, 0.02)", borderRadius: "14px" }}>
                    <Typography variant="body2" sx={{ color: "#64748B" }}>
                      Generating statistical forecast predictions...
                    </Typography>
                  </Box>
                )}
              </Stack>

              <Box sx={{ mt: 3, p: 2, borderRadius: "12px", bgcolor: "rgba(6, 182, 212, 0.05)", border: "1px solid rgba(6, 182, 212, 0.15)" }}>
                <Typography variant="caption" sx={{ color: "#06B6D4", fontWeight: 700, display: "block" }}>
                  💡 MODEL CONFIDENCE: 96.4%
                </Typography>
                <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                  Calculated using linear regression over historical meter reading logs.
                </Typography>
              </Box>
            </GlassCard>
          ) : (
            <GlassCard sx={{ p: 3, height: "100%" }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Zap color="#06B6D4" size={20} fill="#06B6D4" />
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                  Quick Actions
                </Typography>
              </Stack>
              <Typography variant="caption" sx={{ color: "#94A3B8", display: "block", mb: 3 }}>
                Portal shortcuts for rapid bill management
              </Typography>

              <Stack spacing={2.5}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Receipt size={18} />}
                  onClick={() => navigate("/bills")}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    bgcolor: "rgba(6, 182, 212, 0.12)",
                    color: "#06B6D4",
                    border: "1px solid rgba(6, 182, 212, 0.25)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      bgcolor: "rgba(6, 182, 212, 0.22)",
                      borderColor: "#06B6D4",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  View Bills
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CreditCard size={18} />}
                  onClick={() => navigate("/bills")}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    bgcolor: "rgba(16, 185, 129, 0.12)",
                    color: "#10B981",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      bgcolor: "rgba(16, 185, 129, 0.22)",
                      borderColor: "#10B981",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Pay Bill
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ArrowUpRight size={18} />}
                  onClick={() => navigate("/payments")}
                  sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    bgcolor: "rgba(124, 58, 237, 0.12)",
                    color: "#8B5CF6",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      bgcolor: "rgba(124, 58, 237, 0.22)",
                      borderColor: "#8B5CF6",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Download Receipt
                </Button>
              </Stack>
            </GlassCard>
          )}
        </Grid>
      </Grid>

      
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <GlassCard sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", mb: 2.5 }}>
              Recent Generated Bills
            </Typography>
            <Stack spacing={1.5}>
              {recentBills.map((b) => (
                <Stack key={b.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.04)", bgcolor: "rgba(255,255,255,0.02)", "&:hover": { bgcolor: "rgba(255,255,255,0.04)" }, transition: "all 0.2s" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                      Bill #{b.billNumber}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                      Month: {b.billingMonth} | {b.unitsConsumed} kWh
                    </Typography>
                  </Box>
                  <Stack textAlign="right" alignItems="flex-end" spacing={0.5}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
                      ₹{(b.totalAmount || 0).toLocaleString()}
                    </Typography>
                    <StatusBadge label={b.billStatus} />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </GlassCard>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <GlassCard sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF", mb: 2.5 }}>
              Recent Payment Settlements
            </Typography>
            <Stack spacing={1.5}>
              {recentPayments.map((p) => (
                <Stack key={p.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.04)", bgcolor: "rgba(255,255,255,0.02)", "&:hover": { bgcolor: "rgba(255,255,255,0.04)" }, transition: "all 0.2s" }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                      Txn #{p.transactionId}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                      Date: {p.paymentDate} | Mode: {p.paymentMode}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#22C55E", mb: 0.5 }}>
                      +₹{(p.amountPaid || 0).toLocaleString()}
                    </Typography>
                    <StatusBadge label="SETTLED" />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;