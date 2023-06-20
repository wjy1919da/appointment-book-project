import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme"
//import { ReactQueryDevtools } from '@tanstack/react-query/devtools';

Amplify.configure(awsExports);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      staleTime: 1000 * 60 * 60 * 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider reactRouterAdapter={ReactRouter6Adapter}>
         <ChakraProvider theme={theme}>
          <App />
          </ChakraProvider>
        </QueryParamProvider>
      </BrowserRouter>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
