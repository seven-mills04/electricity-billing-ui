import React from "react";
import { Button } from "@mui/material";

const GradientButton = ({ children, variant = "contained", colorType = "primary", sx = {}, ...props }) => {
  const getGradientStyles = () => {
    if (variant === "outlined") {
      return {
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: "#F8FAFC",
        "&:hover": {
          borderColor: "#06B6D4",
          bgcolor: "rgba(6, 182, 212, 0.05)",
          boxShadow: "0 0 15px rgba(6, 182, 212, 0.2)",
        },
      };
    }

    if (colorType === "accent") {
      return {
        background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
        color: "#0F172A",
        fontWeight: 700,
        "&:hover": {
          background: "linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)",
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.45)",
          transform: "translateY(-1px)",
        },
      };
    }

    // Default: Primary
    return {
      background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      color: "#FFFFFF",
      fontWeight: 700,
      "&:hover": {
        background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
        boxShadow: "0 0 20px rgba(37, 99, 235, 0.45)",
        transform: "translateY(-1px)",
      },
    };
  };

  return (
    <Button
      variant={variant}
      sx={{
        borderRadius: "12px",
        py: 1.25,
        px: 3,
        textTransform: "none",
        transition: "all 0.2s ease-in-out",
        ...getGradientStyles(),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
