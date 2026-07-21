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
  Tabs,
  Tab,
} from "@mui/material";
import { Eye, FileText, CheckCircle, Clock, ReceiptText } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import BillInvoiceModal from "../components/BillInvoiceModal";
import { getBills } from "../api/billApi";

const Bills = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, PAID, UNPAID
  const [loading, setLoading] = useState(false);

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await getBills();
      let bills = Array.isArray(response.data) ? response.data : [];

      const role = localStorage.getItem("userRole");
      if (role === "CONSUMER") {
        const connStr = localStorage.getItem("consumerConnections");
        const consumerConns = connStr ? JSON.parse(connStr) : [];
        bills = bills.filter((b) =>
          consumerConns.includes(b.meterReading?.connection?.connectionNumber)
        );
      }

      const mapped = bills.map((b) => ({
        id: b.id,
        billNumber: b.billNumber,
        billingMonth: b.billingMonth,
        billDate: b.billDate,
        dueDate: b.dueDate,
        connectionNumber: b.meterReading?.connection?.connectionNumber || "-",
        unitsConsumed: b.unitsConsumed,
        amount: b.totalAmount,
        status: b.billStatus,
        rawBill: b,
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Unable to fetch bills", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInvoice = (bill) => {
    setSelectedBill(bill.rawBill || bill);
    setInvoiceOpen(true);
  };

  const filteredRows = rows.filter((r) => {
    const matchesSearch =
      r.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.connectionNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.billingMonth.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "ALL") return matchesSearch;
    return matchesSearch && r.status === statusFilter;
  });

  const columns = [
    {
      field: "billNumber",
      headerName: "Bill Number",
      renderCell: (row) => (
        <Chip
          icon={<ReceiptText size={12} />}
          label={row.billNumber}
          size="small"
          sx={{ bgcolor: "rgba(2, 132, 199, 0.1)", color: "#0284C7", fontWeight: 700 }}
        />
      ),
    },
    { field: "connectionNumber", headerName: "Connection No." },
    { field: "billingMonth", headerName: "Billing Period" },
    {
      field: "unitsConsumed",
      headerName: "Consumption",
      renderCell: (row) => <span>{row.unitsConsumed} kWh</span>,
    },
    {
      field: "amount",
      headerName: "Total Amount Due",
      renderCell: (row) => (
        <span style={{ fontWeight: 800, color: "#0F172A" }}>
          ₹{(row.amount || 0).toLocaleString()}
        </span>
      ),
    },
    { field: "dueDate", headerName: "Due Date" },
    {
      field: "status",
      headerName: "Settlement Status",
      renderCell: (row) => (
        <Chip
          icon={row.status === "PAID" ? <CheckCircle size={12} /> : <Clock size={12} />}
          size="small"
          label={row.status}
          sx={{
            bgcolor: row.status === "PAID" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
            color: row.status === "PAID" ? "#059669" : "#D97706",
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
          <Tooltip title="View & Print Official Utility Invoice">
            <IconButton size="small" onClick={() => handleOpenInvoice(row)} sx={{ color: "#0284C7" }}>
              <FileText size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <EnterpriseTable
        title="Billing & Invoice Ledger"
        subtitle="Manage compiled electricity utility invoices, tariff slab items, and settlement status"
        columns={columns}
        rows={filteredRows}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search bill number, connection no, month..."
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        actions={
          <Tabs
            value={statusFilter}
            onChange={(e, val) => setStatusFilter(val)}
            sx={{
              bgcolor: "#F8FAFC",
              p: 0.5,
              borderRadius: "10px",
              minHeight: 36,
              "& .MuiTab-root": { minHeight: 32, px: 2, fontSize: "0.75rem", fontWeight: 700 },
              "& .Mui-selected": { bgcolor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            <Tab value="ALL" label="All Bills" />
            <Tab value="UNPAID" label="Unpaid / Due" />
            <Tab value="PAID" label="Settled / Paid" />
          </Tabs>
        }
      />

      {/* Official Invoice Preview Dialog */}
      <BillInvoiceModal
        open={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        bill={selectedBill}
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

export default Bills;