import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography, Chip } from "@mui/material";

import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/charts/RevenueChart";
import PieChart from "../components/charts/PieChart";
import { getConsumers } from "../api/consumerApi";
import { getDashboard } from "../api/dashboardApi";
import { getPayments } from "../api/paymentApi";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
  totalConsumers: 0,
  totalConnections: 0,
  totalBills: 0,
  paidBills: 0,
  unpaidBills: 0,
  monthlyRevenue: 0,
  todayCollection: 0,
  totalRevenue: 0,
});

const [consumers, setConsumers] = useState([]);
  useEffect(() => {
    fetchDashboard();
    fetchConsumers();
    fetchPayments();
  }, []);

  const [payments, setPayments] = useState([]);

  const fetchDashboard = async () => {
  try {
    const response = await getDashboard();
    setDashboard(response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchConsumers = async () => {
  try {
    const response = await getConsumers();

    setConsumers(response.data.content || response.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchPayments = async () => {
  try {
    const response = await getPayments();

    setPayments(response.data || []);
  } catch (error) {
    console.error(error);
  }
};
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Electricity Billing System Overview
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Consumers"
           value={dashboard.totalConsumers}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Connections"
            value={dashboard.totalConnections}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Bills"
            value={dashboard.totalBills}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Revenue"
            value={Number(dashboard.totalRevenue || 0).toLocaleString("en-IN", {style: "currency",currency: "INR",})}
            color="#8e24aa"
          />
        </Grid>

        
        <Grid item xs={12} lg={7}>
  <Paper
    sx={{
      p: 3,
      borderRadius: 4,
      boxShadow: 3,
      height: "100%",
    }}
  >
            <Typography variant="h6" mb={2}>
              Bill Status
            </Typography>

           <PieChart
              paidBills={dashboard.paidBills}
               unpaidBills={dashboard.unpaidBills}
             />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper
  sx={{
    p: 3,
    borderRadius: 4,
    boxShadow: 3,
    height: "100%",
  }}
>
            <Typography variant="h6">
               Recent Consumers
                </Typography>

              {consumers.length === 0 ? (
  <Typography mt={2}>
    No consumers found
  </Typography>
) : (
  consumers
    .slice(-5)
    .reverse()
    .map((consumer) => (
      <Chip
  key={consumer.id}
  label={`${consumer.firstName} ${consumer.lastName}`}
  color="primary"
  variant="outlined"
  sx={{
    mr: 1,
    mb: 1,
  }}
/>
    ))
)}
          </Paper>
        </Grid>

        <Grid item xs={12} >
          <Paper
  sx={{
    p: 3,
    mt: 1,
    borderRadius: 4,
    boxShadow: 3,
  }}
>
            <Typography variant="h6">
              Recent Payments
            </Typography>

            {payments.length === 0 ? (
  <Typography mt={2}>
    No payments found
  </Typography>
) : (
  payments
    .slice(-5)
    .reverse()
    .map((payment) => (
      <Box
  key={payment.id}
  sx={{
    p: 2,
    mb: 2,
    borderRadius: 2,
    border: "1px solid #E0E0E0",
    backgroundColor: "#FAFAFA",
  }}
>
        <Typography fontWeight="bold">
          {payment.transactionId}
        </Typography>

        <Typography variant="body2">
          ₹{Number(payment.amountPaid).toFixed(2)}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {payment.paymentDate}
        </Typography>
      </Box>
    ))
)}
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;