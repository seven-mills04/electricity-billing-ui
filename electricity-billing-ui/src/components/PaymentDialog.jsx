import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  Grid,
  Divider,
  Chip
} from "@mui/material";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";

const PaymentDialog = ({ open, onClose, payment }) => {
  if (!payment) return null;

  const raw = payment.rawPayment || {};
  const bill = raw.bill || {};
  const consumer = bill.meterReading?.connection?.consumer || {};
  const connection = bill.meterReading?.connection || {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)"
        }
      }}
    >
      <DialogTitle sx={{ px: 4, pt: 3.5, pb: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
            Payment Receipt
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Txn ID: {payment.transactionId}
          </Typography>
        </Box>
        <Chip
          icon={<CheckCircle2 size={14} style={{ color: "#059669" }} />}
          label="SUCCESSFUL"
          sx={{
            fontWeight: 650,
            fontSize: "0.75rem",
            color: "#059669",
            bgcolor: "#ECFDF5",
            border: "1px solid #A7F3D0",
            px: 0.5
          }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 3, borderColor: "#E2E8F0" }}>
        <Stack spacing={3}>
          
          {/* Amount Paid Big Callout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              py: 2.5
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.5 }}>
              Amount Paid
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#059669" }}>
              ₹{Number(payment.amountPaid).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              Paid via {payment.paymentMode || "ONLINE"}
            </Typography>
          </Box>

          {/* Transaction Metadata Grid */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "block",
                mb: 1.5,
                letterSpacing: "0.05em"
              }}
            >
              Transaction Metadata
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Payment Date & Time
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {payment.paymentDate || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Payment Mode
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {payment.paymentMode || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Linked Bill Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {payment.billNumber || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Associated Connection
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {payment.connectionNumber || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Consumer Specifications */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "block",
                mb: 1.5,
                letterSpacing: "0.05em"
              }}
            >
              Payer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Consumer Name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {consumer.firstName ? `${consumer.firstName} ${consumer.lastName}` : "Customer Details"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Consumer Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {consumer.consumerNumber || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Email Address
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {consumer.email || "-"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Phone Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                  {consumer.phone || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Box>

        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 2, bgcolor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ px: 3 }}>
          Close Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;