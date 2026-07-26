import React from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import { Sparkles } from "lucide-react";

const SectionHeader = ({ title, subtitle, badgeText, sx = {} }) => {
  return (
    <Stack spacing={1} sx={{ mb: 4, ...sx }}>
      <Stack direction="row" alignItems="center" spacing={1.5} flexWrap="wrap">
        {badgeText && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(6, 182, 212, 0.08)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              borderRadius: "20px",
              px: 1.5,
              py: 0.4,
              mb: 0.5,
            }}
          >
            <Sparkles size={12} color="#06B6D4" />
            <Typography
              sx={{
                color: "#06B6D4",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {badgeText}
            </Typography>
          </Box>
        )}
      </Stack>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body2" sx={{ color: "#94A3B8", maxWidth: "680px" }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionHeader;
