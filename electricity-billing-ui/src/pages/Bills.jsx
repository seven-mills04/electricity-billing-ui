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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Eye, FileText, CheckCircle, Clock, ReceiptText, CreditCard } from "lucide-react";
import EnterpriseTable from "../components/EnterpriseTable";
import BillInvoiceModal from "../components/BillInvoiceModal";
import PageContainer from "../components/common/PageContainer";
import StatusBadge from "../components/common/StatusBadge";
import GradientButton from "../components/common/GradientButton";
import { getBills } from "../api/billApi";
import { getConsumerBills } from "../api/consumerApi";
import { payBill } from "../api/paymentApi";

const Bills = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); 
  const [loading, setLoading] = useState(false);

  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payingBill, setPayingBill] = useState(null);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [submittingPayment, setSubmittingPayment] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const role = localStorage.getItem("userRole");
      const response = role === "CONSUMER" ? await getConsumerBills() : await getBills();
      let bills = Array.isArray(response.data) ? response.data : [];

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

  const handleOpenPayment = (bill) => {
    setPayingBill(bill.rawBill || bill);
    setPaymentMode("UPI");
    setPaymentOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!payingBill) return;
    setSubmittingPayment(true);
    try {
      await payBill(payingBill.id, { paymentMode });
      setSnackbar({ open: true, message: "Bill Settled Successfully!", severity: "success" });
      setPaymentOpen(false);
      fetchBills();
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || err.response?.data || "Failed to settle bill.",
        severity: "error",
      });
    } finally {
      setSubmittingPayment(false);
    }
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
          sx={{ bgcolor: "rgba(6, 182, 212, 0.1)", color: "#06B6D4", border: "1px solid rgba(6, 182, 212, 0.25)", fontWeight: 700 }}
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
        <span style={{ fontWeight: 800, color: "#171717" }}>
          ₹{(row.amount || 0).toLocaleString()}
        </span>
      ),
    },
    { field: "dueDate", headerName: "Due Date" },
    {
      field: "status",
      headerName: "Settlement Status",
      renderCell: (row) => (
        <StatusBadge label={row.status} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "right",
      renderCell: (row) => (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {row.status === "UNPAID" && (
            <Tooltip title="Settle Bill (Make Payment)">
              <IconButton size="small" onClick={() => handleOpenPayment(row)} sx={{ color: "#06B6D4", "&:hover": { bgcolor: "rgba(6, 182, 212, 0.08)" } }}>
                <CreditCard size={18} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="View & Print Official Utility Invoice">
            <IconButton size="small" onClick={() => handleOpenInvoice(row)} sx={{ color: "#2563EB", "&:hover": { bgcolor: "rgba(37, 99, 235, 0.08)" } }}>
              <FileText size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <PageContainer>
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
              bgcolor: "#F3F0E8",
              border: "1px solid #C9C3B7",
              p: 0.5,
              borderRadius: "2px",
              minHeight: 36,
              "& .MuiTab-root": { minHeight: 32, px: 2, fontSize: "0.72rem", fontWeight: 800, color: "#625F58" },
              "& .Mui-selected": { bgcolor: "#075BB5", color: "#FFFDF8 !important", borderRadius: "2px", boxShadow: "none" },
              "& .MuiTabs-indicator": { display: "none" },
            }}
          >
            <Tab value="ALL" label="All Bills" />
            <Tab value="UNPAID" label="Unpaid / Due" />
            <Tab value="PAID" label="Settled / Paid" />
          </Tabs>
        }
      />

      
      <BillInvoiceModal
        open={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
        bill={selectedBill}
      />

      
      <Dialog open={paymentOpen} onClose={() => setPaymentOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#171717", pb: 1.5 }}>Settle Outstanding Invoice</DialogTitle>
        <DialogContent dividers sx={{ py: 3, borderColor: "#C9C3B7" }}>
          {payingBill && (
            <Stack spacing={2.5}>
              <Box sx={{ p: 2, bgcolor: "#F3F0E8", borderRadius: "2px", border: "1px solid #C9C3B7" }}>
                <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 800, display: "block", mb: 0.5 }}>
                  BILL NUMBER
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 800, color: "#171717", mb: 2 }}>
                  {payingBill.billNumber}
                </Typography>
                
                <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 800, display: "block", mb: 0.5 }}>
                  TOTAL OUTSTANDING AMOUNT
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#C5382F", fontFamily: "monospace" }}>
                  ₹{(payingBill.totalAmount || payingBill.amount || 0).toLocaleString()}
                </Typography>
              </Box>

              <FormControl fullWidth>
                <InputLabel id="payment-mode-label">Select Payment Mode</InputLabel>
                <Select
                  labelId="payment-mode-label"
                  label="Select Payment Mode"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <MenuItem value="UPI">UPI (Google Pay, PhonePe, Paytm)</MenuItem>
                  <MenuItem value="CARD">Credit / Debit Card</MenuItem>
                  <MenuItem value="NET_BANKING">Net Banking</MenuItem>
                  <MenuItem value="CASH">Cash Deposit at Counter</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: "1px solid #C9C3B7" }}>
          <Button onClick={() => setPaymentOpen(false)} sx={{ color: "#625F58" }}>
            Cancel
          </Button>
          <GradientButton
            onClick={handleConfirmPayment}
            variant="contained"
            colorType="accent"
            disabled={submittingPayment}
          >
            {submittingPayment ? "Processing..." : "Authorize Settlement"}
          </GradientButton>
        </DialogActions>
      </Dialog>

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

export default Bills;