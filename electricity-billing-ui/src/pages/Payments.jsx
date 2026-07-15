import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Snackbar,
  Alert,
  Chip,
  IconButton,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";

import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import PaymentDialog from "../components/PaymentDialog";
import PayBillDialog from "../components/PayBillDialog";

import { getPayments, payBill } from "../api/paymentApi";
import { getBills } from "../api/billApi";

const Payments = () => {
  const [rows, setRows] = useState([]);
  const [unpaidBills, setUnpaidBills] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedBill, setSelectedBill] = useState(null);
  const [openPayDialog, setOpenPayDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchPayments();
    fetchUnpaidBills();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();

      const data = response.data.map((payment) => ({
        id: payment.id,
        transactionId: payment.transactionId,
        paymentDate: payment.paymentDate,
        paymentMode: payment.paymentMode,
        amountPaid: payment.amountPaid,
        billNumber: payment.bill.billNumber,
        connectionNumber:
          payment.bill.meterReading.connection.connectionNumber,
      }));

      setRows(data);
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Unable to fetch payments",
        severity: "error",
      });
    }
  };

  const fetchUnpaidBills = async () => {
    try {
      const response = await getBills();

      const bills = response.data.filter(
        (bill) => bill.billStatus === "UNPAID"
      );

      setUnpaidBills(bills);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess = async (billId, paymentMode) => {
    try {
      await payBill(billId, {
        paymentMode,
      });

      setSnackbar({
        open: true,
        message: "Payment Successful",
        severity: "success",
      });

      setOpenPayDialog(false);

      fetchPayments();
      fetchUnpaidBills();

    } catch (error) {

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message || "Payment Failed",
        severity: "error",
      });
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.transactionId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      row.billNumber
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalRevenue = rows.reduce(
    (sum, payment) => sum + Number(payment.amountPaid),
    0
  );

  const columns = [
    {
      field: "transactionId",
      headerName: "Transaction ID",
      flex: 1.4,
    },
    {
      field: "billNumber",
      headerName: "Bill Number",
      flex: 1,
    },
    {
      field: "connectionNumber",
      headerName: "Connection",
      flex: 1,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      flex: 1,
    },
    {
      field: "paymentMode",
      headerName: "Mode",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="success"
          size="small"
        />
      ),
    },
    {
      field: "amountPaid",
      headerName: "Amount (₹)",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setSelectedPayment(params.row);
            setOpenDialog(true);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];
    return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Payments
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage electricity bill payments
      </Typography>

      {/* Statistics */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={3}>
          <StatsCard
            title="Total Payments"
            value={rows.length}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Revenue"
            value={`₹${totalRevenue.toFixed(2)}`}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Pending Bills"
            value={unpaidBills.length}
            color="#ed6c02"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard
            title="Payment Modes"
            value={new Set(rows.map((r) => r.paymentMode)).size}
            color="#6a1b9a"
          />
        </Grid>
      </Grid>

      {/* Pending Bills */}
      <Typography variant="h6" mb={2}>
        Pending Bills
      </Typography>

      {unpaidBills.length === 0 ? (
        <Alert severity="success" sx={{ mb: 4 }}>
          No unpaid bills available.
        </Alert>
      ) : (
        <Grid container spacing={2} mb={4}>
          {unpaidBills.map((bill) => (
            <Grid item xs={12} md={6} lg={4} key={bill.id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography fontWeight="bold">
                  {bill.billNumber}
                </Typography>

                <Typography>
                  Connection:{" "}
                  {bill.meterReading?.connection?.connectionNumber}
                </Typography>

                <Typography>
                  Amount: ₹{Number(bill.totalAmount).toFixed(2)}
                </Typography>

                <Typography>
                  Due Date: {bill.dueDate}
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<PaymentIcon />}
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={() => {
                    setSelectedBill(bill);
                    setOpenPayDialog(true);
                  }}
                >
                  Pay Bill
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Payment History */}

      <TextField
        label="Search Transaction / Bill"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <DataTable
        rows={filteredRows}
        columns={columns}
      />

      {/* View Payment Dialog */}

      <PaymentDialog
        open={openDialog}
        payment={selectedPayment}
        onClose={() => setOpenDialog(false)}
      />

      {/* Pay Bill Dialog */}

      <PayBillDialog
        open={openPayDialog}
        bill={selectedBill}
        onClose={() => setOpenPayDialog(false)}
        onPay={handlePaymentSuccess}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default Payments;