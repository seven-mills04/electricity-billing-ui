import React from "react";
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
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { Download, Printer, ShieldCheck } from "lucide-react";
import { jsPDF } from "jspdf";

const BillDialog = ({ open, onClose, bill }) => {
  if (!bill) return null;

  const raw = bill.rawBill || {};
  const consumer = raw.meterReading?.connection?.consumer || {};
  const connection = raw.meterReading?.connection || {};

  const handleDownloadInvoicePDF = () => {
    const doc = new jsPDF();
    const primaryBlue = "#2563EB";
    const textDark = "#0F172A";
    const textMuted = "#64748B";

    // Header / Brand
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(primaryBlue);
    doc.text("ELECTRICITY BILLING SYSTEM", 14, 20);

    doc.setFontSize(9);
    doc.setTextColor(textMuted);
    doc.text("Official Invoice Statement", 14, 25);

    // Invoice Meta (right-aligned)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(textDark);
    doc.text(`INVOICE: ${bill.billNumber}`, 130, 20);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(textMuted);
    doc.text(`Bill Date: ${bill.billDate}`, 130, 25);
    doc.text(`Due Date: ${bill.dueDate}`, 130, 29);
    doc.text(`Billing Month: ${raw.billingMonth || "-"}`, 130, 33);

    doc.line(14, 38, 196, 38);

    // Consumer Details
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(textDark);
    doc.text("Billed To:", 14, 46);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${consumer.firstName || "Customer"} ${consumer.lastName || ""}`, 14, 52);
    doc.setTextColor(textMuted);
    doc.text(`Consumer No: ${consumer.consumerNumber || "-"}`, 14, 57);
    doc.text(`Email: ${consumer.email || "-"}`, 14, 62);
    doc.text(`Phone: ${consumer.phone || "-"}`, 14, 67);

    // Connection details (right side)
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(textDark);
    doc.text("Connection Details:", 110, 46);
    
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(textMuted);
    doc.text(`Connection No: ${connection.connectionNumber || bill.connectionNumber}`, 110, 52);
    doc.text(`Meter Number: ${connection.meterNumber || "-"}`, 110, 57);
    doc.text(`Sanctioned Load: ${connection.sanctionedLoad || "-"} kW`, 110, 62);
    doc.text(`Phase Type: ${connection.phaseType || "-"}`, 110, 67);

    doc.line(14, 72, 196, 72);

    // Charge Breakdown Table
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(primaryBlue);
    doc.text("Description of Charges", 15, 80);
    doc.text("Amount (INR)", 150, 80);
    doc.line(14, 84, 196, 84);

    doc.setFont("Helvetica", "normal");
    doc.setTextColor(textDark);
    
    // Rows
    doc.text("Fixed Monthly Charge", 15, 92);
    doc.text(`Rs. ${Number(raw.fixedCharge || 0).toFixed(2)}`, 150, 92);
    
    doc.text(`Energy Charge (${Number(raw.unitsConsumed || 0).toFixed(1)} kWh)`, 15, 100);
    doc.text(`Rs. ${Number(raw.energyCharge || 0).toFixed(2)}`, 150, 100);

    doc.text("State Electricity Duty (tax)", 15, 108);
    doc.text(`Rs. ${Number(raw.electricityDuty || 0).toFixed(2)}`, 150, 108);

    doc.line(14, 114, 196, 114);

    // Total Due
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Total Amount Due:", 15, 122);
    doc.text(`Rs. ${Number(bill.amount || raw.totalAmount || 0).toFixed(2)}`, 150, 122);

    // Status Watermark stamp
    const status = String(bill.status || raw.billStatus || "UNPAID").toUpperCase();
    doc.setFontSize(14);
    if (status === "PAID") {
      doc.setTextColor(5, 150, 105); // Green #059669
      doc.text("STATUS: PAID STATEMENT", 15, 138);
    } else {
      doc.setTextColor(220, 38, 38); // Red #DC2626
      doc.text("STATUS: OUTSTANDING / UNPAID", 15, 138);
    }

    // Save
    doc.save(`Invoice_${bill.billNumber}.pdf`);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
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
            Invoice Details
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Invoice ID: {bill.billNumber}
          </Typography>
        </Box>
        <Chip
          label={bill.status}
          color={bill.status === "PAID" ? "success" : "warning"}
          variant="filled"
          sx={{ fontWeight: 600, fontSize: "0.75rem", px: 1 }}
        />
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 3, borderColor: "#E2E8F0" }}>
        {/* Brand Block */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main", letterSpacing: "0.05em" }}>
              ELECTRICITY BILLING SYSTEM
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Official statement of consumption
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              Billing Month
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#0F172A" }}>
              {raw.billingMonth || "Current Month"}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Bill details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 600, display: "block", mb: 1 }}>
              Billed To
            </Typography>
            <Box sx={{ p: 2, bgcolor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#0F172A" }}>
                {consumer.firstName ? `${consumer.firstName} ${consumer.lastName}` : "Customer Details"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                Consumer Number: {consumer.consumerNumber || bill.connectionNumber}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Email: {consumer.email || "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Phone: {consumer.phone || "-"}
              </Typography>
            </Box>
          </Grid>

          {/* Connection Details */}
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 600, display: "block", mb: 1 }}>
              Connection Specifications
            </Typography>
            <Box sx={{ p: 2, bgcolor: "#F8FAFC", borderRadius: "8px", border: "1px solid #E2E8F0" }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#0F172A" }}>
                Meter No: {connection.meterNumber || "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                Connection Type: {connection.connectionType || "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Sanctioned Load: {connection.sanctionedLoad ? `${connection.sanctionedLoad} kW` : "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                Phase Type: {connection.phaseType || "-"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Financial Breakdown Table */}
        <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 600, display: "block", mb: 1 }}>
          Statement Summary
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #E2E8F0", boxShadow: "none", mb: 3 }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#F8FAFC" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: "#475569" }}>Charge Item</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "#475569" }}>Amount (INR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>Fixed Monthly Demand Charge</TableCell>
                <TableCell align="right">₹{Number(raw.fixedCharge || 0).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>Energy Charge ({Number(raw.unitsConsumed || 0).toFixed(1)} kWh consumed)</TableCell>
                <TableCell align="right">₹{Number(raw.energyCharge || 0).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>State Electricity Duty (tax)</TableCell>
                <TableCell align="right">₹{Number(raw.electricityDuty || 0).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 2 }} />

        {/* Due amount summary box */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "rgba(37, 99, 235, 0.02)", p: 2, borderRadius: "8px", border: "1px dashed rgba(37, 99, 235, 0.15)" }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A" }}>
              Total Due Amount
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Includes all taxes and monthly service duties.
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 750, color: "primary.main" }}>
            ₹{Number(bill.amount || raw.totalAmount || 0).toFixed(2)}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 2.5, bgcolor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Download size={16} />}
            onClick={handleDownloadInvoicePDF}
            sx={{ mr: "auto" }}
          >
            Download Invoice PDF
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close Statement
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default BillDialog;