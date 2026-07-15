import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
  Chip,
} from "@mui/material";

const PaymentDialog = ({ open, onClose, payment }) => {
  if (!payment) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Payment Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>
            <strong>Transaction ID:</strong> {payment.transactionId}
          </Typography>

          <Divider />

          <Typography>
            <strong>Bill Number:</strong> {payment.billNumber}
          </Typography>

          <Typography>
            <strong>Connection Number:</strong> {payment.connectionNumber}
          </Typography>

          <Typography>
            <strong>Payment Date:</strong> {payment.paymentDate}
          </Typography>

          <Typography>
            <strong>Payment Mode:</strong>{" "}
            <Chip
              label={payment.paymentMode}
              color="success"
              size="small"
            />
          </Typography>

          <Typography variant="h6">
            <strong>Amount Paid:</strong>{" "}
            ₹{Number(payment.amountPaid).toFixed(2)}
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;