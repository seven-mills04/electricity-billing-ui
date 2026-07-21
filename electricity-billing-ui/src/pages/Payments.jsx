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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import { Plus, CreditCard, CheckCircle, Receipt, DollarSign, Wallet } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import DetailsDialog from "../components/DetailsDialog";
import { getPayments, payBill } from "../api/paymentApi";
import { getBills } from "../api/billApi";

const Payments = () => {
  const [rows, setRows] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");

  const [viewOpen, setViewOpen] = useState(false);
  const [viewPayment, setViewPayment] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchPayments();
    fetchUnpaidBills();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await getPayments();
      let payments = Array.isArray(response.data) ? response.data : [];

      const role = localStorage.getItem("userRole");
      if (role === "CONSUMER") {
        const connStr = localStorage.getItem("consumerConnections");
        const consumerConns = connStr ? JSON.parse(connStr) : [];
        payments = payments.filter((p) =>
          consumerConns.includes(p.bill?.meterReading?.connection?.connectionNumber)
        );
      }

      const mapped = payments.map((p) => ({
        id: p.id,
        transactionId: p.transactionId,
        paymentDate: p.paymentDate,
        paymentMode: p.paymentMode,
        amountPaid: p.amountPaid,
        billNumber: p.bill?.billNumber || "-",
        connectionNumber: p.bill?.meterReading?.connection?.connectionNumber || "-",
        rawPayment: p,
      }));

      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to fetch payment settlements", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchUnpaidBills = async () => {
    try {
      const response = await getBills();
      let bills = Array.isArray(response.data) ? response.data : [];
      let unpaid = bills.filter((b) => b.billStatus === "UNPAID");

      const role = localStorage.getItem("userRole");
      if (role === "CONSUMER") {
        const connStr = localStorage.getItem("consumerConnections");
        const consumerConns = connStr ? JSON.parse(connStr) : [];
        unpaid = unpaid.filter((b) =>
          consumerConns.includes(b.meterReading?.connection?.connectionNumber)
        );
      }

      setUnpaidBills(unpaid);
    } catch (err) {
      console.error("Failed to load unpaid bills", err);
    }
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    if (!selectedBillId) {
      setSnackbar({ open: true, message: "Please select an unpaid bill", severity: "warning" });
      return;
    }

    try {
      await payBill(selectedBillId, { paymentMode });
      setSnackbar({ open: true, message: "Payment Settled Successfully!", severity: "success" });
      setPayDialogOpen(false);
      setSelectedBillId("");
      fetchPayments();
      fetchUnpaidBills();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Payment Processing Failed",
        severity: "error",
      });
    }
  };

  const handleOpenView = (payment) => {
    setViewPayment(payment.rawPayment || payment);
    setViewOpen(true);
  };

  const filteredRows = rows.filter(
    (r) =>
      r.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      r.billNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.connectionNumber.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "transactionId",
      headerName: "Transaction ID",
      renderCell: (row) => (
        <Chip
          icon={<CreditCard size={12} />}
          label={row.transactionId}
          size="small"
          sx={{ bgcolor: "rgba(2, 132, 199, 0.1)", color: "#0284C7", fontWeight: 700 }}
        />
      ),
    },
    { field: "billNumber", headerName: "Bill Ref No." },
    { field: "connectionNumber", headerName: "Connection No." },
    { field: "paymentDate", headerName: "Settlement Date" },
    {
      field: "paymentMode",
      headerName: "Payment Method",
      renderCell: (row) => (
        <Chip
          size="small"
          label={row.paymentMode}
          sx={{ bgcolor: "#F1F5F9", color: "#475569", fontWeight: 600 }}
        />
      ),
    },
    {
      field: "amountPaid",
      headerName: "Amount Settled",
      renderCell: (row) => (
        <span style={{ fontWeight: 800, color: "#10B981" }}>
          +₹{(row.amountPaid || 0).toLocaleString()}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Receipt",
      align: "right",
      renderCell: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="View Settlement Receipt">
            <IconButton size="small" onClick={() => handleOpenView(row)} sx={{ color: "#0284C7" }}>
              <Receipt size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <EnterpriseTable
        title="Financial Settlements & Payments"
        subtitle="Audit transaction receipts, multi-channel payment modes, and instant bill reconciliations"
        columns={columns}
        rows={filteredRows}
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search txn ID, bill ref, connection no..."
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
            onClick={() => setPayDialogOpen(true)}
            sx={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
            }}
          >
            Process Bill Payment
          </Button>
        }
      />

      {/* Pay Bill Dialog */}
      <Dialog open={payDialogOpen} onClose={() => setPayDialogOpen(false)} maxWidth="sm" fullWidth>
        <form onSubmit={handlePaySubmit}>
          <DialogTitle sx={{ p: 3, bgcolor: "#0F172A", color: "#FFFFFF", fontWeight: 700 }}>
            Process Instant Electricity Settlement
          </DialogTitle>

          <DialogContent sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField
                select
                fullWidth
                label="Select Outstanding Unpaid Bill"
                value={selectedBillId}
                onChange={(e) => setSelectedBillId(e.target.value)}
                required
              >
                {unpaidBills.length === 0 ? (
                  <MenuItem disabled value="">No Unpaid Bills Found</MenuItem>
                ) : (
                  unpaidBills.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      Bill #{b.billNumber} | Conn: {b.meterReading?.connection?.connectionNumber} | ₹{(b.totalAmount || 0).toLocaleString()}
                    </MenuItem>
                  ))
                )}
              </TextField>

              <TextField
                select
                fullWidth
                label="Payment Mode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                required
              >
                <MenuItem value="UPI">UPI / Digital Wallet</MenuItem>
                <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
                <MenuItem value="DEBIT_CARD">Debit Card</MenuItem>
                <MenuItem value="NET_BANKING">Net Banking</MenuItem>
                <MenuItem value="CASH">Cash Counter</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2.5, bgcolor: "#F8FAFC" }}>
            <Button onClick={() => setPayDialogOpen(false)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!selectedBillId}
              sx={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)" }}
            >
              Confirm & Settle Payment
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Settlement Receipt Dialog */}
      <DetailsDialog
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        title="Transaction Settlement Receipt"
        data={
          viewPayment
            ? {
                "Transaction Reference": viewPayment.transactionId,
                "Settlement Date": viewPayment.paymentDate,
                "Payment Channel": viewPayment.paymentMode,
                "Amount Paid": `₹${(viewPayment.amountPaid || 0).toLocaleString()}`,
                "Bill Reference": viewPayment.bill?.billNumber || "N/A",
                "Grid Connection": viewPayment.bill?.meterReading?.connection?.connectionNumber || "N/A",
              }
            : null
        }
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

export default Payments;