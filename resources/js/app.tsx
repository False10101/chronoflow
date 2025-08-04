
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/App';
import '../css/app.css';

// Set the dark theme on the root element for Tailwind CSS
document.documentElement.classList.add('dark');

const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}