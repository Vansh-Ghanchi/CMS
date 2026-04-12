import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    let userData = null;
    // Admin
    if (email === "Admin@gmail.com" && password === "Admin123") {
      userData = { 
        email, 
        role: 'admin', 
        name: 'System Admin',
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      };
    }
    // Faculty 1: Student
    else if (email === "Student@gmail.com" && password === "Student123") {
      userData = { email, role: 'faculty-1', name: 'Faculty 1', module: 'Student Management' };
    }
    // Faculty 2: Attendance
    else if (email === "Attendance@gmail.com" && password === "Attendance123") {
      userData = { email, role: 'faculty-2', name: 'Faculty 2', module: 'Attendance Management' };
    }
    // Faculty 3: Course
    else if (email === "Course@gmail.com" && password === "Course123") {
      userData = { email, role: 'faculty-3', name: 'Faculty 3', module: 'Course Management' };
    }
    // Faculty 4: Fees
    else if (email === "Fees@gmail.com" && password === "Fees123") {
      userData = { email, role: 'faculty-4', name: 'Faculty 4', module: 'Fees Management' };
    }

    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
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
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
