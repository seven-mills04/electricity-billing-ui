import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";

import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getBills } from "../api/billApi";
import BillDialog from "../components/BillDialog";
const Bills = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await getBills();

      console.log("Bills API:", response.data);

      let data = response.data.map((bill) => ({
        id: bill.id,
        billNumber: bill.billNumber,
        billDate: bill.billDate,
        dueDate: bill.dueDate,
        connectionNumber:
          bill.meterReading?.connection?.connectionNumber || "-",
        amount: bill.totalAmount,
        status: bill.billStatus,
        rawBill: bill,
      }));

      const role = localStorage.getItem("userRole");
      if (role === "CONSUMER") {
        const connStr = localStorage.getItem("consumerConnections");
        const consumerConns = connStr ? JSON.parse(connStr) : [];
        data = data.filter((bill) =>
          consumerConns.includes(bill.connectionNumber)
        );
      }

      setRows(data);
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Unable to fetch bills",
        severity: "error",
      });
    }
  };

  const filteredRows = rows.filter((row) =>
    row.billNumber
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
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
      field: "billDate",
      headerName: "Bill Date",
      flex: 1,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount (₹)",
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
            params.value === "PAID"
              ? "success"
              : params.value === "UNPAID"
              ? "warning"
              : "error"
          }
        />
      ),
    },
    {
  field: "actions",
  headerName: "Actions",
  flex: 0.7,
  sortable: false,
  renderCell: (params) => (
    <IconButton
      color="primary"
      onClick={() => {
        setSelectedBill(params.row);
        setOpenDialog(true);
      }}
    >
      <VisibilityIcon />
    </IconButton>
  ),
}
  ];

  return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Bills
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Automatically generated electricity bills
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Bills"
            value={rows.length}
            color="#1976d2"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard
            title="Paid"
            value={
              rows.filter((r) => r.status === "PAID").length
            }
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard
            title="Unpaid"
            value={
              rows.filter((r) => r.status === "UNPAID").length
            }
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      <TextField
        label="Search Bill Number"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <DataTable
        rows={filteredRows}
        columns={columns}
      />

       <BillDialog
        open={openDialog}
         onClose={() => setOpenDialog(false)}
         bill={selectedBill}
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

export default Bills;