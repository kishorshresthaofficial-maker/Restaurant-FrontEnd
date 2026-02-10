import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import Aos from 'aos'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
    <MantineProvider>
    <App />
    </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
