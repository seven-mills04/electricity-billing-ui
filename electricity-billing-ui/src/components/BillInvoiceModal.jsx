import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import { Zap, Printer, CheckCircle, Clock, FileText } from "lucide-react";
import api from "../api/axiosConfig";
import GradientButton from "./common/GradientButton";

const BillInvoiceModal = ({ open, onClose, bill }) => {
  if (!bill) return null;

  const [fetchedConsumer, setFetchedConsumer] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  const isPaid = bill.billStatus === "PAID";
  const rawMeter = bill.meterReading || {};
  const rawConnection = rawMeter.connection || {};
  const rawConsumer = fetchedConsumer || rawConnection.consumer || {};

  useEffect(() => {
    if (open && rawConnection.consumerId) {
      setFetchedConsumer(null);
      api.get(`/api/consumers/${rawConnection.consumerId}`)
        .then((res) => {
          if (res.data) {
            setFetchedConsumer(res.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch consumer details for invoice modal", err);
        });
    } else {
      setFetchedConsumer(null);
    }
  }, [open, rawConnection.consumerId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        id: "printable-bill-invoice",
      }}
    >
      <style>{`
        @media print {
          /* Hide everything except the dialog wrapper */
          body * {
            visibility: hidden !important;
          }
          #printable-bill-invoice, #printable-bill-invoice * {
            visibility: visible !important;
          }
          #printable-bill-invoice {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
            display: block !important;
          }
          /* Ensure Dialog container and paper behave like block elements for pagination */
          .MuiDialog-container {
            display: block !important;
            position: static !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }
          .MuiDialogContent-root {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
            padding: 24px !important;
          }
          .no-print {
            display: none !important;
          }
          /* Ensure header color is printed */
          .MuiDialogTitle-root {
            background-color: #0F172A !important;
            color: #FFFFFF !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            padding: 24px !important;
          }
          /* Re-establish flex columns for print layout */
          .print-row {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            width: 100% !important;
          }
          .print-col-6 {
            width: 50% !important;
            max-width: 50% !important;
            flex-basis: 50% !important;
            box-sizing: border-box !important;
          }
          .print-col-3 {
            width: 25% !important;
            max-width: 25% !important;
            flex-basis: 25% !important;
            box-sizing: border-box !important;
          }
          .print-between {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
          }
          .MuiDialogActions-root {
            display: none !important;
          }
        }
      `}</style>

      <DialogTitle sx={{ p: 3, bgcolor: "rgba(13, 27, 42, 0.95)", color: "#FFFFFF", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#06B6D4", color: "#0F172A" }}>
              <Zap size={20} fill="currentColor" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                OFFICIAL UTILITY INVOICE
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                Bill No: {bill.billNumber || "N/A"}
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={isPaid ? <CheckCircle size={14} /> : <Clock size={14} />}
            label={isPaid ? "SETTLED / PAID" : "PAYMENT DUE"}
            sx={{
              bgcolor: isPaid ? "rgba(34, 197, 94, 0.15)" : "rgba(245, 158, 11, 0.15)",
              color: isPaid ? "#22C55E" : "#F59E0B",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: `1px solid ${isPaid ? "rgba(34, 197, 94, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
            }}
          />
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 4, bgcolor: "rgba(13, 27, 42, 0.95)", color: "#FFFFFF" }}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "16px", mb: 3 }}>
          <Grid container spacing={3} className="print-row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            <Grid item xs={12} sm={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="subtitle2" sx={{ color: "#94A3B8", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 700 }}>
                Consumer Details
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, color: "#FFFFFF" }}>
                {rawConsumer.firstName ? `${rawConsumer.firstName} ${rawConsumer.lastName}` : "Consumer Record"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Consumer No: {rawConsumer.consumerNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Phone: {rawConsumer.phone || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Email: {rawConsumer.email || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="subtitle2" sx={{ color: "#94A3B8", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 700 }}>
                Connection & Meter Details
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF", mt: 0.5 }}>
                Connection No: {rawConnection.connectionNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Meter No: {rawConnection.meterNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Category: {rawConnection.connectionType || "DOMESTIC"} ({rawConnection.phaseType || "SINGLE_PHASE"})
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Sanctioned Load: {rawConnection.sanctionedLoad || 5.0} kW
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#FFFFFF" }}>
          Consumption Breakdown
        </Typography>

        <Paper elevation={0} sx={{ border: "1px solid rgba(255, 255, 255, 0.08)", bgcolor: "rgba(255, 255, 255, 0.01)", borderRadius: "12px", overflow: "hidden", mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <Grid container fontWeight={700} fontSize="0.8rem" color="#94A3B8" className="print-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Grid item xs={3} className="print-col-3" style={{ width: '25%', flexBasis: '25%' }}>Billing Month</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Prev Reading</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Curr Reading</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Units Consumed</Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid container fontSize="0.875rem" color="#FFFFFF" className="print-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Grid item xs={3} fontWeight={600} className="print-col-3" style={{ width: '25%', flexBasis: '25%' }}>{bill.billingMonth || "Current"}</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>{rawMeter.previousReading ?? "-"} kWh</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>{rawMeter.currentReading ?? "-"} kWh</Grid>
              <Grid item xs={3} textAlign="right" fontWeight={700} color="#06B6D4" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>
                {bill.unitsConsumed ?? 0} kWh
              </Grid>
            </Grid>
          </Box>
        </Paper>

        
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#FFFFFF" }}>
          Itemized Tariff Calculation
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#94A3B8" }}>Energy Charges (Slab Rated)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{(bill.energyCharge ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#94A3B8" }}>Fixed Demand Charge ({rawConnection.sanctionedLoad || 5} kW Load)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{(bill.fixedCharge ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#94A3B8" }}>State Electricity Duty (5%)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>₹{(bill.electricityDuty ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.08)" }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFFFF" }}>Net Amount Payable</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#22C55E" }}>
              ₹{(bill.totalAmount ?? 0).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ p: 2, bgcolor: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <Grid container spacing={2} className="print-row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            <Grid item xs={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>Bill Issue Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{bill.billDate || "N/A"}</Typography>
            </Grid>
            <Grid item xs={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>Payment Due Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#EF4444" }}>{bill.dueDate || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions className="no-print" sx={{ p: 2.5, bgcolor: "rgba(13, 27, 42, 0.95)", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Button onClick={onClose} variant="outlined" sx={{ color: "#94A3B8", borderColor: "rgba(255, 255, 255, 0.12)" }}>
          Close
        </Button>
        <GradientButton onClick={handlePrint} variant="contained" colorType="accent" startIcon={<Printer size={16} />}>
          Print Utility Invoice
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default BillInvoiceModal;
