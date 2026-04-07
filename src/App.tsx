import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppParamsProvider } from '@/contexts/app-params'
import { CvPage } from '@/pages/cv-page'
import { PrintPage } from '@/pages/print-page'

export default function App() {
  return (
    <BrowserRouter>
      <AppParamsProvider>
        <Routes>
          <Route path="/" element={<CvPage />} />
          <Route path="/print" element={<PrintPage />} />
        </Routes>
      </AppParamsProvider>
    </BrowserRouter>
  )
}
