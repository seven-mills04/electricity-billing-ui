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
import { Plus, Eye, Edit, Trash2, Users } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import ConsumerDialog from "../components/ConsumerDialog";
import DetailsDialog from "../components/DetailsDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import PageContainer from "../components/common/PageContainer";
import StatusBadge from "../components/common/StatusBadge";
import GradientButton from "../components/common/GradientButton";
import { getConsumers, deleteConsumer } from "../api/consumerApi";

const Consumers = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingConsumer, setEditingConsumer] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewConsumer, setViewConsumer] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchConsumers();
  }, []);

  const fetchConsumers = async () => {
    setLoading(true);
    try {
      const response = await getConsumers();
      let consumers = [];
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          consumers = response.data;
        } else if (Array.isArray(response.data.content)) {
          consumers = response.data.content;
        }
      }

      const mapped = consumers.map((c) => ({
        id: c.id,
        consumerNumber: c.consumerNumber,
        firstName: c.firstName,
        lastName: c.lastName,
        name: `${c.firstName} ${c.lastName}`,
        email: c.email,
        phone: c.phone,
        hasActiveConn: c.connections?.some((conn) => conn.status === "ACTIVE"),
        rawConsumer: c,
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch consumers", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingConsumer(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (consumer) => {
    setEditingConsumer(consumer.rawConsumer || consumer);
    setDialogOpen(true);
  };

  const handleOpenView = (consumer) => {
    setViewConsumer(consumer.rawConsumer || consumer);
    setViewOpen(true);
  };

  const handleOpenDelete = (id) => {
    setDeletingId(id);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteConsumer(deletingId);
      setSnackbar({ open: true, message: "Consumer Deleted Successfully", severity: "success" });
      fetchConsumers();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete consumer", severity: "error" });
    } finally {
      setDeleteOpen(false);
    }
  };

  const filteredRows = rows.filter((r) =>
    (r.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.consumerNumber || "").toLowerCase().includes(search.toLowerCase()) ||
    (r.phone || "").includes(search) ||
    (r.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "consumerNumber",
      headerName: "Consumer No.",
      renderCell: (row) => (
        <Chip
          label={row.consumerNumber}
          size="small"
          sx={{ bgcolor: "rgba(6, 182, 212, 0.1)", color: "#06B6D4", border: "1px solid rgba(6, 182, 212, 0.2)", fontWeight: 700 }}
        />
      ),
    },
    { field: "name", headerName: "Full Name" },
    { field: "email", headerName: "Email Address" },
    { field: "phone", headerName: "Phone Number" },
    {
      field: "status",
      headerName: "Grid Status",
      renderCell: (row) => (
        <StatusBadge 
          label={row.hasActiveConn ? "Active Connection" : "Registered"} 
          statusType={row.hasActiveConn ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleOpenView(row)} sx={{ color: "#06B6D4", "&:hover": { bgcolor: "rgba(6, 182, 212, 0.08)" } }}>
              <Eye size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Consumer">
            <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: "#F59E0B", "&:hover": { bgcolor: "rgba(245, 158, 11, 0.08)" } }}>
              <Edit size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Consumer">
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
        title="Consumer Directory"
        subtitle="Manage registered retail electricity consumers and connection profiles"
        columns={columns}
        rows={filteredRows}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, consumer number, phone, email..."
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
            Register New Consumer
          </GradientButton>
        }
      />

      
      <ConsumerDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        consumer={editingConsumer}
        onSuccess={fetchConsumers}
      />

      
      <DetailsDialog
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        title="Consumer Account Details"
        data={
          viewConsumer
            ? {
                "Consumer Number": viewConsumer.consumerNumber,
                "First Name": viewConsumer.firstName,
                "Last Name": viewConsumer.lastName,
                "Email": viewConsumer.email,
                "Phone": viewConsumer.phone,
                "Total Connections": viewConsumer.connections?.length || 0,
              }
            : null
        }
      />

      
      <ConfirmDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleConfirm={handleConfirmDelete}
        title="Delete Consumer Profile?"
        description="Are you sure you want to delete this consumer? This action will permanently delete associated connection records."
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

export default Consumers;