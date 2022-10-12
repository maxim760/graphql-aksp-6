import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#0088cc"
    },
    secondary: {
      main: "#FC542B"
    },
    background: {
      default: "#f6f6f6"
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>    
);

