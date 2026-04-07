import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@/i18n'
import './index.css'
import App from '@/App.tsx'
import { ThemeProvider } from '@/contexts/theme'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider delay={200}>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
)
