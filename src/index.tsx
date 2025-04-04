import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tv.css';

console.log('Application starting...');

const container = document.getElementById('root');
if (container) {
  console.log('Root element found, mounting React application...');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('React application mounted successfully');
} else {
  console.error('Failed to find root element - check if public/index.html has a div with id="root"');
}