import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Stack,
} from "@mui/material";
import { Zap } from "lucide-react";
import { getConsumers } from "../api/consumerApi";

const Login = () => {
  const [tab, setTab] = useState(0);
  const [adminUser, setAdminUser] = useState("admin");
  const [adminPass, setAdminPass] = useState("admin");
  
  const [consumers, setConsumers] = useState([]);
  const [selectedConsumerId, setSelectedConsumerId] = useState("");
  const [manualConsumerNum, setManualConsumerNum] = useState("");
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const role = localStorage.getItem("userRole");
    if (role) {
      navigate("/dashboard");
    }
    fetchConsumers();
  }, [navigate]);

  const fetchConsumers = async () => {
    try {
      const response = await getConsumers();
      const list = response.data.content || response.data || [];
      setConsumers(list);
    } catch (err) {
      console.error("Failed to load consumers for portal:", err);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");
    if (adminUser === "admin" && adminPass === "admin") {
      localStorage.setItem("userRole", "ADMIN");
      localStorage.setItem("consumerName", "Admin User");
      navigate("/dashboard");
    } else {
      setError("Invalid admin username or password.");
    }
  };

  const handleConsumerLogin = (e) => {
    e.preventDefault();
    setError("");
    
    let target = null;
    
    if (selectedConsumerId) {
      target = consumers.find(c => String(c.id) === String(selectedConsumerId));
    } else if (manualConsumerNum) {
      target = consumers.find(
        c => c.consumerNumber?.toLowerCase() === manualConsumerNum.trim().toLowerCase()
      );
    }

    if (target) {
      localStorage.setItem("userRole", "CONSUMER");
      localStorage.setItem("consumerId", target.id);
      localStorage.setItem("consumerNumber", target.consumerNumber);
      localStorage.setItem("consumerName", `${target.firstName} ${target.lastName}`);
      
      const connectionNumbers = (target.connections || []).map(c => c.connectionNumber);
      localStorage.setItem("consumerConnections", JSON.stringify(connectionNumbers));
      
      navigate("/dashboard");
    } else {
      setError("Consumer record not found. Please try again or choose from the dropdown.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAFC",
        px: 3,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 440, border: "1px solid #E2E8F0", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
        <CardContent sx={{ p: 4 }}>
          {/* Logo Header */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "#ffffff",
                p: 1.2,
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <Zap size={24} fill="currentColor" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0F172A", letterSpacing: "-0.027em", mb: 0.5 }}>
              Electricity Billing System
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Sign in to manage accounts and process billing
            </Typography>
          </Box>

          <Tabs
            value={tab}
            onChange={(e, newTab) => {
              setTab(newTab);
              setError("");
            }}
            variant="fullWidth"
            sx={{
              mb: 3,
              borderBottom: "1px solid #E2E8F0",
              "& .MuiTabs-indicator": { height: 2.5 }
            }}
          >
            <Tab label="Admin Access" sx={{ fontWeight: 600, fontSize: "0.875rem" }} />
            <Tab label="Consumer Portal" sx={{ fontWeight: 600, fontSize: "0.875rem" }} />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 3, py: 0.5 }}>
              {error}
            </Alert>
          )}

          {tab === 0 ? (
            /* ADMIN LOGIN FORM */
            <form onSubmit={handleAdminLogin}>
              <Stack spacing={2.5}>
                <TextField
                  label="Username"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  fullWidth
                  required
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5, mt: 1 }}
                >
                  Sign In as Admin
                </Button>
              </Stack>
            </form>
          ) : (
            /* CONSUMER LOGIN FORM */
            <form onSubmit={handleConsumerLogin}>
              <Stack spacing={2.5}>
                {consumers.length > 0 && (
                  <FormControl fullWidth>
                    <InputLabel id="demo-consumer-label">Select Registered Consumer (for test)</InputLabel>
                    <Select
                      labelId="demo-consumer-label"
                      value={selectedConsumerId}
                      onChange={(e) => {
                        setSelectedConsumerId(e.target.value);
                        setManualConsumerNum("");
                      }}
                      label="Select Registered Consumer (for test)"
                    >
                      <MenuItem value="">
                        <em>-- Or enter manually below --</em>
                      </MenuItem>
                      {consumers.map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.firstName} {c.lastName} ({c.consumerNumber})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                <TextField
                  label="Consumer Number"
                  placeholder="e.g. CON1001"
                  value={manualConsumerNum}
                  onChange={(e) => {
                    setManualConsumerNum(e.target.value);
                    setSelectedConsumerId("");
                  }}
                  fullWidth
                  disabled={!!selectedConsumerId}
                />

                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5, mt: 1 }}
                >
                  Enter Consumer Portal
                </Button>
              </Stack>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
