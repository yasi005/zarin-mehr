import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './Game.jsx'
import Home from './Home.jsx'
import TestLogin from './TestLogin.jsx'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Result from './Result.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import AppHeader from './components/AppHeader.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import './login.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<TestLogin />} />
          <Route
            path="/game"
            element={(
              <RequireAuth>
                <Game />
              </RequireAuth>
            )}
          />
          <Route
            path="/result"
            element={(
              <RequireAuth>
                <Result />
              </RequireAuth>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  </React.StrictMode>,
)
