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
  Divider,
} from "@mui/material";

const DetailsDialog = ({
  open,
  onClose,
  data,
  title = "Details View",
  subtitle,
  sections,
  handleClose,
}) => {
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
          borderRadius: "2px",
          border: "1px solid #C9C3B7",
          bgcolor: "#FFFDF8",
          boxShadow: "none",
        }
      }}
    >
      <DialogTitle sx={{ px: 4, pt: 3.5, pb: 1.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#171717" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700 }}>
            {subtitle}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ px: 4, py: 3, borderColor: "#C9C3B7" }}>
        <Stack spacing={3}>
          {activeSections.map((section, sIdx) => (
            <Box key={sIdx}>
              {section.title && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "#075BB5",
                    textTransform: "uppercase",
                    fontWeight: 800,
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
                    <Typography variant="caption" sx={{ display: "block", fontWeight: 700, color: "#625F58" }}>
                      {field.label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#171717", mt: 0.5 }}>
                      {field.value ?? "-"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              {sIdx !== activeSections.length - 1 && <Divider sx={{ mt: 3, borderColor: "#C9C3B7" }} />}
            </Box>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 4, py: 2, borderTop: "1px solid #C9C3B7" }}>
        <Button variant="outlined" onClick={activeClose} sx={{ px: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsDialog;
