"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const { signup } = useAuthStore();

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    try {
      console.log("Signing up:", { username, email, password });
      signup(username, email, password).then(() => {
        router.push("/auth/login");
      });
    } catch (error) {
      console.error("Signup failed:", error);
    }
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
          Create Your Account
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
          <label className="block text-sm text-gray-400">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(
                validateEmail(e.target.value) ? "" : "Invalid email format"
              );
            }}
            className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
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
              className="absolute right-3 top-3.5 text-gray-400 transition-all duration-300 hover:text-white"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
            </button>
          </div>
        </div>
        <button
          onClick={handleSignup}
          className="w-full rounded-lg bg-blue-500 px-5 py-3 font-bold text-white transition-all duration-300 hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign Up
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
      <Toaster />
    </div>
  );
}
