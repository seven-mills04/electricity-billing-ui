import { createTheme } from "@mui/material/styles";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#075BB5", // Utility blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#625F58", // Secondary text
      contrastText: "#FFFDF8",
    },
    warning: {
      main: "#F05A28", // Safety orange
    },
    success: {
      main: "#087A5A", // Operational green
    },
    error: {
      main: "#C5382F", // Alert red
    },
    background: {
      default: "#F3F0E8", // Warm paper background
      paper: "#FFFDF8", // Near-white surface
      soft: "#E9E5DB", // Soft panel background
    },
    text: {
      primary: "#171717", // Main ink color
      secondary: "#625F58",
      disabled: "#949088",
    },
    divider: "#C9C3B7", // Border and divider color
    status: {
      success: "#087A5A",
      warning: "#F05A28",
      error: "#C5382F",
      info: "#075BB5",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      fontSize: "3.5rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
      color: "#171717",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.25rem",
      letterSpacing: "-0.015em",
      lineHeight: 1.2,
      color: "#171717",
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.01em",
      color: "#171717",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.35rem",
      letterSpacing: "-0.01em",
      color: "#171717",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.1rem",
      color: "#171717",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.95rem",
      color: "#171717",
    },
    subtitle1: {
      fontSize: "0.95rem",
      fontWeight: 500,
      color: "#625F58",
    },
    subtitle2: {
      fontSize: "0.85rem",
      fontWeight: 500,
      color: "#625F58",
    },
    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.55,
      color: "#171717",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
      color: "#625F58",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  shape: {
    borderRadius: 4, // 2-6px radii requirement
  },
  shadows: Array(25).fill("none"), // Remove visual shadows in favor of borders
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          padding: "8px 20px",
          fontSize: "0.9rem",
          fontWeight: 600,
          boxShadow: "none",
          transition: "background-color 150ms ease-in-out",
          "&:hover": {
            boxShadow: "none",
            transform: "none",
          },
        },
        containedPrimary: {
          backgroundColor: "#075BB5",
          color: "#FFFDF8",
          "&:hover": {
            backgroundColor: "#064B95",
          },
        },
        containedSecondary: {
          backgroundColor: "#625F58",
          color: "#FFFDF8",
          "&:hover": {
            backgroundColor: "#4E4B45",
          },
        },
        outlined: {
          borderColor: "#171717",
          color: "#171717",
          borderWidth: "1px",
          "&:hover": {
            borderColor: "#075BB5",
            bgcolor: "rgba(7, 91, 181, 0.04)",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          border: "1px solid #C9C3B7",
          bgcolor: "#FFFDF8",
          boxShadow: "none",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "none",
        },
        elevation1: {
          boxShadow: "none",
          border: "1px solid #C9C3B7",
          bgcolor: "#FFFDF8",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#171717",
          backgroundColor: "#E9E5DB",
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          borderBottom: "2px solid #C9C3B7",
          py: 1.5,
        },
        body: {
          fontSize: "0.875rem",
          color: "#171717",
          py: 1.5,
          borderBottom: "1px solid #C9C3B7",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: "4px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          color: "#171717",
          "& fieldset": {
            borderColor: "#C9C3B7",
          },
          "&:hover fieldset": {
            borderColor: "#171717",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#075BB5",
            borderWidth: "1.5px",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "4px",
          bgcolor: "#FFFDF8",
          border: "1px solid #C9C3B7",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
