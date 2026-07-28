import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowRight,
  CreditCard,
  History,
  PlusCircle,
  FileEdit,
  Download,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const QuickServices = () => {
  const navigate = useNavigate();

  const [payDialogOpen, setPayDialogOpen] = useState(false);
  const [consumerNo, setConsumerNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [error, setError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const mockBills = {
    con1001: {
      name: "Rajesh Kumar",
      billNo: "KNK-2026-0711",
      month: "July 2026",
      due: "2026-08-05",
      units: 245,
      amount: 1480,
    },
    con1002: {
      name: "Sneha Patel",
      billNo: "KNK-2026-0712",
      month: "July 2026",
      due: "2026-08-05",
      units: 180,
      amount: 980,
    },
    con1003: {
      name: "Amit Sharma",
      billNo: "KNK-2026-0713",
      month: "July 2026",
      due: "2026-08-05",
      units: 420,
      amount: 3120,
    },
  };

  const handleTaskClick = (actionType) => {
    if (actionType === "pay") {
      setPayDialogOpen(true);
      setError("");
      setBillDetails(null);
      setPaySuccess(false);
      setConsumerNo("");
    } else if (actionType === "history") {
      navigate("/login", { state: { tab: 1 } });
    } else if (actionType === "new") {
      navigate("/login", { state: { tab: 2 } });
    } else if (actionType === "meter") {
      navigate("/login", { state: { tab: 1 } });
    } else if (actionType === "receipt") {
      navigate("/login", { state: { tab: 1 } });
    }
  };

  const handleLookup = () => {
    if (!consumerNo.trim()) {
      setError("Please enter a valid Consumer Number.");
      return;
    }
    setLoading(true);
    setError("");

    setTimeout(() => {
      const cNo = consumerNo.trim().toLowerCase();
      const bill = mockBills[cNo];
      setLoading(false);
      if (bill) {
        setBillDetails(bill);
      } else {
        setBillDetails({
          name: `Consumer (${consumerNo.toUpperCase()})`,
          billNo: `KNK-2026-OP${Math.floor(1000 + Math.random() * 9000)}`,
          month: "July 2026",
          due: "2026-08-05",
          units: 280,
          amount: 1845,
        });
      }
    }, 1000);
  };

  const handlePaymentSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaySuccess(true);
    }, 1500);
  };

  // 1. Task Strip entries (Horizontally arranged on desktop)
  const taskStripItems = [
    {
      num: "01",
      label: "Pay Bill",
      desc: "Instantly clear outstanding dues online.",
      action: "pay",
      accent: "#075BB5",
    },
    {
      num: "02",
      label: "View Bill History",
      desc: "Access statements from past billing cycles.",
      action: "history",
      accent: "#625F58",
    },
    {
      num: "03",
      label: "New Connection",
      desc: "Apply for a commercial or domestic grid meter.",
      action: "new",
      accent: "#F05A28",
    },
    {
      num: "04",
      label: "Submit Reading",
      desc: "Self-report your current monthly meter units.",
      action: "meter",
      accent: "#087A5A",
    },
  ];

  // 2. Online Services rows
  const serviceRows = [
    {
      num: "01",
      title: "Pay electricity bill",
      desc: "Clear outstanding utility dues instantly using UPI, credit cards, or net banking.",
      btnText: "Pay now",
      action: "pay",
      icon: <CreditCard size={20} color="#075BB5" />,
    },
    {
      num: "02",
      title: "View billing history",
      desc: "Review previous billing details, payment dates, and outstanding ledger balances.",
      btnText: "View statements",
      action: "history",
      icon: <History size={20} color="#625F58" />,
    },
    {
      num: "03",
      title: "Apply for a new connection",
      desc: "Register commercial or residential connection requests and upload property deeds.",
      btnText: "Start application",
      action: "new",
      icon: <PlusCircle size={20} color="#F05A28" />,
    },
    {
      num: "04",
      title: "Submit meter reading",
      desc: "Submit current cumulative kWh registry values and verify meter records.",
      btnText: "Submit reading",
      action: "meter",
      icon: <FileEdit size={20} color="#087A5A" />,
    },
    {
      num: "05",
      title: "Download receipts",
      desc: "Access completed transaction records and download printable soft copies.",
      btnText: "View receipts",
      action: "receipt",
      icon: <Download size={20} color="#075BB5" />,
    },
  ];

  return (
    <Box id="services" sx={{ bgcolor: "transparent" }}>
      {/* ==================================================
          PRIMARY TASK STRIP (Under Hero)
          ================================================== */}
      <Box sx={{ borderBottom: "1px solid #C9C3B7", bgcolor: "#E9E5DB" }}>
        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Grid container sx={{ m: 0, width: "100%" }}>
            {taskStripItems.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                onClick={() => handleTaskClick(item.action)}
                sx={{
                  borderRight: { xs: "none", md: index < 3 ? "1px solid #C9C3B7" : "none" },
                  borderBottom: { xs: "1px solid #C9C3B7", md: "none" },
                  cursor: "pointer",
                  p: { xs: 3, md: 4.5 },
                  bgcolor: "#FFFDF8",
                  transition: "background-color 150ms ease-in-out",
                  position: "relative",
                  "&:hover": {
                    bgcolor: "#F3F0E8",
                  },
                  "&:hover .task-arrow": {
                    transform: "translateX(6px)",
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    transition: "none",
                    "&:hover .task-arrow": {
                      transform: "none",
                    },
                  },
                }}
              >
                {/* Visual marker */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    bgcolor: item.accent,
                  }}
                />

                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: item.accent,
                        fontSize: "0.85rem",
                      }}
                    >
                      {item.num}
                    </Typography>
                    <ArrowRight
                      size={18}
                      className="task-arrow"
                      style={{
                        color: "#171717",
                        transition: "transform 150ms ease-in-out",
                      }}
                    />
                  </Stack>

                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.1rem",
                        mb: 0.8,
                        color: "#171717",
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#625F58", fontSize: "0.85rem", lineHeight: 1.4 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ==================================================
          ONLINE SERVICES SECTION (Service Directory)
          ================================================== */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderBottom: "1px solid #C9C3B7" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Section Headings - 4 columns */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2} sx={{ position: "sticky", top: 120 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#075BB5",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  SERVICE DIRECTORY
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1.85rem", md: "2.2rem" },
                    lineHeight: 1.15,
                  }}
                >
                  Manage your connection
                </Typography>
                <Typography variant="body2" sx={{ color: "#625F58", maxWidth: "320px", fontSize: "0.9rem" }}>
                  Common account services and application processes available online. Select a directory action below.
                </Typography>
              </Stack>
            </Grid>

            {/* Service rows directory - 8 columns */}
            <Grid item xs={12} md={8}>
              <Stack>
                {serviceRows.map((row, index) => (
                  <Box
                    key={index}
                    onClick={() => handleTaskClick(row.action)}
                    sx={{
                      py: 3.5,
                      px: { xs: 1.5, sm: 3 },
                      borderTop: index === 0 ? "2px solid #171717" : "none", // Bold top header line
                      borderBottom: "1px solid #C9C3B7",
                      cursor: "pointer",
                      transition: "background-color 150ms ease-in-out",
                      "&:hover": {
                        bgcolor: "#FFFDF8",
                      },
                      "&:hover .row-action-btn": {
                        borderColor: "#075BB5",
                        color: "#075BB5",
                      },
                    }}
                  >
                    <Grid container spacing={2.5} alignItems="center">
                      {/* Number and Icon */}
                      <Grid item xs={12} sm={1.5} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "#625F58",
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.num}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>{row.icon}</Box>
                      </Grid>

                      {/* Content details */}
                      <Grid item xs={12} sm={7.5}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            mb: 0.5,
                            color: "#171717",
                          }}
                        >
                          {row.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#625F58", fontSize: "0.85rem", lineHeight: 1.45 }}>
                          {row.desc}
                        </Typography>
                      </Grid>

                      {/* Action trigger button */}
                      <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "left", sm: "right" } }}>
                        <Button
                          variant="outlined"
                          size="small"
                          className="row-action-btn"
                          sx={{
                            borderRadius: "2px",
                            borderColor: "#C9C3B7",
                            color: "#171717",
                            fontWeight: 700,
                            fontSize: "0.78rem",
                            px: 2,
                            py: 0.6,
                            pointerEvents: "none", // Click matches parent row click
                            transition: "all 120ms ease-in-out",
                          }}
                        >
                          {row.btnText}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ==================================================
          QUICK PAYMENT DIALOG (MOCK SETTLEMENT FUNCTIONALITY)
          ================================================== */}
      <Dialog
        open={payDialogOpen}
        onClose={() => setPayDialogOpen(false)}
        ModalProps={{ closeAfterTransition: false }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "2px",
            p: 1.5,
            bgcolor: "#FFFDF8",
            border: "2px solid #171717",
            color: "#171717",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#171717", pb: 1, px: 2 }}>
          Quick Electricity Bill Payment
        </DialogTitle>
        <DialogContent sx={{ px: 2 }}>
          {!paySuccess ? (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ color: "#625F58" }}>
                Enter your Consumer Number to lookup outstanding dues. For testing, use <strong>con1001</strong>, <strong>con1002</strong>, or <strong>con1003</strong>.
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Consumer Number"
                  value={consumerNo}
                  onChange={(e) => setConsumerNo(e.target.value)}
                  placeholder="e.g. con1001"
                  variant="outlined"
                  error={!!error}
                  disabled={loading || !!billDetails}
                  size="small"
                  InputProps={{
                    sx: { fontFamily: "monospace" }
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#F3F0E8",
                    },
                  }}
                />
                {!billDetails && (
                  <Button
                    variant="contained"
                    onClick={handleLookup}
                    disabled={loading}
                    sx={{
                      bgcolor: "#075BB5",
                      color: "#FFFDF8",
                      px: 3,
                      minWidth: 100,
                      fontWeight: 700,
                      borderRadius: "2px",
                      "&:hover": { bgcolor: "#064B95" },
                    }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Verify"}
                  </Button>
                )}
              </Stack>

              {error && (
                <Alert severity="error" sx={{ borderRadius: "2px", border: "1px solid #C5382F", bgcolor: "#FFFDF8", color: "#C5382F" }}>
                  {error}
                </Alert>
              )}

              {billDetails && (
                <Box
                  sx={{
                    p: 2.5,
                    border: "1px solid #C9C3B7",
                    bgcolor: "#E9E5DB",
                    borderRadius: "2px",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#171717", mb: 2 }}>
                    Ledger Record Found
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Consumer Name</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717" }}>{billDetails.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Bill Reference</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717", fontFamily: "monospace" }}>{billDetails.billNo}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Billing Month</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717" }}>{billDetails.month}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Due Date</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#C5382F" }}>{billDetails.due}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Units Consumed</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#171717", fontFamily: "monospace" }}>{billDetails.units} kWh</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" sx={{ color: "#625F58", display: "block" }}>Net Amount Payable</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: "#075BB5" }}>₹{billDetails.amount}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Stack>
          ) : (
            <Stack alignItems="center" spacing={2.5} sx={{ py: 3, textAlign: "center" }}>
              <Box sx={{ color: "#087A5A" }}>
                <CheckCircle2 size={56} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#171717" }}>
                Payment Processed
              </Typography>
              <Typography variant="body2" sx={{ color: "#625F58", maxWidth: "340px" }}>
                Your payment for bill reference <strong>{billDetails?.billNo}</strong> was processed successfully. The official transaction ledger receipt will be available shortly.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={() => setPayDialogOpen(false)}
            sx={{
              color: "#625F58",
              fontWeight: 700,
              borderRadius: "2px",
              "&:hover": { bgcolor: "#E9E5DB" },
            }}
          >
            {paySuccess ? "Close" : "Cancel"}
          </Button>
          {billDetails && !paySuccess && (
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              disabled={loading}
              sx={{
                bgcolor: "#087A5A",
                color: "#FFFDF8",
                fontWeight: 700,
                borderRadius: "2px",
                px: 3,
                "&:hover": { bgcolor: "#065e44" },
              }}
            >
              {loading ? <CircularProgress size={20} color="inherit" /> : `Pay ₹${billDetails.amount}`}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuickServices;
