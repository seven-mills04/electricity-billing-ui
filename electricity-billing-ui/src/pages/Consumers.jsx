import { useState, useEffect } from "react";
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
import DetailsDialog from "../components/DetailsDialog";

import {getConsumers,deleteConsumer,} from "../api/consumerApi";

const Consumers = () => {
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewConsumer, setViewConsumer] = useState(null);
  useEffect(() => {
    fetchConsumers();
  }, []);

  const fetchConsumers = async () => {
    try {
      const response = await getConsumers();

      console.log("Response:", response.data);

      const consumers = response.data.content || [];

      const data = consumers.map((consumer) => ({
  id: consumer.id,
  consumerNumber: consumer.consumerNumber,
  firstName: consumer.firstName,
  lastName: consumer.lastName,
  email: consumer.email,
  phone: consumer.phone,

  name: `${consumer.firstName} ${consumer.lastName}`,
  city: "-",
  mobile: consumer.phone,
 status: consumer.connections?.some(
  (connection) => connection.status === "ACTIVE"
)
  ? "Active"
  : "Inactive",
}));

      setRows(data);
    } catch (error) {
      console.error("Error fetching consumers:", error);
    }
  };

  const handleDelete = async () => {
  try {
    if (!selectedConsumer) return;

    await deleteConsumer(selectedConsumer.id);

    setDeleteOpen(false);
    setSelectedConsumer(null);

    fetchConsumers();

    setSnackbar(true);

  } catch (error) {
    console.error(error);
    alert("Failed to delete consumer");
  }
};

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
      renderCell: (params) => (
  <ActionButtons
    onView={() => {
      setViewConsumer(params.row);
      setViewOpen(true);
    }}
    onEdit={() => {
      setSelectedConsumer(params.row);
      setDialogOpen(true);
    }}
    onDelete={() => {
      setSelectedConsumer(params.row);
      setDeleteOpen(true);
    }}
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
            value={rows.length}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Active"
            value={rows.filter((r) => r.status === "Active").length}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Inactive"
            value={rows.filter((r) => r.status !== "Active").length}
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
  onClose={() => {
    setDialogOpen(false);
    setSelectedConsumer(null);
  }}
  onSuccess={fetchConsumers}
  consumer={selectedConsumer}
/>
      

      <ConfirmDialog
  open={deleteOpen}
  title="Delete Consumer"
  message="Are you sure you want to delete this consumer?"
  onClose={() => {
    setDeleteOpen(false);
    setSelectedConsumer(null);
  }}
  onConfirm={handleDelete}
/>

      <DetailsDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        title="Consumer Record Details"
        subtitle={`Consumer ID: ${viewConsumer?.consumerNumber || "-"}`}
        sections={[
          {
            title: "Identity & Profile",
            fields: [
              { label: "Consumer Number", value: viewConsumer?.consumerNumber, sm: 6 },
              { label: "Full Name", value: viewConsumer?.name, sm: 6 }
            ]
          },
          {
            title: "Contact Details",
            fields: [
              { label: "Email Address", value: viewConsumer?.email, sm: 6 },
              { label: "Mobile Number", value: viewConsumer?.mobile, sm: 6 }
            ]
          },
          {
            title: "Account Status",
            fields: [
              { label: "Account State", value: viewConsumer?.status, sm: 6 },
              { label: "City Region", value: viewConsumer?.city, sm: 6 }
            ]
          }
        ]}
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