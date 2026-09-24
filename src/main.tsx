import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './lib/leafletSafePatch';
import { initializeOfflineStorage } from './lib/offlineStorage';

// Initialize offline guide storage
initializeOfflineStorage();

// Register Service Worker for offline app shell caching
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('Sanctuary ServiceWorker registered with scope: ', registration.scope);
      },
      (err) => {
        console.log('Sanctuary ServiceWorker registration failed: ', err);
      }
    );
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

