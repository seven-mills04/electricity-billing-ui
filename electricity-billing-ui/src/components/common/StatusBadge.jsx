import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ label = "", statusType = "success", sx = {}, ...props }) => {
  const getColors = () => {
    const status = String(label).toUpperCase();
    if (status === "PAID" || status === "ACTIVE" || status === "SUCCESS" || status === "SETTLED" || statusType === "success") {
      return {
        bgcolor: "rgba(34, 197, 94, 0.12)",
        color: "#22C55E",
        border: "1px solid rgba(34, 197, 94, 0.25)",
      };
    }
    if (status === "UNPAID" || status === "PENDING" || status === "IN_PROGRESS" || statusType === "warning") {
      return {
        bgcolor: "rgba(245, 158, 11, 0.12)",
        color: "#F59E0B",
        border: "1px solid rgba(245, 158, 11, 0.25)",
      };
    }
    if (status === "ERROR" || status === "FAILED" || status === "INACTIVE" || statusType === "error") {
      return {
        bgcolor: "rgba(239, 68, 68, 0.12)",
        color: "#EF4444",
        border: "1px solid rgba(239, 68, 68, 0.25)",
      };
    }
    // Default style
    return {
      bgcolor: "rgba(6, 182, 212, 0.12)",
      color: "#06B6D4",
      border: "1px solid rgba(6, 182, 212, 0.25)",
    };
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 700,
        fontSize: "0.72rem",
        borderRadius: "6px",
        height: "22px",
        ...getColors(),
        ...sx,
      }}
      {...props}
    />
  );
};

export default StatusBadge;
