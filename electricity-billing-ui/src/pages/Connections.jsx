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
import ConnectionDialog from "../components/ConnectionDialog";
import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import ConfirmDialog from "../components/ConfirmDialog";

import {
  getConnections,
  deleteConnection,
} from "../api/connectionApi";

const Connections = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedConnection, setSelectedConnection] = useState(null);

  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, []);
  const fetchConnections = async () => {
  try {
    const response = await getConnections();

    const data = response.data.map((connection) => ({
      id: connection.id,
      connectionNumber: connection.connectionNumber,
      meterNumber: connection.meterNumber,
      connectionType: connection.connectionType,
      status: connection.status,
      sanctionedLoad: connection.sanctionedLoad,
      phaseType: connection.phaseType,
    }));

    setRows(data);
  } catch (error) {
    console.error(error);
  }
};

const filteredRows = rows.filter((row) =>
    row.connectionNumber
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
  {
    field: "connectionNumber",
    headerName: "Connection No",
    flex: 1,
  },
  {
    field: "meterNumber",
    headerName: "Meter Number",
    flex: 1,
  },
  {
    field: "connectionType",
    headerName: "Connection Type",
    flex: 1,
  },
  {
    field: "sanctionedLoad",
    headerName: "Load (kW)",
    flex: 1,
  },
  {
    field: "phaseType",
    headerName: "Phase Type",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value?.toUpperCase() === "ACTIVE"
            ? "success"
            : "error"
        }
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
        onView={() => {}}
        onEdit={() => {
        setSelectedConnection(params.row);
        setDialogOpen(true);
}}
        onDelete={() => {
          setSelectedConnection(params.row);
          setDeleteOpen(true);
        }}
      />
    ),
  },
];
const handleDelete = async () => {
  try {
    if (!selectedConnection) return;

    await deleteConnection(selectedConnection.id);

    setDeleteOpen(false);
    setSelectedConnection(null);

    fetchConnections();

    setSnackbar(true);
  } catch (error) {
    console.error(error);
    alert("Failed to delete connection");
  }
};
return (
  <Box sx={{ p: 3 }}>

    <Typography variant="h4" fontWeight="bold" mb={1}>
      Connections
    </Typography>

    <Typography color="text.secondary" mb={4}>
      Manage electricity connections
    </Typography>

    <Grid container spacing={2} mb={4}>

      <Grid item xs={12} md={4}>
        <StatsCard
          title="Total Connections"
          value={rows.length}
          color="#1976d2"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatsCard
          title="Active"
          value={rows.filter(r => r.status?.toUpperCase() === "ACTIVE").length}
          color="#2e7d32"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatsCard
          title="Inactive"
          value={rows.filter(r => r.status?.toUpperCase() !== "ACTIVE").length}
          color="#d32f2f"
        />
      </Grid>

    </Grid>

    <Box
      display="flex"
      justifyContent="space-between"
      mb={3}
    >

      <TextField
        label="Search Connection"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
  

 <Button
  variant="contained"
  startIcon={<AddIcon />}
  onClick={() => {
    setSelectedConnection(null);
    setDialogOpen(true);
  }}
>
  Add Connection
</Button>

    </Box>

    <DataTable
      rows={filteredRows}
      columns={columns}
    />

     <ConnectionDialog
      open={dialogOpen}
      onClose={() => {
      setDialogOpen(false);
      setSelectedConnection(null);
  }}
  onSuccess={fetchConnections}
  connection={selectedConnection}
/>
    <ConfirmDialog
      open={deleteOpen}
      title="Delete Connection"
      message="Are you sure you want to delete this connection?"
      onClose={() => {
        setDeleteOpen(false);
        setSelectedConnection(null);
      }}
      onConfirm={handleDelete}
    />

    <Snackbar
      open={snackbar}
      autoHideDuration={2500}
      onClose={() => setSnackbar(false)}
    >
      <Alert severity="success">
        Connection deleted successfully.
      </Alert>
    </Snackbar>

  </Box>
);

};

export default Connections;