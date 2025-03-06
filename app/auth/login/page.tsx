"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    login(username, password).then(() => {
      setUsername("");
      setPassword("");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="relative w-full max-w-md space-y-8 overflow-hidden rounded-2xl bg-gray-900 p-8 shadow-2xl ring-1 ring-blue-500/50 transform transition-all duration-300 hover:scale-105">
        <div className="absolute inset-0 -z-10 opacity-20 blur-3xl">
          <div className="h-full w-full bg-blue-500/30"></div>
        </div>
        <h1 className="text-center text-3xl font-extrabold text-blue-400">
          AcademiCloud
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-300">
          Welcome Back
        </h2>
        <div>
          <label className="block text-sm text-gray-400">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 mt-1 transform -translate-y-1/2 text-gray-400 transition-all duration-300 hover:text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a href="/auth/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
