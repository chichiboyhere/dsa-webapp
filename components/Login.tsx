// components/Login.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

function Login() {
  const router = useRouter();
  // FIXED: Destructured 'role' instead of 'isAuthenticated'
  const { login, role, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FIXED: Use 'role' to check if user is already logged in
  useEffect(() => {
    if (role && !isLoading) {
      router.push("/dashboard");
    }
  }, [role, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // FIXED: Pass "STUDENT" to the login function
        login("STUDENT");
        router.push("/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 py-20">
      {/* Left Side: Branding */}
      <div className="hidden md:flex bg-blue-900 items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6">Welcome Back to Success.</h2>
          <p className="text-blue-100 text-lg">
            Log in to access your dashboard, CBT practice, and academic records.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Student Login
          </h1>
          <p className="text-gray-500 mb-8">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-black"
                  placeholder="fola@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition text-black"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-6 space-y-2 text-center md:text-left">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register/student"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Go back to{" "}
                <Link
                  href="/"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Home
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
