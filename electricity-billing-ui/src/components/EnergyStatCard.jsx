import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const EnergyStatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#075BB5",
  trend,
  trendLabel,
}) => {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.12 }}>
      <Card
        elevation={0}
        sx={{
          borderRadius: "2px",
          border: "1px solid #C9C3B7",
          bgcolor: "#FFFDF8",
          p: 0.5,
          position: "relative",
          overflow: "hidden",
          transition: "all 120ms ease-in-out",
          "&:hover": {
            borderColor: "#171717",
            bgcolor: "#FFFDF8",
          },
        }}
      >
        {/* Accent Bar */}
        <Box
          sx={{
            height: "4px",
            width: "100%",
            bgcolor: color,
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
                color: "#625F58",
                fontWeight: 800,
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
                  width: "36px",
                  height: "36px",
                  flexShrink: 0,
                  borderRadius: "2px",
                  bgcolor: "#E9E5DB",
                  color: color,
                  border: `1px solid #C9C3B7`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} />
              </Box>
            )}
          </Stack>

          {/* Metric Section: positioned below header */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#171717", fontSize: { xs: "1.65rem", md: "1.95rem" }, fontFamily: "monospace" }}>
              {value}
            </Typography>
          </Box>

          {/* Footer Section: Subtitle and trend badge */}
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#625F58", fontWeight: 700, fontSize: "0.75rem" }}>
                {subtitle}
              </Typography>
            )}

            {trend && (
              <Chip
                size="small"
                icon={trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                label={trendLabel}
                sx={{
                  bgcolor: "#FFFDF8",
                  border: `1px solid ${trend === "up" ? "#087A5A" : "#C5382F"}`,
                  color: trend === "up" ? "#087A5A" : "#C5382F",
                  fontWeight: 800,
                  fontSize: "0.68rem",
                  borderRadius: "2px",
                  height: "22px",
                  flexShrink: 0,
                  "& .MuiChip-icon": {
                    color: "currentColor",
                  }
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
