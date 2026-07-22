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
      main: "#0056A6", // Corporate Utility Blue (Adani, Tata Power, BSES style)
      light: "#3378b8",
      dark: "#003c74",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00A99D", // Clean Utility Teal / Energy Green
      light: "#33baa1",
      dark: "#00766d",
      contrastText: "#FFFFFF",
    },
    accent: {
      main: "#F4B400", // Soft Amber / Yellow
      cyan: "#06B6D4",
      purple: "#8B5CF6",
    },
    background: {
      default: "#FFFFFF", // Clean premium background
      paper: "#FFFFFF",
      dark: "#002a52", // Rich deep corporate blue for footer/dark UI elements
    },
    text: {
      primary: "#1E293B", // Readable dark slate
      secondary: "#475569",
      disabled: "#94A3B8",
    },
    divider: "#E2E8F0",
    status: {
      success: "#00A99D",
      warning: "#F4B400",
      error: "#EF4444",
      info: "#0056A6",
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
      color: "#475569",
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
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
    "0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)",
    "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
    "0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)",
    "0 25px 50px -12px rgba(15, 23, 42, 0.15)",
    ...Array(19).fill("0 10px 15px -3px rgba(15, 23, 42, 0.08)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // 12-18px range
          padding: "10px 22px",
          fontSize: "0.875rem",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 86, 166, 0.15)",
            transform: "translateY(-1.5px)",
          },
        },
        containedPrimary: {
          background: "#0056A6",
          color: "#FFFFFF",
          "&:hover": {
            background: "#003c74",
          },
        },
        containedSecondary: {
          background: "#00A99D",
          color: "#FFFFFF",
          "&:hover": {
            background: "#00766d",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
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
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)",
          border: "1px solid #E2E8F0",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: "#475569",
          backgroundColor: "#F8FAFC",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          borderBottom: "2px solid #E2E8F0",
          py: 1.75,
        },
        body: {
          fontSize: "0.875rem",
          color: "#0F172A",
          py: 1.75,
          borderBottom: "1px solid #F1F5F9",
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
          "& fieldset": {
            borderColor: "#E2E8F0",
          },
          "&:hover fieldset": {
            borderColor: "#0056A6",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
        },
      },
    },
  },
});

export default theme;
