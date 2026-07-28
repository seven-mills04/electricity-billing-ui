import React from "react";
import { Box, Typography, Stack } from "@mui/material";
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
              bgcolor: "#FFFDF8",
              border: "1.5px solid #075BB5",
              borderRadius: "2px",
              px: 1.5,
              py: 0.4,
              mb: 0.5,
            }}
          >
            <Sparkles size={12} color="#075BB5" />
            <Typography
              sx={{
                color: "#075BB5",
                fontWeight: 800,
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
          color: "#171717",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography variant="body2" sx={{ color: "#625F58", maxWidth: "680px", fontSize: "0.9rem" }}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default SectionHeader;
