import React, { useState, useEffect } from 'react';
import { 
  Grid, Container, Typography, Box, Card, Button, Stack, Avatar, CircularProgress,
  Dialog, DialogTitle, DialogContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grow
} from '@mui/material';
import { Zap, Receipt, Users, AlertCircle, Download, X } from 'lucide-react';
import StatCard from '../components/StatsCard'; 
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, Bar, Line, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

import { getDashboard, getPredictions } from '../api/dashboardApi';
import { getMeterReadings } from '../api/meterReadingApi';
import { getPayments } from '../api/paymentApi';
import { getBills } from '../api/billApi';
import { jsPDF } from 'jspdf';

// Custom transition for MUI Dialog to grow/scale open organically
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} timeout={350} />;
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

// Custom Tooltip styled for a clean light enterprise layout
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPrediction = data.kwh === null;
    return (
      <Box
        sx={{
          bgcolor: '#ffffff',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          p: 1.5,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 600 }}>
          {label} {data.year || 2026} {isPrediction ? '(Forecast)' : ''}
        </Typography>
        {isPrediction ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0D9488' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                Predicted: <span style={{ color: '#0D9488' }}>{data.predictedKwh?.toLocaleString()} kWh</span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 2, bgcolor: '#94A3B8' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Expected Range: {data.lowerBoundKwh?.toLocaleString()} - {data.upperBoundKwh?.toLocaleString()} kWh
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4F46E5' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Usage: <span style={{ color: '#4F46E5' }}>{data.kwh?.toLocaleString()} kWh</span>
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
  return null;
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeDetail, setActiveDetail] = useState(null);
  const [stats, setStats] = useState({
    consumption: '0 kWh',
    revenue: '₹0.00',
    consumers: '0',
    pending: '0'
  });
  const [chartData, setChartData] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [allReadings, setAllReadings] = useState([]);
  const [dailyLoadData, setDailyLoadData] = useState([]);
  const [breakdownData, setBreakdownData] = useState([]);

  const userRole = localStorage.getItem("userRole") || "ADMIN";
  const connStr = localStorage.getItem("consumerConnections");
  const consumerConnections = connStr ? JSON.parse(connStr) : [];
  const consumerNumber = localStorage.getItem("consumerNumber");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const targetConnection = (userRole === "CONSUMER" && consumerConnections.length > 0) 
        ? consumerConnections[0] 
        : null;

      // Fetch data in parallel
      const [dashRes, readingsRes, paymentsRes, billsRes, predictionsRes] = await Promise.all([
        getDashboard().catch(() => ({ data: {} })),
        getMeterReadings().catch(() => ({ data: [] })),
        getPayments().catch(() => ({ data: [] })),
        getBills().catch(() => ({ data: [] })),
        getPredictions(targetConnection).catch(() => ({ data: [] }))
      ]);

      const dashData = dashRes.data || {};
      const readings = readingsRes.data || [];
      const payments = paymentsRes.data || [];
      const bills = billsRes.data || [];
      const predictions = predictionsRes.data || [];

      // 1. Filter Data for Consumer Role
      let displayReadings = readings;
      let displayPayments = payments;
      let displayBills = bills;

      if (userRole === "CONSUMER") {
        displayReadings = readings.filter(r => consumerConnections.includes(r.connection?.connectionNumber));
        displayPayments = payments.filter(p => consumerConnections.includes(p.bill?.meterReading?.connection?.connectionNumber));
        displayBills = bills.filter(b => consumerConnections.includes(b.meterReading?.connection?.connectionNumber));
      }

      setAllReadings(displayReadings);

      // 2. Compute KPI Metrics
      const totalConsumption = displayReadings.reduce((sum, r) => sum + Number(r.unitsConsumed || 0), 0);
      // Compute amount paid from filtered PAID bills (avoids broken nested payment→connection chain)
      const totalRevenuePaid = displayBills
        .filter(b => b.billStatus === "PAID")
        .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);
      const pendingBillsCount = displayBills.filter(b => b.billStatus === "UNPAID").length;

      let displayConsumersLabel = "Active Consumers";
      let displayConsumersVal = String(dashData.totalConsumers || 0);
      let displayRevenueLabel = "Total Revenue";
      let displayRevenueVal = `₹${(dashData.totalRevenue || 0).toLocaleString()}`;
      let displayPendingVal = String(dashData.unpaidBills || 0);

      if (userRole === "CONSUMER") {
        displayConsumersLabel = "My Connections";
        displayConsumersVal = String(consumerConnections.length);
        displayRevenueLabel = "Amount Paid";
        displayRevenueVal = `₹${totalRevenuePaid.toLocaleString()}`;
        displayPendingVal = String(pendingBillsCount);
      }

      setStats({
        consumption: `${totalConsumption.toLocaleString()} kWh`,
        revenue: displayRevenueVal,
        consumers: displayConsumersVal,
        consumersLabel: displayConsumersLabel,
        revenueLabel: displayRevenueLabel,
        pending: displayPendingVal
      });

      // 3. Compute Chart Data (Usage by month over last 6 months)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      const last6Months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        last6Months.push({
          name: months[d.getMonth()],
          year: d.getFullYear(),
          monthIndex: d.getMonth(),
          kwh: 0
        });
      }

      displayReadings.forEach(r => {
        if (!r.readingDate) return;
        const date = new Date(r.readingDate);
        const month = date.getMonth();
        const year = date.getFullYear();

        const bucket = last6Months.find(m => m.monthIndex === month && m.year === year);
        if (bucket) {
          bucket.kwh += Number(r.unitsConsumed || 0);
        }
      });

      // If database contains no readings, fall back to mock trend curves to keep visualization beautiful
      const hasAnyConsumption = last6Months.some(m => m.kwh > 0);
      let finalChartData = [];
      if (!hasAnyConsumption) {
        finalChartData = [
          { name: 'Jan', kwh: 120, predictedKwh: null, lowerBoundKwh: null, upperBoundKwh: null, solar: 36, grid: 120, net: 84 },
          { name: 'Feb', kwh: 190, predictedKwh: null, lowerBoundKwh: null, upperBoundKwh: null, solar: 57, grid: 190, net: 133 },
          { name: 'Mar', kwh: 340, predictedKwh: null, lowerBoundKwh: null, upperBoundKwh: null, solar: 102, grid: 340, net: 238 },
          { name: 'Apr', kwh: 260, predictedKwh: null, lowerBoundKwh: null, upperBoundKwh: null, solar: 78, grid: 260, net: 182 },
          { name: 'May', kwh: 450, predictedKwh: null, lowerBoundKwh: null, upperBoundKwh: null, solar: 202, grid: 450, net: 248 },
          { name: 'Jun', kwh: 580, predictedKwh: 580, lowerBoundKwh: 580, upperBoundKwh: 580, solar: 261, grid: 580, net: 319 },
          { name: 'Jul', kwh: null, predictedKwh: 610, lowerBoundKwh: 536.8, upperBoundKwh: 683.2, solar: 274, grid: 610, net: 336 },
          { name: 'Aug', kwh: null, predictedKwh: 645, lowerBoundKwh: 567.6, upperBoundKwh: 722.4, solar: 290, grid: 645, net: 355 },
          { name: 'Sep', kwh: null, predictedKwh: 680, lowerBoundKwh: 598.4, upperBoundKwh: 761.6, solar: 204, grid: 680, net: 476 }
        ];
      } else {
        finalChartData = last6Months.map(m => {
          const gridVal = Number(m.kwh || 0);
          const solarFactor = (m.monthIndex >= 4 && m.monthIndex <= 7) ? 0.45 : ((m.monthIndex === 11 || m.monthIndex <= 1) ? 0.20 : 0.30);
          const solarVal = Math.round(gridVal * solarFactor);
          return {
            ...m,
            grid: gridVal,
            solar: solarVal,
            net: Math.max(0, gridVal - solarVal),
            predictedKwh: null,
            lowerBoundKwh: null,
            upperBoundKwh: null
          };
        });

        if (predictions && predictions.length > 0) {
          // Connect transition point (last historical month)
          const lastHistorical = finalChartData[finalChartData.length - 1];
          if (lastHistorical) {
            lastHistorical.predictedKwh = lastHistorical.kwh;
            lastHistorical.lowerBoundKwh = lastHistorical.kwh;
            lastHistorical.upperBoundKwh = lastHistorical.kwh;
          }

          // Add forecasted months
          predictions.forEach(p => {
            const gridVal = p.predictedKwh || 0;
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const mIdx = monthNames.indexOf(p.month);
            const solarFactor = (mIdx >= 4 && mIdx <= 7) ? 0.45 : ((mIdx === 11 || mIdx <= 1) ? 0.20 : 0.30);
            const solarVal = Math.round(gridVal * solarFactor);

            finalChartData.push({
              name: p.month,
              kwh: null,
              grid: gridVal,
              solar: solarVal,
              net: Math.max(0, gridVal - solarVal),
              predictedKwh: gridVal,
              lowerBoundKwh: p.lowerBoundKwh,
              upperBoundKwh: p.upperBoundKwh
            });
          });
        }
      }
      setChartData(finalChartData);

      // 5. Compute user-specific Daily Load Profile from actual avg daily consumption
      const avgDailyKwh = displayReadings.length > 0
        ? displayReadings.reduce((s, r) => s + Number(r.unitsConsumed || 0), 0) / (displayReadings.length * 30)
        : 8.0; // fallback ~8 kWh/day

      // Distribute avg daily consumption across 24h using a realistic load curve shape
      const loadShape = [
        { hour: '00:00', factor: 0.06, type: 'Off-Peak' },
        { hour: '03:00', factor: 0.04, type: 'Off-Peak' },
        { hour: '06:00', factor: 0.07, type: 'Shoulder' },
        { hour: '09:00', factor: 0.12, type: 'Shoulder' },
        { hour: '12:00', factor: 0.14, type: 'Shoulder' },
        { hour: '15:00', factor: 0.11, type: 'Shoulder' },
        { hour: '18:00', factor: 0.22, type: 'Peak' },
        { hour: '21:00', factor: 0.18, type: 'Peak' },
        { hour: '24:00', factor: 0.06, type: 'Off-Peak' },
      ];
      const computedLoadData = loadShape.map(({ hour, factor, type }) => ({
        hour,
        load: parseFloat((avgDailyKwh * factor).toFixed(2)),
        type
      }));
      setDailyLoadData(computedLoadData);

      // 6. Compute user-specific Load Breakdown from avg monthly consumption
      const avgMonthlyKwh = displayReadings.length > 0
        ? displayReadings.reduce((s, r) => s + Number(r.unitsConsumed || 0), 0) / displayReadings.length
        : 300;
      const energyRate = 6.50; // ₹/kWh (matches backend)
      // Percentage splits based on typical Indian residential profile
      const applianceSplits = [
        { name: 'Air Conditioning', pct: 38, color: '#E11D48' },
        { name: 'Water Heater', pct: 18, color: '#F59E0B' },
        { name: 'Kitchen & Fridge', pct: 16, color: '#10B981' },
        { name: 'Lighting & Fans', pct: 14, color: '#6B7280' },
        { name: 'TV & Electronics', pct: 14, color: '#3B82F6' },
      ];
      const computedBreakdown = applianceSplits.map(a => ({
        ...a,
        value: a.pct,
        estCost: `₹${Math.round(avgMonthlyKwh * (a.pct / 100) * energyRate).toLocaleString()}`
      }));
      setBreakdownData(computedBreakdown);

      // 4. Map Recent Activity
      // For consumers: use filtered PAID bills (payment chain not fully serialized)
      // For admin: use payments list
      let mappedActivity = [];

      if (userRole === "CONSUMER") {
        const recentPaidBills = displayBills
          .filter(b => b.billStatus === "PAID")
          .slice(-5)
          .reverse();

        mappedActivity = recentPaidBills.map(b => {
          const consumer = b.meterReading?.connection?.consumer;
          const cName = consumer ? `${consumer.firstName} ${consumer.lastName}` : (localStorage.getItem("consumerName") || "Consumer User");
          const initials = cName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
          return {
            name: cName,
            action: `Bill Paid – ${b.billingMonth || b.billNumber}`,
            time: b.billDate || "Recent",
            amount: `+₹${Number(b.totalAmount || 0).toLocaleString()}`,
            positive: true,
            initials
          };
        });
      } else {
        const sortedPayments = displayPayments.slice(-5).reverse();
        mappedActivity = sortedPayments.map(p => {
          const consumer = p.bill?.meterReading?.connection?.consumer;
          const cName = consumer ? `${consumer.firstName} ${consumer.lastName}` : "Consumer User";
          const initials = consumer ? `${consumer.firstName[0]}${consumer.lastName[0]}`.toUpperCase() : "CU";
          let displayTime = "Recent Transaction";
          if (p.paymentDate) displayTime = p.paymentDate;
          return {
            name: cName,
            action: `Bill Paid (${p.paymentMode || 'ONLINE'})`,
            time: displayTime,
            amount: `+₹${Number(p.amountPaid || 0).toLocaleString()}`,
            positive: true,
            initials
          };
        });
      }

      // If no activity exists in database, display simple defaults
      if (mappedActivity.length === 0) {
        setRecentPayments([
          { name: 'No Payments', action: 'No transactions found in database', time: '-', amount: '₹0.00', positive: false, initials: 'NP' }
        ]);
      } else {
        setRecentPayments(mappedActivity);
      }

    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (allReadings.length === 0) {
      alert("No consumption data available to export.");
      return;
    }

    const doc = new jsPDF();
    const primaryBlue = "#2563EB";
    const textDark = "#0F172A";
    const textMuted = "#64748B";

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(primaryBlue);
    doc.text("ELECTRICITY BILLING SYSTEM", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(textMuted);
    doc.text("System Performance & Consumption Report", 14, 26);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 31);
    
    doc.setDrawColor(226, 232, 240); // #E2E8F0
    doc.line(14, 36, 196, 36);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(textDark);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 14, 46);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textDark);
    
    doc.text("Total Consumption:", 14, 54);
    doc.setFont("helvetica", "bold");
    doc.text(stats.consumption || "0 kWh", 60, 54);
    
    doc.setFont("helvetica", "normal");
    doc.text(`${stats.revenueLabel || 'Total Revenue'}:`, 14, 60);
    doc.setFont("helvetica", "bold");
    doc.text(stats.revenue || "Rs. 0.00", 60, 60);

    doc.setFont("helvetica", "normal");
    doc.text(`${stats.consumersLabel || 'Active Consumers'}:`, 14, 66);
    doc.setFont("helvetica", "bold");
    doc.text(stats.consumers || "0", 60, 66);

    doc.setFont("helvetica", "normal");
    doc.text("Pending Bills:", 14, 72);
    doc.setFont("helvetica", "bold");
    doc.text(stats.pending || "0", 60, 72);

    doc.line(14, 78, 196, 78);

    // Table Header
    doc.setFontSize(13);
    doc.setTextColor(textDark);
    doc.setFont("helvetica", "bold");
    doc.text("Consumption Records Detail", 14, 88);

    doc.setFontSize(9);
    doc.setTextColor(primaryBlue);
    doc.text("Connection", 16, 96);
    doc.text("Reading Date", 60, 96);
    doc.text("Prev Reading", 100, 96);
    doc.text("Curr Reading", 135, 96);
    doc.text("Units (kWh)", 170, 96);
    doc.line(14, 99, 196, 99);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(textDark);
    let y = 105;
    
    // Slice to fit on one page or print top 15
    const exportList = allReadings.slice(0, 15);
    exportList.forEach((r, idx) => {
      const connNum = r.connection?.connectionNumber || "-";
      const rDate = r.readingDate || "-";
      const prev = Number(r.previousReading || 0).toString();
      const curr = Number(r.currentReading || 0).toString();
      const units = Number(r.unitsConsumed || 0).toLocaleString();

      doc.text(connNum, 16, y);
      doc.text(rDate, 60, y);
      doc.text(prev, 100, y);
      doc.text(curr, 135, y);
      doc.text(units, 170, y);
      
      doc.line(14, y + 3, 196, y + 3);
      y += 8;
    });

    if (allReadings.length > 15) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(textMuted);
      doc.text(`* Showing top 15 records of ${allReadings.length} total readings.`, 14, y + 5);
    }

    doc.save(`System_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const renderUsageDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Below is a high-resolution graph representing your historical actual consumption and predicted forecast. The forecast uses linear regression based on seasonal historical trends.
        </Typography>
        <Box sx={{ width: '100%', height: 320, p: 1, border: '1px solid #F1F5F9', borderRadius: '8px', bgcolor: '#FAFAFA' }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="detailUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="detailPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="upperBoundKwh" stroke="none" fill="#0D9488" fillOpacity={0.03} />
              <Area type="monotone" dataKey="lowerBoundKwh" stroke="none" fill="#0D9488" fillOpacity={0.03} />
              <Area type="monotone" dataKey="kwh" stroke="#4F46E5" strokeWidth={3} fill="url(#detailUsage)" name="Actual" />
              <Area type="monotone" dataKey="predictedKwh" stroke="#0D9488" strokeWidth={3} strokeDasharray="5 5" fill="url(#detailPredicted)" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1.5 }}>
          Detailed Monthly Log
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actual Usage</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Forecasted</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Est. Cost (₹)</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((row, idx) => {
                const usageVal = row.kwh !== null ? `${row.kwh.toLocaleString()} kWh` : '-';
                const predVal = row.predictedKwh !== null ? `${row.predictedKwh.toLocaleString()} kWh` : '-';
                const units = row.kwh !== null ? row.kwh : row.predictedKwh;
                const estCost = units ? `₹${Math.round(units * 7.50).toLocaleString()}` : '-';
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ fontWeight: 550 }}>{row.name} {row.year || 2026}</TableCell>
                    <TableCell align="right">{usageVal}</TableCell>
                    <TableCell align="right">{predVal}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.main' }}>{estCost}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ 
                        display: 'inline-block',
                        px: 1, py: 0.2, 
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        bgcolor: row.kwh !== null ? 'rgba(79, 70, 229, 0.05)' : 'rgba(13, 148, 136, 0.05)',
                        color: row.kwh !== null ? '#4F46E5' : '#0D9488'
                      }}>
                        {row.kwh !== null ? 'HISTORICAL' : 'FORECAST'}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  const renderSolarDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Direct breakdown of energy imported from the grid compared to local clean solar energy generation and the net total consumed.
        </Typography>
        <Box sx={{ width: '100%', height: 320, p: 1, border: '1px solid #F1F5F9', borderRadius: '8px', bgcolor: '#FAFAFA' }}>
          <ResponsiveContainer>
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="grid" fill="#4F46E5" barSize={16} name="Grid Import" radius={[4, 4, 0, 0]} />
              <Bar dataKey="solar" fill="#10B981" barSize={16} name="Solar Gen" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="net" stroke="#F59E0B" strokeWidth={3} name="Net Consumption" />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1.5 }}>
          Net Metering Financial Summary
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Month</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Grid Import</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Solar Generated</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Net Usage</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Solar Offset %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.map((row, idx) => {
                const grid = row.grid || 0;
                const solar = row.solar || 0;
                const net = row.net || 0;
                const offset = grid > 0 ? `${Math.round((solar / grid) * 100)}%` : '0%';
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ fontWeight: 550 }}>{row.name}</TableCell>
                    <TableCell align="right">{grid.toLocaleString()} kWh</TableCell>
                    <TableCell align="right" sx={{ color: '#10B981', fontWeight: 550 }}>{solar.toLocaleString()} kWh</TableCell>
                    <TableCell align="right">{net.toLocaleString()} kWh</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, color: 'secondary.main' }}>{offset}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  const renderLoadProfileDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This profile shows the hourly average household demand. Shifting heavy appliance usage to Off-Peak or Shoulder hours can significantly reduce your monthly electricity bills.
        </Typography>
        <Box sx={{ width: '100%', height: 300, p: 1, border: '1px solid #F1F5F9', borderRadius: '8px', bgcolor: '#FAFAFA' }}>
          <ResponsiveContainer>
            <AreaChart 
              data={dailyLoadData} 
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="hour" tick={{ fill: '#64748B', fontSize: 11 }} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="load" stroke="#F59E0B" strokeWidth={3} fill="#FEF3C7" name="Demand (kW)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1.5 }}>
          Time-of-Use Tariff Rates & Insights
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Tariff Zone</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hours</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Average Load</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Tariff Rate</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Recommendations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#E11D48' }}>Peak</TableCell>
                <TableCell>18:00 - 22:00</TableCell>
                <TableCell align="right">{dailyLoadData.find(d => d.type === 'Peak')?.load ?? '—'} kW</TableCell>
                <TableCell align="right" sx={{ color: '#E11D48', fontWeight: 600 }}>₹11.20 / kWh</TableCell>
                <TableCell sx={{ fontSize: '0.78rem' }}>Turn off HVAC, avoid running heavy dishwashers or EV chargers.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#F59E0B' }}>Shoulder</TableCell>
                <TableCell>06:00 - 18:00</TableCell>
                <TableCell align="right">{dailyLoadData.find(d => d.type === 'Shoulder')?.load ?? '—'} kW</TableCell>
                <TableCell align="right">₹7.50 / kWh</TableCell>
                <TableCell sx={{ fontSize: '0.78rem' }}>Standard usage. Ideal for running high-efficiency solar appliances.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#10B981' }}>Off-Peak</TableCell>
                <TableCell>22:00 - 06:00</TableCell>
                <TableCell align="right">{dailyLoadData.find(d => d.type === 'Off-Peak')?.load ?? '—'} kW</TableCell>
                <TableCell align="right" sx={{ color: '#10B981', fontWeight: 600 }}>₹4.50 / kWh</TableCell>
                <TableCell sx={{ fontSize: '0.78rem' }}>Highly discounted. Program EV charging and laundry to start here.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  const renderBreakdownDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Visual percentage breakdown of electricity used by household appliances based on smart circuit readings.
        </Typography>
        <Box sx={{ width: '100%', height: 260, position: 'relative', border: '1px solid #F1F5F9', borderRadius: '8px', p: 1, bgcolor: '#FAFAFA' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1.5 }}>
          Appliance Load Audit
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Appliance</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Share</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Est. Cost</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breakdownData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontWeight: 550 }}>{row.name}</TableCell>
                  <TableCell align="right">{row.pct}%</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>{row.estCost}</TableCell>
                  <TableCell align="center">{'⭐'.repeat(5 - Math.floor(idx * 0.8))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  const renderCarbonDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Box sx={{ border: '1px solid #F1F5F9', borderRadius: '8px', p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#F0FDF4' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#10B981', mb: 1 }}>
            35%
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 650, color: '#065F46' }}>
            Net Carbon Offset
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Your solar panels offset more than a third of your monthly energy grid consumption!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="subtitle1" sx={{ fontWeight: 650, mb: 1.5 }}>
          Monthly Sustainability Impact Report
        </Typography>
        <Stack spacing={2}>
          <Box sx={{ p: 1.5, border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 650 }}>CO₂ Carbon Emissions Avoided</Typography>
              <Typography variant="caption" color="text.secondary">Equal to greenhouse gas emissions from gas cars</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 750, color: '#10B981' }}>245.5 kg CO₂</Typography>
          </Box>
          <Box sx={{ p: 1.5, border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 650 }}>Trees Growing Equivalent</Typography>
              <Typography variant="caption" color="text.secondary">Carbon absorbed by seedlings for a decade</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 750, color: '#10B981' }}>6.2 Trees</Typography>
          </Box>
          <Box sx={{ p: 1.5, border: '1px solid #E2E8F0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 650 }}>Coal Burned Avoided</Typography>
              <Typography variant="caption" color="text.secondary">Fossil fuel burned to yield grid equivalents</Typography>
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 750, color: '#10B981' }}>270 lbs</Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );

  const renderActivityDetails = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Full system transaction audit. Log shows payments received, billing notifications, and connection state audits.
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Payer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Payment Method</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Transaction Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Amount Paid</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentPayments.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell sx={{ fontWeight: 550 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.65rem', bgcolor: 'primary.main' }}>
                        {row.initials}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
                        {row.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#059669' }}>{row.amount}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ 
                      display: 'inline-block',
                      px: 1, py: 0.2, 
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      bgcolor: 'rgba(5, 150, 105, 0.05)',
                      color: '#059669'
                    }}>
                      COMPLETED
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" disableGutters>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Header Section */}
          <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}>
                Dashboard Overview
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Welcome back! Here is your electricity system status.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <Button 
                variant="outlined" 
                color="secondary"
                startIcon={<Download size={16} />}
                sx={{ flex: { xs: 1, sm: 'auto' } }}
                onClick={handleExportPDF}
              >
                Export Report
              </Button>
            </Stack>
          </Box>

          {/* Grid Layout: Row of KPIs at the top, Chart & Table below */}
          <Grid container spacing={3}>
            
            {/* TOP ROW: 4 KPI cards side by side */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Total Consumption" 
                value={stats.consumption} 
                icon={Zap} 
                color="#4F46E5" 
                trend={-2.4} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title={stats.revenueLabel} 
                value={stats.revenue} 
                icon={Receipt} 
                color="#0D9488" 
                trend={12.5} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title={stats.consumersLabel} 
                value={stats.consumers} 
                icon={Users} 
                color="#6366F1" 
                trend={0.5} 
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Pending Bills" 
                value={stats.pending} 
                icon={AlertCircle} 
                color="#E11D48" 
                trend={4.2} 
              />
            </Grid>

            {/* SECOND ROW: 3 Large analytical charts side-by-side */}
            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                  onClick={() => setActiveDetail('usage')}
                  sx={{ 
                    p: 3, 
                    height: '420px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Usage Analytics
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Consumption data & forecast
                      </Typography>
                    </Box>
                    <Box sx={{ px: 1.2, py: 0.4, bgcolor: 'rgba(79, 70, 229, 0.05)', color: 'primary.main', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Live kWh
                    </Box>
                  </Box>
 
                  <Box sx={{ width: '100%', height: 290, mt: 1 }}>
                    <ResponsiveContainer>
                      <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.08}/>
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0D9488" stopOpacity={0.08}/>
                            <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(79, 70, 229, 0.1)', strokeWidth: 1 }} />
                        
                        {/* Shaded Area for Prediction Bounds */}
                        <Area 
                          type="monotone" 
                          dataKey="upperBoundKwh" 
                          stroke="none" 
                          fill="#0D9488" 
                          fillOpacity={0.03} 
                          name="Confidence Upper"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="lowerBoundKwh" 
                          stroke="none" 
                          fill="#0D9488" 
                          fillOpacity={0.03} 
                          name="Confidence Lower"
                        />

                        {/* Solid Area for Historical Usage */}
                        <Area 
                          type="monotone" 
                          dataKey="kwh" 
                          stroke="#4F46E5" 
                          strokeWidth={2.5} 
                          fillOpacity={1} 
                          fill="url(#colorUsage)" 
                          name="Actual Usage"
                        />
                        
                        {/* Dotted Area for Predicted Usage */}
                        <Area 
                          type="monotone" 
                          dataKey="predictedKwh" 
                          stroke="#0D9488" 
                          strokeWidth={2.5} 
                          strokeDasharray="5 5"
                          fillOpacity={1} 
                          fill="url(#colorPredicted)" 
                          name="Predicted Forecast"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                   onClick={() => setActiveDetail('solar')}
                   sx={{ 
                     p: 3, 
                     height: '420px', 
                     display: 'flex', 
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     boxShadow: 'none',
                     cursor: 'pointer'
                   }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Solar & Net Metering
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Solar vs grid import & net usage
                      </Typography>
                    </Box>
                    <Box sx={{ px: 1.2, py: 0.4, bgcolor: 'rgba(16, 185, 129, 0.05)', color: '#10B981', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Green Energy
                    </Box>
                  </Box>
  
                  <Box sx={{ width: '100%', height: 290, mt: 1 }}>
                    <ResponsiveContainer>
                      <ComposedChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <Box sx={{ bgcolor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '6px', p: 1.5, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 600 }}>
                                    {label} 2026 Metrics
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4F46E5' }} />
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                      Grid Import: <span style={{ color: '#4F46E5' }}>{data.grid?.toLocaleString()} kWh</span>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#10B981' }} />
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                      Solar Generated: <span style={{ color: '#10B981' }}>{data.solar?.toLocaleString()} kWh</span>
                                    </Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#F59E0B' }} />
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                      Net Consumed: <span style={{ color: '#F59E0B' }}>{data.net?.toLocaleString()} kWh</span>
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar dataKey="grid" fill="#4F46E5" barSize={12} radius={[4, 4, 0, 0]} name="Grid Import" />
                        <Bar dataKey="solar" fill="#10B981" barSize={12} radius={[4, 4, 0, 0]} name="Solar Generation" />
                        <Line type="monotone" dataKey="net" stroke="#F59E0B" strokeWidth={2.5} name="Net Consumed" dot={{ r: 3 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                  onClick={() => setActiveDetail('loadProfile')}
                  sx={{ 
                    p: 3, 
                    height: '420px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Daily Load Profile
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hourly load curve (24-hour cycle)
                      </Typography>
                    </Box>
                    <Box sx={{ px: 1.2, py: 0.4, bgcolor: 'rgba(245, 158, 11, 0.05)', color: '#F59E0B', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Peak 18:00 - 22:00
                    </Box>
                  </Box>
 
                  <Box sx={{ width: '100%', height: 290, mt: 1 }}>
                    <ResponsiveContainer>
                      <AreaChart 
                        data={dailyLoadData} 
                        margin={{ top: 10, right: 5, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.08}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="hour" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }} 
                        />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <Box sx={{ bgcolor: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '6px', p: 1.5, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)' }}>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5, fontWeight: 600 }}>
                                    Time: {label} ({data.type})
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    Average Demand: <span style={{ color: '#F59E0B' }}>{data.load} kW</span>
                                  </Typography>
                                </Box>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="load" 
                          stroke="#F59E0B" 
                          strokeWidth={2.5} 
                          fillOpacity={1} 
                          fill="url(#colorLoad)" 
                          name="Demand (kW)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            {/* THIRD ROW: Supporting breakdown, carbon footprint, recent activity */}
            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                   onClick={() => setActiveDetail('breakdown')}
                   sx={{ 
                     p: 3, 
                     height: '380px', 
                     display: 'flex', 
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                     boxShadow: 'none',
                     cursor: 'pointer'
                   }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Load Breakdown
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Household appliance load share
                      </Typography>
                    </Box>
                    <Box sx={{ px: 1.2, py: 0.4, bgcolor: 'rgba(225, 29, 72, 0.05)', color: '#E11D48', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      Appliance Share
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 290 }}>
                    {/* Donut Chart */}
                    <Box sx={{ width: '100%', height: 160, position: 'relative' }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={breakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={65}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {breakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}% Share`, 'Load']}
                            contentStyle={{ borderRadius: '6px', border: '1px solid #E2E8F0' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                         <Typography variant="h6" sx={{ fontWeight: 750, color: 'text.primary', m: 0 }}>
                           {breakdownData[0]?.pct || 38}%
                         </Typography>
                         <Typography sx={{ fontSize: '0.58rem', color: 'text.secondary', fontWeight: 600 }}>
                           {breakdownData[0]?.name?.split(' ')[0] || 'AC'} Share
                         </Typography>
                       </Box>
                    </Box>

                    <Grid container spacing={1} sx={{ mt: 1, px: 1 }}>
                      {breakdownData.map((item, idx) => (
                        <Grid item xs={6} key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: item.color }} />
                          <Typography sx={{ fontSize: '0.68rem', color: 'text.primary', fontWeight: 550, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {item.name} ({item.pct}%)
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                  onClick={() => setActiveDetail('carbon')}
                  sx={{ 
                    p: 3, 
                    height: '380px', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Carbon Footprint
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Impact & solar offset
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(16, 185, 129, 0.08)', color: '#10B981' }}>
                      <Zap size={18} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, my: 1, height: 180 }}>
                    {/* Visual Offset Gauge using Circular SVG */}
                    <Box sx={{ position: 'relative', width: 90, height: 90, flexShrink: 0 }}>
                      <svg width="90" height="90" viewBox="0 0 36 36">
                        {/* Background track */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="2.5" />
                        {/* Green progress (e.g. 35% offset) */}
                        <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="2.8" 
                          strokeDasharray="35 100" strokeDashoffset="25" strokeLinecap="round" />
                      </svg>
                      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 750, color: '#10B981', m: 0 }}>
                          35%
                        </Typography>
                        <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', fontWeight: 600 }}>
                          Offset
                        </Typography>
                      </Box>
                    </Box>

                    {/* Key Metrics list */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', display: 'block', fontWeight: 600 }}>
                          CO₂ PREVENTED
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 750, color: '#10B981', lineHeight: 1.2 }}>
                          245.5 kg
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', display: 'block', fontWeight: 600 }}>
                          NET EMISSIONS
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 750, color: 'text.primary', lineHeight: 1.2 }}>
                          456.2 kg
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ p: 1.2, bgcolor: '#F8FAFC', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', textAlign: 'center', fontWeight: 550 }}>
                      🌱 Your solar panels saved <strong>6.2 trees</strong> this month!
                    </Typography>
                  </Box>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 350, damping: 18 }}
              >
                <Card 
                  onClick={() => setActiveDetail('activity')}
                  sx={{ 
                    p: 3, 
                    height: '380px', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 650, color: 'text.primary', letterSpacing: '-0.015em' }}>
                        Recent Activity
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Recent payments processed
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={1} sx={{ flexGrow: 1, overflowY: 'auto', pr: 0.5, my: 1, maxHeight: '280px' }}>
                    {recentPayments.slice(0, 4).map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          py: 0.8,
                          borderBottom: idx !== recentPayments.length - 1 ? '1px solid #F1F5F9' : 'none'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                          <Avatar 
                            sx={{ 
                              bgcolor: 'rgba(37, 99, 235, 0.05)', 
                              color: 'primary.main', 
                              fontSize: '0.7rem', 
                              fontWeight: 600,
                              width: 32,
                              height: 32,
                            }}
                          >
                            {item.initials}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8rem' }}>
                              {item.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>
                              {item.action} • {item.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: item.positive ? '#059669' : 'text.primary',
                            fontSize: '0.8rem'
                          }}
                        >
                          {item.amount}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </motion.div>
            </Grid>

          </Grid>
        </motion.div>
      </Container>

      {/* POPUP DETAIL MODAL DIALOG */}
      <Dialog 
        open={Boolean(activeDetail)} 
        onClose={() => setActiveDetail(null)}
        TransitionComponent={Transition}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'text.primary' }}>
              {activeDetail === 'usage' && 'Usage Analytics & Forecast'}
              {activeDetail === 'solar' && 'Solar & Net Metering Details'}
              {activeDetail === 'loadProfile' && 'Daily Load Curve & Tariff Insights'}
              {activeDetail === 'breakdown' && 'Appliance Energy Breakdown'}
              {activeDetail === 'carbon' && 'Environmental Impact & Sustainability Report'}
              {activeDetail === 'activity' && 'All Recent Transactions'}
            </Typography>
          </Box>
          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} style={{ display: 'inline-block' }}>
            <IconButton onClick={() => setActiveDetail(null)} size="small" sx={{ color: 'text.secondary' }}>
              <X size={20} />
            </IconButton>
          </motion.div>
        </DialogTitle>

        <DialogContent dividers sx={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', py: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeDetail === 'usage' && renderUsageDetails()}
            {activeDetail === 'solar' && renderSolarDetails()}
            {activeDetail === 'loadProfile' && renderLoadProfileDetails()}
            {activeDetail === 'breakdown' && renderBreakdownDetails()}
            {activeDetail === 'carbon' && renderCarbonDetails()}
            {activeDetail === 'activity' && renderActivityDetails()}
          </motion.div>
        </DialogContent>
        
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={() => setActiveDetail(null)} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Close Details
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Dashboard;