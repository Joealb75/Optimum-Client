import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from '/src/App.jsx'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'

import global from 'global';

if (typeof global === 'undefined') {
  window.global = window;
}
// Was trying to use Draft.js and had issues with installs and this is what chatGPT recomended 

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)

