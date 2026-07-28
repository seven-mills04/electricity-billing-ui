import React from "react";
import { Chip } from "@mui/material";

const StatusBadge = ({ label = "", statusType = "success", sx = {}, ...props }) => {
  const getColors = () => {
    const status = String(label).toUpperCase();
    if (status === "PAID" || status === "ACTIVE" || status === "SUCCESS" || status === "SETTLED" || statusType === "success") {
      return {
        bgcolor: "#FFFDF8",
        color: "#087A5A", // Operational green
        border: "1.5px solid #087A5A",
      };
    }
    if (status === "UNPAID" || status === "PENDING" || status === "IN_PROGRESS" || statusType === "warning") {
      return {
        bgcolor: "#FFFDF8",
        color: "#F05A28", // Safety orange
        border: "1.5px solid #F05A28",
      };
    }
    if (status === "ERROR" || status === "FAILED" || status === "INACTIVE" || statusType === "error") {
      return {
        bgcolor: "#FFFDF8",
        color: "#C5382F", // Alert red
        border: "1.5px solid #C5382F",
      };
    }
    // Default style
    return {
      bgcolor: "#FFFDF8",
      color: "#075BB5", // Utility blue
      border: "1.5px solid #075BB5",
    };
  };

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        fontWeight: 800,
        fontSize: "0.72rem",
        borderRadius: "2px",
        height: "22px",
        ...getColors(),
        ...sx,
      }}
      {...props}
    />
  );
};

export default StatusBadge;
