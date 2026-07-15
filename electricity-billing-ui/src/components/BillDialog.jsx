import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

const BillDialog = ({ open, onClose, bill }) => {
  if (!bill) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Bill Details</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>
            <strong>Bill Number:</strong> {bill.billNumber}
          </Typography>

          <Divider />

          <Typography>
            <strong>Connection Number:</strong> {bill.connectionNumber}
          </Typography>

          <Typography>
            <strong>Bill Date:</strong> {bill.billDate}
          </Typography>

          <Typography>
            <strong>Due Date:</strong> {bill.dueDate}
          </Typography>

          <Typography>
            <strong>Total Amount:</strong> ₹{bill.amount}
          </Typography>

          <Typography>
            <strong>Status:</strong>{" "}
            <Chip
              label={bill.status}
              color={
                bill.status === "PAID"
                  ? "success"
                  : bill.status === "UNPAID"
                  ? "warning"
                  : "error"
              }
              size="small"
            />
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

export default BillDialog;