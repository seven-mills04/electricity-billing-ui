import React, { useRef } from "react";
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
  Chip,
  Paper,
} from "@mui/material";
import { Zap, Printer, CheckCircle, Clock } from "lucide-react";
import GradientButton from "./common/GradientButton";

const BillInvoiceModal = ({
  open,
  onClose,
  bill,
  consumer,
  connection,
  meterReading,
  handleClose: propHandleClose,
}) => {
  if (!bill) return null;

  const activeClose = onClose || propHandleClose;

  const isPaid = String(bill.billStatus).toUpperCase() === "PAID";

  const rawConsumer = consumer || bill.consumer || {};
  const rawConnection = connection || bill.connection || {};
  const rawMeter = meterReading || bill.meterReading || {};

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onClose={activeClose}
      ModalProps={{ closeAfterTransition: false }}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "2px",
          border: "1px solid #C9C3B7",
          boxShadow: "none",
          bgcolor: "#FFFDF8",
        }
      }}
    >
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: transparent !important;
            color: #000000 !important;
            box-shadow: none !important;
          }
          .MuiDialog-container,
          .MuiDialog-paper {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            visibility: visible !important;
          }
          .MuiDialog-paper * {
            visibility: visible !important;
          }
          .print-row {
            display: flex !important;
            flex-direction: row !important;
            width: 100% !important;
          }
          .print-col-6 {
            width: 50% !important;
            flex-basis: 50% !important;
          }
          .print-col-3 {
            width: 25% !important;
            flex-basis: 25% !important;
          }
          .print-between {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
          }
          .MuiDialogActions-root {
            display: none !important;
          }
        }
      `}</style>

      <DialogTitle sx={{ p: 3, bgcolor: "#FFFDF8", color: "#171717", borderBottom: "1px solid #C9C3B7" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ flexWrap: "wrap", width: "100%" }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0, flex: 1, mr: { sm: 2 } }}>
            <Box sx={{ p: 1, borderRadius: "2px", bgcolor: "#E9E5DB", color: "#171717", border: "1px solid #C9C3B7", flexShrink: 0 }}>
              <Zap size={20} fill="currentColor" />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: "-0.01em",
                }}
              >
                OFFICIAL UTILITY INVOICE
              </Typography>
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, display: "block" }}>
                Bill No: {bill.billNumber || "N/A"}
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={isPaid ? <CheckCircle size={14} /> : <Clock size={14} />}
            label={isPaid ? "SETTLED / PAID" : "PAYMENT DUE"}
            sx={{
              bgcolor: "#FFFDF8",
              color: isPaid ? "#087A5A" : "#F05A28",
              fontWeight: 800,
              fontSize: "0.75rem",
              borderRadius: "2px",
              border: `1.5px solid ${isPaid ? "#087A5A" : "#F05A28"}`,
              flexShrink: 0,
              "& .MuiChip-icon": { color: "currentColor" },
            }}
          />
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 4, bgcolor: "#FFFDF8", color: "#171717" }}>
        <Paper elevation={0} sx={{ p: 3, bgcolor: "#F3F0E8", border: "1px solid #C9C3B7", borderRadius: "2px", mb: 3 }}>
          <Grid container spacing={3} className="print-row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            <Grid item xs={12} sm={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="subtitle2" sx={{ color: "#625F58", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 800 }}>
                Consumer Details
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, color: "#171717" }}>
                {rawConsumer.firstName ? `${rawConsumer.firstName} ${rawConsumer.lastName}` : "Consumer Record"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700, mt: 0.5 }}>
                Consumer No: {rawConsumer.consumerNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                Phone: {rawConsumer.phone || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                Email: {rawConsumer.email || "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="subtitle2" sx={{ color: "#625F58", textTransform: "uppercase", fontSize: "0.7rem", fontWeight: 800 }}>
                Connection & Meter Details
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", mt: 0.8 }}>
                Connection No: {rawConnection.connectionNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                Meter No: {rawConnection.meterNumber || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                Category: {rawConnection.connectionType || "DOMESTIC"} ({rawConnection.phaseType || "SINGLE_PHASE"})
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>
                Sanctioned Load: {rawConnection.sanctionedLoad || 5.0} kW
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#171717", fontSize: "1.05rem" }}>
          Consumption Breakdown
        </Typography>

        <Paper elevation={0} sx={{ border: "1px solid #C9C3B7", bgcolor: "#FFFDF8", borderRadius: "2px", overflow: "hidden", mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: "#E9E5DB", borderBottom: "1px solid #C9C3B7" }}>
            <Grid container fontWeight={800} fontSize="0.75rem" color="#171717" className="print-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Grid item xs={3} className="print-col-3" style={{ width: '25%', flexBasis: '25%' }}>Billing Month</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Prev Reading</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Curr Reading</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>Units Consumed</Grid>
            </Grid>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid container fontSize="0.875rem" color="#171717" className="print-row" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Grid item xs={3} fontWeight={800} className="print-col-3" style={{ width: '25%', flexBasis: '25%' }}>{bill.billingMonth || "Current"}</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>{rawMeter.previousReading ?? "-"} kWh</Grid>
              <Grid item xs={3} textAlign="right" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right' }}>{rawMeter.currentReading ?? "-"} kWh</Grid>
              <Grid item xs={3} textAlign="right" fontWeight={800} color="#075BB5" className="print-col-3" style={{ width: '25%', flexBasis: '25%', textAlign: 'right', fontFamily: "monospace" }}>
                {bill.unitsConsumed ?? 0} kWh
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: "#171717", fontSize: "1.05rem" }}>
          Itemized Tariff Calculation
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>Energy Charges (Slab Rated)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>₹{(bill.energyCharge ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>Fixed Demand Charge ({rawConnection.sanctionedLoad || 5} kW Load)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>₹{(bill.fixedCharge ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="body2" sx={{ color: "#625F58", fontWeight: 700 }}>State Electricity Duty (5%)</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", fontFamily: "monospace" }}>₹{(bill.electricityDuty ?? 0).toLocaleString()}</Typography>
          </Stack>

          <Divider sx={{ my: 1, borderColor: "#C9C3B7" }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center" className="print-between" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717" }}>Net Amount Payable</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#087A5A", fontFamily: "monospace" }}>
              ₹{(bill.totalAmount ?? 0).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ p: 2, bgcolor: "#F3F0E8", borderRadius: "2px", border: "1px solid #C9C3B7" }}>
          <Grid container spacing={2} className="print-row" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
            <Grid item xs={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>Bill Issue Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717" }}>{bill.billDate || "N/A"}</Typography>
            </Grid>
            <Grid item xs={6} className="print-col-6" style={{ width: '50%', flexBasis: '50%' }}>
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>Payment Due Date</Typography>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "#C5382F" }}>{bill.dueDate || "N/A"}</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions className="no-print" sx={{ p: 2.5, bgcolor: "#FFFDF8", borderTop: "1px solid #C9C3B7" }}>
        <Button
          autoFocus
          onClick={activeClose}
          variant="outlined"
          sx={{
            color: "#171717",
            borderColor: "#C9C3B7",
            borderRadius: "2px",
            "&:hover": { borderColor: "#171717", bgcolor: "#E9E5DB" }
          }}
        >
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
