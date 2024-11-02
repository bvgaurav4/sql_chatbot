import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppShellDemo from './home'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShellDemo></AppShellDemo>
  </StrictMode>,
)
