/**
 * @file index.tsx
 * @description Entry point for the application
 * @author Damien Loup
 */

// Import libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Components
import Router from './Router';

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);