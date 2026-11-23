
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

const FRONTEND_TEST_MODE = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (FRONTEND_TEST_MODE) {
        setUser({
          id: 1,
          name: "Demo Solver",
          email: "demo@solvesphere.com",
          role: "solver",
        });
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = (userData, token) => {
    if (!FRONTEND_TEST_MODE) {
      localStorage.setItem("token", token);
    }
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
