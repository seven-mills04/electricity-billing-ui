import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import {
  addConsumer,
  updateConsumer,
} from "../api/consumerApi";

const ConsumerDialog = ({
  open,
  onClose,
  onSuccess,
  consumer,
}) => {
  const [formData, setFormData] = useState({
    consumerNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (consumer) {
      setFormData({
        consumerNumber: consumer.consumerNumber || "",
        firstName: consumer.firstName || "",
        lastName: consumer.lastName || "",
        email: consumer.email || "",
        phone: consumer.phone || "",
      });
    } else {
      setFormData({
        consumerNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  }, [consumer, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (consumer) {
        await updateConsumer(consumer.id, formData);
        alert("Consumer updated successfully!");
      } else {
        await addConsumer(formData);
        alert("Consumer added successfully!");
      }

      if (onSuccess) {
        await onSuccess();
      }

      handleClose();
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        alert("Something went wrong.");
      }
    }
  };

  const handleClose = () => {
    setFormData({
      consumerNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {consumer ? "Edit Consumer" : "Add Consumer"}
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Consumer Number"
            name="consumerNumber"
            value={formData.consumerNumber}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
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
          {consumer ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumerDialog;