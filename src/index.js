import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './theme';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      //cacheTime: 1000 ,// 1 second
      staleTime: 1000 * 60 * 60 * 1,
     // staleTime: 1000, // 1 second
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    }
  }
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider reactRouterAdapter={ReactRouter6Adapter}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider> 
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
