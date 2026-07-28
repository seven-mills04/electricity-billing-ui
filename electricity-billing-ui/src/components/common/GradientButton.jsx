import React from "react";
import { Button } from "@mui/material";

const GradientButton = ({ children, variant = "contained", colorType = "primary", sx = {}, ...props }) => {
  const getGradientStyles = () => {
    if (variant === "outlined") {
      return {
        borderColor: "#C9C3B7",
        color: "#171717",
        boxShadow: "none",
        "&:hover": {
          borderColor: "#171717",
          bgcolor: "#F3F0E8",
          boxShadow: "none",
        },
      };
    }

    if (colorType === "accent") {
      return {
        bgcolor: "#F05A28",
        color: "#FFFDF8",
        fontWeight: 800,
        boxShadow: "none",
        "&:hover": {
          bgcolor: "#d94918",
          boxShadow: "none",
        },
      };
    }

    // Default: Primary
    return {
      bgcolor: "#075BB5",
      color: "#FFFDF8",
      fontWeight: 800,
      boxShadow: "none",
      "&:hover": {
        bgcolor: "#064B95",
        boxShadow: "none",
      },
    };
  };

  return (
    <Button
      variant={variant}
      sx={{
        borderRadius: "2px",
        py: 1.25,
        px: 3,
        textTransform: "none",
        transition: "all 120ms ease-in-out",
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
