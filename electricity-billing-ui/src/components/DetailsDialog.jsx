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
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(13, 27, 42, 0.95)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        }
      }}
    >
      <DialogTitle sx={{ px: 4, pt: 3.5, pb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 3, borderColor: "rgba(255, 255, 255, 0.08)" }}>
        <Stack spacing={3}>
          {activeSections.map((section, sIdx) => (
            <Box key={sIdx}>
              {section.title && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#06B6D4",
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
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 500, color: "#94A3B8" }}>
                      {field.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 650, color: "#FFFFFF", mt: 0.5 }}>
                      {field.value ?? "-"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              {sIdx !== activeSections.length - 1 && <Divider sx={{ mt: 3, borderColor: "rgba(255, 255, 255, 0.06)" }} />}
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 2, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Button variant="outlined" color="primary" onClick={activeClose} sx={{ px: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
