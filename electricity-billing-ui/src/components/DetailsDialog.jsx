import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Box,
  Grid,
  Divider
} from "@mui/material";

const DetailsDialog = ({ open, onClose, handleClose, title, subtitle, sections, data }) => {
  const activeClose = onClose || handleClose;

  // Dynamically map flat data to sections if sections is not supplied
  let activeSections = sections;
  if (!activeSections && data) {
    activeSections = [
      {
        title: "",
        fields: Object.entries(data).map(([key, value]) => ({
          label: key,
          value: value,
          xs: 12,
          sm: 6
        }))
      }
    ];
  }

  if (!activeSections) return null;

  return (
    <Dialog
      open={open}
      onClose={activeClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "12px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)"
        }
      }}
    >
      <DialogTitle sx={{ px: 4, pt: 3.5, pb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0F172A" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 3, borderColor: "#E2E8F0" }}>
        <Stack spacing={3}>
          {activeSections.map((section, sIdx) => (
            <Box key={sIdx}>
              {section.title && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    display: "block",
                    mb: 1.5,
                    letterSpacing: "0.05em"
                  }}
                >
                  {section.title}
                </Typography>
              )}
              <Grid container spacing={2}>
                {section.fields.map((field, fIdx) => (
                  <Grid item xs={field.xs || 12} sm={field.sm || 6} key={fIdx}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontWeight: 500 }}>
                      {field.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 650, color: "#0F172A", mt: 0.5 }}>
                      {field.value ?? "-"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              {sIdx !== activeSections.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 2, bgcolor: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
        <Button variant="outlined" color="secondary" onClick={activeClose} sx={{ px: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
