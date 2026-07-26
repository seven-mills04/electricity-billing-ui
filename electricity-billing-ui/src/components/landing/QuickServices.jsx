import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
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
  CreditCard,
  History,
  PlusCircle,
  FileEdit,
  TrendingUp,
  AlertTriangle,
  Download,
  PhoneCall,
  CheckCircle2,
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

  const handleCardClick = (serviceName) => {
    if (serviceName === "Pay Electricity Bill") {
      setPayDialogOpen(true);
      setError("");
      setBillDetails(null);
      setPaySuccess(false);
      setConsumerNo("");
    } else if (serviceName === "Customer Support") {
      const element = document.getElementById("footer");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
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

  const services = [
    {
      title: "Pay Electricity Bill",
      desc: "Instantly clear your outstanding dues using UPI, cards, or net banking.",
      icon: <CreditCard size={26} color="#06B6D4" />,
      bg: "rgba(6, 182, 212, 0.1)",
    },
    {
      title: "View Bill History",
      desc: "Access and review statements from previous billing cycles.",
      icon: <History size={26} color="#34D399" />,
      bg: "rgba(52, 211, 153, 0.1)",
    },
    {
      title: "Apply for New Connection",
      desc: "Submit documents and register for a new residential or commercial meter.",
      icon: <PlusCircle size={26} color="#F59E0B" />,
      bg: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "Submit Meter Reading",
      desc: "Self-report your current monthly meter readings for accurate billing.",
      icon: <FileEdit size={26} color="#60A5FA" />,
      bg: "rgba(96, 165, 250, 0.1)",
    },
    {
      title: "Track Consumption",
      desc: "Analyze usage patterns and check active electrical load metrics.",
      icon: <TrendingUp size={26} color="#A78BFA" />,
      bg: "rgba(167, 139, 250, 0.1)",
    },
    {
      title: "Register Complaint",
      desc: "Report power outages, billing errors, or technical grid issues.",
      icon: <AlertTriangle size={26} color="#F43F5E" />,
      bg: "rgba(244, 63, 94, 0.1)",
    },
    {
      title: "Download Receipt",
      desc: "Download soft copies of your previous payment receipts.",
      icon: <Download size={26} color="#38BDF8" />,
      bg: "rgba(56, 189, 248, 0.1)",
    },
    {
      title: "Customer Support",
      desc: "Connect with our 24/7 helpline or chat support teams.",
      icon: <PhoneCall size={26} color="#2DD4BF" />,
      bg: "rgba(45, 212, 191, 0.1)",
    },
  ];

  return (
    <Box
      id="services"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "transparent",
      }}
    >
      <Container maxWidth="xl">
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#06B6D4",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Digital Counter
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Quick Online Services
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#94A3B8",
              maxWidth: "600px",
            }}
          >
            Access official consumer utilities instantly. Pay bills, track status, and manage connections from the comfort of your home.
          </Typography>
        </Stack>

        <Grid container spacing={3.5}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Card
                  onClick={() => handleCardClick(service.title)}
                  sx={{
                    bgcolor: "rgba(15, 23, 42, 0.35)",
                    height: "100%",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      borderColor: "#06B6D4",
                      boxShadow: "0 8px 30px rgba(6, 182, 212, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "12px",
                        bgcolor: service.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: "#E2E8F0",
                        mb: 1.5,
                        fontSize: "1.15rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#94A3B8",
                        lineHeight: 1.55,
                      }}
                    >
                      {service.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={payDialogOpen}
        onClose={() => setPayDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            bgcolor: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            color: "#F8FAFC",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#FFFFFF", pb: 1 }}>
          Quick Electricity Bill Payment
        </DialogTitle>
        <DialogContent>
          {!paySuccess ? (
            <Stack spacing={3} sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                Enter your Consumer Number to view outstanding dues. For demo, try <strong>con1001</strong>, <strong>con1002</strong>, or <strong>con1003</strong>.
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <TextField
                  fullWidth
                  label="Consumer Number"
                  value={consumerNo}
                  onChange={(e) => setConsumerNo(e.target.value)}
                  placeholder="e.g. con1001"
                  variant="outlined"
                  error={!!error}
                  disabled={loading || !!billDetails}
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "#FFFFFF",
                      "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                      "&:hover fieldset": { borderColor: "#06B6D4" },
                    },
                    "& .MuiInputLabel-root": { color: "#94A3B8" },
                  }}
                />
                {!billDetails && (
                  <Button
                    variant="contained"
                    onClick={handleLookup}
                    disabled={loading}
                    sx={{
                      bgcolor: "#06B6D4",
                      color: "#020617",
                      px: 3,
                      minWidth: 100,
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#22D3EE" },
                    }}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Verify"}
                  </Button>
                )}
              </Stack>

              {error && <Alert severity="error" sx={{ bgcolor: "rgba(244, 63, 94, 0.1)", color: "#FB7185", border: "1px solid rgba(244, 63, 94, 0.2)" }}>{error}</Alert>}

              {billDetails && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      bgcolor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#E2E8F0", mb: 2 }}>
                      Bill Found
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Consumer Name</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{billDetails.name}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Bill Reference</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{billDetails.billNo}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Billing Month</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{billDetails.month}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Due Date</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FB7185" }}>{billDetails.due}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Units Consumed</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#FFFFFF" }}>{billDetails.units} kWh</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#64748B" }}>Net Amount Payable</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 800, color: "#34D399" }}>₹{billDetails.amount}</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Typography variant="caption" sx={{ color: "#64748B", display: "block", mt: 2, textAlign: "center" }}>
                    Payments processed here are mock transactions for demonstration.
                  </Typography>
                </motion.div>
              )}
            </Stack>
          ) : (
            <Stack alignItems="center" spacing={2.5} sx={{ py: 3, textAlign: "center" }}>
              <Box sx={{ color: "#34D399" }}>
                <CheckCircle2 size={64} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
                Payment Successful!
              </Typography>
              <Typography variant="body2" sx={{ color: "#94A3B8", maxWidth: "340px" }}>
                Your payment for bill <strong>{billDetails?.billNo}</strong> has been processed successfully. An SMS and email receipt has been dispatched.
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={() => setPayDialogOpen(false)} sx={{ color: "#94A3B8" }}>
            {paySuccess ? "Close" : "Cancel"}
          </Button>
          {billDetails && !paySuccess && (
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              disabled={loading}
              sx={{
                bgcolor: "#34D399",
                color: "#020617",
                fontWeight: 700,
                "&:hover": { bgcolor: "#6EE7B7" },
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
