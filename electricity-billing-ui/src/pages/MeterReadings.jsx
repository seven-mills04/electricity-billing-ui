import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import ActionButtons from "../components/ActionButtons";
import ConfirmDialog from "../components/ConfirmDialog";
import MeterReadingDialog from "../components/MeterReadingDialog";

import {
  getMeterReadings,
  deleteMeterReading,
} from "../api/meterReadingApi";

const MeterReadings = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedReading, setSelectedReading] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchMeterReadings();
  }, []);

  const fetchMeterReadings = async () => {
    try {
      const response = await getMeterReadings();

      const data = response.data.map((reading) => ({
        id: reading.id,
        connection: reading.connection,
        connectionNumber:
          reading.connection?.connectionNumber || "-",
        readingDate: reading.readingDate,
        previousReading: reading.previousReading,
        currentReading: reading.currentReading,
        unitsConsumed: reading.unitsConsumed,
        remarks: reading.remarks,
      }));

      setRows(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMeterReading(selectedReading.id);

      setDeleteOpen(false);
      setSelectedReading(null);

      await fetchMeterReadings();

      setSnackbar({
        open: true,
        message: "Meter Reading deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRows = rows.filter((row) =>
    row.connectionNumber
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "connectionNumber",
      headerName: "Connection",
      flex: 1,
    },
    {
      field: "readingDate",
      headerName: "Reading Date",
      flex: 1,
    },
    {
      field: "previousReading",
      headerName: "Previous Reading",
      flex: 1,
    },
    {
      field: "currentReading",
      headerName: "Current Reading",
      flex: 1,
    },
    {
      field: "unitsConsumed",
      headerName: "Units Consumed",
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ActionButtons
          onView={() => {}}
          onEdit={() => {
            setSelectedReading(params.row);
            setDialogOpen(true);
          }}
          onDelete={() => {
            setSelectedReading(params.row);
            setDeleteOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Typography variant="h4" fontWeight="bold">
        Meter Readings
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage electricity meter readings
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Readings"
            value={rows.length}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Units"
            value={rows.reduce(
              (sum, row) => sum + Number(row.unitsConsumed || 0),
              0
            )}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard
            title="Connections"
            value={
              new Set(rows.map((r) => r.connectionNumber)).size
            }
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
          size="small"
          label="Search Connection"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedReading(null);
            setDialogOpen(true);
          }}
        >
          Add Reading
        </Button>
      </Box>

      <DataTable
        rows={filteredRows}
        columns={columns}
      />

      <MeterReadingDialog
        open={dialogOpen}
        reading={selectedReading}
        onClose={() => {
          setDialogOpen(false);
          setSelectedReading(null);
          fetchMeterReadings();
        }}
        onSuccess={fetchMeterReadings}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Meter Reading"
        message="Are you sure you want to delete this reading?"
        onClose={() => {
          setDeleteOpen(false);
          setSelectedReading(null);
        }}
        onConfirm={handleDelete}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MeterReadings;