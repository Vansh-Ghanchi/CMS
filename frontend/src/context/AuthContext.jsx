import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Handle Session Expiration from API Interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      // Don't aggressively logout, just alert the user first
      // Alternatively, you can show a modal here
      console.warn("Session Expired Event Captured");
      alert("Your session has expired. Please log in again.");
      logout();
    };

    window.addEventListener("session-expired", handleSessionExpired);
    return () => window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await loginUser({ email, password, role: role.toUpperCase() });
      const { access_token, user: userData } = response.data;

      // Ensure we have a consistent user object
      const formattedUser = {
        ...userData,
        role: role.toLowerCase(), // Store role in lowercase for the ProtectedRoute logic
        token: access_token
      };

      setUser(formattedUser);
      localStorage.setItem('user', JSON.stringify(formattedUser));
      localStorage.setItem('token', access_token);
      
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      return { 
        success: false, 
        message: error.message || "Invalid credentials or server unavailable" 
      };
    }
  };

  const updateUser = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Optional: window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

