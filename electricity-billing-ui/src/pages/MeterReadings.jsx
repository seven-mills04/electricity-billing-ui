import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { Plus, Eye, Edit, Trash2, Gauge, Activity } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import MeterReadingDialog from "../components/MeterReadingDialog";
import DetailsDialog from "../components/DetailsDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import PageContainer from "../components/common/PageContainer";
import StatusBadge from "../components/common/StatusBadge";
import GradientButton from "../components/common/GradientButton";
import { getMeterReadings, deleteMeterReading } from "../api/meterReadingApi";

const MeterReadings = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReading, setEditingReading] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewReading, setViewReading] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchMeterReadings();
  }, []);

  const fetchMeterReadings = async () => {
    setLoading(true);
    try {
      const response = await getMeterReadings();
      const readings = Array.isArray(response.data) ? response.data : [];

      const mapped = readings.map((mr) => ({
        id: mr.id,
        connectionNumber: mr.connection?.connectionNumber || "-",
        readingDate: mr.readingDate,
        previousReading: mr.previousReading,
        currentReading: mr.currentReading,
        unitsConsumed: mr.unitsConsumed,
        remarks: mr.remarks,
        rawReading: mr,
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch meter readings", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingReading(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (reading) => {
    setEditingReading(reading.rawReading || reading);
    setDialogOpen(true);
  };

  const handleOpenView = (reading) => {
    setViewReading(reading.rawReading || reading);
    setViewOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMeterReading(deletingId);
      setSnackbar({ open: true, message: "Meter Reading Deleted Successfully", severity: "success" });
      fetchMeterReadings();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete meter reading", severity: "error" });
    } finally {
      setDeleteOpen(false);
    }
  };

  const filteredRows = rows.filter(
    (r) =>
      r.connectionNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.readingDate.includes(search) ||
      (r.remarks && r.remarks.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    {
      field: "connectionNumber",
      headerName: "Connection No.",
      renderCell: (row) => (
        <Chip
          icon={<Gauge size={12} />}
          label={row.connectionNumber}
          size="small"
          sx={{ bgcolor: "rgba(6, 182, 212, 0.1)", color: "#06B6D4", border: "1px solid rgba(6, 182, 212, 0.25)", fontWeight: 700 }}
        />
      ),
    },
    { field: "readingDate", headerName: "Reading Date" },
    {
      field: "previousReading",
      headerName: "Prev Reading (kWh)",
      renderCell: (row) => (
        <span style={{ color: "#64748B" }}>{row.previousReading} kWh</span>
      ),
    },
    {
      field: "currentReading",
      headerName: "Current Reading (kWh)",
      renderCell: (row) => (
        <span style={{ fontWeight: 600, color: "#171717" }}>{row.currentReading} kWh</span>
      ),
    },
    {
      field: "unitsConsumed",
      headerName: "Units Consumed",
      renderCell: (row) => (
        <Chip
          label={`${row.unitsConsumed} kWh`}
          size="small"
          sx={{ bgcolor: "#FFFDF8", color: "#087A5A", border: "1.5px solid #087A5A", fontWeight: 800, borderRadius: "2px" }}
        />
      ),
    },
    { field: "remarks", headerName: "Remarks" },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="View Reading Details">
            <IconButton size="small" onClick={() => handleOpenView(row)} sx={{ color: "#06B6D4", "&:hover": { bgcolor: "rgba(6, 182, 212, 0.08)" } }}>
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Reading">
            <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: "#F59E0B", "&:hover": { bgcolor: "rgba(245, 158, 11, 0.08)" } }}>
              <Edit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Reading">
            <IconButton size="small" onClick={() => handleOpenDelete(row.id)} sx={{ color: "#EF4444", "&:hover": { bgcolor: "rgba(239, 68, 68, 0.08)" } }}>
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <PageContainer>
      <EnterpriseTable
        title="Meter Reading Ledger"
        subtitle="Audit recorded monthly kWh consumption logs and delta calculations"
        columns={columns}
        rows={filteredRows}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search connection number, reading date..."
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        actions={
          <GradientButton
            variant="contained"
            colorType="accent"
            startIcon={<Plus size={18} />}
            onClick={handleOpenAdd}
          >
            Record Meter Reading
          </GradientButton>
        }
      />

      
      <MeterReadingDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        meterReading={editingReading}
        onSuccess={fetchMeterReadings}
      />

      
      <DetailsDialog
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        title="Meter Reading Audit Details"
        data={
          viewReading
            ? {
                "Connection Number": viewReading.connection?.connectionNumber || "N/A",
                "Reading Date": viewReading.readingDate,
                "Previous Reading": `${viewReading.previousReading} kWh`,
                "Current Reading": `${viewReading.currentReading} kWh`,
                "Total Units Consumed": `${viewReading.unitsConsumed} kWh`,
                "Operator Remarks": viewReading.remarks || "None",
              }
            : null
        }
      />

      
      <ConfirmDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleConfirm={handleConfirmDelete}
        title="Delete Meter Reading Log?"
        description="Are you sure you want to delete this meter reading? The associated invoice calculation will be removed."
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default MeterReadings;