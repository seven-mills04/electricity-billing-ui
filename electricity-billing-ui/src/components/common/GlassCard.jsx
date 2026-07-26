import React from "react";
import { Card } from "@mui/material";

const GlassCard = ({ children, sx = {}, ...props }) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "rgba(15, 23, 42, 0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          borderColor: "rgba(6, 182, 212, 0.3)",
          boxShadow: "0 12px 35px rgba(6, 182, 212, 0.08)",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
