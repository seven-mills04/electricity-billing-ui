import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const PayBillDialog = ({ open, onClose, bill, onPay }) => {
  const [paymentMode, setPaymentMode] = useState("UPI");

  useEffect(() => {
    if (open) {
      setPaymentMode("UPI");
    }
  }, [open]);

  if (!bill) return null;

  const handlePay = () => {
    onPay(bill.id, paymentMode);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Pay Electricity Bill</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Typography>
            <strong>Bill Number:</strong> {bill.billNumber}
          </Typography>

          <Typography>
            <strong>Connection:</strong>{" "}
            {bill.meterReading?.connection?.connectionNumber}
          </Typography>

          <Typography>
            <strong>Billing Month:</strong> {bill.billingMonth}
          </Typography>

          <Typography>
            <strong>Total Amount:</strong> ₹
            {Number(bill.totalAmount).toFixed(2)}
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Payment Mode</InputLabel>

            <Select
              value={paymentMode}
              label="Payment Mode"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="CARD">CARD</MenuItem>
              <MenuItem value="NET_BANKING">NET BANKING</MenuItem>
              <MenuItem value="CASH">CASH</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handlePay}
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayBillDialog;