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
import { Plus, Eye, Edit, Trash2, Plug2, Activity } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import ConnectionDialog from "../components/ConnectionDialog";
import DetailsDialog from "../components/DetailsDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import { getConnections, deleteConnection } from "../api/connectionApi";

const Connections = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewConnection, setViewConnection] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    try {
      const response = await getConnections();
      const connections = Array.isArray(response.data) ? response.data : [];

      const mapped = connections.map((conn) => ({
        id: conn.id,
        connectionNumber: conn.connectionNumber,
        meterNumber: conn.meterNumber,
        connectionType: conn.connectionType,
        status: conn.status,
        sanctionedLoad: conn.sanctionedLoad,
        phaseType: conn.phaseType,
        rawConnection: conn,
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch grid connections", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingConnection(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (conn) => {
    setEditingConnection(conn.rawConnection || conn);
    setDialogOpen(true);
  };

  const handleOpenView = (conn) => {
    setViewConnection(conn.rawConnection || conn);
    setViewOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteConnection(deletingId);
      setSnackbar({ open: true, message: "Connection Deleted Successfully", severity: "success" });
      fetchConnections();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete connection", severity: "error" });
    } finally {
      setDeleteOpen(false);
    }
  };

  const filteredRows = rows.filter(
    (r) =>
      r.connectionNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.meterNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.connectionType.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "connectionNumber",
      headerName: "Connection No.",
      renderCell: (row) => (
        <Chip
          icon={<Plug2 size={12} />}
          label={row.connectionNumber}
          size="small"
          sx={{ bgcolor: "rgba(2, 132, 199, 0.1)", color: "#0284C7", fontWeight: 700 }}
        />
      ),
    },
    {
      field: "meterNumber",
      headerName: "Meter No.",
      renderCell: (row) => (
        <Chip
          label={row.meterNumber}
          size="small"
          sx={{ bgcolor: "#F1F5F9", color: "#475569", fontWeight: 600 }}
        />
      ),
    },
    {
      field: "connectionType",
      headerName: "Tariff Category",
      renderCell: (row) => (
        <Chip
          size="small"
          label={row.connectionType}
          sx={{
            bgcolor:
              row.connectionType === "INDUSTRIAL"
                ? "rgba(245, 158, 11, 0.1)"
                : row.connectionType === "COMMERCIAL"
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(16, 185, 129, 0.1)",
            color:
              row.connectionType === "INDUSTRIAL"
                ? "#D97706"
                : row.connectionType === "COMMERCIAL"
                ? "#7C3AED"
                : "#059669",
            fontWeight: 700,
          }}
        />
      ),
    },
    {
      field: "sanctionedLoad",
      headerName: "Sanctioned Load",
      renderCell: (row) => (
        <span style={{ fontWeight: 700, color: "#0F172A" }}>
          {row.sanctionedLoad} kW
        </span>
      ),
    },
    { field: "phaseType", headerName: "Phase Type" },
    {
      field: "status",
      headerName: "Grid Status",
      renderCell: (row) => (
        <Chip
          size="small"
          label={row.status}
          sx={{
            bgcolor: row.status === "ACTIVE" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
            color: row.status === "ACTIVE" ? "#059669" : "#DC2626",
            fontWeight: 700,
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="View Connection Details">
            <IconButton size="small" onClick={() => handleOpenView(row)} sx={{ color: "#0284C7" }}>
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Connection">
            <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: "#F59E0B" }}>
              <Edit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Connection">
            <IconButton size="small" onClick={() => handleOpenDelete(row.id)} sx={{ color: "#EF4444" }}>
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <EnterpriseTable
        title="Grid Connections Management"
        subtitle="Monitor grid service connections, meter serial numbers, and load demand limits"
        columns={columns}
        rows={filteredRows}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search connection no, meter no, category..."
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        actions={
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={handleOpenAdd}
            sx={{
              background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
              boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
            }}
          >
            Add New Connection
          </Button>
        }
      />

      {/* Add / Edit Connection Dialog */}
      <ConnectionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        connection={editingConnection}
        onSuccess={fetchConnections}
      />

      {/* View Details Dialog */}
      <DetailsDialog
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        title="Grid Connection Details"
        data={
          viewConnection
            ? {
                "Connection Number": viewConnection.connectionNumber,
                "Meter Serial Number": viewConnection.meterNumber,
                "Tariff Category": viewConnection.connectionType,
                "Connection Status": viewConnection.status,
                "Sanctioned Load Demand": `${viewConnection.sanctionedLoad} kW`,
                "Phase Type": viewConnection.phaseType,
              }
            : null
        }
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleConfirm={handleConfirmDelete}
        title="Delete Connection Record?"
        description="Are you sure you want to delete this grid connection record? Associated meter readings will be removed."
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Connections;