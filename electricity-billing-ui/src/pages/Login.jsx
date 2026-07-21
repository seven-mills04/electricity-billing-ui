import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/axiosConfig";
import { getPublicConsumers } from "../api/consumerApi";

const Login = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0); // 0 = Admin, 1 = Consumer

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [consumers, setConsumers] = useState([]);
  const [selectedConsumerId, setSelectedConsumerId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicConsumers();
  }, []);

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
      } else {
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
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Invalid login credentials. Please verify and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fillQuickDemo = (role) => {
    if (role === "ADMIN") {
      setTabValue(0);
      setUsername("admin");
      setPassword("admin");
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
        bgcolor: "#0F172A",
        color: "#FFFFFF",
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
          background: "radial-gradient(circle at 0% 0%, #0284C7 0%, #0F172A 70%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Header Branding */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
              color: "#FFFFFF",
              p: 1,
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(2, 132, 199, 0.4)",
            }}
          >
            <Zap size={24} fill="currentColor" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            GRIDPULSE <span style={{ color: "#38BDF8" }}>UTILITIES</span>
          </Typography>
        </Stack>

        {/* Center Content */}
        <Box sx={{ my: "auto", maxWidth: "520px" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <Chip
              icon={<ShieldCheck size={14} color="#34D399" />}
              label="256-BIT ENCRYPTED UTILITY PORTAL"
              sx={{ bgcolor: "rgba(16, 185, 129, 0.15)", color: "#34D399", fontWeight: 700, mb: 3 }}
            />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.15 }}>
              National Electricity Management Platform
            </Typography>
            <Typography variant="body1" sx={{ color: "#94A3B8", fontSize: "1.05rem", mb: 4, lineHeight: 1.6 }}>
              Secure access for grid billing operators and retail electricity consumers. Access real-time billing ledgers, tariff predictions, and automated payment settlements.
            </Typography>

            {/* Quick Demo Pre-fill Pill Bar */}
            <Paper sx={{ p: 2.5, borderRadius: "16px", bgcolor: "rgba(30, 41, 59, 0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700, textTransform: "uppercase", display: "block", mb: 1.5 }}>
                ⚡ One-Click Demo Access
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillQuickDemo("ADMIN")}
                  startIcon={<Building2 size={14} />}
                  sx={{ color: "#38BDF8", borderColor: "rgba(56, 189, 248, 0.4)", bgcolor: "rgba(56, 189, 248, 0.08)" }}
                >
                  Fill Admin Demo
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => fillQuickDemo("CONSUMER")}
                  startIcon={<Users size={14} />}
                  sx={{ color: "#34D399", borderColor: "rgba(52, 211, 153, 0.4)", bgcolor: "rgba(52, 211, 153, 0.08)" }}
                >
                  Fill Consumer Demo
                </Button>
              </Stack>
            </Paper>
          </motion.div>
        </Box>

        {/* Footer info */}
        <Typography variant="caption" sx={{ color: "#64748B" }}>
          © {new Date().getFullYear()} GridPulse Utilities Inc. Standard Energy Operations.
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
          bgcolor: "#0F172A",
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: "100%", maxWidth: "420px" }}>
          <Card sx={{ bgcolor: "#1E293B", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "20px", overflow: "hidden" }}>
            {/* Tabs for Admin / Consumer */}
            <Tabs
              value={tabValue}
              onChange={(e, val) => {
                setTabValue(val);
                setError("");
                if (val === 0) {
                  setUsername("admin");
                  setPassword("admin");
                } else {
                  if (consumers.length > 0) {
                    setSelectedConsumerId(consumers[0].id);
                    setUsername(consumers[0].consumerNumber ? consumers[0].consumerNumber.toLowerCase() : "");
                    setPassword("password");
                  }
                }
              }}
              variant="fullWidth"
              sx={{
                bgcolor: "rgba(15, 23, 42, 0.6)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                "& .MuiTab-root": { color: "#94A3B8", fontWeight: 600, py: 2 },
                "& .Mui-selected": { color: "#38BDF8" },
                "& .MuiTabs-indicator": { bgcolor: "#38BDF8", height: 3 },
              }}
            >
              <Tab icon={<Building2 size={16} />} iconPosition="start" label="Admin Operator" />
              <Tab icon={<Users size={16} />} iconPosition="start" label="Consumer Portal" />
            </Tabs>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textCenter: "center", mb: 3 }}>
                <Typography variant="h4" sx={{ color: "#FFFFFF", mb: 0.5 }}>
                  {tabValue === 0 ? "Grid Admin Sign In" : "Consumer Access"}
                </Typography>
                <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                  {tabValue === 0
                    ? "Enter administrative operator credentials to manage grid billing."
                    : "Select your consumer account or enter account credentials."}
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: "10px", bgcolor: "rgba(239, 68, 68, 0.15)", color: "#FCA5A5", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleLogin}>
                <Stack spacing={2.5}>
                  {/* Consumer Select Dropdown in Consumer Tab */}
                  {tabValue === 1 && (
                    <TextField
                      select
                      fullWidth
                      label="Select Registered Consumer Account"
                      value={selectedConsumerId}
                      onChange={handleConsumerSelect}
                      sx={{
                        "& .MuiOutlinedInput-root": { color: "#FFFFFF", bgcolor: "#0F172A" },
                        "& .MuiInputLabel-root": { color: "#94A3B8" },
                      }}
                    >
                      {consumers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.consumerNumber} - {c.firstName} {c.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  {/* Username Field */}
                  <TextField
                    fullWidth
                    label="Username / Consumer No."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} color="#94A3B8" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#FFFFFF", bgcolor: "#0F172A" },
                      "& .MuiInputLabel-root": { color: "#94A3B8" },
                    }}
                  />

                  {/* Password Field */}
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={18} color="#94A3B8" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#94A3B8" }}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": { color: "#FFFFFF", bgcolor: "#0F172A" },
                      "& .MuiInputLabel-root": { color: "#94A3B8" },
                    }}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={loading}
                    endIcon={<ArrowRight size={18} />}
                    sx={{
                      py: 1.5,
                      mt: 1,
                      fontSize: "0.95rem",
                      background: "linear-gradient(135deg, #0284C7 0%, #10B981 100%)",
                      boxShadow: "0 4px 14px rgba(2, 132, 199, 0.4)",
                      "&:hover": { boxShadow: "0 6px 20px rgba(2, 132, 199, 0.6)" },
                    }}
                  >
                    {loading ? "Authenticating..." : tabValue === 0 ? "Sign In to Admin Dashboard" : "Sign In to Consumer Portal"}
                  </Button>

                  {/* Back to Home Link */}
                  <Button
                    onClick={() => navigate("/")}
                    sx={{ color: "#94A3B8", fontSize: "0.85rem", textTransform: "none", "&:hover": { color: "#FFFFFF" } }}
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
