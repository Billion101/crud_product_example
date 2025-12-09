import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (accessToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    setToken(accessToken)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home token={token!} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
