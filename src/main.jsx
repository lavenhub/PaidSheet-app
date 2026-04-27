import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ─── Service Worker Registration ──────────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('[PaidSheet SW] Registered:', registration.scope);

        // Check for updates every 60 seconds
        setInterval(() => registration.update(), 60 * 1000);

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available — you could show a toast here
              console.log('[PaidSheet SW] New version available. Refresh to update.');
            }
          });
        });
      })
      .catch(err => console.warn('[PaidSheet SW] Registration failed:', err));
  });
}

// ─── PWA Install Prompt ───────────────────────────────────────────────────────
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  // Expose to the app so any component can trigger install
  window.__pwa_install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[PaidSheet PWA] Install outcome:', outcome);
    deferredPrompt = null;
    window.__pwa_install = null;
  };
  // Dispatch event so React components can listen
  window.dispatchEvent(new CustomEvent('pwa-installable'));
});

window.addEventListener('appinstalled', () => {
  console.log('[PaidSheet PWA] Installed successfully!');
  deferredPrompt = null;
});

// ─── Render ───────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
