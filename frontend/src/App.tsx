import React from 'react'
import { AppThemeProvider } from './app/providers/AppThemeProvider'
import { AppRouter } from './app/routes/AppRouter'
import './App.css'

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <AppRouter />
    </AppThemeProvider>
  )
}

export default App
