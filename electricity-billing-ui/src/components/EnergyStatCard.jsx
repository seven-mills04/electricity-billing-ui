import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const EnergyStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#0284C7",
  trend,
  trendLabel,
}) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          p: 0.5,
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 12px 24px -4px rgba(15, 23, 42, 0.08)",
            borderColor: color,
          },
        }}
      >
        {/* Top Accent bar */}
        <Box
          sx={{
            height: "4px",
            width: "100%",
            background: `linear-gradient(90deg, ${color} 0%, rgba(255,255,255,0) 100%)`,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        <CardContent sx={{ p: 2.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.04em" }}>
                {title}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: "#0F172A", mt: 0.5 }}>
                {value}
              </Typography>
            </Box>

            {Icon && (
              <Box
                sx={{
                  p: 1.25,
                  borderRadius: "12px",
                  bgcolor: `${color}12`,
                  color: color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} />
              </Box>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 500 }}>
                {subtitle}
              </Typography>
            )}

            {trend && (
              <Chip
                size="small"
                icon={trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                label={trendLabel}
                sx={{
                  bgcolor: trend === "up" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  color: trend === "up" ? "#059669" : "#DC2626",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: "22px",
                }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnergyStatCard;
