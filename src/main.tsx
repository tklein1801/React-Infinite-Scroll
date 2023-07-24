import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { DarkTheme } from '@kleithor/components';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={DarkTheme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>
);
