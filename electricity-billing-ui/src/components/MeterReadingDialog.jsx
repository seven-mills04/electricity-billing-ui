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
  addMeterReading,
  updateMeterReading,
} from "../api/meterReadingApi";

import { getConnections } from "../api/connectionApi";

const MeterReadingDialog = ({
  open,
  onClose,
  onSuccess,
  reading,
}) => {
  const [connections, setConnections] = useState([]);

  const initialForm = {
    id: null,
    readingDate: "",
    previousReading: "",
    currentReading: "",
    remarks: "",
    connectionId: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (open) {
      fetchConnections();
    }
  }, [open]);

  useEffect(() => {
    if (reading) {
      setForm({
        id: reading.id,
        readingDate: reading.readingDate || "",
        previousReading: reading.previousReading || "",
        currentReading: reading.currentReading || "",
        remarks: reading.remarks || "",
        connectionId: reading.connection?.id || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [reading, open]);

  const fetchConnections = async () => {
    try {
      const response = await getConnections();
      setConnections(response.data);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose();
  };

const handleSave = async () => {
  try {

    // Check required fields
    if (
      !form.connectionId ||
      !form.readingDate ||
      form.previousReading === "" ||
      form.currentReading === ""
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate readings
    if (Number(form.currentReading) <= Number(form.previousReading)) {
      alert("Current Reading must be greater than Previous Reading");
      return;
    }

    const payload = {
      readingDate: form.readingDate,
      previousReading: Number(form.previousReading),
      currentReading: Number(form.currentReading),
      remarks: form.remarks,
      connection: {
        id: Number(form.connectionId),
      },
    };

      if (form.id) {
        await updateMeterReading(form.id, payload);
        alert("Meter Reading updated successfully!");
      } else {
        await addMeterReading(payload);
        alert("Meter Reading added successfully!");
      }

      if (onSuccess) {
        await onSuccess();
      }

      handleClose();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert("Failed to save meter reading.");
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {form.id ? "Edit Meter Reading" : "Add Meter Reading"}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Connection</InputLabel>

            <Select
              name="connectionId"
              value={form.connectionId}
              label="Connection"
              onChange={handleChange}
            >
              {connections.map((connection) => (
                <MenuItem
                  key={connection.id}
                  value={connection.id}
                >
                  {connection.connectionNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
  label="Reading Date"
  name="readingDate"
  type="date"
  value={form.readingDate}
  onChange={handleChange}
  fullWidth
  slotProps={{
    inputLabel: {
      shrink: true,
    },
  }}
/>

          <TextField
            label="Previous Reading"
            name="previousReading"
            type="number"
            value={form.previousReading}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Current Reading"
            name="currentReading"
            type="number"
            value={form.currentReading}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Remarks"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
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

export default MeterReadingDialog;