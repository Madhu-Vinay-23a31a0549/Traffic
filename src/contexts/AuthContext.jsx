import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock user credentials for demo
  const mockUsers = [
    {
      id: 1,
      email: 'admin@smartcity.gov',
      password: 'admin123',
      name: 'City Administrator',
      role: 'System Administrator',
      department: 'IT Infrastructure'
    },
    {
      id: 2,
      email: 'operator@smartcity.gov',
      password: 'operator123',
      name: 'System Operator',
      role: 'Operations Manager',
      department: 'City Operations'
    }
  ]

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('smartcity_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('smartcity_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    )
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password
      
      setUser(userWithoutPassword)
      localStorage.setItem('smartcity_user', JSON.stringify(userWithoutPassword))
      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('smartcity_user')
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

