import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  handleClose,
  handleConfirm,
  description,
}) => {
  const activeClose = onClose || handleClose;
  const activeConfirm = onConfirm || handleConfirm;
  const activeMessage = message || description || "Are you sure you want to proceed?";

  return (
    <Dialog open={open} onClose={activeClose}>
      <DialogTitle sx={{ fontWeight: 800, color: "#171717" }}>{title}</DialogTitle>

      <DialogContent sx={{ py: 1 }}>
        <Typography variant="body2" sx={{ color: "#625F58" }}>{activeMessage}</Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={activeClose} sx={{ color: "#625F58" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={activeConfirm}
          sx={{
            bgcolor: "#C5382F",
            color: "#FFFDF8",
            "&:hover": { bgcolor: "#A82F27" },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;