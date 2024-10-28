import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '/style.css';
import 'portofølje_v3\style.css'

// Sjekker om elementet eksisterer og caster det til `HTMLElement` for å sikre typesikkerhet
const rootElement = document.getElementById('app') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
