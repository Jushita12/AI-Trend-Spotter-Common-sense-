import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // make sure this file exists, otherwise remove this line

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
