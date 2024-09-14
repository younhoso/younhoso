import { createContext, useContext, useState } from "react";
import axios from "../lib/axios";

const AuthContext = createContext({
  user: null,
  avatar: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
  updateAvatar: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);

  async function getMe() {
    const res = await axios.get("/users/me");
    const user = res.data;
    setUser(user);
  }

  async function getMyAvatar() {
    const res = await axios.get("/users/me/avatar");
    const avatar = res.data;
    setAvatar(avatar);
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", { email, password });
    await getMe();
    await getMyAvatar();
  }

  async function logout() {
    // ...
  }

  async function updateMe({ name, email }) {
    const res = await axios.patch("/users/me", { name, email });
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function updateAvatar(values) {
    const res = await axios.patch("/users/me/avatar", values);
    const nextAvatar = res.data;
    setAvatar(nextAvatar);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        avatar,
        login,
        logout,
        updateMe,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
