import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  addConnection,
  updateConnection,
} from "../api/connectionApi";

const ConnectionDialog = ({
  open,
  onClose,
  onSuccess,
  connection,
}) => {

  const [form, setForm] = useState({
    connectionNumber: "",
    meterNumber: "",
    connectionType: "",
    status: "",
    sanctionedLoad: "",
    phaseType: "",
  });

  useEffect(() => {

    if (connection) {
      setForm({
        id: connection.id,
        connectionNumber: connection.connectionNumber,
        meterNumber: connection.meterNumber,
        connectionType: connection.connectionType,
        status: connection.status,
        sanctionedLoad: connection.sanctionedLoad,
        phaseType: connection.phaseType,
      });
    } else {
      setForm({
        connectionNumber: "",
        meterNumber: "",
        connectionType: "",
        status: "",
        sanctionedLoad: "",
        phaseType: "",
      });
    }

  }, [connection]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
  try {
    const payload = {
      connectionNumber: form.connectionNumber,
      meterNumber: form.meterNumber,
      connectionType: form.connectionType,
      status: form.status,
      sanctionedLoad: Number(form.sanctionedLoad),
      phaseType: form.phaseType,
    };

    if (form.id) {
      await updateConnection(form.id, payload);
      alert("Connection updated successfully!");
    } else {
      await addConnection(payload);
      alert("Connection added successfully!");
    }

    if (onSuccess) {
      onSuccess();
    }

    onClose();

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(JSON.stringify(error.response.data, null, 2));
    } else {
      alert("Operation failed");
    }
  }
};

  return (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
  >
    <DialogTitle>
      {form.id ? "Edit Connection" : "Add Connection"}
    </DialogTitle>

    <DialogContent sx={{ mt: 2 }}>
      <Stack spacing={2}>

        <TextField
          label="Connection Number"
          name="connectionNumber"
          value={form.connectionNumber}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Meter Number"
          name="meterNumber"
          value={form.meterNumber}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
  <InputLabel>Connection Type</InputLabel>
  <Select
    name="connectionType"
    value={form.connectionType}
    label="Connection Type"
    onChange={handleChange}
  >
    <MenuItem value="DOMESTIC">Domestic</MenuItem>
    <MenuItem value="COMMERCIAL">Commercial</MenuItem>
    <MenuItem value="INDUSTRIAL">Industrial</MenuItem>
  </Select>
</FormControl>

        <FormControl fullWidth>
  <InputLabel>Status</InputLabel>
  <Select
    name="status"
    value={form.status}
    label="Status"
    onChange={handleChange}
  >
    <MenuItem value="ACTIVE">Active</MenuItem>
    <MenuItem value="INACTIVE">Inactive</MenuItem>
  </Select>
</FormControl>

        <TextField
          label="Sanctioned Load"
          name="sanctionedLoad"
          type="number"
          value={form.sanctionedLoad}
          onChange={handleChange}
          fullWidth
        />

        <FormControl fullWidth>
  <InputLabel>Phase Type</InputLabel>
  <Select
    name="phaseType"
    value={form.phaseType}
    label="Phase Type"
    onChange={handleChange}
  >
    <MenuItem value="SINGLE_PHASE">Single Phase</MenuItem>
    <MenuItem value="THREE_PHASE">Three Phase</MenuItem>
  </Select>
</FormControl>

      </Stack>
    </DialogContent>

    <DialogActions>

      <Button onClick={onClose}>
        Cancel
      </Button>

      <Button
        variant="contained"
        onClick={handleSave}
      >
        {form.id ? "Update" : "Save"}
      </Button>

    </DialogActions>

  </Dialog>
);
};

export default ConnectionDialog;