import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";

import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();



const App = () => {
  // Admin force logout user
  const handleForceLogoutUser = (id: string) => {
    // Always remove from localStorage, regardless of current state
    const stored = localStorage.getItem("offchat-current-user");
    let username = id;
    const userObj = users.find(u => u.id === id);
    if (userObj) username = userObj.username;
    if (stored) {
      const current = JSON.parse(stored);
      if (current && current.id === id) {
        setUser(null);
        localStorage.removeItem("offchat-current-user");
        alert("You have been logged out by an admin.");
      }
    }
    // Show message to admin
    alert(`User '${username}' has been forcefully logged out.`);
  };

  // Admin delete user
  const handleDeleteUser = (id: string) => {
    const userObj = users.find(u => u.id === id);
    const username = userObj ? userObj.username : id;
    setUsers(prev => prev.filter(u => u.id !== id));
    // If the deleted user is currently logged in, log them out
    if (user && user.id === id) {
      setUser(null);
    }
    alert(`User '${username}' has been deleted.`);
  };
  // Demo authentication state
  const [authMode, setAuthMode] = useState<'login' | 'signup'>("login");
  const [user, setUser] = useState<null | { id: string; username: string; avatar?: string; status: "online" | "away" | "offline" }>(() => {
    const stored = localStorage.getItem("offchat-current-user");
    if (stored) return JSON.parse(stored);
    return null;
  });
  // User list with approval status, persisted in localStorage
  const [users, setUsers] = useState<Array<{ id: string; username: string; password: string; status: "pending" | "approved" | "rejected"; avatar?: string; role?: string }>>(() => {
  // Admin add user (approved by default)
  const handleAddUser = (username: string, password: string, role: string) => {
    if (users.some(u => u.username === username)) {
      alert("Username already exists.");
      return;
    }
    setUsers(prev => [...prev, { id: username, username, password, status: "approved", role }]);
    alert("User added and approved.");
  };
    const stored = localStorage.getItem("offchat-users");
    if (stored) return JSON.parse(stored);
    return [{ id: "admin", username: "admin", password: "admin", status: "approved" }];
  });

  // Persist users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("offchat-users", JSON.stringify(users));
  }, [users]);

  // Persist current user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("offchat-current-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("offchat-current-user");
    }
  }, [user]);

  // Admin add user (approved by default)
  const handleAddUser = (username: string, password: string, role: string) => {
    if (users.some(u => u.username === username)) {
      alert("Username already exists.");
      return;
    }
    setUsers(prev => [...prev, { id: username, username, password, status: "approved", role }]);
    alert("User added and approved.");
  };

  // Only allow login for approved users, with specific error messages
  const handleLogin = (username: string, password: string) => {
    const userObj = users.find(u => u.username === username);
    if (!userObj) {
      alert("User does not exist.");
      return;
    }
    if (userObj.status === "pending") {
      alert("Your account is not approved yet.");
      return;
    }
    if (userObj.status === "rejected") {
      alert("Your account was rejected by admin.");
      return;
    }
    if (userObj.password !== password) {
      alert("Incorrect password.");
      return;
    }
    // Approved and password matches
    setUser({ id: userObj.id, username: userObj.username, status: "online" });
  };
  // Signup always creates a pending user
  const handleSignup = (username: string, password: string) => {
    if (users.some(u => u.username === username)) {
      alert("Username already exists.");
      return;
    }
    setUsers(prev => [...prev, { id: username, username, password, status: "pending" }]);
    alert("Account created! Waiting for admin approval.");
  };
  const handleLogout = () => {
    setUser(null);
  };

  // Admin actions
  const approveUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: "approved" } : u));
  };
  const rejectUser = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: "rejected" } : u));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminDashboard users={users} approveUser={approveUser} rejectUser={rejectUser} addUser={handleAddUser} forceLogoutUser={handleForceLogoutUser} deleteUser={handleDeleteUser} />} />
              <Route
                path="/login"
                element={
                  <LoginForm
                    onToggleMode={() => setAuthMode("signup")}
                    onLogin={handleLogin}
                  />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignupForm
                    onToggleMode={() => setAuthMode("login")}
                    onSignup={handleSignup}
                  />
                }
              />
              <Route
                path="/chat"
                element={
                  user ? (
                    <ChatInterface user={user} onLogout={handleLogout} />
                  ) : (
                    <LoginForm
                      onToggleMode={() => setAuthMode("signup")}
                      onLogin={handleLogin}
                    />
                  )
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
