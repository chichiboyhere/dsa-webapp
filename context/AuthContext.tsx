// "use client";
// import { createContext, useContext, useEffect, useState } from "react";

// type AuthContextType = {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: () => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const res = await fetch("/api/auth/verify");
//       if (res.ok) {
//         setIsAuthenticated(true);
//         localStorage.setItem("dsa-auth", "true");
//       } else {
//         throw new Error();
//       }
//     } catch {
//       setIsAuthenticated(false);
//       localStorage.removeItem("dsa-auth");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const login = () => {
//     setIsAuthenticated(true);
//     localStorage.setItem("dsa-auth", "true");
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     localStorage.removeItem("dsa-auth");
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };

"use client";
import { createContext, useContext, useEffect, useState } from "react";

type UserRole = "STUDENT" | "ADMIN" | null;

type AuthContextType = {
  role: UserRole;
  isLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/verify");
      const data = await res.json();
      if (res.ok && data.role) {
        setRole(data.role);
        localStorage.setItem("dsa-role", data.role);
      } else {
        throw new Error();
      }
    } catch {
      setRole(null);
      localStorage.removeItem("dsa-role");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial sync with localStorage for faster UI response
    const storedRole = localStorage.getItem("dsa-role") as UserRole;
    if (storedRole) setRole(storedRole);
    checkAuth();
  }, []);

  const login = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("dsa-role", newRole as string);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem("dsa-role");
  };

  return (
    <AuthContext.Provider value={{ role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
