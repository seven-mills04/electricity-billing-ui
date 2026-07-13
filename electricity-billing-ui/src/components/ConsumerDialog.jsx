import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const ConsumerDialog = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Consumer</DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Consumer Number"
            fullWidth
          />

          <TextField
            label="Consumer Name"
            fullWidth
          />

          <TextField
            label="City"
            fullWidth
          />

          <TextField
            label="Mobile Number"
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumerDialog;