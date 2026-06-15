import React, { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const googleLogin = async () => {

    try {

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      setUser({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      });

      return true;

    } catch (error) {

      console.log(error);

      return false;

    }

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        googleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export function useAuth() {
  return useContext(AuthContext);
}

