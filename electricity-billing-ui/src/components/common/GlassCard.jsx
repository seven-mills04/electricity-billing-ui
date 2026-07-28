import React from "react";
import { Card } from "@mui/material";

const GlassCard = ({ children, sx = {}, ...props }) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#FFFDF8",
        border: "1px solid #C9C3B7",
        borderRadius: "2px",
        boxShadow: "none",
        transition: "all 120ms ease-in-out",
        "&:hover": {
          borderColor: "#171717",
          bgcolor: "#FFFDF8",
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
