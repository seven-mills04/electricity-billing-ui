import { Box, Grid, Paper, Typography } from "@mui/material";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/charts/RevenueChart";
import PieChart from "../components/charts/PieChart";

const Dashboard = () => {
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
            value="324"
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Connections"
            value="298"
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Bills"
            value="147"
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Revenue"
            value="₹12.45L"
            color="#8e24aa"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Revenue Trend
            </Typography>

            <RevenueChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>
              Bill Status
            </Typography>

            <PieChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">
              Recent Consumers
            </Typography>

            <Typography mt={2}>
              • Rahul Sharma
            </Typography>

            <Typography>
              • Aman Verma
            </Typography>

            <Typography>
              • Priya Singh
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6">
              Recent Payments
            </Typography>

            <Typography mt={2}>
              CON1001 — ₹2,450
            </Typography>

            <Typography>
              CON1002 — ₹1,980
            </Typography>

            <Typography>
              CON1003 — ₹3,120
            </Typography>
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
};

export default Dashboard;