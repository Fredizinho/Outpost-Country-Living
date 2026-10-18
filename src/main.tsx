import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './fonts';
import './index.css';
import './lib/leafletSafePatch';
import { initializeOfflineStorage } from './lib/offlineStorage';

// Initialize offline guide storage
initializeOfflineStorage();

// Register Service Worker in production; clean up any stale dev-sw registrations in dev mode
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          console.log('Sanctuary ServiceWorker registered with scope: ', registration.scope);
        },
        (err) => {
          console.log('Sanctuary ServiceWorker registration failed: ', err);
        }
      );
    } else {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const reg of registrations) {
          if (reg.active?.scriptURL.includes('dev-sw') || reg.installing?.scriptURL.includes('dev-sw')) {
            reg.unregister();
          }
        }
      }).catch(() => {});
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

