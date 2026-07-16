import { createTheme } from '@mui/material/styles';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Premium Indigo
      light: '#6366F1',
      dark: '#3730A3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#64748B',
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F1F5F9', // Page canvas background
      paper: '#FFFFFF',   // Card / Surface background
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
    },
    success: {
      main: '#0D9488', // Emerald Green
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#D97706', // Warm Amber
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E11D48', // Deep Rose/Terracotta
      contrastText: '#FFFFFF',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.02em', color: '#0F172A' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em', color: '#0F172A' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em', color: '#0F172A' },
    subtitle1: { fontWeight: 500, color: '#64748B' },
    subtitle2: { fontWeight: 500, color: '#64748B' },
    body1: { fontSize: '0.925rem', lineHeight: 1.5, color: '#0F172A' },
    body2: { fontSize: '0.875rem', lineHeight: 1.45, color: '#0F172A' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F1F5F9',
          color: '#0F172A',
          scrollbarColor: 'rgba(79, 70, 229, 0.15) #FFFFFF',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#F1F5F9',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(79, 70, 229, 0.15)',
            borderRadius: '3px',
            '&:hover': {
              backgroundColor: 'rgba(79, 70, 229, 0.3)',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '7px 16px',
          boxShadow: 'none',
          fontWeight: 600,
          transition: 'all 0.12s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#4F46E5',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#3730A3',
          },
          '&.Mui-disabled': {
            backgroundColor: '#E2E8F0',
            color: '#94A3B8',
          },
        },
        outlinedPrimary: {
          borderColor: '#4F46E5',
          color: '#4F46E5',
          '&:hover': {
            borderColor: '#3730A3',
            backgroundColor: 'rgba(79, 70, 229, 0.04)',
          },
        },
        outlinedSecondary: {
          borderColor: '#E2E8F0',
          color: '#334155',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            borderColor: '#CBD5E1',
            backgroundColor: '#F8FAFC',
          },
        },
        textPrimary: {
          color: '#4F46E5',
          '&:hover': {
            backgroundColor: 'rgba(79, 70, 229, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            backgroundColor: '#FAFBFD',
            borderColor: '#CBD5E1',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          boxShadow: 'none',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          backgroundImage: 'none',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
          padding: '6px',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.25)',
          backdropFilter: 'blur(4px)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          backgroundColor: '#FFFFFF',
          transition: 'all 0.12s ease-in-out',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9CA3AF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4F46E5',
            borderWidth: '1px',
          },
        },
        input: {
          padding: '10px 14px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          transform: 'translate(14px, 10px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 600,
          fontSize: '0.75rem',
          height: '24px',
        },
        colorSuccess: {
          backgroundColor: '#F0FDF4',
          color: '#0D9488',
          border: '1px solid #CCFBF1',
        },
        colorWarning: {
          backgroundColor: '#FFFBEB',
          color: '#D97706',
          border: '1px solid #FEF3C7',
        },
        colorError: {
          backgroundColor: '#FFF1F2',
          color: '#E11D48',
          border: '1px solid #FFE4E6',
        },
        colorPrimary: {
          backgroundColor: '#EEF2FF',
          color: '#4F46E5',
          border: '1px solid #E0E7FF',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          backgroundColor: '#FFFFFF',
          color: '#0F172A',
          borderRadius: '8px',
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #E2E8F0',
            fontSize: '0.875rem',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#F8FAFC',
            color: '#64748B',
            fontWeight: 600,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            borderBottom: '1px solid #E2E8F0',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #E2E8F0',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#F8FAFC',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #E2E8F0',
          color: '#0F172A',
        },
        head: {
          backgroundColor: '#F8FAFC',
          color: '#64748B',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        },
      },
    },
  },
});

export default theme;