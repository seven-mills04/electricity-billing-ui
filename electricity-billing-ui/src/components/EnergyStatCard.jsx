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
          border: "1px solid rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(15, 23, 42, 0.35)",
          backdropFilter: "blur(12px)",
          p: 0.5,
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            boxShadow: `0 12px 30px ${color}15`,
            borderColor: color,
          },
        }}
      >
        
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
          {/* Header row: Title on the left, Icon container on the right */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#94A3B8",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
                pr: 2,
                minWidth: 0,
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </Typography>

            {Icon && (
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "12px",
                  bgcolor: `${color}15`,
                  color: color,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} />
              </Box>
            )}
          </Stack>

          {/* Metric Section: positioned below header */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
              {value}
            </Typography>
          </Box>

          {/* Footer Section: Subtitle and trend badge */}
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
                  flexShrink: 0,
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
