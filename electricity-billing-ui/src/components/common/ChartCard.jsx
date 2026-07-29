import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import GlassCard from "./GlassCard";

const ChartCard = ({ title, subtitle, action, children, sx = {}, ...props }) => {
  return (
    <GlassCard sx={{ p: 3, height: "100%", ...sx }} {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#171717",
              fontSize: "1.1rem",
              wordBreak: "break-word",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{ color: "#625F58", fontWeight: 700, display: "block", mt: 0.25 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && (
          <Box sx={{ flexShrink: 0 }}>
            {action}
          </Box>
        )}
      </Box>
      <Box sx={{ height: 320, width: "100%" }}>
        {children}
      </Box>
    </GlassCard>
  );
};

export default ChartCard;
