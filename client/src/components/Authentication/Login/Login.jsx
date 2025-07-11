import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../../store/auth.js";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "./login.css";

const Login = () => {
  const { user, isAuthenticated } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser);
  const setRole = useAuthStore((state) => state.setRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setIsSigningIn(true);
      // Simulate login using Zustand store
      let role = email.endsWith("@wbt.com") ? "admin" : "user";
      const loginUser = useAuthStore.getState().loginUser;
      const result = await loginUser(email, password);
      if (result.success) {
        toast("Welcome back!", { theme: "green", type: "success", duration: 2000 });
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 1200);
      } else {
        toast(result.message, { theme: "dark", type: "error", duration: 2000 });
        setError(result.message);
      }
    } catch (error) {
      setError("Error signing in. Please try again later.");
      toast("Error signing in.", { theme: "dark", type: "error", duration: 2000 });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="form-section">
      <form onSubmit={onSubmit}>
        <h2>Sign In</h2>
        {error && <p>{error}</p>}
        <div className="email-and-password">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="sign-in-buttons">
          <button type="submit" disabled={isSigningIn}>
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </div>
        <div className="form-link">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;