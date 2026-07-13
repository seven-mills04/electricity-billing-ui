import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import ConsumerDialog from "../components/ConsumerDialog";
import ConfirmDialog from "../components/ConfirmDialog";

const Consumers = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  const rows = [
    {
      id: 1,
      consumerNumber: "CON1001",
      name: "Rahul Sharma",
      city: "Delhi",
      mobile: "9876543210",
      status: "Active",
    },
    {
      id: 2,
      consumerNumber: "CON1002",
      name: "Aman Verma",
      city: "Noida",
      mobile: "9988776655",
      status: "Inactive",
    },
    {
      id: 3,
      consumerNumber: "CON1003",
      name: "Priya Singh",
      city: "Ghaziabad",
      mobile: "9123456789",
      status: "Active",
    },
  ];

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "consumerNumber",
      headerName: "Consumer No",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "error"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      sortable: false,
      renderCell: () => (
        <ActionButtons
          onView={() => setSnackbar(true)}
          onEdit={() => setDialogOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>

      <Typography variant="h4" fontWeight="bold" mb={1}>
        Consumers
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage all registered electricity consumers
      </Typography>

      <Grid container spacing={2} mb={4}>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Total Consumers"
            value="324"
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Active"
            value="280"
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Inactive"
            value="44"
            color="#d32f2f"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="New This Month"
            value="18"
            color="#ed6c02"
          />
        </Grid>

      </Grid>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={3}
      >

        <TextField
          label="Search Consumer"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Add Consumer
        </Button>

      </Box>

      <DataTable
        rows={filteredRows}
        columns={columns}
      />

      <ConsumerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Consumer"
        message="Are you sure you want to delete this consumer?"
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          setDeleteOpen(false);
          setSnackbar(true);
        }}
      />

      <Snackbar
        open={snackbar}
        autoHideDuration={2500}
        onClose={() => setSnackbar(false)}
      >
        <Alert severity="success">
          Action completed successfully.
        </Alert>
      </Snackbar>

    </Box>
  );
};

export default Consumers;