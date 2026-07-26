import { createTheme } from "@mui/material/styles";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2563EB", 
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#06B6D4", 
      light: "#22D3EE",
      dark: "#0891B2",
      contrastText: "#0F172A",
    },
    accent: {
      main: "#7C3AED", 
      cyan: "#06B6D4",
      purple: "#8B5CF6",
    },
    background: {
      default: "#071426", 
      paper: "#0D1B2A",
      dark: "#030712", 
    },
    text: {
      primary: "#F8FAFC", 
      secondary: "#94A3B8",
      disabled: "#64748B",
    },
    divider: "rgba(255, 255, 255, 0.06)",
    status: {
      success: "#22C55E",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#2563EB",
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
      fontSize: "2.75rem",
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.1rem",
      letterSpacing: "-0.025em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.65rem",
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.35rem",
      letterSpacing: "-0.015em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.1rem",
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.95rem",
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      fontSize: "0.95rem",
      fontWeight: 500,
      color: "#94A3B8",
    },
    subtitle2: {
      fontSize: "0.85rem",
      fontWeight: 500,
      color: "#64748B",
    },
    body1: {
      fontSize: "0.925rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.85rem",
      lineHeight: 1.45,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.2)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
    "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    ...Array(19).fill("0 10px 15px -3px rgba(0, 0, 0, 0.4)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", 
          padding: "10px 22px",
          fontSize: "0.875rem",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 15px rgba(37, 99, 235, 0.35)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
          color: "#FFFFFF",
          "&:hover": {
            background: "linear-gradient(135deg, #1D4ED8 0%, #172554 100%)",
            boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
          color: "#0F172A",
          "&:hover": {
            background: "linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)",
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.12)",
          color: "#F8FAFC",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            bgcolor: "rgba(255, 255, 255, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "18px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(15, 23, 42, 0.35)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          bgcolor: "rgba(13, 27, 42, 0.55)",
          backdropFilter: "blur(12px)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#94A3B8",
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          borderBottom: "2px solid rgba(255, 255, 255, 0.08)",
          py: 1.75,
        },
        body: {
          fontSize: "0.875rem",
          color: "#F8FAFC",
          py: 1.75,
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: "8px",
          fontSize: "0.75rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          color: "#F8FAFC",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
          "&:hover fieldset": {
            borderColor: "#06B6D4",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2563EB",
            boxShadow: "0 0 8px rgba(37, 99, 235, 0.25)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          bgcolor: "rgba(13, 27, 42, 0.95)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        },
      },
    },
  },
});

export default theme;
