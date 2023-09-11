import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    primary: { main: '#0369a1' },
    secondary: { main: '#0284c7' },
    info: { main: '#cbd5e1' },
    success: { main: '#22c55e' },
    error: { main: '#ef4444' },
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#0f172a'
    }
  },
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
});
