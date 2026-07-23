import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import {
  Zap,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";
import { getPublicConsumers } from "../api/consumerApi";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(
    location.state?.tab !== undefined ? location.state.tab : 0
  ); // 0 = Admin, 1 = Consumer, 2 = Register

  useEffect(() => {
    if (location.state?.tab !== undefined) {
      setTabValue(location.state.tab);
    }
  }, [location.state]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [consumers, setConsumers] = useState([]);
  const [selectedConsumerId, setSelectedConsumerId] = useState("");

  const [loading, setLoading] = useState(false);
  const [wakingUp, setWakingUp] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isNewConnection, setIsNewConnection] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [connectionType, setConnectionType] = useState("DOMESTIC");
  const [sanctionedLoad, setSanctionedLoad] = useState("5.0");
  const [phaseType, setPhaseType] = useState("SINGLE_PHASE");

  useEffect(() => {
    fetchPublicConsumers();
  }, []);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setWakingUp(true);
      }, 3000);
    } else {
      setWakingUp(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const fetchPublicConsumers = async () => {
    try {
      const response = await getPublicConsumers();
      const list = Array.isArray(response.data)
        ? response.data
        : response.data.content || [];
      setConsumers(list);
    } catch (err) {
      console.error("Failed to load consumers for dropdown", err);
    }
  };

  const handleConsumerSelect = (e) => {
    const cId = e.target.value;
    setSelectedConsumerId(cId);
    const selected = consumers.find((c) => c.id === cId);
    if (selected) {
      setUsername(selected.consumerNumber ? selected.consumerNumber.toLowerCase() : "");
      setPassword("password");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (tabValue === 0) {
        // Admin Login
        const response = await api.post("/api/auth/login", {
          username: username.trim(),
          password,
        });

        const { token, role, consumerName } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("consumerName", consumerName || "Admin User");

        navigate("/dashboard");
      } else if (tabValue === 1) {
        // Consumer Login
        const response = await api.post("/api/auth/login", {
          username: username.trim(),
          password,
        });

        const { token, role, consumerId, consumerName } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("consumerName", consumerName || "Consumer User");

        if (consumerId) {
          localStorage.setItem("consumerId", consumerId);
          try {
            const consumerRes = await api.get(`/api/consumers/${consumerId}`);
            const consumerData = consumerRes.data;

            if (consumerData) {
              localStorage.setItem("consumerNumber", consumerData.consumerNumber || "");
              const connectionNumbers = (consumerData.connections || []).map(
                (c) => c.connectionNumber
              );
              localStorage.setItem("consumerConnections", JSON.stringify(connectionNumbers));
            }
          } catch (cErr) {
            console.error("Failed to fetch consumer details", cErr);
          }
        }

        navigate("/dashboard");
      } else {
        // Register Consumer Account
        let finalConsumerId = selectedConsumerId;

        if (isNewConnection) {
          if (!firstName.trim() || !lastName.trim() || !regEmail.trim() || !regPhone.trim()) {
            setError("All applicant details (First/Last Name, Email, Phone) are required to apply for a new grid connection.");
            setLoading(false);
            return;
          }

          // Step 1: Create Consumer profile
          const consumerRes = await api.post("/api/consumers", {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: regEmail.trim(),
            phone: regPhone.trim(),
          });
          finalConsumerId = consumerRes.data.id;

          // Step 2: Apply and create Connection Profile
          const randConn = "CON" + Math.floor(1000 + Math.random() * 9000);
          const randMeter = "MET" + Math.floor(20000 + Math.random() * 80000);
          await api.post("/api/connections", {
            connectionNumber: randConn,
            meterNumber: randMeter,
            connectionType: connectionType,
            status: "ACTIVE",
            sanctionedLoad: parseFloat(sanctionedLoad) || 5.0,
            phaseType: phaseType,
            consumerId: finalConsumerId,
          });
        } else {
          if (!finalConsumerId) {
            setError("Please select a Consumer Profile connection to link your web portal account.");
            setLoading(false);
            return;
          }
        }

        // Step 3: Register user account linked to the connection consumer profile
        await api.post("/api/auth/register", {
          username: username.trim(),
          password: password,
          role: "ROLE_CONSUMER",
          consumerId: finalConsumerId,
        });

        // Refresh dropdown consumer list
        await fetchPublicConsumers();

        setSuccessMessage("Portal account registered and grid connection established successfully! You can now sign in using your chosen credentials.");
        setTabValue(1); // Redirect to Consumer Login tab
        setPassword(""); // Clear password
        // Reset connection application fields
        setFirstName("");
        setLastName("");
        setRegEmail("");
        setRegPhone("");
        setIsNewConnection(false);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Authentication failed. Please verify your connection & credentials."
      );
    } finally {
      setLoading(false);
      setWakingUp(false);
    }
  };

  const fillQuickDemo = (role) => {
    if (role === "ADMIN") {
      // Admin password seeding disabled for security as requested
      setError("Demo access pre-fill is disabled for Administrator accounts. Please enter admin credentials manually.");
    } else {
      setTabValue(1);
      if (consumers.length > 0) {
        const first = consumers[0];
        setSelectedConsumerId(first.id);
        setUsername(first.consumerNumber ? first.consumerNumber.toLowerCase() : "con1001");
        setPassword("password");
      } else {
        setUsername("con1001");
        setPassword("password");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#FFFFFF",
        color: "#1E293B",
      }}
    >
      {/* Left Branding & Live Stats Column (Hidden on mobile) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          bgcolor: "#F7F9FC",
          borderRight: "1px solid #E2E8F0",
        }}
      >
        {/* Header Branding */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              background: "#0056A6",
              color: "#FFFFFF",
              p: 1,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={24} fill="currentColor" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.03em", color: "#0056A6", lineHeight: 1.1 }}>
              KNK POWER
            </Typography>
            <Typography variant="caption" sx={{ color: "#00A99D", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", display: "block", textTransform: "uppercase" }}>
              Corporation Ltd.
            </Typography>
          </Box>
        </Stack>

        {/* Center Content */}
        <Box sx={{ my: "auto", maxWidth: "520px" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <Chip
              icon={<ShieldCheck size={14} color="#00A99D" />}
              label="SECURE UTILITY PORTAL"
              sx={{ bgcolor: "rgba(0, 169, 157, 0.08)", color: "#00A99D", fontWeight: 700, mb: 3 }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.15, color: "#0056A6" }}>
              Official Consumer & Billing Portal
            </Typography>
            <Typography variant="body1" sx={{ color: "#475569", fontSize: "1.05rem", mb: 4, lineHeight: 1.6 }}>
              Welcome to the secure billing portal for KNK Power Corporation LTD. Access your account to manage grid connections, view energy invoices, self-report meter readings, and make secure online payments.
            </Typography>

            {/* Quick Demo Pre-fill Pill Bar */}
            <Paper sx={{ p: 2.5, borderRadius: "16px", bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <Typography variant="caption" sx={{ color: "#475569", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 1.5 }}>
                ⚡ Portal Demo Access
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillQuickDemo("CONSUMER")}
                  startIcon={<Users size={14} />}
                  sx={{ color: "#00A99D", borderColor: "#00A99D", fontWeight: 600, "&:hover": { bgcolor: "rgba(0, 169, 157, 0.04)", borderColor: "#00766d" } }}
                >
                  Fill Consumer Demo
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Box>

        {/* Footer info */}
        <Typography variant="caption" sx={{ color: "#64748B" }}>
          © {new Date().getFullYear()} KNK Power Corporation LTD. All rights reserved.
        </Typography>
      </Box>

      {/* Right Login Form Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "520px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 5 },
          bgcolor: "#FFFFFF",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: "100%", maxWidth: "420px" }}>
          <Card sx={{ bgcolor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0, 0, 0, 0.05)", overflow: "hidden" }}>
            {/* Tabs for Admin / Consumer / Register */}
            <Tabs
              value={tabValue}
              onChange={(e, val) => {
                setTabValue(val);
                setError("");
                setSuccessMessage("");
                setUsername("");
                setPassword("");
                if (val === 1) { // Consumer Sign In
                  if (consumers.length > 0) {
                    setSelectedConsumerId(consumers[0].id);
                    setUsername(consumers[0].consumerNumber ? consumers[0].consumerNumber.toLowerCase() : "");
                    setPassword("password");
                  }
                } else if (val === 2) { // Register
                  if (consumers.length > 0) {
                    setSelectedConsumerId(consumers[0].id);
                  }
                }
              }}
              variant="fullWidth"
              sx={{
                bgcolor: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
                "& .MuiTab-root": { color: "#64748B", fontWeight: 600, py: 2, fontSize: "0.85rem" },
                "& .Mui-selected": { color: "#0056A6" },
                "& .MuiTabs-indicator": { bgcolor: "#0056A6", height: 3 },
              }}
            >
              <Tab icon={<Building2 size={16} />} iconPosition="start" label="Admin" />
              <Tab icon={<Users size={16} />} iconPosition="start" label="Consumer" />
              <Tab icon={<Plus size={16} />} iconPosition="start" label="Register" />
            </Tabs>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textCenter: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ color: "#1E293B", mb: 0.5, fontWeight: 800 }}>
                  {tabValue === 0 ? "Grid Admin Sign In" : tabValue === 1 ? "Consumer Access" : "Portal Account Registration"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569" }}>
                  {tabValue === 0
                    ? "Enter administrative operator credentials manually."
                    : tabValue === 1
                    ? "Select your consumer account or enter account credentials."
                    : "Establish a new secure web access account for your connection."}
                </Typography>
              </Box>

              {/* Render Cold-Start Waking Up Notice */}
              {wakingUp && (
                <Alert
                  severity="info"
                  icon={<CircularProgress size={16} color="info" />}
                  sx={{
                    mb: 3,
                    borderRadius: "10px",
                    bgcolor: "rgba(0, 86, 166, 0.05)",
                    color: "#0056A6",
                    border: "1px solid rgba(0, 86, 166, 0.15)",
                    fontSize: "0.8rem",
                  }}
                >
                  Waking up free Render backend server... This cold start takes ~30–45s. Please hold on!
                </Alert>
              )}

              {successMessage && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "10px", bgcolor: "rgba(16, 185, 129, 0.05)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                  {successMessage}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "10px", bgcolor: "rgba(239, 68, 68, 0.05)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleLogin}>
                <Stack spacing={2.5}>
                  {/* Connection Choice for Registration Tab */}
                  {tabValue === 2 && (
                    <FormControl component="fieldset">
                      <FormLabel component="legend" sx={{ fontSize: "0.8rem", color: "#64748B", fontWeight: 700, mb: 0.5 }}>
                        GRID CONNECTION ACCESS
                      </FormLabel>
                      <RadioGroup
                        row
                        value={isNewConnection ? "new" : "existing"}
                        onChange={(e) => {
                          setIsNewConnection(e.target.value === "new");
                          setError("");
                          setSuccessMessage("");
                        }}
                      >
                        <FormControlLabel value="existing" control={<Radio size="small" />} label="Link Existing Connection" sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem", fontWeight: 600 } }} />
                        <FormControlLabel value="new" control={<Radio size="small" />} label="Apply New Connection" sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem", fontWeight: 600 } }} />
                      </RadioGroup>
                    </FormControl>
                  )}

                  {/* Selected Consumer Dropdown for Link Existing (Register tab) or Consumer Sign In */}
                  {((tabValue === 2 && !isNewConnection) || (tabValue === 1 && selectedConsumerId)) && (
                    <TextField
                      select
                      fullWidth
                      label={tabValue === 2 ? "Link to Consumer Connection Record" : "Select Registered Consumer Account"}
                      value={selectedConsumerId}
                      onChange={handleConsumerSelect}
                      sx={{
                        "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                        "& .MuiInputLabel-root": { color: "#64748B" },
                      }}
                    >
                      {consumers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.consumerNumber} - {c.firstName} {c.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {/* New Grid Connection Application Fields */}
                  {tabValue === 2 && isNewConnection && (
                    <>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          fullWidth
                          label="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                            "& .MuiInputLabel-root": { color: "#64748B" },
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                            "& .MuiInputLabel-root": { color: "#64748B" },
                          }}
                        />
                      </Stack>

                      <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                          "& .MuiInputLabel-root": { color: "#64748B" },
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        required
                        inputProps={{ maxLength: 10 }}
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                          "& .MuiInputLabel-root": { color: "#64748B" },
                        }}
                      />

                      <TextField
                        select
                        fullWidth
                        label="Connection Tariff Category"
                        value={connectionType}
                        onChange={(e) => setConnectionType(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                          "& .MuiInputLabel-root": { color: "#64748B" },
                        }}
                      >
                        <MenuItem value="DOMESTIC">DOMESTIC (Residential)</MenuItem>
                        <MenuItem value="COMMERCIAL">COMMERCIAL (Business)</MenuItem>
                        <MenuItem value="INDUSTRIAL">INDUSTRIAL (Manufacturing)</MenuItem>
                      </TextField>

                      <Stack direction="row" spacing={2}>
                        <TextField
                          fullWidth
                          label="Sanctioned Load (kW)"
                          type="number"
                          value={sanctionedLoad}
                          onChange={(e) => setSanctionedLoad(e.target.value)}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                            "& .MuiInputLabel-root": { color: "#64748B" },
                          }}
                        />
                        <TextField
                          select
                          fullWidth
                          label="Phase Type"
                          value={phaseType}
                          onChange={(e) => setPhaseType(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                            "& .MuiInputLabel-root": { color: "#64748B" },
                          }}
                        >
                          <MenuItem value="SINGLE_PHASE">SINGLE PHASE</MenuItem>
                          <MenuItem value="THREE_PHASE">THREE PHASE</MenuItem>
                        </TextField>
                      </Stack>
                    </>
                  )}

                  {/* Username Field */}
                  <TextField
                    fullWidth
                    label={tabValue === 2 ? "Choose Username" : "Username / Consumer No."}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} color="#64748B" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                      "& .MuiInputLabel-root": { color: "#64748B" },
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    fullWidth
                    label={tabValue === 2 ? "Choose Password" : "Password"}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#64748B" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#64748B" }}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#1E293B", bgcolor: "#FFFFFF" },
                      "& .MuiInputLabel-root": { color: "#64748B" },
                    }}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <ArrowRight size={18} />}
                    sx={{
                      py: 1.5,
                      mt: 1,
                      fontSize: "0.95rem",
                      bgcolor: tabValue === 0 ? "#0056A6" : (tabValue === 1 ? "#00A99D" : "#0056A6"),
                      color: "#FFFFFF",
                      boxShadow: "0 4px 12px rgba(0, 86, 166, 0.15)",
                      "&:hover": {
                        bgcolor: tabValue === 0 ? "#003c74" : (tabValue === 1 ? "#00766d" : "#003c74"),
                        boxShadow: "0 6px 16px rgba(0, 86, 166, 0.25)",
                      },
                    }}
                  >
                    {loading
                      ? wakingUp
                        ? "Waking up server..."
                        : tabValue === 2 ? "Registering account..." : "Authenticating..."
                      : tabValue === 0
                      ? "Sign In to Admin Dashboard"
                      : tabValue === 1
                      ? "Sign In to Consumer Portal"
                      : "Create Web Access Account"}
                  </Button>

                  {/* Back to Home Link */}
                  <Button
                    onClick={() => navigate("/")}
                    sx={{ color: "#64748B", fontSize: "0.85rem", textTransform: "none", "&:hover": { color: "#0056A6" } }}
                  >
                    ← Back to Public Website
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Login;
