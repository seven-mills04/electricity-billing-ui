import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import GlassCard from "./GlassCard";

const ChartCard = ({ title, subtitle, action, children, sx = {}, ...props }) => {
  return (
    <GlassCard sx={{ p: 3, height: "100%", ...sx }} {...props}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Stack>
      <Box sx={{ height: 320, width: "100%" }}>
        {children}
      </Box>
    </GlassCard>
  );
};

export default ChartCard;
