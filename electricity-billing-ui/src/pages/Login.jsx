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
import BackgroundEffects from "../components/landing/BackgroundEffects";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginSuccess, updateConsumerNumber } = useAuth();
  const [tabValue, setTabValue] = useState(
    location.state?.tab !== undefined ? location.state.tab : 0
  );

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
        const response = await api.post("/api/auth/login", {
          username: username.trim(),
          password,
        });

        const { token, role, consumerName } = response.data;
        loginSuccess({
          token,
          role,
          consumerName: consumerName || "Admin User",
        });

        navigate("/dashboard");
      } else if (tabValue === 1) {
        const response = await api.post("/api/auth/login", {
          username: username.trim(),
          password,
        });

        const { token, role, consumerId, consumerName } = response.data;

        // Set token and auth context state FIRST so api.get uses the Bearer token header
        loginSuccess({
          token,
          role,
          consumerId,
          consumerName: consumerName || "Consumer User",
        });

        let fetchedConsumerNum = "";

        if (consumerId) {
          try {
            const consumerRes = await api.get("/api/consumer/profile");
            const consumerData = consumerRes.data;

            if (consumerData && consumerData.consumerNumber) {
              fetchedConsumerNum = consumerData.consumerNumber;
              updateConsumerNumber(fetchedConsumerNum);
            }
          } catch (cErr) {
            console.error("Failed to fetch consumer details", cErr);
          }
        }

        navigate("/dashboard");
      } else {
        let finalConsumerId = selectedConsumerId;

        if (isNewConnection) {
          if (!firstName.trim() || !lastName.trim() || !regEmail.trim() || !regPhone.trim()) {
            setError("All applicant details (First/Last Name, Email, Phone) are required to apply for a new grid connection.");
            setLoading(false);
            return;
          }

          const consumerRes = await api.post("/api/consumers", {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: regEmail.trim(),
            phone: regPhone.trim(),
          });
          finalConsumerId = consumerRes.data.id;

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

        await api.post("/api/auth/register", {
          username: username.trim(),
          password: password,
          role: "ROLE_CONSUMER",
          consumerId: finalConsumerId,
        });

        await fetchPublicConsumers();

        setSuccessMessage("Portal account registered and grid connection established successfully! You can now sign in using your chosen credentials.");
        setTabValue(1);
        setPassword("");
        
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
      if ((tabValue === 0 || tabValue === 1) && err.response) {
      }
    } finally {
      setLoading(false);
      setWakingUp(false);
    }
  };

  const fillQuickDemo = (role) => {
    if (role === "ADMIN") {
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
        bgcolor: "#F3F0E8", // Warm paper background
        color: "#171717",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundEffects />
      
      {/* Left Column (Information Display) */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          position: "relative",
          bgcolor: "#E9E5DB", // soft panel bg
          borderRight: "2px solid #171717",
          zIndex: 5,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              bgcolor: "#FFFDF8",
              color: "#171717",
              border: "1px solid #C9C3B7",
              p: 0.8,
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={22} fill="currentColor" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.03em", color: "#171717", lineHeight: 1.1 }}>
              KNK POWER
            </Typography>
            <Typography variant="caption" sx={{ color: "#625F58", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", display: "block", textTransform: "uppercase" }}>
              Corporation Ltd.
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ my: "auto", maxWidth: "480px" }}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Chip
              icon={<ShieldCheck size={14} color="#075BB5" />}
              label="SECURE UTILITY PORTAL"
              sx={{ bgcolor: "#FFFDF8", color: "#075BB5", border: "1px solid #075BB5", fontWeight: 800, mb: 3, borderRadius: "2px" }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2.5, lineHeight: 1.2, color: "#171717" }}>
              Official Consumer & Billing Portal
            </Typography>
            <Typography variant="body1" sx={{ color: "#625F58", fontSize: "1rem", mb: 4, lineHeight: 1.6 }}>
              Welcome to the secure billing portal for KNK Power Corporation LTD. Access your account to manage grid connections, view energy invoices, self-report meter readings, and make secure online payments.
            </Typography>

            <Paper sx={{ p: 3, borderRadius: "2px", bgcolor: "#FFFDF8", border: "1px solid #C9C3B7" }}>
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 800, textTransform: "uppercase", display: "block", mb: 2 }}>
                ⚡ Portal Demo Access
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillQuickDemo("CONSUMER")}
                  startIcon={<Users size={14} />}
                  sx={{ color: "#171717", borderColor: "#171717", borderRadius: "2px", fontWeight: 700, "&:hover": { bgcolor: "#E9E5DB" } }}
                >
                  Fill Consumer Demo
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Box>

        <Typography variant="caption" sx={{ color: "#625F58" }}>
          © {new Date().getFullYear()} KNK Power Corporation LTD. All rights reserved.
        </Typography>
      </Box>

      {/* Right Column (Form Box) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 3, sm: 5 },
          bgcolor: "transparent",
          zIndex: 5,
        }}
      >
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ width: "100%", maxWidth: "440px" }}>
          <Card sx={{ bgcolor: "#FFFDF8", border: "2px solid #171717", borderRadius: "2px", overflow: "hidden" }}>
            
            {/* Header Tabs */}
            <Tabs
              value={tabValue}
              onChange={(e, val) => {
                setTabValue(val);
                setError("");
                setSuccessMessage("");
                setUsername("");
                setPassword("");
                if (val === 1) {
                  if (consumers.length > 0) {
                    setSelectedConsumerId(consumers[0].id);
                    setUsername(consumers[0].consumerNumber ? consumers[0].consumerNumber.toLowerCase() : "");
                    setPassword("password");
                  }
                } else if (val === 2) {
                  if (consumers.length > 0) {
                    setSelectedConsumerId(consumers[0].id);
                  }
                }
              }}
              variant="fullWidth"
              sx={{
                bgcolor: "#E9E5DB",
                borderBottom: "1px solid #C9C3B7",
                "& .MuiTab-root": { color: "#625F58", fontWeight: 700, py: 2, fontSize: "0.85rem" },
                "& .Mui-selected": { color: "#075BB5" },
                "& .MuiTabs-indicator": { bgcolor: "#075BB5", height: 3 },
              }}
            >
              <Tab icon={<Building2 size={16} />} iconPosition="start" label="Admin" />
              <Tab icon={<Users size={16} />} iconPosition="start" label="Consumer" />
              <Tab icon={<Plus size={16} />} iconPosition="start" label="Register" />
            </Tabs>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ color: "#171717", mb: 0.8, fontWeight: 800, fontSize: "1.25rem" }}>
                  {tabValue === 0 ? "Grid Admin Sign In" : tabValue === 1 ? "Consumer Access" : "Portal Account Registration"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#625F58" }}>
                  {tabValue === 0
                    ? "Enter administrative operator credentials manually."
                    : tabValue === 1
                    ? "Select your consumer account or enter account credentials."
                    : "Establish a new secure web access account for your connection."}
                </Typography>
              </Box>

              {wakingUp && (
                <Alert
                  severity="info"
                  icon={<CircularProgress size={16} color="primary" />}
                  sx={{
                    mb: 3,
                    borderRadius: "2px",
                    bgcolor: "#FFFDF8",
                    color: "#075BB5",
                    border: "1px solid #075BB5",
                    fontSize: "0.8rem",
                  }}
                >
                  Establishing grid server link... This may take up to 30s. Please hold.
                </Alert>
              )}

              {successMessage && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: "2px", bgcolor: "#FFFDF8", color: "#087A5A", border: "1px solid #087A5A" }}>
                  {successMessage}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "2px", bgcolor: "#FFFDF8", color: "#C5382F", border: "1px solid #C5382F" }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleLogin}>
                <Stack spacing={2.5}>
                  
                  {tabValue === 2 && (
                    <FormControl component="fieldset">
                      <FormLabel component="legend" sx={{ fontSize: "0.75rem", color: "#171717", fontWeight: 800, mb: 0.5 }}>
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
                        <FormControlLabel value="existing" control={<Radio size="small" />} label="Link Existing" sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem", fontWeight: 700 } }} />
                        <FormControlLabel value="new" control={<Radio size="small" />} label="Apply New" sx={{ "& .MuiFormControlLabel-label": { fontSize: "0.85rem", fontWeight: 700 } }} />
                      </RadioGroup>
                    </FormControl>
                  )}

                  {((tabValue === 2 && !isNewConnection) || (tabValue === 1 && selectedConsumerId)) && (
                    <TextField
                      select
                      fullWidth
                      label={tabValue === 2 ? "Link to Consumer Connection Record" : "Select Registered Consumer Account"}
                      value={selectedConsumerId}
                      onChange={handleConsumerSelect}
                      sx={{
                        "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                        "& .MuiInputLabel-root": { color: "#625F58" },
                      }}
                    >
                      {consumers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.consumerNumber} - {c.firstName} {c.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

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
                            "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                          }}
                        />
                        <TextField
                          fullWidth
                          label="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
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
                          "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
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
                          "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                        }}
                      />

                      <TextField
                        select
                        fullWidth
                        label="Connection Tariff Category"
                        value={connectionType}
                        onChange={(e) => setConnectionType(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
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
                            "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                          }}
                        />
                        <TextField
                          select
                          fullWidth
                          label="Phase Type"
                          value={phaseType}
                          onChange={(e) => setPhaseType(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                          }}
                        >
                          <MenuItem value="SINGLE_PHASE">SINGLE PHASE</MenuItem>
                          <MenuItem value="THREE_PHASE">THREE PHASE</MenuItem>
                        </TextField>
                      </Stack>
                    </>
                  )}

                  <TextField
                    fullWidth
                    label={tabValue === 2 ? "Choose Username" : "Username / Consumer No."}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} color="#625F58" />
                        </InputAdornment>
                      ),
                      sx: { fontFamily: "monospace" }
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                    }}
                  />

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
                          <Lock size={18} color="#625F58" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#625F58" }}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#171717", bgcolor: "#F3F0E8" },
                    }}
                  />

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
                      bgcolor: tabValue === 0
                        ? "#171717" // Admin is solid ink black
                        : tabValue === 1
                        ? "#075BB5" // Consumer is utility blue
                        : "#F05A28", // Register is safety orange
                      color: "#FFFDF8",
                      fontWeight: 700,
                      borderRadius: "2px",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: tabValue === 0
                          ? "#000000"
                          : tabValue === 1
                          ? "#064B95"
                          : "#d94918",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {loading
                      ? wakingUp
                        ? "Connecting..."
                        : tabValue === 2 ? "Registering account..." : "Authenticating..."
                      : tabValue === 0
                      ? "Sign In to Admin Dashboard"
                      : tabValue === 1
                      ? "Sign In to Consumer Portal"
                      : "Create Web Access Account"}
                  </Button>

                  <Button
                    onClick={() => navigate("/")}
                    sx={{ color: "#625F58", fontSize: "0.85rem", textTransform: "none", fontWeight: 700, "&:hover": { color: "#075BB5" } }}
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
