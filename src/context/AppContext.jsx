"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const cachedCart = localStorage.getItem("geo_cart");
    const cachedUser = localStorage.getItem("geo_user");
    if (cachedCart) setCart(JSON.parse(cachedCart));
    if (cachedUser) setUser(JSON.parse(cachedUser));
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem("geo_cart", JSON.stringify(cart));
  }, [cart, isMounted]);

  useEffect(() => {
    if (isMounted) {
      if (user) localStorage.setItem("geo_user", JSON.stringify(user));
      else localStorage.removeItem("geo_user");
    }
  }, [user, isMounted]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const addToCart = (item, customAmount = 1) => {
    if (!item || !item.id) return;

    const amountToAdd = Number(customAmount) || 1;

    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        showToast(`// UPDATED ALLOCATION: ${item.title} quantity increased.`);
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (Number(i.quantity) || 0) + amountToAdd }
            : i,
        );
      }

      showToast(`// NEW ALLOCATION: ${item.title} registered.`);
      return [...prev, { ...item, quantity: amountToAdd }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast(
      "// METRIC_DROPPED: Item safely unallocated from local memory stack.",
      "error",
    );
  };

  const clearCart = () => setCart([]);

  const register = (email, password, name) => {
    if (!email || !password || !name) {
      showToast("// REGISTRATION_REJECTED: Missing required fields.", "error");
      return { success: false };
    }

    const localDb = JSON.parse(localStorage.getItem("geo_users_db") || "[]");

    const userExists = localDb.some((u) => u.email === email);
    if (userExists) {
      showToast(
        "// REGISTRATION_REJECTED: Node identity already registered.",
        "error",
      );
      return { success: false };
    }

    const newProfile = {
      name,
      email,
      password,
      role: "customer",
      clearance: "level_1",
    };
    localDb.push(newProfile);
    localStorage.setItem("geo_users_db", JSON.stringify(localDb));

    setUser({ name, email, role: "customer", clearance: "level_1" });
    showToast("// REGISTRATION_COMPLETE: New security node initialized.");
    return { success: true };
  };

  const login = (email, password) => {
    if (email === "admin@geotag.archive" && password === "admin123") {
      setUser({
        name: "Lead Curator",
        email,
        role: "admin",
        clearance: "level_3",
      });
      showToast("// AUTH_GRANTED: Admin console access established.");
      return { success: true, role: "admin" };
    }

    const localDb = JSON.parse(localStorage.getItem("geo_users_db") || "[]");
    const matchingUser = localDb.find(
      (u) => u.email === email && u.password === password,
    );

    if (matchingUser) {
      setUser({
        name: matchingUser.name,
        email: matchingUser.email,
        role: matchingUser.role,
        clearance: matchingUser.clearance,
      });
      showToast("// AUTH_GRANTED: Secure session token initialized.");
      return { success: true, role: matchingUser.role };
    }

    showToast("// AUTH_REJECTED: Invalid security credentials.", "error");
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    showToast("// SESSION_TERMINATED: Security tokens cleared safely.");
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return user.role === requiredRole;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        login,
        logout,
        isCartOpen,
        setIsCartOpen,
        toast,
        showToast,
        isMounted,
        hasPermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
