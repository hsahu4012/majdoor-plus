import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import '../src/i18n';


createRoot(document.getElementById('root')).render(
  <App />
)
