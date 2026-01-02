import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import App from './App.tsx'
import './index.css'
import './i18n/config'

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  }>
    <App />
  </Suspense>
);
